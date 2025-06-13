import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import BookCard from '../components/UI/BookCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import allBooksApi from '../api/allBooksApi';

const AllBooks = () => {
  const {updateBook } = useData();

  const [isLoading, setisLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    document.title = 'All Books - LibraryHub';
  }, []);

  useEffect(()=>{
    setisLoading(true)
    const unsubscribe = allBooksApi().then( (data) => {
      setBooks(data)
      setisLoading(false);
    }
    ).catch(err =>{
      setisLoading(false);
      console.error("can not load books", err)
    })
    
  },[])

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || book.category === selectedCategory;
    const matchesAvailability = !showAvailableOnly || book.quantity > 0;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const categories = [...new Set(books.map(book => book.category))];

  const handleUpdateBook = (book) => {
    setSelectedBook(book);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;

    const formData = new FormData(e.target);
    const updates = {
      name: formData.get('name'),
      author: formData.get('author'),
      category: formData.get('category'),
      quantity: parseInt(formData.get('quantity')),
      rating: parseFloat(formData.get('rating')),
      description: formData.get('description'),
      image: formData.get('image'),
    };

    updateBook(selectedBook.id, updates);
    setIsUpdateModalOpen(false);
    setSelectedBook(null);

    Swal.fire({
      icon: 'success',
      title: 'Book Updated!',
      text: 'The book has been successfully updated.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading books..." />;
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Book Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive library with over {books.length} carefully curated books
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Available Books Toggle */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Available Only</span>
              </label>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Add Book Button */}
              <Link
                to="/add-book"
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </motion.div>

        {/* Books Display */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  showActions={true}
                  onUpdate={handleUpdateBook}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={book.image}
                              alt={book.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {book.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            book.quantity === 0 
                              ? 'bg-red-100 text-red-800' 
                              : book.quantity <= 2 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {book.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ⭐ {book.rating}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link
                            to={`/book/${book.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleUpdateBook(book)}
                            className="text-secondary-600 hover:text-secondary-900"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg">
              No books found matching your criteria.
            </div>
            <Link
              to="/add-book"
              className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Book</span>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {isUpdateModalOpen && selectedBook && (
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
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Book</h2>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Book Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={selectedBook.name}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        defaultValue={selectedBook.author}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        defaultValue={selectedBook.category}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={selectedBook.quantity}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <input
                        type="number"
                        name="rating"
                        defaultValue={selectedBook.rating}
                        min="0"
                        max="5"
                        step="0.1"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Picture URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        defaultValue={selectedBook.image}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={selectedBook.description}
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsUpdateModalOpen(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Update Book
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllBooks;