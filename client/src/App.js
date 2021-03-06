import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  /**
   * Returns a function that lets you navigate/redirect.
   */
  const navigate = useNavigate();
  /**
   * Returns an object which you can use to get the current path.
   */
  const location = useLocation();

  /**
   * useEffect hook is called to detect any changes within the location object's pathname key.
   * If the current path is "/" AKA if the end-user is at the home page, they get redirected to /movies path.
   */
  useEffect(() => {
    if(location.pathname === "/") {
      navigate("/movies");
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <nav className="text-white w-screen bg-slate-900 fixed top-0 h-12 z-10">
        <ul className="w-screen h-12 flex flex-row justify-end items-center tracking-wide">
          <NavLink 
            className={({ isActive }) => // isActive is used to check if the NavLink points to the current path.
              isActive ? "p-1 mx-5 flex flex-row items-center border-b-2 border-white transition-all" : "p-1 mx-5 flex flex-row items-center hover:font-bold" 
            }
            to="/movies" // to is used to define the path.
          >
            Movies
          </NavLink>
          <NavLink 
            className={({ isActive }) => // isActive is used to check if the NavLink points to the current path.
              isActive ? "p-1 mx-5 flex flex-row items-center border-b-2 border-white transition-all" : "p-1 mx-5 flex flex-row items-center hover:font-bold" 
            }
            to="/recommend" // to is used to define the path.
          >
            Recommend a Movie
          </NavLink>
          <NavLink 
            className={({ isActive }) => // isActive is used to check if the NavLink points to the current path.
              isActive ? "p-1 mx-5 flex flex-row items-center border-b-2 border-white transition-all" : "p-1 mx-5 flex flex-row items-center hover:font-bold" 
            }
            to="/admin" // to is used to define the path.
          >
            Admin
          </NavLink>
        </ul>
      </nav>
      <Outlet /> 
      <footer className="footer fixed bottom-0 items-center p-4 bg-neutral text-neutral-content z-20">
        <div className="items-center grid-flow-col">
          <p>Developed by Yigit Atak</p>
        </div> 
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="www.github.com" className="text-white text-3xl">
            <FontAwesomeIcon icon={faGithub} />
          </a> 
          <a href="www.github.com" className="text-white text-3xl">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
