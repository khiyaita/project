import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser } from "../../api/User";

const UsersShow = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const userResponse = await getUser(id);
        setUser(userResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUtilisateur();
  }, [id]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      console.log("Utilisateur supprimé :", user.name);
      navigate("/admin/users");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 mx-auto mt-8">
      {user && (
        <>
          <div className="p-6">
            <h5 className="font-bold text-xl mb-2">Nom : {user.name}</h5>
            <p className="text-gray-700 text-base mb-2">E-mail : {user.email}</p>
            <p className="text-gray-700 text-base mb-2">Créé à : {user.created_at}</p>
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

export default UsersShow;
