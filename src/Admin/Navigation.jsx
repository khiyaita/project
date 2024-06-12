import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col md:flex-row px-6 md:px-10 py-4 md:py-6">
      <h4 className="font-bold text-lg md:text-xl mr-10"><Link to={'/'}>Exclusive</Link></h4>
      <ul className="flex justify-around md:justify-start md:mt-0 space-x-4">
       
        <li>
          <Link
            className={
              location.pathname === "/admin/account"
                ? "text-black font-bold underline"
                : "text-black hover:font-semibold no-underline"
            }
            to="/admin/account"
          >
            Gestion de compte
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/admin/users"
                ? "text-black font-bold underline"
                : "text-black hover:font-semibold no-underline"
            }
            to="/admin/users"
          >
            Gestion des utilisateurs
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/admin/products"
                ? "text-black font-bold underline"
                : "text-black hover:font-semibold no-underline"
            }
            to="/admin/products"
          >
            Gestion des produits
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/admin/orders"
                ? "text-black font-bold underline"
                : "text-black hover:font-semibold no-underline"
            }
            to="/admin/orders"
          >
            Gestion des commandes
          </Link>
        </li>
       
      </ul>
    </nav>
  );
};
export default Navigation;
