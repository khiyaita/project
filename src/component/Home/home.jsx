import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";
import CategoryButton from "./CategoryButton";
import Feature from "./Feature";
import Countdown from "./Countdown";
import Slider from "./Slider";
import { getProducts } from "../../api/Products";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const menRef = useRef(null);
  const womenRef = useRef(null);
  const jewelryRef = useRef(null);
  const electronicsRef = useRef(null);
  const smartphonesRef = useRef(null);
  const laptopsRef = useRef(null);
  const groceriesRef = useRef(null);
  const perfumeRef = useRef(null);
  const accessoriesRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const responseProducts =await getProducts();
      setProducts(responseProducts);
    } catch (err) {
      console.error("Erreur lors de la récupération des produits :", err);
            setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderProductCards = (category) => {
    return products
      .filter((product) => product.category === category)
      .map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageSrc={product.thumbnail}
          discount={Math.round(product.rating * 10)}
          productName={product.title}
          price={product.price}
          oldPrice={product.price + 90}
          rating={product.rating}
        />
      ))
      .slice(0, 4);
  };

  const CountdownItem = ({ value, label }) => (
    <div className="bg-white text-black flex flex-col items-center justify-center w-[42px] h-[42px] rounded-full">
      <p className="text-sm font-semibold">{value}</p>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );

  if (loading) {
    return <p>Chargement en cours...</p>;
  }
  
  if (error) {
    return <p>Erreur lors du chargement des produits. Veuillez réessayer plus tard.</p>;
  }
  return (
    <div className="mx-20 my-10 flex flex-col">
      <div className="flex w-full">
        <div className="flex flex-col justify-evenly w-[217px] h-[344px]">
          <button onClick={() => scrollToRef(menRef)}>Men's Fashion</button>
          <button onClick={() => scrollToRef(womenRef)}>Women's Fashion</button>
          <button onClick={() => scrollToRef(jewelryRef)}>Jewelry</button>
          <button onClick={() => scrollToRef(electronicsRef)}>
            Electronics
          </button>
          <button onClick={() => scrollToRef(smartphonesRef)}>
            Smartphones
          </button>
          <button onClick={() => scrollToRef(laptopsRef)}>Laptops</button>
          <button onClick={() => scrollToRef(perfumeRef)}>Perfume</button>
          <button onClick={() => scrollToRef(groceriesRef)}>Groceries</button>
          <button onClick={() => scrollToRef(accessoriesRef)}>
            Accessories
          </button>
        </div>
        <div className="bg-gray-300 h-80 w-0.5 border-l mx-4"></div>
        <Slider
          slides={products.map((product) => ({
            imageSrc: product.thumbnail,
            title: product.title,
            discountRate: product.rating,
            category: product.category,
          }))}
        />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-start my-2">
          <div className="rounded w-4 h-8 bg-red-500"></div>
          <p className="text-red-500 text-sm font-semibold ml-3">Aujourd'hui</p>
        </div>
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-xl mt-3">Ventes flash</h2>
          <div>
            <div className="flex justify-between font-semibold text-xs w-[300px] h-[25px]">
              <p>Days</p>
              <p>Hours</p>
              <p>Minutes</p>
              <p>Seconds</p>
            </div>
            <Countdown D={3} H={23} M={19} S={56} />
          </div>
          <div className="flex items-center">
            <i className="bi bi-arrow-left text-black bg-gray-200 rounded-full px-1 mr-2"></i>
            <i className="bi bi-arrow-right text-black bg-gray-200 rounded-full px-1"></i>
          </div>
        </div>
        <div className="grid grid-cols-4" ref={menRef}>
          {renderProductCards("men's clothing")}
        </div>
        <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={womenRef}>
          {renderProductCards("women's clothing")}
        </div>
        <div className="mt-5 flex justify-center">
          <button className="bg-red-500 text-white rounded py-2 px-6">
            <Link to="/products/all">Voir tous les produits</Link>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-start my-4">
        <div className="rounded w-4 h-8 bg-red-500"></div>
        <p className="text-red-500 text-sm font-semibold ml-3">Catégories</p>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Parcourir par catégorie</h1>
        <div className="flex items-center">
          <i className="bi bi-arrow-left text-black bg-gray-200 rounded-full px-1 mr-2"></i>
          <i className="bi bi-arrow-right text-black bg-gray-200 rounded-full px-1"></i>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <CategoryButton icon="bi-phone" text="Téléphones" />
        <CategoryButton icon="bi-pc-display-horizontal" text="Ordinateurs" />
        <CategoryButton icon="bi-smartwatch" text="Montres intelligentes" />
        <CategoryButton icon="bi-camera" text="Appareils photo" />
        <CategoryButton icon="bi-headphones" text="Écouteurs" />
        <CategoryButton icon="bi-controller" text="Jeux vidéo" />
      </div>

      <div className="flex items-center justify-start my-4">
        <div className="rounded w-4 h-8 bg-red-500"></div>
        <p className="text-red-500 text-sm font-semibold ml-3">Ce mois-ci</p>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Produits les plus vendus</h1>
        <button className="bg-red-500 text-white rounded py-2 px-6">
          <Link to="/products/all">Voir tout</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={jewelryRef}>
        {renderProductCards("jewelery")}
      </div>
      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={electronicsRef}>
        {renderProductCards("electronics")}
      </div>

      <div className="w-[1025px] h-[400px] px-10 py-10 bg-black text-white">
        <div className="grid grid-cols-2">
          <div className="flex flex-col w-[50%] h-[90%] justify-between items-start">
            <p className="text-green-500 text-sm font-semibold">Catégories</p>
            <h1 className="text-3xl font-semibold">
            Améliorez votre expérience musicale
            </h1>
            <div className="flex">
              <CountdownItem value={23} label="Hours" />
              <CountdownItem value={5} label="Days" />
              <CountdownItem value={59} label="Minutes" />
              <CountdownItem value={35} label="Seconds" />
            </div>
            <button className="bg-green-500 text-white rounded py-2 px-8">
            Acheter maintenant!
            </button>
          </div>
          <img src="/Icons/ffg.svg" alt="" />
        </div>
      </div>

      <div className="flex items-center justify-start my-4">
        <div className="rounded w-4 h-8 bg-red-500"></div>
        <p className="text-red-500 text-sm font-semibold ml-3">
        Récemment ajouté
        </p>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Produits populaires</h1>
        <button className="bg-red-500 text-white rounded py-2 px-6">
          <Link to="/products/all">Voir tout</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={smartphonesRef}>
        {renderProductCards("smartphones")}
      </div>
      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={laptopsRef}>
        {renderProductCards("laptops")}
      </div>

      <div className="flex items-center justify-start my-4">
        <div className="rounded w-4 h-8 bg-red-500"></div>
        <p className="text-red-500 text-sm font-semibold ml-3">
        Récemment ajouté
        </p>
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Produits populaires</h1>
        <button className="bg-red-500 text-white rounded py-2 px-6">
          <Link to="/products/all">Voir tout</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={perfumeRef}>
        {renderProductCards("perfume")}
        {renderProductCards("haircare")}
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Produits populaires</h1>
        <button className="bg-red-500 text-white rounded py-2 px-6">
          <Link to="/products/all">Voir tout</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={groceriesRef}>
        {renderProductCards("groceries")}
      </div>

      <div className="grid grid-cols-4 gap-3 mt-5 mb-5" ref={accessoriesRef}>
        {renderProductCards("accessories")}
      </div>

      <div className="mx-20 my-10 flex flex-col">
        {/* Product Grid Section */}
        <div className="grid grid-cols-2 w-[1170px] h-[600px]">
          <div className="w-[570px] h-[600px]">
            <ProductGrid
              category={products[18].category}
              title={products[18].title}
              imageSrc={products[18].thumbnail}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="w-[570px] h-[290px]">
              <ProductGrid
                category={products[3].category}
                title={products[3].title}
                imageSrc={products[3].thumbnail}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="w-[276px] h-[290px]">
                <ProductGrid
                  category={products[8].category}
                  title={products[8].title}
                  imageSrc={products[8].thumbnail}
                />
              </div>
              <div className="w-[276px] h-[290px]">
                <ProductGrid
                  category={products[34].category}
                  title={products[34].title}
                  imageSrc={products[34].thumbnail}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="flex justifier-entre-deux my-10">
  <Feature
    iconClass="bi-camion"
    title="LIVRAISON GRATUITE ET RAPIDE"
    description="Livraison gratuite pour toutes les commandes de plus de 140 $"
  />
  <div className="mx-4">
    <Feature
      iconClass="bi-casque"
      title="SERVICE CLIENT 24/7"
      description="Assistance client conviviale 24/7"
    />
  </div>
  <Feature
    iconClass="bi-bouclier-verifier"
    title="GARANTIE DE REMBOURSEMENT"
    description="Nous remboursons dans les 30 jours"
  />
</div>
      </div>
      <div className="flex flex-col items-center">
        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 bg-red-500 text-white rounded-full p-3"
          >
            ↑ retour vers le haut
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
