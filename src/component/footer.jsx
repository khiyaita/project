import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-10">
        <div>
          <Link to={'/'} className="font-bold">Exclusive</Link>
          <h6 className="my-4">S'abonner</h6>
          <p className="mb-4 opacity-70">Obtenez 10% de réduction sur votre première commande</p>
          <div className="flex mb-3">
            <input
              type="email"
              className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-black-500 bg-black text-white flex-grow"
              placeholder="Entrez votre e-mail"
            />
            <button className="ml-3 bg-black text-white p-2 rounded-full">
              <i className="bi bi-send" style={{ marginLeft: "-87px" }}></i>
            </button>
          </div>
        </div>

        <div>
          <Link to={"#"} className="">Support</Link>
          <p className="my-4 opacity-70">
            111 Bijoy Sarani; Dhaka; DH 1515; Bangladesh.
          </p>
          <p className="mb-4 opacity-70">E-mail: exclusive@gmail.com</p>
          <p className="mb-4 opacity-70">Téléphone: +88015-88888-9999</p>
        </div>

        <div>
          <h4 className="mb-4">Compte</h4>
          <p className="mb-4 opacity-70"><Link to="/account">Mon compte</Link></p>
          <p className="mb-4 opacity-70"><Link to="/log-in">Connexion </Link>/
          <Link to="/sign-up">  S'inscrire</Link></p>
          <p className="mb-4 opacity-70"><Link to="/cart">Panier</Link></p>
          <p className="mb-4 opacity-70"><Link to="/wishlist">Liste de souhaits</Link></p>
          <p className="mb-4 opacity-70"><Link to="/products/all">Boutique</Link></p>
        </div>

        <div>
          <h4 className="mb-4">Liens rapides</h4>
          <p className="mb-4 opacity-70"><Link to="/privacy-policy">Politique de confidentialité</Link></p>
          <p className="mb-4 opacity-70"><Link to="/terms-of-use">Conditions d'utilisation</Link></p>
          <p className="mb-4 opacity-70"><Link to="/faq">FAQ</Link></p>
          <p className="mb-4 opacity-70"><Link to="/contact">Contact</Link></p>
        </div>  

        <div className="bg-black text-white md:px-10 flex flex-col ">
          <h4 className="mb-4">Télécharger l'application</h4>
          <p className="mb-4 opacity-70">Économisez 3 $ avec l'application réservée aux nouveaux utilisateurs</p>
          <div className="flex mb-4">
            <img
              src="/Images/QR-code.png"
              alt="img"
              width={80}
              height={80}
              className="mr-4"
            />
            <div className="flex flex-col">
            <a href="https://play.google.com/store"><img
              src="/Images/google-play.jpeg"
              className="border border-gray-500 rounded mb-2"
              alt="Google Play"
              width={100}
              height={50}
            /></a>
            <a href="https://www.apple.com/app-store/store"><img
              src="/Images/app-store.jpeg"
              className="border border-gray-500 rounded"
              alt="App Store"
              width={100}
              height={50}
            /></a>
            </div>
          </div>
          <div className="flex ml-4 space-x-5">
          <a href="https://www.facebook.com/store"><i className="bi bi-facebook"></i></a>
            <a href="https://twitter.com/store"><i className="bi bi-twitter"></i></a>
            <a href="https://www.instagram.com/store"><i className="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/store"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      <p className="text-center opacity-30 mt-6">
        © Droit d'auteur Rimal 2022. Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
