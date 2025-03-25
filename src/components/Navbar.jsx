import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-primary"
    >
      {/* Permanent mirror-like overlay effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
          mixBlendMode: 'overlay',
          filter: 'brightness(1.2) contrast(1.1)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <p className="text-white text-xl font-semibold cursor-pointer flex">
            Utkarsh <span className="sm:block hidden"> |Sde portfolio</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex space-x-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-gray-300"
              } hover:text-white text-lg font-medium transition duration-200`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`} className="relative group">
                {nav.title}
                <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setToggle(!toggle)}
        >
          <img src={toggle ? close : menu} alt="menu" className="w-8 h-8" />
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed top-0 right-0 w-3/4 h-full bg-black bg-opacity-90 p-6 transition-transform duration-300 ${
            toggle ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setToggle(false)}
          >
            <img src={close} alt="close" className="w-6 h-6" />
          </button>

          <ul className="mt-10 flex flex-col space-y-6">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`text-lg font-medium ${
                  active === nav.title ? "text-white" : "text-gray-300"
                } hover:text-white transition duration-200`}
                onClick={() => {
                  setToggle(false);
                  setActive(nav.title);
                }}
              >
                <a href={`#${nav.id}`} className="block">
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;