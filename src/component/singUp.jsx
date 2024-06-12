import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/Auth";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      navigate("/log-in");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <>
      <div className="flex items-center pb-20">
        <img src="/images/télé.png" alt="" className="w-1/2" />

        <div className="text-left px-20 py-20 w-3/4">
          <h1 className="text-lg">Créer un compte</h1>
          <p className="mb-6 text-sm">Entrez vos informations ci-dessous</p>
          <form className="grid grid-cols-1" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              className="border-b px-2 text-sm w-full border-gray-500 placeholder-gray-500 mb-5"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              id="emailPhone"
              className="border-b px-2 text-sm w-full border-gray-500 placeholder-gray-500 mb-5"
              placeholder="Email ou numéro de téléphone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              className="border-b px-2 text-sm w-full border-gray-500 placeholder-gray-500 mb-5"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              id="password_confirmation"
              className="border-b px-2 text-sm w-full border-gray-500 placeholder-gray-500 mb-5"
              placeholder="Confirmation de mot de passe"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              required
            />
            <div>
              <button
                type="submit"
                className="bg-red-500 text-sm p-1.5 w-full text-white rounded"
              >
                Créer un compte
              </button>
            </div>
          </form>
          <p className="mt-3 text-sm text-center text-gray-500">
            Vous avez déjà un compte?{" "}
            <Link to="/log-in">
              <span className="underline font-semibold text-gray-500">
                Connectez-vous
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
