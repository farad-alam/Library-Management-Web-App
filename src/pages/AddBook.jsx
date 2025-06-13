import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { BookOpen, Upload, Star } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Swal from 'sweetalert2';

const AddBook = () => {
  const { addBook, books } = useData();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    document.title = 'Add Book - LibraryHub';
  }, []);

  const categories = [...new Set(books.map(book => book.category))];

  const onSubmit = async (data) => {
    try {
      addBook(data);
      
      Swal.fire({
        icon: 'success',
        title: 'Book Added Successfully!',
        text: 'The new book has been added to the library.',
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add the book. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <BookOpen className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Add New Book
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expand our library collection by adding a new book with all the necessary details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Book Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Book Name *
                    </label>
                    <input
                      {...register('name', {
                        required: 'Book name is required',
                        minLength: {
                          value: 2,
                          message: 'Book name must be at least 2 characters',
                        },
                      })}
                      type="text"
                      className={`w-full px-4 py-3 border ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="Enter book title"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Author Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Name *
                    </label>
                    <input
                      {...register('author', {
                        required: 'Author name is required',
                        minLength: {
                          value: 2,
                          message: 'Author name must be at least 2 characters',
                        },
                      })}
                      type="text"
                      className={`w-full px-4 py-3 border ${
                        errors.author ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="Enter author name"
                    />
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register('category', {
                        required: 'Please select a category',
                      })}
                      className={`w-full px-4 py-3 border ${
                        errors.category ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      <option value="History">History</option>
                      <option value="Biography">Biography</option>
                      <option value="Technology">Technology</option>
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      {...register('quantity', {
                        required: 'Quantity is required',
                        min: {
                          value: 1,
                          message: 'Quantity must be at least 1',
                        },
                        max: {
                          value: 100,
                          message: 'Quantity cannot exceed 100',
                        },
                      })}
                      type="number"
                      min="1"
                      max="100"
                      className={`w-full px-4 py-3 border ${
                        errors.quantity ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-yellow-400" />
                      <input
                        {...register('rating', {
                          required: 'Rating is required',
                          min: {
                            value: 0,
                            message: 'Rating must be at least 0',
                          },
                          max: {
                            value: 5,
                            message: 'Rating cannot exceed 5',
                          },
                        })}
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.rating ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                        placeholder="4.5"
                      />
                    </div>
                    {errors.rating && (
                      <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image URL *
                    </label>
                    <div className="relative">
                      <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        {...register('image', {
                          required: 'Image URL is required',
                          pattern: {
                            value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                            message: 'Please enter a valid image URL',
                          },
                        })}
                        type="url"
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.image ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                        placeholder="https://example.com/book-cover.jpg"
                      />
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <textarea
                      {...register('description', {
                        required: 'Description is required',
                        minLength: {
                          value: 20,
                          message: 'Description must be at least 20 characters',
                        },
                        maxLength: {
                          value: 500,
                          message: 'Description cannot exceed 500 characters',
                        },
                      })}
                      rows={4}
                      className={`w-full px-4 py-3 border ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none`}
                      placeholder="Enter a brief description of the book..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <BookOpen className="h-5 w-5 mr-2" />
                        Add Book to Library
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Guidelines */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📚 Adding Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Ensure all required fields are filled accurately
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Use high-quality cover images for better presentation
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Write clear and engaging descriptions
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Double-check author names and book titles
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Set realistic quantity based on availability
                </li>
              </ul>
            </div>

            {/* Library Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Library Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Books</span>
                  <span className="font-semibold text-primary-600">{books.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Categories</span>
                  <span className="font-semibold text-secondary-600">{categories.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Books</span>
                  <span className="font-semibold text-green-600">
                    {books.filter(book => book.quantity > 0).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Categories */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🏷️ Available Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;