import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, RotateCcw, BookOpen, Clock } from "lucide-react";
import { useData } from "../contexts/DataContext";
// import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import singleBookApi from "../api/singleBookApi";

const BorrowedBooks = () => {
  const {
    borrowedBooks: userBorrowedBooks,
    returnBook,
    isLoading,
    setBorrowBook,
    books,
  } = useData();
  // const [userBorrowedBooks, setuserBorrowedBooks] = useState([])
  const [borrowedBookWithBookDetails, setBorrowedBookWithBookDetails] =
    useState([]);
  const { user } = useAuth();
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    document.title = "Borrowed Books - LibraryHub";

    const fetchBorrowedBooks = async () => {
      const bookDetails = await Promise.all(
        userBorrowedBooks.map(async (book, index) => {
          const bookdata = await singleBookApi(book.bookId);
          return {
            ...book,
            book: bookdata,
          };
        })
      );

      setBorrowedBookWithBookDetails(bookDetails);
      setIsDataLoading(false);
    };

    if (user) {
      fetchBorrowedBooks();
    }
  }, [user, userBorrowedBooks]);

  useEffect(() => {
    if (user) {
      setBorrowBook(); // This sets userBorrowedBooks
    }
  }, [user]);

  // const userBorrowedBooks = borrowedBooks.filter(bb => bb.userId === user?.id);

  const handleReturnBook = (borrowId, borrowBookId, bookTitle) => {
    Swal.fire({
      title: "Return Book?",
      text: `Are you sure you want to return "${bookTitle}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        returnBook(borrowId, borrowBookId);
        Swal.fire({
          icon: "success",
          title: "Book Returned!",
          text: `"${bookTitle}" has been successfully returned to the library.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isOverdue = (returnDate) => {
    return new Date(returnDate) < new Date();
  };

  const getDaysUntilReturn = (returnDate) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading || isDataLoading) {
    return <LoadingSpinner text="Loading your borrowed books..." />;
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
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <BookOpen className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Borrowed Books
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of your borrowed books and return dates
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Borrowed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userBorrowedBooks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    userBorrowedBooks.filter((bb) => !isOverdue(bb.returnDate))
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    userBorrowedBooks.filter((bb) => isOverdue(bb.returnDate))
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Borrowed Books List */}
        {userBorrowedBooks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Borrowed Books
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't borrowed any books yet. Start exploring our
                collection!
              </p>
              <a
                href="/books"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Browse Books
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* change orginal */}
            {borrowedBookWithBookDetails.map((borrowedBook, index) => {
              const daysUntilReturn = getDaysUntilReturn(
                borrowedBook.returnDate
              );
              const overdue = isOverdue(borrowedBook.returnDate);
              console.log(borrowedBook);

              return (
                <motion.div
                  key={borrowedBook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Book Cover */}
                  <div className="relative">
                    <img
                      src={borrowedBook.book.image}
                      alt={borrowedBook.book.name}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                        overdue
                          ? "bg-red-500 text-white"
                          : daysUntilReturn <= 3
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {overdue
                        ? `${Math.abs(daysUntilReturn)} days overdue`
                        : daysUntilReturn === 0
                        ? "Due today"
                        : `${daysUntilReturn} days left`}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {borrowedBook.book.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      by {borrowedBook.book.author}
                    </p>

                    {/* Dates */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Borrowed: {formatDate(borrowedBook.borrowDate)}
                        </span>
                      </div>
                      <div
                        className={`flex items-center text-sm ${
                          overdue ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          Return by: {formatDate(borrowedBook.returnDate)}
                        </span>
                      </div>
                    </div>

                    {/*Category Badge */}
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {borrowedBook.book.category}
                      </span>
                    </div>

                    {/* Return Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleReturnBook(
                          borrowedBook._id,
                          borrowedBook.book._id,
                          borrowedBook.book.name
                        )
                      }
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors font-medium"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Return Book</span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Borrowing Limit Notice */}
        {userBorrowedBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Borrowing Information
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    You have borrowed {userBorrowedBooks.length} out of 3
                    maximum books allowed.
                    {userBorrowedBooks.length >= 3 && (
                      <span className="font-medium">
                        {" "}
                        You've reached your borrowing limit.
                      </span>
                    )}
                  </p>
                  <p className="mt-1">
                    Remember to return books on time to avoid late fees and
                    maintain your borrowing privileges.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
