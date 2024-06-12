import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Auth";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("user_id", response.user.id);
      if (response.user.name == "admin") {
        navigate(`/admin/account`);
      } else {
        navigate(`/account`);
      }
    } catch (error) {
      console.error("Erreur de récupération :", error);
    }
  };

  return (
    <>
      <div className="flex items-center pb-20">
        <img src="/images/télé.png" alt="" className="w-1/2" />

        <div className="w-1/2 mx-20">
          <h2 className="text-lg">Connectez-vous à Exclusive</h2>
          <p className="text-left">Entrez vos informations ci-dessous</p>
          <br />
          <form className="w-3/4" onSubmit={handleSubmit}>
            <div className="w-full">
              <input
                type="email"
                className="w-full border-b border-gray-500 placeholder-gray-500"
                id="emailPhone"
                placeholder="Email ou numéro de téléphone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full mt-4">
              <input
                type="password"
                className="w-full border-b border-gray-500 placeholder-gray-500"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
              >
                Se connecter
              </button>
              <p className="mt-3 text-red-500 hover:text-red-600 cursor-pointer">
                Mot de passe oublié ?
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
