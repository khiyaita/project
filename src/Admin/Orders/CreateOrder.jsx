import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/Orders";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    total: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrder(formData);
      console.log("Commande créée :", response);
      navigate("/admin/orders");
    } catch (error) {
      console.error("Erreur lors de la création de la commande :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-5 p-5 border rounded shadow-lg bg-white">
      <div className="mt-3">
        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
          ID utilisateur :
        </label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="total" className="block text-sm font-medium text-gray-700">
          Total :
        </label>
        <input
          type="number"
          id="total"
          name="total"
          value={formData.total}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Statut :
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Créer la commande
      </button>
    </form>
  );
};

export default CreateOrder;
