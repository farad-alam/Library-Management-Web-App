import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Star,
  Clock,
  Shield,
} from "lucide-react";
import { useData } from "../contexts/DataContext";
import BookCard from "../components/UI/BookCard";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const { books, categories, isLoading } = useData();

  useEffect(() => {
    document.title = "LibraryHub - Your Digital Library";
  }, []);

  if (isLoading) {
    return <LoadingSpinner text="Loading library..." />;
  }

  const featuredBooks = books.slice(0, 6);
  const stats = [
    { icon: BookOpen, label: "Total Books", value: "10,000+" },
    { icon: Users, label: "Active Members", value: "5,000+" },
    { icon: Award, label: "Categories", value: "50+" },
    { icon: TrendingUp, label: "Books Borrowed", value: "25,000+" },
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Access your favorite books anytime, anywhere with our digital library platform.",
    },
    {
      icon: Star,
      title: "Curated Collection",
      description:
        "Discover hand-picked books from various genres, carefully selected for quality.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Your reading data is safe with our secure and reliable library management system.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner/Slider */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br  from-primary-50  to-secondary-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="hero-swiper"
            style={{
              "--swiper-navigation-color": "#3B82F6",
              "--swiper-pagination-color": "#3B82F6",
            }}
          >
            <SwiperSlide>
              <div className="flex flex-col lg:flex-row items-center min-h-[500px]">
                <div className="lg:w-1/2 text-center lg:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
                  >
                    Welcome to Your
                    <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      {" "}
                      Digital Library
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-gray-600 mb-8 leading-relaxed"
                  >
                    Discover thousands of books, manage your reading journey,
                    and connect with a community of book lovers.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Link
                      to="/books"
                      className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                    >
                      Explore Books
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-600 hover:text-white transition-colors font-semibold text-lg"
                    >
                      Join Now
                    </Link>
                  </motion.div>
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    src="https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Library Books"
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col lg:flex-row items-center min-h-[500px]">
                <div className="lg:w-1/2 text-center lg:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
                  >
                    Manage Your
                    <span className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      {" "}
                      Reading Journey
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-gray-600 mb-8 leading-relaxed"
                  >
                    Track your borrowed books, discover new favorites, and build
                    your personal reading library with ease.
                  </motion.p>
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    src="https://www.nea.org/sites/default/files/styles/1920wide/public/2023-08/2023-girl-reading-library-adobestock_213325924.jpg.webp"
                    alt="Reading Management"
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col lg:flex-row items-center min-h-[500px]">
                <div className="lg:w-1/2 text-center lg:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
                  >
                    Join Our
                    <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
                      {" "}
                      Book Community
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-gray-600 mb-8 leading-relaxed"
                  >
                    Connect with fellow readers, share recommendations, and be
                    part of a thriving literary community.
                  </motion.p>
                </div>
                <div className="lg:w-1/2 mt-10 lg:mt-0">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    src="https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Book Community"
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Library in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A quick glance at what makes our community of readers thrive
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Categories Section */}
      <section
        id="categories"
        className="py-20 bg-gradient-to-br  from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Book Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
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
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Books
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular and highly-rated books
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              to="/books"
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              View All Books
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose LibraryHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of digital library management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of readers who have already discovered their next
              favorite book
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/books"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg"
              >
                Browse Books
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
