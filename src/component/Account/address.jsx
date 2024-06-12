import React, { useState } from "react";
import { updateUser } from "../../api/User";
import Toastify from "../Product/Toastify";

function Address({ user }) {
  const [messages, setMessages] = useState([]);

  const addressObject = user && user.address ? JSON.parse(user.address) : {};
  const [formData, setFormData] = useState({
    street: addressObject.street || "",
    city: addressObject.city || "",
    postalCode: addressObject.postalCode || "",
    country: addressObject.country || "",
  });
  const id = localStorage.getItem("user_id");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(id, { address: formData });
      setMessages([...messages, { text:"Mise à jour réussie", type:"success" }]);

      console.log("Mise à jour réussie :", response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="border relative border-gray-100 shadow-md w-3/4 my-5 mx-10 py-5 px-10"
      ><div className="flex justify-between absolute  right-0 flex-col p-5">
      {messages.map((message, index) => (
        <Toastify key={index} text={message.text} type={message.type} />
      ))}
    </div>
        <h5 className="mt-3 text-red-500">Modifier votre adresse</h5>
        <div className="mt-3">
          <label htmlFor="street" className="block">
            Rue :
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="text-gray-500 bg-color p-2 w-full"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="city" className="block">
            Ville :
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="text-gray-500 bg-color p-2 w-full"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="postalCode" className="block">
            Code postal :
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="text-gray-500 bg-color p-2 w-full"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="country" className="block">
            Pays :
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="text-gray-500 bg-color p-2 w-full"
            required
          />
        </div>
        <div className="flex justify-end mt-5">
          <button type="reset" className="font-semibold p-2 mr-4">
            Annuler
          </button>
          <button
            type="submit"
            className="rounded bg-red-500 text-white px-4 py-2"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
  );
}

export default Address;
