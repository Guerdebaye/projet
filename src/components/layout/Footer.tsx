import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, Phone, Mail, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-2 rounded-xl mr-3">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">MediPass Sénégal</h3>
                <p className="text-gray-400 text-sm">Votre santé, sans attente</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Plateforme officielle de digitalisation du système de santé sénégalais. 
              Achetez vos carnets médicaux en ligne et prenez rendez-vous facilement.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Ministère de la Santé, Dakar, Sénégal</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <div className="space-y-2">
              <Link to="/carnets" className="block text-gray-400 hover:text-white transition-colors">
                Acheter un carnet
              </Link>
              <Link to="/appointments" className="block text-gray-400 hover:text-white transition-colors">
                Prendre RDV
              </Link>
              <Link to="/doctors" className="block text-gray-400 hover:text-white transition-colors">
                Trouver un médecin
              </Link>
              <Link to="/health" className="block text-gray-400 hover:text-white transition-colors">
                Suivi santé
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>33 800 00 00</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@medipass.sn</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Paiements acceptés</h5>
              <div className="flex space-x-2">
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">Wave</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">Orange Money</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-sm">Free Money</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MediPass Sénégal. Tous droits réservés.</p>
          <p className="text-sm mt-2">Solution développée pour le Ministère de la Santé et de l'Action Sociale</p>
        </div>
      </div>
    </footer>
  )
}