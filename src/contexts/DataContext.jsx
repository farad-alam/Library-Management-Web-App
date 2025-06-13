import React, { createContext, useContext, useState, useEffect } from 'react';
import singleBookApi from '../api/singleBookApi';

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Load books
      const booksResponse = await fetch('/books.json');
      const booksData = await booksResponse.json();
      setBooks(booksData);

      // Load categories
      const categoriesResponse = await fetch('/categories.json');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      // Load borrowed books from localStorage
      const storedBorrowedBooks = localStorage.getItem('borrowedBooks');
      if (storedBorrowedBooks) {
        setBorrowedBooks(JSON.parse(storedBorrowedBooks));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const singleBook = (book_id)=>{
    setIsLoading(true)
    return singleBookApi(book_id).finally(()=>{
      setIsLoading(false)
    })
  }

  const addBook = (newBook) => {
    const book = {
      ...newBook,
      id: Date.now(),
    };
    setBooks(prev => [...prev, book]);
  };

  const updateBook = (id, updates) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updates } : book
    ));
  };

  const borrowBook = (bookId, userId, returnDate) => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.quantity <= 0) return;

    // Check if user already borrowed this book
    const alreadyBorrowed = borrowedBooks.some(
      bb => bb.bookId === bookId && bb.userId === userId
    );
    if (alreadyBorrowed) return;

    // Check if user has reached the limit of 3 books
    const userBorrowedCount = borrowedBooks.filter(bb => bb.userId === userId).length;
    if (userBorrowedCount >= 3) return;

    const borrowedBook = {
      id: `${bookId}-${userId}-${Date.now()}`,
      userId,
      bookId,
      borrowDate: new Date().toISOString().split('T')[0],
      returnDate,
      book,
    };

    const updatedBorrowedBooks = [...borrowedBooks, borrowedBook];
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));

    // Decrease book quantity
    updateBook(bookId, { quantity: book.quantity - 1 });
  };

  const returnBook = (borrowId) => {
    const borrowedBook = borrowedBooks.find(bb => bb.id === borrowId);
    if (!borrowedBook) return;

    // Remove from borrowed books
    const updatedBorrowedBooks = borrowedBooks.filter(bb => bb.id !== borrowId);
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));

    // Increase book quantity
    const book = books.find(b => b.id === borrowedBook.bookId);
    if (book) {
      updateBook(borrowedBook.bookId, { quantity: book.quantity + 1 });
    }
  };

  const value = {
    books,
    categories,
    borrowedBooks,
    addBook,
    updateBook,
    borrowBook,
    returnBook,
    isLoading,
    singleBook,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};