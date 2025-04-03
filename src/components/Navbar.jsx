"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { navLinks } from "../constants"
import { logo, menu, close } from "../assets"

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary bg-opacity-90 backdrop-blur-md shadow-lg py-2"
          : "bg-primary bg-opacity-70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <img
            src={logo || "/placeholder.svg"}
            alt="logo"
            className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110"
          />
          <p className="text-white text-xl font-semibold cursor-pointer flex">
            Utkarsh{" "}
            <span className="sm:block hidden">
              {" "}
              | <span className="text-[#915EFF]">SDE Portfolio</span>
            </span>
          </p>
        </Link>

        <ul className="hidden sm:flex space-x-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-gray-300"
              } hover:text-white text-lg font-medium transition duration-200`}
              onClick={() => setActive(nav.title)}
            >
              <a
                href={`#${nav.id}`}
                className="relative group py-2 px-1 inline-block"
                aria-current={active === nav.title ? "page" : undefined}
              >
                {nav.title}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#915EFF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <button
          className="sm:hidden text-white focus:outline-none z-20 relative"
          onClick={() => setToggle(!toggle)}
          aria-expanded={toggle}
          aria-label="Toggle navigation menu"
        >
          <img src={toggle ? close : menu} alt="menu" className="w-8 h-8 relative z-20" />
          {/* Futuristic glow effect on button */}
          <span className="absolute inset-0 rounded-full bg-[#915EFF] opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
        </button>

        {/* Futuristic Mobile Menu - Made background fully opaque */}
        <div
          className={`fixed top-0 right-0 w-3/4 h-full bg-[#0a0a1a] p-6 transition-all duration-500 ease-in-out ${
            toggle ? "translate-x-0" : "translate-x-full"
          } sm:hidden z-10`}
          aria-hidden={!toggle}
        >
          {/* Decorative futuristic elements */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#915EFF]"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#915EFF] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#915EFF] to-transparent"></div>

          {/* Diagonal decorative line */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-1 h-[200%] bg-[#915EFF] opacity-20 transform rotate-45 translate-x-20"></div>
            <div className="absolute top-0 left-0 w-1 h-[200%] bg-[#915EFF] opacity-10 transform rotate-45 translate-x-40"></div>
          </div>

          {/* Removed the duplicate close button here */}

          <div className="mt-16 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-wider">
              NAVI<span className="text-[#915EFF]">GATE</span>
            </h2>

            <ul className="flex flex-col space-y-4">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`text-lg font-medium ${
                    active === nav.title ? "text-[#915EFF]" : "text-gray-300"
                  } hover:text-white transition-all duration-200`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setToggle(false)
                    setActive(nav.title)
                  }}
                >
                  <a
                    href={`#${nav.id}`}
                    className="block py-3 pl-4 pr-2 border-l-2 border-[#915EFF] bg-[#15152b] hover:bg-[#1e1e3f] transition-all duration-300 relative group overflow-hidden"
                    aria-current={active === nav.title ? "page" : undefined}
                  >
                    {/* Futuristic hover effect */}
                    <span className="absolute inset-0 w-full h-full bg-[#915EFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>

                    {/* Number indicator for futuristic feel */}
                    <span className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 text-xs text-[#915EFF] opacity-70">
                      0{index + 1}
                    </span>

                    <span className="relative z-10 flex justify-between items-center">
                      {nav.title}
                      <span className="text-[#915EFF] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        →
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Removed the copyright mark section */}
        </div>

        {/* Overlay for mobile menu - Made fully opaque */}
        {toggle && (
          <div
            className="fixed inset-0 bg-black bg-opacity-100 sm:hidden z-0"
            onClick={() => setToggle(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar

