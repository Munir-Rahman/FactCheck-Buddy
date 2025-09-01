import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-gray-200 mt-16 shadow-lg">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        
        {/* Quick Links */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-green-400">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Claim", path: "/claim" },
              { name: "Lessons", path: "/lessons" },
              { name: "Exam", path: "/exam" },
              { name: "News", path: "/news" },
              { name: "Game", path: "/game" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className="hover:text-green-300 transition-colors duration-300 font-medium"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-green-400">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
          </div>
        </motion.div>

        {/* Developer Info */}
        <motion.div
          className="flex flex-col items-center md:items-end justify-center text-sm space-y-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="font-semibold mb-3 text-green-400">Developed By</h3>
          <p>Eng. Munir Rahman Rahmani</p>
          <p>All Rights Reserved &copy; 2025</p>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-blue-600 mt-6 py-3 text-center text-gray-300 text-sm">
        This project is part of UNESCO Youth Hackathon for Media Literacy
      </div>
    </footer>
  );
}
