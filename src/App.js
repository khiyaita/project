import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet } from "react-router-dom";
import Header from "./component/header";
import Nav from "./component/nav";
import Footer from "./component/footer";
import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? "text-white bg-black" : "text-black bg-white"}`}>
      <header>
        <div className="flex items-center absolute top-2 bg-black text-white right-60">
          <label className="mr-2">Mode sombre</label>
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-sun'}`}></i>
          </button>
        </div>
        <Header />
        <Nav />
        <hr />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
