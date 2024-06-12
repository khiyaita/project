import { useState } from "react";
import { updateUser } from "../../api/User";
import Toastify from "../Product/Toastify";

function Payment({ user }) {
  const [messages, setMessages] = useState([]);

  const paymentObject = user && user.payments ? JSON.parse(user.payments) : {};
  const id = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    card_number: paymentObject.card_number || "",
    card_holder_name: paymentObject.card_holder_name || "",
    expiration_date: paymentObject.expiration_date || "",
    cvv: paymentObject.cvv || "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(id, { payments: formData });
      console.log("Mise à jour réussie :", response);
      setMessages([...messages, { text:"Mise à jour réussie", type:"success" }]);

    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  return (
    <>
    
      <form
        onSubmit={handleSubmit}
        className="border border-gray-100 relative shadow-md w-3/4 my-5 mx-10 py-5 px-10"
      >
        <div className="flex items-center absolute right-0 flex-col p-5">
        {messages.map((message, index) => (
          <Toastify key={index} text={message.text} type={message.type} />
        ))}
      </div>
        <h5 className="mt-3 text-red-500">Modifier vos informations de paiement</h5>
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
            className="text-gray-500 bg-color p-2 w-full"
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
            className="text-gray-500 bg-color p-2 w-full"
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
            className="text-gray-500 bg-color p-2 w-full"
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
    </>
  );
}

export default Payment;
