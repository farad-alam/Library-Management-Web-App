import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useData } from "../contexts/DataContext";
import BookCard from "../components/UI/BookCard";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { books, categories, isLoading } = useData();

  const category = categories.find((c) => c.name === categoryName);
  const categoryBooks = books.filter((book) => book.category === categoryName);

  useEffect(() => {
    document.title = `${categoryName} Books - LibraryHub`;
  }, [categoryName]);

  if (isLoading) {
    return <LoadingSpinner text="Loading category books..." />;
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </motion.button>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative mb-8">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-xl opacity-90">{category.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Books Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-primary-600" />
                <span className="text-lg font-medium text-gray-900">
                  {categoryBooks.length} books in {category.name}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {categoryBooks.filter((book) => book.quantity > 0).length}{" "}
                available
              </div>
            </div>
          </div>
        </motion.div>

        {/* Books Grid */}
        {categoryBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Books Found
              </h3>
              <p className="text-gray-600 mb-6">
                There are no books in the {category.name} category yet.
              </p>
              <button
                onClick={() => navigate("/books")}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Browse All Books
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {categoryBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Category Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            About {category.name} Books
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            {category.description} Our {category.name.toLowerCase()} collection
            features carefully selected titles that offer both entertainment and
            educational value. Whether you're looking for your next great read
            or researching a specific topic, you'll find quality books that meet
            your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {categoryBooks.length}
              </div>
              <div className="text-sm text-gray-600">Total Books</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {categoryBooks.filter((book) => book.quantity > 0).length}
              </div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {(
                  categoryBooks.reduce((sum, book) => sum + book.rating, 0) /
                    categoryBooks.length || 0
                ).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryBooks;
