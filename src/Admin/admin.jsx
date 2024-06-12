import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useState } from "react";

const AdminPanel = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
    className={`min-h-screen ${isDarkMode ? "text-white bg-black" : "text-black bg-white"}`}
    >
      <div className="flex items-center absolute top-2 bg-black text-white right-60">
          <label className="mr-2">Mode sombre</label>
          <button onClick={()=>setIsDarkMode(!isDarkMode)}>
          <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-sun'}`}></i>
          </button>
          
         
        </div>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminPanel;
