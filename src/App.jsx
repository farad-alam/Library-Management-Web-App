import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from "./contexts/DataContext";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import BorrowedBooks from "./pages/BorrowedBooks";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryBooks from "./pages/CategoryBooks";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import FirebaseAuthProvider from "./contexts/FirebaseAuthProvider";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";

function App() {
  return (
    <Router>
      <FirebaseAuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/category/:categoryName"
                  element={<CategoryBooks />}
                />

                <Route path="/books" element={<AllBooks />} />
                <Route path="/categories" element={<Categories/>} />

                <Route
                  path="/add-book"
                  element={
                    <ProtectedRoute>
                      <AddBook />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/borrowed-books"
                  element={
                    <ProtectedRoute>
                      <BorrowedBooks />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/book/:id"
                  element={
                    <ProtectedRoute>
                      <BookDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </DataProvider>
      </FirebaseAuthProvider>
    </Router>
  );
}

export default App;
