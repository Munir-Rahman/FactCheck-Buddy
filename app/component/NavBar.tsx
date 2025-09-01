import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { motion } from 'framer-motion';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const navigate = useNavigate(); // ✅ For programmatic navigation

  const languages = ["English", "Pashto", "Persian", "Arabic", "Spanish", "French"];
  const base = 'transition-colors duration-300 hover:text-green-400';
  const active = 'text-blue-400 font-semibold';

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    setLangOpen(false);
  }

  const handleNavClick = (path: string) => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      setLoading(false); // Hide spinner after delay (simulate page load)
      navigate(path);
      setMenuOpen(false); // close mobile menu
    }, 600); // 0.6s delay for loading effect
  }

  return (
    <nav className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-gray-200 sticky top-0 z-50 shadow-lg">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="loader border-8 border-t-8 border-blue-500 rounded-full w-20 h-20 animate-spin"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to='/' className="flex items-center gap-2 text-2xl font-bold text-green-400">
          <img src="./logo.png" alt="FactCheck-Buddy Logo" className="h-11 w-11 object-contain"/>
          <span>FactCheck-Buddy</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {["/", "/claim", "/lessons", "/exam", "/news", "/game","/dashboard", "/about", "/contact"].map((path, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
            >
              <button
                onClick={() => handleNavClick(path)}
                className={base}
              >
                {["Home", "Claim", "Lessons", "Exam", "News", "Game", "Dashboard", "About", "Contact"][idx]}
              </button>
            </motion.div>
          ))}

          {/* Language Dropdown */}
          <div className="relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button className="bg-blue-700 px-3 py-1 rounded font-medium hover:bg-blue-600 transition">
              {selectedLang} ▼
            </button>
            {langOpen && (
              <div className="absolute mt-1 bg-gradient-to-b from-blue-800 to-blue-700 rounded shadow-lg w-32 text-left z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-600 transition text-gray-200"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-green-400 text-2xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-gradient-to-b from-blue-900 to-blue-800 border-t border-blue-700 py-4 px-6 flex flex-col gap-4 text-center"
        >
          {["/", "/claim", "/lessons", "/exam", "/news", "/game","/dashboard", "/about", "/contact"].map((path, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(path)}
              className={base}
            >
              {["Home", "Claim", "Lessons", "Exam", "News", "Game","Dashboard", "About", "Contact"][idx]}
            </button>
          ))}
        </motion.div>
      )}

      {/* Loader Styles */}
      <style>
        {`
          .loader {
            border-top-color: #10B981;
            border-right-color: #3B82F6;
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar;
