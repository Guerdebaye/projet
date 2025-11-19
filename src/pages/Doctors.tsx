import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, MapPin, Calendar, Filter } from 'lucide-react'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useAuthStore } from '../store/auth-store'
import { AuthRequired } from '../components/auth/AuthRequired'

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: number
  location: string
  address: string
  price: number
  availableToday: boolean
  languages: string[]
  image: string
}

export const Doctors: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <AuthRequired
        title="Connectez-vous pour consulter nos médecins"
        description="Découvrez nos médecins partenaires, consultez les avis, vérifiez leur disponibilité et prenez rendez-vous"
        icon={<Search className="h-10 w-10 text-white" />}
        feature="doctors"
      />
    )
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Marie Martin',
      specialty: 'Médecin Généraliste',
      rating: 4.8,
      reviews: 127,
      experience: 12,
      location: 'Clinique Médicale Paris',
      address: '123 Avenue des Champs-Élysées, Paris',
      price: 25,
      availableToday: true,
      languages: ['Français', 'Anglais'],
      image: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Pierre Lambert',
      specialty: 'Dermatologue',
      rating: 4.9,
      reviews: 89,
      experience: 8,
      location: 'Centre Dermatologique',
      address: '456 Rue de la Paix, Paris',
      price: 50,
      availableToday: true,
      languages: ['Français', 'Espagnol'],
      image: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Sophie Bernard',
      specialty: 'Cardiologue',
      rating: 4.7,
      reviews: 156,
      experience: 15,
      location: 'Institut Cardiologique',
      address: '789 Boulevard Saint-Germain, Paris',
      price: 60,
      availableToday: false,
      languages: ['Français', 'Anglais', 'Arabe'],
      image: '👩‍⚕️'
    },
    {
      id: '4',
      name: 'Dr. Jean Dupont',
      specialty: 'Pédiatre',
      rating: 4.9,
      reviews: 203,
      experience: 10,
      location: 'Centre Pédiatrique',
      address: '321 Rue de Rivoli, Paris',
      price: 35,
      availableToday: true,
      languages: ['Français'],
      image: '👨‍⚕️'
    }
  ]

  const specialties = ['all', ...new Set(doctors.map(d => d.specialty))]

  const filteredDoctors = doctors.filter(doctor =>
    (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty)
  )

  const handleBookAppointment = (doctor: Doctor) => {
    // Rediriger vers la page de rendez-vous avec le médecin pré-sélectionné
    alert(`Redirection vers la prise de rendez-vous avec ${doctor.name}`)
  }

  return (
    <div className="min-h-screen bg-gradient-medical py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Médecins Partenaires</h1>
          <p className="text-gray-600 mt-2">Trouvez le professionnel de santé qu'il vous faut</p>

          {/* Search and Filter */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un médecin, une spécialité..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="all">Toutes les spécialités</option>
                {specialties.filter(s => s !== 'all').map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Doctor Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{doctor.image}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-primary-600 text-sm">{doctor.specialty}</p>
                      </div>
                    </div>
                    {doctor.availableToday && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Disponible
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{doctor.reviews} avis</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{doctor.location}</span>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {doctor.languages.map(lang => (
                      <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Price and Experience */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{doctor.experience} ans d'exp.</span>
                    <span className="font-semibold text-gray-900">{doctor.price}€</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary-600 to-medical-500"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre RDV
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDoctors.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Search className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun médecin trouvé</h3>
              <p className="text-gray-500 mb-6">
                Aucun médecin ne correspond à vos critères de recherche.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSpecialty('all')
                }}
              >
                Réinitialiser la recherche
              </Button>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-primary-600 to-medical-500 rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Rejoignez notre réseau médical</h3>
            <p className="text-primary-100 mb-6">
              Plus de 200 médecins partenaires déjà inscrits sur MediPass
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-primary-100">Médecins</div>
              </div>
              <div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-primary-100">Spécialités</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-primary-100">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}