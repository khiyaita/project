import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./profile";
import Address from "./address";
import Payment from "./payment";
import { getUser } from "../../api/User";
import OrdersPending from "./OrdersStatus/OrdersPending";
import OrdersCompleted from "./OrdersStatus/OrdersCompleted";
import OrdersShipped from "./OrdersStatus/OrdersShipped";

function Account() {
  const [activeComponent, setActiveComponent] = useState(<Profile />);
  const [user, setUser] = useState({});
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate();
  const id = localStorage.getItem("user_id");
  if (id === null) {
    navigate("/log-in");
  }
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getUser(id);
        setUser(productResponse);
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [id]);
  
  if (loading) {
    return <div>Chargement en cours...</div>;
  }
  return (
    <>
      <div className="mx-16">
        <div className="flex justify-between">
          <div>
            <span className="text-gray-500 ">Accueil / </span> Mon Compte
          </div>
          <div>
            Bienvenue{" "}
            <span className="text-red-500 ">
              {user.name ? user.name.split(" ")[0] : "Chargement..."}
            </span>
          </div>
        </div>
        <div className="container mt-3">
          <div className="flex">
            <div className="mt-3">
              <h5 className="mt-3">Gérer mon compte</h5>
              <div className="flex flex-col items-start ml-6 text-gray-500">
                <button
                  className={`${
                    activeComponent.type === Profile ? "text-red-500" : ""
                  }`}
                  onClick={() => handleButtonClick(<Profile user={user} />)}
                >
                  Mon profil
                </button>
                <button
                  className={`${
                    activeComponent.type === Address ? "text-red-500" : ""
                  }`}
                  onClick={() => handleButtonClick(<Address user={user} />)}
                >
                  Carnet d'adresses
                </button>
                <button
                  className={`${
                    activeComponent.type === Payment ? "text-red-500" : ""
                  }`}
                  onClick={() => handleButtonClick(<Payment user={user} />)}
                >
                  Mes options de paiement
                </button>
              </div>

              <h5 className="mt-3">Mes commandes</h5>
              <div className="flex flex-col items-start ml-6 text-gray-500">
                <button
                  className={`${
                    activeComponent.type === OrdersPending ? "text-red-500" : ""
                  }`}
                  onClick={() =>
                    handleButtonClick(<OrdersPending user={user} />)
                  }
                >
                  En attente
                </button>
                <button
                  className={`${
                    activeComponent.type === OrdersCompleted
                      ? "text-red-500 "
                      : ""
                  }`}
                  onClick={() =>
                    handleButtonClick(<OrdersCompleted user={user} />)
                  }
                >
                  Terminées
                </button>
                <button
                  className={`${
                    activeComponent.type === OrdersShipped
                      ? "text-red-500 mb-3"
                      : "mb-3"
                  }`}
                  onClick={() =>
                    handleButtonClick(<OrdersShipped user={user} />)
                  }
                >
                  Expédiées
                </button>
              </div>
              <Link
                to={"/wishlist"}
                className=" text-black font-semibold text-xl"
              >
                Ma liste de souhaits
              </Link>
            </div>
            {activeComponent}
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
