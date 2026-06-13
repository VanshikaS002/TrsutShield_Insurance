import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from './firebase';
import { dummyPolicies } from './data/dummyPolicies';
import { handleFirestoreError, OperationType } from './lib/firestoreUtils';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import Categories from './pages/Categories';
import PolicyDetail from './pages/PolicyDetail';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NewsDetail from './pages/NewsDetail';
import Compare from './pages/Compare';
import { CompareProvider } from './context/CompareContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const seedDatabase = async () => {
      if (!isAuthReady) return;
      
      // Only seed if the user is the admin
      const isAdmin = user?.email === "vanshika.sharma1218@gmail.com";
      if (!isAdmin) return;

      try {
        const querySnapshot = await getDocs(collection(db, 'policies'));
        if (querySnapshot.empty) {
          console.log("Seeding database with dummy policies...");
          for (const policy of dummyPolicies) {
            await addDoc(collection(db, 'policies'), policy);
          }
          console.log("Seeding complete!");
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'policies');
      }
    };

    seedDatabase();
  }, [isAuthReady, user]);

  return (
    <CompareProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/policy/:name" element={<PolicyDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/news/:id" element={<NewsDetail />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </Router>
    </CompareProvider>
  );
}
