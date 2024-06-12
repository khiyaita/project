import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getProduct, getProducts } from "../api/Products";
import { getCarts } from "../api/Carts";
import { getUser } from "../api/User";
import { createOrder } from "../api/Orders";
import { createPayment } from "../api/payments";
import Toastify from "./Product/Toastify";

function CheckOut() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [orderResponseId, setOrderResponse] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [formData, setFormData] = useState({
    card_number: "",
    card_holder_name: "",
    expiration_date: "",
    cvv: "",
    firstName: "",
    country: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const productResponse = await getProduct(id);
          const userResponse = await getUser(user_id);
          const paymentsObject = JSON.parse(userResponse.payments);
          const addressObject = JSON.parse(userResponse.address);
          if (addressObject !== null && paymentsObject !== null) {
            setFormData((prevData) => ({
              ...prevData,
              card_number: paymentsObject.card_number,
              card_holder_name: paymentsObject.card_holder_name,
              expiration_date: paymentsObject.expiration_date,
              cvv: paymentsObject.cvv,
              firstName: userResponse.name,
              emailAddress: userResponse.email,
              phoneNumber: userResponse.phone_number,
              city: addressObject.city,
              streetAddress: addressObject.street,
              country: addressObject.country,
              postalCode: addressObject.postalCode,
            }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              firstName: userResponse.name,
              emailAddress: userResponse.email,
              phoneNumber: userResponse.phone_number,
            }));
          }
          setProduct(productResponse);
          setSubtotal(productResponse.price);
        } else {
          const productsResponse = await getProducts();
          const cartResponse = await getCarts();
          const userCart = cartResponse
            .filter((item) => item.user_id === +user_id)
            .map((cartItem) => {
              const productDetails = productsResponse.find(
                (product) => product.id === cartItem.product_id
              );
              return {
                ...cartItem,
                ...productDetails,
              };
            });

          setProducts(userCart);

          const calculatedSubtotal = userCart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setSubtotal(calculatedSubtotal);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [id, user_id]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await getUser(user_id);
        const addressObject = JSON.parse(userDataResponse.address);
        const paymentsObject = JSON.parse(userDataResponse.payments);
        if (addressObject !== null && paymentsObject !== null) {
          setFormData((prevData) => ({
            ...prevData,
            card_number: paymentsObject.card_number,
            card_holder_name: paymentsObject.card_holder_name,
            expiration_date: paymentsObject.expiration_date,
            cvv: paymentsObject.cvv,
            firstName: userDataResponse.name,
            emailAddress: userDataResponse.email,
            phoneNumber: userDataResponse.phone_number,
            city: addressObject.city,
            streetAddress: addressObject.street,
            country: addressObject.country,
            postalCode: addressObject.postalCode,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            firstName: userDataResponse.name,
            emailAddress: userDataResponse.email,
            phoneNumber: userDataResponse.phone_number,
          }));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    };

    fetchUserData();
  }, [user_id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const orderResponse = await createOrder({
        user_id,
        total: subtotal,
        items: products.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
      });
      setOrderResponse(orderResponse);
      const paymentResponse = await createPayment({
        order_id: orderResponse.id,
        amount: subtotal,
        payment_method:
          paymentMethod === "paymentMethod"
            ? "credit_card"
            : "cash_on_delivery", // Déterminer le mode de paiement
      });
      setMessages([...messages, { text:"Commande passée avec succès", type:"success" }]);
      
      console.log("Commande passée avec succès :", orderResponse);
      console.log("Paiement effectué avec succès :", paymentResponse);
    } catch (error) {
      setMessages([...messages, { text:"Erreur lors de la passation de la commande", type:"error" }]);
      console.error("Erreur lors de la passation de la commande :", error);
    }
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const applyCoupon = () => {
    // Ajouter la logique pour appliquer le coupon
    console.log(`Coupon ${couponCode} appliqué !`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const paymentData = {
        order_id: orderResponseId,
        amount: subtotal,
        payment_method: paymentMethod,
      };

      const response = await createPayment(paymentData);

      if (response.status === 201) {
        console.log("Détails du paiement soumis avec succès !");
      } else {
        console.log("Échec de la soumission des détails de paiement.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la soumission des détails de paiement :",
        error
      );
      console.log(
        "Une erreur s'est produite lors de la soumission des détails de paiement."
      );
    }
  };
  return (
    <div className="mx-20 my-10 relative">
      <div className="flex justify-end p-5 absolute">
        {messages.map((message, index) => (
          <Toastify key={index} text={message.text} type={message.type} />
        ))}
      </div>
      <div className="mb-5">
        <span className="text-gray-500">
          Compte / Mon compte / Produit / Voir le panier /{" "}
        </span>
        Paiement
      </div>
      <h2 className="font-bold text-xl mb-5">Détails de facturation</h2>
      <form className="grid grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm text-gray-300">
            Prénom : <span className="text-red-500"></span>
          </label>
          <input
            type="text"
            name="firstName"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-300">Nom du pays :</label>
          <input
            type="text"
            name="country"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.country}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-300">
            Adresse postale : <span className="text-red-500"></span>
          </label>
          <input
            type="text"
            name="streetAddress"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.streetAddress}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-300">
            Code postal, étage, etc. (facultatif) :
          </label>
          <input
            type="text"
            name="postalCode"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-300">
            Ville : <span className="text-red-500"></span>
          </label>
          <input
            type="text"
            name="city"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.city}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-300">
            Numéro de téléphone : <span className="text-red-500"></span>
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-300">
            Adresse e-mail : <span className="text-red-500"></span>
          </label>
          <input
            type="text"
            name="emailAddress"
            className="bg-gray-100 rounded w-[400px] h-[40px] mb-4"
            value={formData.emailAddress}
            onChange={handleChange}
          />
          <label className="text-sm">
            <input
              type="checkbox"
              id="save-info"
              className="mr-3"
              style={{ accentColor: "red" }}
            />
            Enregistrer ces informations pour un paiement plus rapide la
            prochaine fois
          </label>
        </div>
        <div className="w-[500px] h-[800px]">
          <div className="flex flex-col mr-10">
            {id && product ? (
              <div className="my-2 flex justify-between">
                <div className="flex items-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mr-3"
                    height={"30px"}
                    width={"30px"}
                  />
                  {product.title}
                </div>
                ${product.price}
              </div>
            ) : (
              products.map((product, index) => (
                <div key={index} className="my-2 flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="mr-3"
                      width={"30px"}
                      height={"30px"}
                    />
                    {product.title}
                  </div>
                  ${product.price} x {product.quantity}
                </div>
              ))
            )}
            <div className="my-2 text-sm flex justify-between">
              Sous-total :<span>${subtotal}</span>
            </div>
            <hr />
            <div className="my-2 text-sm flex justify-between">
              Livraison :<span>Gratuit</span>
            </div>
            <hr />
            <div className="my-2 text-sm flex justify-between">
              Total :<span>${subtotal}</span>
            </div>
            <div className="my-2 text-sm flex justify-between">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="paymentMethod"
                  style={{ accentColor: "black" }}
                  className="mr-3"
                  checked={paymentMethod === "paymentMethod"}
                  onChange={handlePaymentChange}
                />
                Mode de paiement :
              </label>
              <span>
                <img src="/Icons/payment.svg" alt="Méthodes de paiement" />
              </span>
            </div>
            {paymentMethod === "paymentMethod" && (
              <form onSubmit={handleSubmit}>
                <div className="mt-3">
                  <label htmlFor="card_number" className="block">
                    Numéro de carte :
                  </label>
                  <input
                    type="text"
                    id="card_number"
                    name="card_number"
                    value={formData.card_number}
                    onChange={handleInputChange}
                    className="text-gray-500 bg-gray-100 p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="card_holder_name" className="block">
                    Nom du titulaire de la carte :
                  </label>
                  <input
                    type="text"
                    id="card_holder_name"
                    name="card_holder_name"
                    value={formData.card_holder_name}
                    onChange={handleInputChange}
                    className="text-gray-500 bg-gray-100 p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="expiration_date" className="block">
                    Date d'expiration :
                  </label>
                  <input
                    type="text"
                    id="expiration_date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleInputChange}
                    className="text-gray-500 bg-gray-100 p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="cvv" className="block">
                    CVV :
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="text-gray-500 bg-gray-100 p-2 w-full"
                    required
                  />
                </div>
              </form>
            )}
            <div className="my-2 text-sm">
              <input
                type="radio"
                name="payment"
                value="cashOnDelivery"
                style={{ accentColor: "black" }}
                className="mr-3"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={handlePaymentChange}
              />
              Paiement à la livraison
            </div>
          </div>
          <div className="flex h-[50px]">
            <input
              type="text"
              placeholder="Code promo"
              className="border border-black rounded w-[60%] pl-4"
              value={couponCode}
              onChange={handleCouponChange}
            />
            <button
              className="bg-red-500 text-white rounded ml-4 px-8 py-2"
              onClick={applyCoupon}
            >
              Appliquer le code promo
            </button>
          </div>
          <button
            className="bg-red-500 h-[50px] my-5 text-white rounded px-8 py-2  "
            onClick={handlePlaceOrder}
          >
            Passer la commande
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckOut;
