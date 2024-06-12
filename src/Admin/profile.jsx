import { useEffect, useState } from "react";
import { updateUser, getUser } from "../api/User";
import Toastify from "../component/Product/Toastify";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const id = localStorage.getItem("user_id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(id);
        setUser(response);
        setFormData({
          name: response.name,
          email: response.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(id, {
        name: formData.name,
        email: formData.email,
        password: formData.newPassword,
      });
      console.log("Données utilisateur mises à jour :", response);
      setMessages([...messages, { text:"Données utilisateur mises à jour", type:"success" }]);

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessages([...messages, { text:"Erreur lors de la mise à jour des données de l'utilisateur", type:"success" }]);
      console.error(
        "Erreur lors de la mise à jour des données de l'utilisateur :",
        error
      );
    }
  };

  return (
    <>
    <form
      className="border border-gray-100 relative shadow-md w-3/4 my-5 mx-10 py-5 px-10"
      onSubmit={handleSubmit}
    ><div className="flex items-center right-0 flex-col p-5 absolute">
    {messages.map((message, index) => (
      <Toastify key={index} text={message.text} type={message.type} />
    ))}
  </div>
      <h5 className="mt-3 text-red-500">Modifier votre profil</h5>
      <div className="flex justify-evenly w-full">
        <div className="mt-3 w-full">
          <h6>Prénom</h6>
          <input
            type="text"
            name="firstName"
            className="text-gray-500 bg-color p-2 w-full"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex w-full justify-evenly">
        <div className="mt-3 w-full">
          <h6>Email</h6>
          <input
            type="email"
            name="email"
            className="text-gray-500 bg-color p-2 w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-3 w-full flex flex-col items-start">
        <h6>Changements de mot de passe</h6>
        <input
          type="password"
          name="currentPassword"
          className="text-gray-500 bg-color p-2 mb-3 w-full"
          placeholder="Mot de passe actuel"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          className="text-gray-500 bg-color p-2 mb-3 w-full"
          placeholder="Nouveau mot de passe"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          className="text-gray-500 bg-color p-2 mb-3 w-full"
          placeholder="Confirmer le nouveau mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
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
    </form></>
  );
}

export default Profile;
