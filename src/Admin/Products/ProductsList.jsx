import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/Products";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        setProducts(productsResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Produits</h2>
        <Link to={`/admin/products/create`} className="btn btn-primary">
          Créer
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <img
                      src={product.thumbnail || "https://via.placeholder.com/150"}
                      alt="Produit"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/products/show/${product.id}`}
                        className="btn btn-success"
                      >
                        Voir
                      </Link>
                      <Link
                        to={`/admin/products/update/${product.id}`}
                        className="btn btn-primary"
                      >
                        Mettre à jour
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
