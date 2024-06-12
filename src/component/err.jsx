import { Link } from "react-router-dom";

function Err() {
  return (
    <>
      <div className="err">
        <span className="text-gray-500 ml-16">Accueil / </span> Erreur 404
      </div>
      <div className="container p-5">
        <div className="row">
          <div className="text-center pb-12">
            <h1 className="text-8xl p-4">404 Non trouvé</h1>
            <p className="pb-10 text-sm">
              La page que vous avez visitée est introuvable. Vous pouvez revenir à la page d'accueil.
            </p>
            <Link
              className="bg-red-500 text-sm p-2.5 text-white rounded no-underline"
              to="/"
            >
              Retour à la page d'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Err;
