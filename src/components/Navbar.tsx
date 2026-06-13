import React from 'react';
import { Link } from 'react-router-dom';
// 1. Remove Shield, keep other icons
import { Menu, X, LogIn, LogOut, User } from 'lucide-react'; 
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

// 2. Import your new logo image
import logoImage from '../assets/WhatsApp Image 2026-04-16 at 14.27.31.jpeg';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="glass-nav px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 3. Updated Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logoImage} 
            alt="TrustShield Logo" 
            className="w-10 h-10 object-contain rounded-lg group-hover:scale-110 transition-transform" 
          />
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            TrustShield
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                ) : (
                  <User className="w-8 h-8 p-1 glass rounded-full text-slate-600" />
                )}
                <span className="text-xs font-medium text-slate-500 hidden lg:block">{user.displayName}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 glass rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="flex items-center gap-2 px-6 py-2 glass rounded-full text-sm font-semibold hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {isLoggingIn ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? 'Signing In...' : 'Sign In'}
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};