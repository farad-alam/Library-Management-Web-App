import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { Book, Eye, User, Tag, Package } from 'lucide-react';

const BookCard = ({ book, showActions = false, onUpdate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 overflow-hidden group"
    >
      {/* Book Cover */}
      <div className="relative overflow-hidden">
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quantity Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          book.quantity === 0 
            ? 'bg-red-500 text-white' 
            : book.quantity <= 2 
              ? 'bg-yellow-500 text-white' 
              : 'bg-green-500 text-white'
        }`}>
          {book.quantity === 0 ? 'Out of Stock' : `${book.quantity} available`}
        </div>
      </div>

      {/* Book Details */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
            {book.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{book.author}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-primary-500" />
            <span className="text-sm text-primary-600 font-medium">
              {book.category}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ReactStars
              count={5}
              value={book.rating}
              size={16}
              edit={false}
              activeColor="#F59E0B"
              color="#E5E7EB"
            />
            <span className="text-sm text-gray-600">({book.rating})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {book.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            to={`/book/${book._id}`}
            className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <Eye className="h-4 w-4" />
            <span>Details</span>
          </Link>

          {showActions && onUpdate && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onUpdate(book)}
              className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-sm font-medium"
            >
              Update
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;