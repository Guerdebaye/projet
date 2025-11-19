import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Stethoscope } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuthStore } from '../store/auth-store';

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);

    const result = await register(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Erreur lors de l\'inscription');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
          <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-4 shadow-lg">
            <Stethoscope className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-medical-500 bg-clip-text text-transparent">
            MediPass
          </h1>
          <p className="text-gray-600 mt-2">Créez votre compte patient</p>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Inscription
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Votre nom complet"
                  className="pl-12 h-12 rounded-xl"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  className="pl-12 h-12 rounded-xl"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+33 6 12 34 56 78"
                  className="pl-12 h-12 rounded-xl"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Votre mot de passe"
                  className="pl-12 pr-12 h-12 rounded-xl"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  className="pl-12 pr-12 h-12 rounded-xl"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" 
                required 
              />
              <span className="ml-2 text-sm text-gray-600">
                J'accepte les{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  politique de confidentialité
                </a>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-lg font-semibold bg-gradient-to-r from-primary-600 to-medical-500 hover:from-primary-700 hover:to-medical-600 transition-all shadow-lg hover:shadow-xl mt-4"
              isLoading={isLoading}
            >
              Créer mon compte
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-medical-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow delay-1000"></div>
      </motion.div>
    </div>
  );
};