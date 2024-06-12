import { useEffect, useState, useCallback } from "react";
import List from "./list";
import { Link, useNavigate } from "react-router-dom";
import { clearCarts, getCarts, removeFromCarts, updateCarts } from "../../Admin/api/Carts";
import { getProducts } from "../../Admin/api/Products";

function Cart() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const user_id = localStorage.getItem("user_id");
const navigate= useNavigate();
if(user_id===null){
  navigate('/log-in')
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await getProducts();
        const cartResponse = await getCarts();
        const cartData = cartResponse
          .filter((product) => product.user_id === +user_id)
          .map((cartItem) => {
            const productDetails = productsResponse.find(
              (product) => product.id === cartItem.product_id
            );
            return {
              id: cartItem.id,
              product_id: cartItem.product_id,
              quantity: cartItem.quantity,
              ...productDetails,
            };
          });
        setProducts(cartData);
        setCarts(cartResponse);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
      finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [user_id]);

  useEffect(() => {
    const newSubtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal); // Supposant qu'il n'y a pas de frais supplémentaires pour simplifier
  }, [products]);

  const handleClearCart = useCallback(async () => {
    try {
      await clearCarts(user_id);
      setProducts([]);
      setSubtotal(0);
      setTotal(0);
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
    }
  }, [user_id]);

  const handleIncreaseQuantity = useCallback(async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const cart_id = carts.filter(item => item.product_id === id).map(item => item.id)[0];
    try {
      await updateCarts(cart_id, {
        quantity: product.quantity + 1,
      });
      const updatedProducts = products.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Erreur lors de l'augmentation de la quantité:", error);
    }
  }, [products, carts]);

  const handleDecreaseQuantity = useCallback(async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product || product.quantity <= 1) return;
    const cart_id = carts.filter(item => item.product_id === id).map(item => item.id)[0];

    try {
      await updateCarts(cart_id, {
        quantity: product.quantity - 1,
      });
      const updatedProducts = products.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Erreur lors de la diminution de la quantité:", error);
    }
  }, [products, carts]);

  const handleRemoveFromCart = useCallback(async (id) => {
    const cart_id = carts.filter(item => item.product_id === id).map(item => item.id)[0];
    try {
      await removeFromCarts(cart_id);
    
    } catch (error) {
      console.error("Erreur lors de la suppression du produit du panier:", error);
    }
  }, [products, carts]);
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  return (
    <div className="mx-20 md:mx-20 my-10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr className="shadow-sm">
              <td className="py-4">Produit</td>
              <td className="py-4">Prix</td>
              <td className="py-4">Quantité</td>
              <td className="py-4">Sous-total</td>
              <td className="py-4">Action</td>
            </tr>

            {products.length > 0 ? (
              products.map((product, id) => (
                <List
                  key={id}
                  id={product.id}
                  imageSrc={product.thumbnail}
                  productName={product.title}
                  price={product.price}
                  quantity={product.quantity}
                  increaseQuantity={handleIncreaseQuantity}
                  decreaseQuantity={handleDecreaseQuantity}
                  removeFromCart={handleRemoveFromCart}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucun article</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center my-4">
        <Link to="/products/all" className="text-sm border border-gray-300 rounded p-2">
          <span className="mx-4 text-black">Retour à la boutique</span>
        </Link>

        <button onClick={handleClearCart} className="mx-4 text-sm border border-gray-300 rounded p-2 md:ml-4">
          Vider le panier
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row my-4 h-11">
          <input
            type="text"
            placeholder="Code de coupon"
            className="border border-gray-700 px-4 py-2 rounded-sm pl-4 md:mr-2 mb-2 md:mb-0"
          />
          <button className="text-white px-4 bg-red-600 rounded py-2">
            Appliquer le coupon
          </button>
        </div>

        <div className="border border-gray-700 w-full md:w-96 px-4 py-4 rounded-sm">
          <h2 className="font-semibold mb-3">Total du panier</h2>
          <p className="text-sm flex justify-between">
            <span>Sous-total :</span> ${subtotal.toFixed(2)}
          </p>
          <hr className="my-2" />
          <p className="text-sm flex justify-between">
            <span>Livraison :</span> Gratuite
          </p>
          <hr className="my-2" />
          <p className="text-sm flex justify-between">
            <span>Total :</span> ${total.toFixed(2)}
          </p>
          <div className="flex justify-center mt-2">
            <Link to="/checkout" className="text-white px-4 bg-red-600 rounded py-2">
              Procéder au paiement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
