import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className=" bg-black text-white py-10">
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-10">
        <div>
          <Link to={'/admin'} className="text-white no-underline font-bold">Panneau d'administration</Link>
          <h6 className=" my-4">Gérer les utilisateurs</h6>
          <p className=" mb-4 opacity-70">Ajouter, modifier ou supprimer des utilisateurs</p>
        </div>

        <div>
          <h4 className=" mb-4">Support</h4>
          <p className=" my-4 opacity-70">
            111 Rue de l'Administration; Ville d'Administration; AD 1234; Adminland.
          </p>
          <p className=" mb-4 opacity-70">Email: admin@example.com</p>
          <p className=" mb-4 opacity-70">Téléphone: +12345-67890</p>
        </div>

        <div>
          <h4 className=" mb-4">Compte</h4>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/account">Mon profil</Link></p>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/settings">Paramètres</Link></p>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/logout">Déconnexion</Link></p>
        </div>

        <div>
          <h4 className=" mb-4">Liens rapides</h4>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/privacy-policy">Politique de confidentialité</Link></p>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/terms-of-use">Conditions d'utilisation</Link></p>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/faq">FAQ</Link></p>
          <p className=" mb-4 opacity-70"><Link className='text-white no-underline' to="/admin/contact">Contact</Link></p>
        </div>  

        <div className=" bg-black text-white md:px-10 flex flex-col">
          <h4 className=" mb-4">Télécharger l'application</h4>
          <p className=" mb-4 opacity-70">Application exclusive pour les administrateurs</p>
          <div className=" flex mb-4">
            <img
              src="/Images/QR-code.png"
              alt="img"
              width={80}
              height={80}
              className=" mr-4"
            />
            <div className=" flex flex-col ">
              <a className='text-white no-underline'  href="https://play.google.com/store"><img
              src="/Images/google-play.jpeg"
              className="border border-gray-500 rounded mb-2"
              alt="Google Play"
              width={100}
              height={50}
            /></a>
              <a  className='text-white no-underline' href="https://www.apple.com/app-store/store"><img
              src="/Images/app-store.jpeg"
              className="border border-gray-500 rounded"
              alt="App Store"
              width={100}
              height={50}
            /></a>
            </div>
          </div>
          <div className=" flex ml-4 space-x-5">
            <a href="https://www.facebook.com/admin"><i className=" bi bi-facebook text-white"></i></a>
            <a href="https://twitter.com/admin"><i className=" bi bi-twitter text-white"></i></a>
            <a href="https://www.instagram.com/admin"><i className=" bi bi-instagram text-white"></i></a>
            <a href="https://www.linkedin.com/admin"><i className=" bi bi-linkedin text-white"></i></a>
          </div>
        </div>
      </div>

      <p className=" text-center opacity-30 mt-6">
        © Droits d'auteur Admin 2024. Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
