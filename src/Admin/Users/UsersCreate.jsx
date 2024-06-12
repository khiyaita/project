import React, { useState } from "react";
import { createUser } from "../../api/User";
import { useNavigate } from "react-router-dom";

function UsersCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(formData);
      console.log("Utilisateur créé :", response);
      navigate("/admin/users");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-5 p-5 border rounded shadow-lg bg-white">
      <div className="mt-3">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Numéro de téléphone :</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <div className="mt-3">
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe :</label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          className="text-gray-500 bg-gray-100 p-2 w-full rounded border border-gray-300"
          required
        />
      </div>
      <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Créer l'utilisateur</button>
    </form>
  );
}

export default UsersCreate;
