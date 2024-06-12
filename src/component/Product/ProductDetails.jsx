import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import Toastify from "./Toastify";
import { getProduct, getProducts } from "../../api/Products";
import { addToCarts } from "../../api/Carts";

function ProductDetails() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProduct(id);
        const productsResponse = await getProducts();
        setProducts(productsResponse);
        setProduct(productResponse);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }finally{
        setLoading(false);

      }
    };
    fetchData();
  }, [id]);
  const HandleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const cartItem = {
        user_id: user_id,
        product_id: product.id,
        quantity: 1,
      };
      const response = await addToCarts(cartItem);
      console.log("Ajouté au panier :", response);
      setMessages([...messages, { text:"Produit ajouté au panier", type:"success" }]);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };
 
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const imageArray = Array.isArray(product.images)
    ? product.images
    : JSON.parse(product.images);
  return (
    <div className="product my-10 mx-20 relative">
      <div className="flex items-center flex-col p-5 absolute">
        {messages.map((message, index) => (
          <Toastify key={index} text={message.text} type={message.type} />
        ))}
      </div>
      <div>
        <span className="text-gray-500 ">Compte/jeux / </span>
        {product.title}
      </div>
      <div className="mt-6 flex">
        <div>
          {imageArray.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              width="170px"
              height="138px"
              className="bg-gray-100 mb-2 ml-6"
            />
          ))}
        </div>
        <img
          src={product.thumbnail}
          alt="Miniature"
          width={"500px"}
          height={"600px"}
          className="bg-gray-100 mb-2 ml-6"
        />
        <div className="ml-3  h-auto">
          <h3 className="font-bold ">{product.title}</h3>
          <div className="flex my-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <i
                key={i}
                className={`bi ${
                  product.rating >= i
                    ? "bi-star-fill text-yellow-400"
                    : product.rating >= i - 0.5
                    ? "bi-star-half text-yellow-400"
                    : "bi-star"
                }`}
              ></i>
            ))}
            <p className="text-sm text-gray-400 mx-2 ">
              ({(product.rating * 100).toFixed(0)} avis)
            </p>
            <div className="w-0.5 h-4 bg-gray-400"></div>
            <p className="text-sm text-green-400 font-semibold ml-2">
              En stock
            </p>
          </div>
          <p className="font-semibold text-lg mb-2">Prix : ${product.price}</p>
          <p className="text-xs ">{product.description}</p>
          <div className="bg-gray-500 h-0.5 w-64 ml-6 my-5 "></div>
          <div>
            Couleurs :
            <input
              type="radio"
              name="color"
              style={{ accentColor: "blue" }}
              className="ml-4"
            />
            <input
              type="radio"
              name="color"
              style={{ accentColor: "red" }}
              className="ml-2"
            />
          </div>
          <div className="flex items-center justify-start mt-4">
            Taille :
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="ml-2 p-1 border rounded border-gray-400 focus:bg-red-500 focus:text-white w-20 h-11"
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex justify-start items-start mt-4 mb-4 ">
            <div className="border rounded inline-block h-11">
              <button className="w-20 h-11 border border-gray-400 bg-gray-50">
                -
              </button>
              <input
                type="text"
                value={product.quantity || 1}
                readOnly
                className="h-11 text-center w-20 border border-gray-400"
              />
              <button className="w-20 h-11 border border-gray-400 bg-red-500 text-white">
                +
              </button>
            </div>
            <button className="ml-2 bg-red-500 text-white px-6 rounded h-11 w-40">
              <Link to="/checkout">Acheter maintenant</Link>
            </button>
            <button
              className="ml-2 bg-red-500 text-white px-6 rounded h-11 w-40"
              onClick={HandleAddToCart}
            >
              Ajouter au panier
            </button>
            <button>
              <i
                className={`bi ${
                  products.some((item) => item.id === product.id)
                    ? "bi-heart-fill"
                    : "bi-heart"
                } px-1 border ml-2 border-gray-400 rounded items-center justify-center flex w-10 h-10`}
              ></i>
            </button>
          </div>
          <div className="border border-gray-400 rounded">
            <div className="flex border-b border-gray-400 my-3">
              <i className="bi bi-truck mx-3 my-3 w-10 h-10 items-center justify-center flex"></i>
              <div>
                <p className="font-semibold">Livraison gratuite</p>
                <p className="font-semibold text-sm">
                  Entrez votre code postal Disponibilité de livraison
                </p>
              </div>
            </div>
            <div className="flex my-3">
              <i className="bi bi-arrow-repeat mx-3 my-3 w-10 h-10 items-center justify-center flex"></i>
             
              <div>
                <p className="font-semibold">Retour gratuit</p>
                <p className="font-semibold text-sm">Retour gratuit pendant 30 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10 mt-10">
        <div className="flex items-center justify-start my-2">
          <div className="rounded w-4 h-8 bg-red-500 "></div>
          <p className="text-red-500 text-sm font-semibold ml-3">
            Articles connexes
          </p>
        </div>
        <div className="flex justify-evenly">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageSrc={product.thumbnail}
              discount={product.discountPercentage}
              productName={product.title}
              price={product.price}
              oldPrice={product.price + 90}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
