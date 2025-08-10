# Library Management System

A modern, responsive library management web application built with React, allowing users to browse, borrow, and manage books with a clean and intuitive interface.

### [Live Link](https://libraryhub-lms.vercel.app/)

## 🚀 Features

### Core Functionality
- **User Authentication**: Login/Register with email and Google integration
- **Book Management**: Browse, search, and manage books with comprehensive information
- **Borrowing System**: Borrow books with return date tracking
- **Dynamic Content**: Real-time updates for book quantities and availability
- **Responsive Design**: Optimized for all device sizes

### Key Pages
- **Home**: Interactive banner, book categories, and featured sections
- **All Books**: Complete book catalog with filtering and view options
- **Add Book**: Form to add new books to the library
- **Borrowed Books**: Personal dashboard for managing borrowed books
- **Book Details**: Comprehensive information with borrowing functionality

### Advanced Features
- **Multiple View Modes**: Card and Table view for book listings
- **Smart Filtering**: Show available books only
- **Borrowing Limits**: Maximum 3 books per user with notifications
- **Real-time Updates**: Book quantities update automatically
- **Animated UI**: Smooth transitions with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **React** - Component-based UI library
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library

### UI Components & Libraries
- **Framer Motion** - Animation library
- **SweetAlert** - Beautiful alert dialogs
- **React Rating Stars Component** - Interactive rating system
- **Swiper JS** - Touch slider component
- **React Hook Form** - Form handling and validation

### Data Management
- **JSON Storage** - Local data storage in public folder
- **Fetch API** - Data retrieval and management

## 📁 Project Structure

```
library-management-system/
├── public/
│   ├── data/
│   │   ├── books.json
│   │   ├── categories.json
│   │   └── users.json
│   └── images/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookTable.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AllBooks.jsx
│   │   ├── AddBook.jsx
│   │   ├── BorrowedBooks.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useBooks.js
│   ├── utils/
│   │   └── helpers.js
│   └── App.jsx
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Data Structure

#### Books Data (`public/data/books.json`)
```json
{
  "books": [
    {
      "id": 1,
      "name": "Book Title",
      "author": "Author Name",
      "image": "image_url",
      "category": "Fiction",
      "quantity": 5,
      "rating": 4.5,
      "description": "Book description",
      "borrowedBy": []
    }
  ]
}
```

## 🎯 Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Browse Books**: Explore the book catalog
3. **Borrow Books**: Select books and set return dates
4. **Manage Borrowed Books**: Track your borrowed books
5. **Return Books**: Return books when finished

### For Administrators
1. **Add Books**: Use the Add Book form
2. **Update Books**: Modify book information
3. **Monitor Inventory**: Track book quantities

## 🔒 Authentication

The application includes a comprehensive authentication system:

- **Email/Password Registration**: Standard account creation
- **Google Login**: OAuth integration for easy access
- **Protected Routes**: Private pages require authentication
- **User Profile**: Display user information and photo

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Tablet optimization**
- **Desktop enhancement**
- **Touch-friendly interfaces**

## 🎨 UI/UX Features

- **Modern Design**: Clean and intuitive interface
- **Smooth Animations**: Framer Motion transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Consistent Styling**: Unified design language
- **Accessibility**: Screen reader friendly

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/farad-alam)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- DaisyUI for beautiful components
- Framer Motion for smooth animations
- All contributors and users of this project

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/yourusername/library-management-system/issues) page
2. Create a new issue if needed
3. Contact the maintainer

---

⭐ **Star this repository if you find it helpful!**