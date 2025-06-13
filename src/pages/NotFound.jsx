import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Search } from 'lucide-react';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | LibraryHub';
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
            <div className="flex justify-center space-x-2 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <BookOpen className="h-12 w-12 text-secondary-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              >
                <Search className="h-12 w-12 text-accent-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              The page you're looking for seems to have wandered off into the digital library. 
              Don't worry, even the best librarians sometimes misplace a book!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Possible reasons:</strong><br />
                • The page URL was typed incorrectly<br />
                • The page has been moved or deleted<br />
                • You don't have permission to access this page
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Link>
              
              <Link
                to="/books"
                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-medium"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Books
              </Link>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Or use the navigation menu above to find what you're looking for
              </p>
            </div>
          </motion.div>

          {/* Fun Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <blockquote className="text-gray-600 italic">
              "A library is not a luxury but one of the necessities of life."
              <footer className="text-sm text-gray-500 mt-2">— Henry Ward Beecher</footer>
            </blockquote>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 opacity-20"
        >
          <BookOpen className="h-16 w-16 text-primary-400" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 opacity-20"
        >
          <Search className="h-12 w-12 text-secondary-400" />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;