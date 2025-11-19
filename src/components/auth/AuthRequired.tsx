import React from 'react'
import { motion } from 'framer-motion'
import { Lock, LogIn, UserPlus, Stethoscope } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

interface AuthRequiredProps {
  title: string
  description: string
  icon?: React.ReactNode
  feature: 'carnets' | 'appointments' | 'health' | 'doctors' | 'notifications'
}

export const AuthRequired: React.FC<AuthRequiredProps> = ({ 
  title, 
  description, 
  icon,
  feature 
}) => {
  const navigate = useNavigate()

  const featureDescriptions: Record<string, { benefit1: string; benefit2: string; benefit3: string }> = {
    carnets: {
      benefit1: 'Acheter et gérer vos carnets de santé',
      benefit2: 'Accéder à vos antécédents médicaux',
      benefit3: 'Partager vos informations avec les médecins'
    },
    appointments: {
      benefit1: 'Prendre rendez-vous avec les médecins',
      benefit2: 'Gérer vos consultations à venir',
      benefit3: 'Suivre votre file d\'attente'
    },
    health: {
      benefit1: 'Suivre vos paramètres de santé',
      benefit2: 'Analyser vos tendances médicales',
      benefit3: 'Obtenir des recommandations personnalisées'
    },
    doctors: {
      benefit1: 'Consulter les médecins disponibles',
      benefit2: 'Voir les avis et expériences',
      benefit3: 'Trouver le meilleur médecin pour vous'
    },
    notifications: {
      benefit1: 'Recevoir des alertes de santé personnalisées',
      benefit2: 'Ne jamais manquer un rendez-vous',
      benefit3: 'Être informé des nouvelles fonctionnalités'
    }
  }

  const features = featureDescriptions[feature]

  return (
    <div className="min-h-screen bg-gradient-pro py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            {/* Icon section */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {icon || <Lock className="h-10 w-10 text-white" />}
              </motion.div>
            </div>

            {/* Title and description */}
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8">
              {description}
            </p>

            {/* Preview section */}
            <div className="bg-gradient-to-r from-primary-50 to-medical-50 rounded-xl p-6 mb-8 border-2 border-primary-200">
              <p className="text-sm font-semibold text-slate-700 mb-4">
                📌 Vous découvrez cette section! Connectez-vous pour accéder à:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-primary-600 text-white rounded-full text-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-slate-700">{features.benefit1}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-primary-600 text-white rounded-full text-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-slate-700">{features.benefit2}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-primary-600 text-white rounded-full text-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-slate-700">{features.benefit3}</span>
                </li>
              </ul>
            </div>

            {/* Call to action buttons */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 rounded-lg"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Se connecter
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 rounded-lg"
                  onClick={() => navigate('/register')}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  S'enregistrer
                </Button>
              </motion.div>
            </div>

            {/* Info message */}
            <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
              <p className="text-sm text-primary-700">
                💡 <strong>Conseil:</strong> Créez un compte gratuit pour accéder à toutes les fonctionnalités MediPass et gérer votre santé en ligne.
              </p>
            </div>
          </div>

          {/* Lower section with feature preview */}
          <motion.div
            className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <Stethoscope className="h-6 w-6 text-primary-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-900">
                Pourquoi MediPass ?
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-3 items-center justify-center">
                  <span className="text-xl">🏥</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Réseau national</h4>
                <p className="text-sm text-slate-600">
                  Accès à des hôpitaux et médecins dans tout le Sénégal
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex w-12 h-12 bg-medical-100 text-medical-600 rounded-lg mb-3 items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Accessible partout</h4>
                <p className="text-sm text-slate-600">
                  Gérez votre santé depuis votre téléphone ou ordinateur
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex w-12 h-12 bg-accent-100 text-accent-600 rounded-lg mb-3 items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Sécurisé</h4>
                <p className="text-sm text-slate-600">
                  Vos données médicales sont protégées et confidentielles
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
