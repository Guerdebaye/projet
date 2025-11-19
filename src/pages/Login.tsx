import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Stethoscope, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuthStore } from '../store/auth-store';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    setIsLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Erreur de connexion');
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
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Connexion
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

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Mot de passe oublié ?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-lg font-semibold bg-gradient-to-r from-primary-600 to-medical-500 hover:from-primary-700 hover:to-medical-600 transition-all shadow-lg hover:shadow-xl"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Nouveau patient ?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Compte de démo */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Compte démo :</strong><br />
              patient@medipass.com / password
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