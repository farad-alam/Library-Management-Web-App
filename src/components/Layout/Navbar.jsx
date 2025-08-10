import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../UI/ThemeToggle";
// import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", public: true },
    { path: "/books", label: "All Books", public: true },
    { path: "/categories", label: "Categories", public: true },
    { path: "/add-book", label: "Add Book", public: false },
    { path: "/borrowed-books", label: "Borrowed Books", public: false },
    { path: "/profile", label: "Profile", public: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/90 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              LibraryHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(
              (link) =>
                (link.public || user) && (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? "text-primary-600"
                        : scrolled
                        ? "text-gray-700 hover:text-primary-600"
                        : "text-gray-800 hover:text-primary-600"
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      />
                    )}
                  </Link>
                )
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="group relative">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-8 w-8 rounded-full ring-2 ring-primary-200 group-hover:ring-primary-300 transition-all cursor-pointer"
                  />
                  <div className="absolute right-0 top-10 bg-base-100 rounded-lg shadow-lg border border-gray-200 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <p className="text-sm font-medium text-base-content whitespace-nowrap">
                      {user.name}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-base-100/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(
                (link) =>
                  (link.public || user) && (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                        isActive(link.path)
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-700 hover:text-primary-600 hover:bg-base-200"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
              )}

              {user ? (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium text-base-content">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
