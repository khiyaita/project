import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteOrder, getOrder } from "../../api/Orders";

const ShowOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(id);
        setOrder(orderData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteOrder(id);
      navigate("/admin/orders");
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande :", error);
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72">
      {order && (
        <>
          <div className="px-6 py-4">
            <h5 className="font-bold text-xl mb-2">ID commande : {order.id}</h5>
            <p className="text-gray-700 text-base mb-2">ID utilisateur : {order.user_id}</p>
            <p className="text-gray-700 text-base mb-2">Total : ${order.total}</p>
            <p className="text-gray-700 text-base mb-2">Statut : {order.status}</p>
            <p className="text-gray-700 text-base mb-2">Créé le : {order.created_at}</p>
            <p className="text-gray-700 text-base mb-2">Mis à jour le : {order.updated_at}</p>
          </div>
          <div className="px-6 py-4">
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowOrder;
