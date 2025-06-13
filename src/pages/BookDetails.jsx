import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, Package, Star, ArrowLeft, BookOpen } from 'lucide-react';
import ReactStars from 'react-rating-stars-component';
import { useForm } from 'react-hook-form';
import { useData } from '../contexts/DataContext';
// import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, borrowedBooks, borrowBook } = useData();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const book = books.find(b => b.id === parseInt(id || '0'));
  const userBorrowedBooks = borrowedBooks.filter(bb => bb.userId === user?.id);
  const hasAlreadyBorrowed = userBorrowedBooks.some(bb => bb.bookId === book?.id);
  const hasReachedLimit = userBorrowedBooks.length >= 3;

  useEffect(() => {
    if (book) {
      document.title = `${book.name} - LibraryHub`;
    } else {
      document.title = 'Book Not Found - LibraryHub';
    }
  }, [book]);

  if (!book) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/books')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    if (!user) return;

    if (hasAlreadyBorrowed) {
      Swal.fire({
        icon: 'warning',
        title: 'Already Borrowed',
        text: 'You have already borrowed this book.',
      });
      return;
    }

    if (hasReachedLimit) {
      Swal.fire({
        icon: 'warning',
        title: 'Borrowing Limit Reached',
        text: 'You can only borrow up to 3 books at a time. Please return a book first.',
      });
      return;
    }

    if (book.quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Book Unavailable',
        text: 'This book is currently out of stock.',
      });
      return;
    }

    borrowBook(book.id, user.id, data.returnDate);
    setIsModalOpen(false);
    reset();

    Swal.fire({
      icon: 'success',
      title: 'Book Borrowed Successfully!',
      text: `You have successfully borrowed "${book.name}". Please return it by ${new Date(data.returnDate).toLocaleDateString()}.`,
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const getMinReturnDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum 1 day from today
    return today.toISOString().split('T')[0];
  };

  const getMaxReturnDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30); // Maximum 30 days from today
    return today.toISOString().split('T')[0];
  };

  const canBorrow = book.quantity > 0 && !hasAlreadyBorrowed && !hasReachedLimit;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <img
                src={book.image}
                alt={book.name}
                className="w-full max-w-md h-auto rounded-2xl shadow-2xl"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                book.quantity === 0 
                  ? 'bg-red-500 text-white' 
                  : book.quantity <= 2 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-green-500 text-white'
              }`}>
                {book.quantity === 0 ? 'Out of Stock' : `${book.quantity} available`}
              </div>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {book.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-lg text-gray-700">by {book.author}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-primary-500" />
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {book.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{book.quantity} copies available</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-8">
                <Star className="h-5 w-5 text-yellow-400" />
                <ReactStars
                  count={5}
                  value={book.rating}
                  size={24}
                  edit={false}
                  activeColor="#F59E0B"
                  color="#E5E7EB"
                />
                <span className="text-lg font-medium text-gray-700">({book.rating})</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Borrow Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Borrow This Book</h3>
              
              {hasAlreadyBorrowed ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    You have already borrowed this book. Check your borrowed books to see the return date.
                  </p>
                </div>
              ) : hasReachedLimit ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">
                    You have reached the maximum borrowing limit of 3 books. Please return a book first.
                  </p>
                </div>
              ) : book.quantity <= 0 ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">
                    This book is currently out of stock. Please check back later.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Borrow this book for up to 30 days. You can borrow up to 3 books at a time.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Borrow Book</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Borrowing Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Maximum borrowing period: 30 days</li>
                <li>• Maximum books per user: 3 books</li>
                <li>• Late returns may result in borrowing restrictions</li>
                <li>• Books must be returned in good condition</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Borrow Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrow Book</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('returnDate', {
                        required: 'Return date is required',
                      })}
                      type="date"
                      min={getMinReturnDate()}
                      max={getMaxReturnDate()}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.returnDate ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                  </div>
                  {errors.returnDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.returnDate.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    You can borrow for 1-30 days from today
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Confirm Borrow
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookDetails;