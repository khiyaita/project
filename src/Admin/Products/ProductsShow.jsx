import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProduct } from "../../api/Products";

const ProductsShow = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await getProduct(id);
        setProduct(productResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      console.log("Produit supprimé :", product.title);
      navigate("/admin/products");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 mx-auto mt-8">
      {product && (
        <>
          <img src={product.image} className="w-full h-48 object-cover" alt="Produit" />
          <div className="p-6">
            <h5 className="font-bold text-xl mb-2">{product.title}</h5>
            <p className="text-gray-700 text-base mb-2">{product.description}</p>
            <p className="text-gray-700 text-base mb-2">Prix : ${product.price}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsShow;
