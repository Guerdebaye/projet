import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Bell, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '../../store/auth-store';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { key: 'home', href: '/', label: 'Accueil' },
    { key: 'carnets', href: '/carnets', label: 'Carnets' },
    { key: 'appointments', href: '/appointments', label: 'Rendez-vous' },
    { key: 'health', href: '/health', label: 'Santé' },
    { key: 'doctors', href: '/doctors', label: 'Médecins' },
    { key: 'contact', href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav 
      className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-medical-500 bg-clip-text text-transparent">
                MediPass
              </h1>
              <p className="text-xs text-gray-500">Votre santé, sans attente</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`relative font-medium transition-all duration-300 hover:text-primary-600 ${
                  location.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
                {location.pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions Desktop - Right Side */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            {isAuthenticated ? (
              <>
                <Link to="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-medical-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </Link>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="text-gray-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login">
                  <Button variant="outline">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-primary-600 to-medical-500 hover:from-primary-700 hover:to-medical-600">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}
            
            {/* LanguageSwitcher removed */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="block py-2 text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* language switcher removed */}
            
            {isAuthenticated ? (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  to="/notifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-600"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-600"
                >
                  <User className="h-5 w-5" />
                  <span>Profil</span>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">
                    S'inscrire
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Se connecter
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};