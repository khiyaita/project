import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../api/Orders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await getOrders();
        setOrders(orderResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2>Commandes</h2>
        <Link to={`/admin/orders/create`} className="btn btn-primary mb-4">
          Créer
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100 shadow-sm">
              <th className="py-4 px-6">ID commande</th>
              <th className="py-4 px-6">Total</th>
              <th className="py-4 px-6">Statut</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{order.id}</td>
                  <td className="py-4 px-6">${order.total}</td>
                  <td className="py-4 px-6">{order.status}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link to={`/admin/orders/show/${order.id}`} className="btn btn-success">
                        Afficher
                      </Link>
                      <Link to={`/admin/orders/update/${order.id}`} className="btn btn-primary">
                        Mettre à jour
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center">Aucune commande trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
