import React, { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white border-b border-zinc-300 font-inter pb-6
    ">
      <nav className="flex justify-between items-center p-6 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-black">
          <a href="#home" className="no-underline">
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="absolute top-0 left-20 flex space-x-6 p-4">
          <a
            href="#home"
            className="text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors"
          >
            About
          </a>
          <a
            href="#map"
            className="text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors"
          >
            Map
          </a>
          <a
            href="#resources"
            className="text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors"
          >
            Resources
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <button className="md:hidden text-black" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-zinc-300 py-4 space-y-4">
          <a
            href="#home"
            className="block text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors text-center"
          >
            Home
          </a>
          <a
            href="#about"
            className="block text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors text-center"
          >
            About
          </a>
          <a
            href="#map"
            className="block text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors text-center"
          >
            Map
          </a>
          <a
            href="#resources"
            className="block text-black hover:bg-gray-200 hover:text-black py-2 px-4 rounded-lg transition-colors text-center"
          >
            Resources
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
