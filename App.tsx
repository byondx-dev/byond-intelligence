import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Aurora from './components/Aurora';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeContext } from './index';

import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import { Magnet, AuroraText } from './components/AnimatedUI';

import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.solutions'), path: '/solutions' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-4 border-b border-gray-200/50 dark:border-gray-800/50' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter z-50 relative group">
          Byond.<AuroraText className="ml-1 text-2xl font-bold">Intelligence</AuroraText>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <Magnet>{item.label}</Magnet>
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        <button
          className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-gray-800 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-current"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-current origin-center"
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-2xl p-6 pt-24 md:hidden flex flex-col gap-6"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium py-2 border-b border-gray-100 dark:border-gray-800 ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4">
                <span className="text-gray-500">{t('nav.appearance')}</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
                >
                  <span>{theme === 'dark' ? t('nav.dark') : t('nav.light')}</span>
                  {theme === 'dark' ? '☀' : '☾'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('de') ? 'en' : 'de';
    i18n.changeLanguage(newLang);
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-900 py-12 md:py-20 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 font-display">Byond Intelligence</h2>
          <p className="text-gray-500 max-w-sm">
            {t('footer.tagline')}
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4">{t('footer.sitemap')}</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/solutions">{t('nav.solutions')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">{t('footer.legal')}</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>{t('footer.imprint')}</li>
            <li>{t('footer.privacy')}</li>
            <li>{t('footer.security')}</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <div className="text-center md:text-left">
          © 2025 Byond Intelligence. {t('footer.rights')} <br />
          <span className="opacity-50 mt-2 block">{t('footer.sub_rights')}</span>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
          >
            <span role="img" aria-label="globe">🌐</span>
            {i18n.language.startsWith('de') ? 'English' : 'Deutsch'}
          </button>
        </div>
      </div>
    </footer>
  );
};

import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';

import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {showSplash && (
          <WelcomeScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isReady={!showSplash} />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home isReady={true} />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}