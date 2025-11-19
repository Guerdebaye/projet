import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Stethoscope } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-4 shadow-lg">
            <Stethoscope className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-medical-500 bg-clip-text text-transparent">
            MediPass
          </h1>
          <p className="text-gray-600 mt-2">Votre santé, sans attente</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Connectez-vous
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-12 h-12 rounded-xl"
                  required
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
                  placeholder="Votre mot de passe"
                  className="pl-12 pr-12 h-12 rounded-xl"
                  required
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

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-lg font-semibold bg-gradient-to-r from-primary-600 to-medical-500 hover:from-primary-700 hover:to-medical-600 transition-all shadow-lg hover:shadow-xl"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Mot de passe oublié ?
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Nouveau patient ?{' '}
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Créer un compte
              </button>
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