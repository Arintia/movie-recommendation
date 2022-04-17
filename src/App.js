import React from 'react';
import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <nav className="text-white w-screen bg-slate-900 fixed top-0 h-12 z-10">
        <ul className="w-screen h-12 flex flex-row justify-end items-center tracking-wide">
          <NavLink 
            className={({ isActive }) =>
              isActive ? "p-1 mx-5 flex flex-row items-center border-b-2 border-white transition-all" : "p-1 mx-5 flex flex-row items-center hover:font-bold" 
            }
            to="/movies"
          >
            Movies
          </NavLink>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "p-1 mx-5 flex flex-row items-center border-b-2 border-white transition-all" : "p-1 mx-5 flex flex-row items-center hover:font-bold" 
            }
            to="/recommend"
          >
            Recommend a Movie
          </NavLink>
          <NavLink 
            className={({ isActive }) =>
              isActive ? "p-1 mx-5 flex flex-row items-center border-b-2 border-white transition-all" : "p-1 mx-5 flex flex-row items-center hover:font-bold" 
            }
            to="/admin"
          >
            Admin
          </NavLink>
        </ul>
      </nav>
      <Outlet />  
    </>
  );
}

export default App;
