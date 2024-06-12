import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="bg-black text-center py-2">
        <div className="container mx-auto px-4 lg:px-0 flex justify-between items-center">
          <div className="text-white ">
            <span className="opacity-80">
              Vente estivale pour tous les maillots de bain avec livraison express gratuite - 50 % de réduction !
            </span>
            <Link to="/admin/log-out" className="text-white ml-4 underline ">
              Se déconnecter{" "}
            </Link>
          </div>
          <div className="flex items-center">
            <select
              id="languageSelect"
              className="bg-black text-white cursor-pointer ml-4"
              style={{ width: "80px" }}
            >
              <option value="french">Français</option>
              <option value="english">Anglais</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
