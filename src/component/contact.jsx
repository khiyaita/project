import React from "react";

function Contact() {
  return (
    <>
      <div className="ml-16">
        <span className="text-gray-500">Accueil / </span> Contact
      </div>
      <div className="flex flex-col md:flex-row md:justify-center">
        <div className="border border-gray-100 shadow-md ml-4 mt-10 px-10 py-10 w-80 md:w-96">
          <div className="ml-5">
            <div className="flex mb-4">
              <i className="bi bi-telephone bg-red-500 text-white rounded-full mr-3 p-1"></i>
              <h5 className="mt-1">Appelez-nous</h5>
            </div>

            <p className="ml-1 mb-3">Nous sommes disponibles 24/7, 7 jours sur 7.</p>
            <p className="ml-1 mb-3">Téléphone : +8801611112222</p>
          </div>
          <div className="bg-gray-500 h-0.5 w-64 ml-6 my-5 "></div>
          <div className="">
            <div className="flex ml-5 mb-4">
              <i className="p-1 bi bi-envelope bg-red-500 text-white rounded-full mr-3"></i>
              <h5 className="mt-1">Écrivez-nous</h5>
            </div>
            <p className="ml-6 mb-3">
              Remplissez notre formulaire et nous vous contacterons dans les 24 heures.
            </p>
            <p className="ml-6 mb-3">E-mails : customer@exclusive.com</p>
            <p className="ml-6 mb-3">E-mails : support@exclusive.com</p>
          </div>
        </div>

        <div className="border border-gray-100 shadow-md ml-4 mt-10 px-10 py-10  md:w-132">
          <div className="flex flex-col md:flex-row md:justify-between">
            <input
              type="text"
              placeholder="Votre nom"
              className="bg-color p-2 mb-4 md:mr-2 md:mb-0"
            />

            <input
              type="email"
              placeholder="Votre e-mail"
              className="bg-color p-2 mb-4 md:mr-2 md:mb-0"
            />

            <input
              type="tel"
              placeholder="Votre téléphone"
              className="bg-color p-2 mb-4 md:mb-0"
            />
          </div>

          <textarea
            placeholder="Votre message"
            className="mt-4 w-full mb-2 p-2 h-40 bg-color"
          ></textarea>
          <div className="flex justify-end">
            <button className="bg-red-500 rounded text-white p-2">
              Envoyer le message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
