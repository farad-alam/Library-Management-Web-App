import React from "react";
import { useData } from "../contexts/DataContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Categories() {
  const { categories, isLoading } = useData();
  if (isLoading) {
    return <LoadingSpinner text="Loading library..." />;
  }
  return (
    <>
      {/* Book Categories Section */}
      <section
        id="categories"
        className="py-20 pt-32 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Explore Book Categories
            </h2>
            <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
              Discover your next favorite book from our carefully curated
              categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Link
                  to={`/category/${category.name}`}
                  className="block bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm opacity-90">
                        {category.bookCount} books
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-base-content/80 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Categories;
