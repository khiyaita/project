import Hhh from "./hh";
import Service from "./service"; 
import AboutFils from "./person";

function About() {
  return (
    <>
      <div>
        <span className="text-gray-500 ml-16">Accueil / </span> À propos
      </div>
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full md:w-9/10 mx-auto ">
        <div className="md:ml-20 md:mr-10 w-full md:w-1/2 h-auto md:h-72">
          <h1 className="font-bold text-xl mb-4">Notre histoire</h1>
          <p className="text-xs mb-4">
            Lancé en 2015, Exclusive est le principal marché en ligne d'Asie du Sud avec une présence active au Bangladesh. Soutenu par un large éventail de solutions marketing, de données et de services sur mesure, Exclusive compte 10 500 vendeurs et 300 marques et sert 3 millions de clients dans la région.
          </p>
          <p className="text-xs">
            Exclusive propose plus d'un million de produits, en croissance rapide. Exclusive offre une gamme diversifiée de catégories allant de l'électronique grand public à la mode et au style de vie.
          </p>
        </div>
        <img
          src="/images/person-3.jpeg"
          alt="img"
          className="bg-slate-400 w-full mr-10 md:w-1/2 h-96 md:h-auto"
        />
      </div>
      <div className="w-full md:w-9/10 my-10 flex flex-wrap justify-center">
        <Service i={"shop-window"} p={"Vendeurs actifs sur notre site"} n={"10.5"} />
        <Service i={"currency-dollar"} p={"Ventes mensuelles de produits"} n={"33"} />
        <Service i={"basket3"} p={"Clients actifs sur notre site"} n={"45.5"} />
        <Service i={"coin"} p={"Vente brute annuelle sur notre site"} n={"25"} />
      </div>
      <div className="flex flex-wrap justify-around">
        <AboutFils
          img={"https://images.mubicdn.net/images/cast_member/2184/cache-2992-1547409411/image-w856.jpg"}
          name={"Tom Cruise"}
          job={"Fondateur & Président"}
        />
        <AboutFils
          img={"https://www.youloveit.ru/uploads/gallery/main/538/youloveit_ru_emma_watson_foto06_2.jpg"}
          name={"Emma Watson"}
          job={"Directeur Général"}
        />
        <AboutFils
          img={"https://image.tmdb.org/t/p/original/saBHS2uYUVKZSwAuXpD2PlCWMxx.jpg"}
          name={"Will Smith"}
          job={"Designer de Produits"}
        />
      </div>
      <div className="flex flex-wrap  justify-around my-10">
        <Hhh
          icon={"truck"}
          title={"LIVRAISON GRATUITE ET RAPIDE"}
          desc={"Livraison gratuite pour toutes les commandes de plus de 140 $"}
        />
        <Hhh
          icon={"headphones"}
          title={"SERVICE CLIENT 24/7"}
          desc={"Support client amical 24/7"}
        />
        <Hhh
          icon={"check"}
          title={"GARANTIE DE REMBOURSEMENT"}
          desc={"Nous remboursons l'argent dans les 30 jours"}
        />
      </div>
    </>
  );
}

export default About;
