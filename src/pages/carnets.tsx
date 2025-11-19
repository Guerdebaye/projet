import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download, 
  Eye, 
  Search, 
  Plus,
  FileText,
  Calendar,
  Shield,
  CheckCircle2,
  X,
  Smartphone,
  Building,
  MapPin,
  ChevronRight
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useDataStore } from '../store/data-store'
import { useAuthStore } from '../store/auth-store'
import { AuthRequired } from '../components/auth/AuthRequired'

interface CarnetDetails {
  id: string
  type: string
  dateAchat: string
  dateExpiration: string
  prix: number
  hopital: string
  ville: string
  numeroSerie: string
  qrCode: string
  statut: 'active' | 'used' | 'expired'
  patient: {
    nom: string
    prenom: string
    dateNaissance: string
    numeroCarte: string
  }
}

export const Carnets: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <AuthRequired
        title="Connectez-vous pour gérer vos carnets"
        description="Accédez à vos carnets de santé, acheter de nouveaux carnets et gérez vos antécédents médicaux"
        icon={<FileText className="h-10 w-10 text-white" />}
        feature="carnets"
      />
    )
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all')
  const [selectedCarnet, setSelectedCarnet] = useState<CarnetDetails | null>(null)
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false)
  
  // Nouveaux états pour le flux d'achat
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [currentStep, setCurrentStep] = useState<'city' | 'hospital' | 'carnetType' | 'review' | 'payment'>('city')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')
  const [selectedCarnetType, setSelectedCarnetType] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')
  const [defaultCity, setDefaultCity] = useState('')
  const [setDefaultCityChecked, setSetDefaultCityChecked] = useState(false)

  const { cities, hospitals, carnetTypes, paymentMethods } = useDataStore()

  const [carnets, setCarnets] = useState<CarnetDetails[]>([
    {
      id: 'SN-2024-001',
      type: 'Consultation Générale',
      dateAchat: '15 Jan 2024',
      dateExpiration: '15 Avr 2024',
      prix: 5000,
      hopital: 'Hôpital Aristide Le Dantec',
      ville: 'Dakar',
      numeroSerie: 'SN-CARN-2024-001-ABC123',
      qrCode: 'qr-code-001',
      statut: 'active',
      patient: {
        nom: 'DUPONT',
        prenom: 'Jean',
        dateNaissance: '15/03/1985',
        numeroCarte: 'SN-85-03-15-001'
      }
    },
    {
      id: 'SN-2024-002',
      type: 'Consultation Spécialiste',
      dateAchat: '20 Jan 2024',
      dateExpiration: '20 Juil 2024',
      prix: 10000,
      hopital: 'Hôpital Principal de Dakar',
      ville: 'Dakar',
      numeroSerie: 'SN-CARN-2024-002-DEF456',
      qrCode: 'qr-code-002',
      statut: 'active',
      patient: {
        nom: 'DUPONT',
        prenom: 'Jean',
        dateNaissance: '15/03/1985',
        numeroCarte: 'SN-85-03-15-001'
      }
    }
  ])

  // Charger la ville par défaut depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('defaultCity')
    if (saved) {
      setDefaultCity(saved)
    }
  }, [])

  // Sauvegarder la ville par défaut
  const handleSetDefaultCity = (city: string) => {
    localStorage.setItem('defaultCity', city)
    setDefaultCity(city)
  }

  const filteredCarnets = carnets.filter(carnet => {
    const matchesSearch = carnet.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         carnet.hopital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || carnet.statut === filter
    return matchesSearch && matchesFilter
  })

  const filteredHospitals = hospitals.filter(h => h.city === selectedCity)
  
  const getStatusColor = (status: CarnetDetails['statut']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'used': return 'bg-blue-100 text-blue-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: CarnetDetails['statut']) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'used': return 'Utilisé'
      case 'expired': return 'Expiré'
      default: return 'Inconnu'
    }
  }

  const resetBuyFlow = () => {
    setShowBuyModal(false)
    setCurrentStep('city')
    setSelectedCity('')
    setSelectedHospital('')
    setSelectedCarnetType('')
    setSelectedPayment('')
    setSetDefaultCityChecked(false)
  }

  const handlePayment = () => {
    if (selectedCarnetType && selectedPayment) {
      setShowPaymentInstructions(true)
    }
  }

  const handlePaymentComplete = () => {
    const carnetType = carnetTypes.find(ct => ct.id === selectedCarnetType)
    const hospital = hospitals.find(h => h.id === selectedHospital)
    
    const newCarnet: CarnetDetails = {
      id: `SN-${new Date().getFullYear()}-${String(carnets.length + 1).padStart(3, '0')}`,
      type: carnetType?.name || '',
      dateAchat: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      dateExpiration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      prix: carnetType?.price || 0,
      hopital: hospital?.name || 'Établissement de santé',
      ville: selectedCity,
      numeroSerie: `SN-CARN-${new Date().getFullYear()}-${String(carnets.length + 1).padStart(3, '0')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      qrCode: `qr-code-${carnets.length + 1}`,
      statut: 'active',
      patient: {
        nom: 'DUPONT',
        prenom: 'Jean',
        dateNaissance: '15/03/1985',
        numeroCarte: 'SN-85-03-15-001'
      }
    }
    
    setCarnets(prev => [newCarnet, ...prev])
    
    // Sauvegarder la ville par défaut si l'utilisateur l'a coché
    if (setDefaultCityChecked) {
      handleSetDefaultCity(selectedCity)
    }
    
    setShowPaymentInstructions(false)
    resetBuyFlow()
    
    alert(' Paiement confirmé ! Votre carnet a été ajouté à votre compte.')
  }

  const PaymentInstructions: React.FC<{method: any; amount: number; onComplete: () => void}> = ({ method, amount, onComplete }) => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
        <p className="text-sm text-gray-600 mt-2">Montant: {amount.toLocaleString()} FCFA</p>
        <div className="mt-4 text-gray-700">
          <p className="font-medium">Instructions de paiement:</p>
          <p className="text-sm mt-2">{method.instructions}</p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button className="flex-1 bg-gradient-to-r from-primary-600 to-medical-500" onClick={onComplete}>
            J'ai payé  Confirmer
          </Button>
        </div>
      </div>
    )
  }

  const handleDownloadCarnet = (carnet: CarnetDetails) => {
    const content = `
CARNET MÉDICAL - RÉPUBLIQUE DU SÉNÉGAL
=======================================

INFORMATIONS DU CARNET
----------------------
Numéro: ${carnet.id}
Série: ${carnet.numeroSerie}
Type: ${carnet.type}
Prix: ${carnet.prix.toLocaleString()} FCFA
Date d'achat: ${carnet.dateAchat}
Date d'expiration: ${carnet.dateExpiration}
Statut: ${getStatusText(carnet.statut)}

INFORMATIONS PATIENT
--------------------
Nom: ${carnet.patient.nom}
Prénom: ${carnet.patient.prenom}
Date de naissance: ${carnet.patient.dateNaissance}
N Carte: ${carnet.patient.numeroCarte}

ÉTABLISSEMENT
-------------
Hôpital: ${carnet.hopital}
Ville: ${carnet.ville}

Ce carnet est valable pour une consultation dans tout établissement de santé partenaire.
    `.trim()

    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `carnet-medical-${carnet.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-medical py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Mes Carnets de Santé</h1>
          <p className="text-gray-600 mt-2">Gérez vos carnets médicaux numériques</p>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un carnet..."
                  className="pl-10 w-full lg:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="used">Utilisés</option>
                <option value="expired">Expirés</option>
              </select>
            </div>

            <Button 
              className="whitespace-nowrap"
              onClick={() => setShowBuyModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Acheter un carnet
            </Button>
          </div>
        </motion.div>

        {/* Carnets Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence>
            {filteredCarnets.map((carnet, index) => (
              <motion.div
                key={carnet.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{carnet.type}</h3>
                      <p className="text-primary-100 text-sm mt-1">{carnet.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(carnet.statut)}`}>
                      {getStatusText(carnet.statut)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-3" />
                      <div>
                        <p className="text-sm">Achat: {carnet.dateAchat}</p>
                        <p className="text-xs text-gray-500">Expire: {carnet.dateExpiration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-3" />
                      <div>
                        <p className="text-sm font-medium">{carnet.hopital}</p>
                        <p className="text-xs text-gray-500">{carnet.ville}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800 font-semibold">Prix</span>
                      <span className="text-green-800 font-bold">{carnet.prix.toLocaleString()} FCFA</span>
                    </div>

                    {/* QR Code Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                      <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300">
                        <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-medical-100 rounded flex items-center justify-center">
                          <Shield className="h-8 w-8 text-primary-600" />
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">QR Code sécurisé</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedCarnet(carnet)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Détails
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDownloadCarnet(carnet)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCarnets.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <FileText className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun carnet trouvé</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filter !== 'all' 
                ? 'Aucun carnet ne correspond à vos critères de recherche.'
                : 'Vous n\'avez pas encore de carnets de santé.'}
            </p>
            <Button onClick={() => setShowBuyModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Acheter votre premier carnet
            </Button>
          </motion.div>
        )}

        {/* Modal Achat Carnet - Flux complet */}
        {showBuyModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <span className={currentStep === 'city' ? 'font-bold text-primary-600' : 'text-gray-600'}>Ville</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={currentStep === 'hospital' ? 'font-bold text-primary-600' : 'text-gray-600'}>Hôpital</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={currentStep === 'carnetType' ? 'font-bold text-primary-600' : 'text-gray-600'}>Type</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={currentStep === 'review' ? 'font-bold text-primary-600' : 'text-gray-600'}>Validation</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className={currentStep === 'payment' ? 'font-bold text-primary-600' : 'text-gray-600'}>Paiement</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentStep === 'city' && 'Choisissez votre ville'}
                  {currentStep === 'hospital' && 'Sélectionnez un hôpital'}
                  {currentStep === 'carnetType' && 'Type de carnet'}
                  {currentStep === 'review' && 'Récapitulatif'}
                  {currentStep === 'payment' && 'Méthode de paiement'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetBuyFlow}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Step 1: City Selection */}
              {currentStep === 'city' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {cities.map(city => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? 'default' : 'outline'}
                        className="h-auto py-3 flex flex-col"
                        onClick={() => {
                          setSelectedCity(city)
                          setCurrentStep('hospital')
                          setSelectedHospital('')
                        }}
                      >
                        <MapPin className="h-4 w-4 mb-1" />
                        {city}
                      </Button>
                    ))}
                  </div>
                  {defaultCity && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                       Votre ville par défaut est : <strong>{defaultCity}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Hospital Selection */}
              {currentStep === 'hospital' && selectedCity && (
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setCurrentStep('city')
                      setSelectedHospital('')
                    }}
                  >
                     Retour à la sélection de ville
                  </Button>
                  <div className="space-y-3">
                    {filteredHospitals.length > 0 ? (
                      filteredHospitals.map(hospital => (
                        <div
                          key={hospital.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedHospital === hospital.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                          onClick={() => {
                            setSelectedHospital(hospital.id)
                            setCurrentStep('carnetType')
                            setSelectedCarnetType('')
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                              <p className="text-xs text-gray-500 mt-1">{hospital.phone}</p>
                            </div>
                            {selectedHospital === hospital.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {hospital.specialties.slice(0, 3).map(spec => (
                              <span key={spec} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {spec}
                              </span>
                            ))}
                            {hospital.specialties.length > 3 && (
                              <span className="text-xs text-gray-500">+{hospital.specialties.length - 3}</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-8">Aucun hôpital dans cette ville</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Carnet Type Selection */}
              {currentStep === 'carnetType' && selectedCity && selectedHospital && (
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setCurrentStep('hospital')
                      setSelectedCarnetType('')
                    }}
                  >
                     Retour à la sélection d'hôpital
                  </Button>
                  <div className="space-y-3">
                    {carnetTypes.map(type => (
                      <div
                        key={type.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedCarnetType === type.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedCarnetType(type.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{type.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">Validité: {type.validite}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary-600">{type.price.toLocaleString()} FCFA</p>
                            {selectedCarnetType === type.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary-600 mt-1 ml-auto" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-primary-600 to-medical-500"
                    onClick={() => setCurrentStep('review')}
                    disabled={!selectedCarnetType}
                  >
                    Continuer vers le récapitulatif
                  </Button>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 'review' && selectedCity && selectedHospital && selectedCarnetType && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ville:</span>
                      <span className="font-medium">{selectedCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hôpital:</span>
                      <span className="font-medium">{hospitals.find(h => h.id === selectedHospital)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type de carnet:</span>
                      <span className="font-medium">{carnetTypes.find(ct => ct.id === selectedCarnetType)?.name}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                      <span>Montant total:</span>
                      <span className="text-primary-600">{carnetTypes.find(ct => ct.id === selectedCarnetType)?.price.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="defaultCity"
                      checked={setDefaultCityChecked}
                      onChange={(e) => setSetDefaultCityChecked(e.target.checked)}
                      className="h-4 w-4 rounded"
                    />
                    <label htmlFor="defaultCity" className="text-sm text-gray-600">
                      Enregistrer {selectedCity} comme ma ville par défaut
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCurrentStep('carnetType')
                      }}
                    >
                      Retour
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary-600 to-medical-500"
                      onClick={() => setCurrentStep('payment')}
                    >
                      Procéder au paiement
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Payment Method */}
              {currentStep === 'payment' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>{carnetTypes.find(ct => ct.id === selectedCarnetType)?.name}</strong> - 
                      {carnetTypes.find(ct => ct.id === selectedCarnetType)?.price.toLocaleString()} FCFA
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choisissez votre moyen de paiement
                    </label>
                    <div className="space-y-3">
                      {paymentMethods.map(method => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedPayment === method.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <span className="text-2xl mr-4">{method.logo}</span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-600">
                              {method.type === 'mobile' ? 'Paiement mobile' : 
                               method.type === 'card' ? 'Carte bancaire' : 'Virement bancaire'}
                            </p>
                          </div>
                          {selectedPayment === method.id && (
                            <CheckCircle2 className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setCurrentStep('review')}
                    >
                      Retour
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary-600 to-medical-500"
                      onClick={handlePayment}
                      disabled={!selectedPayment}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Payer maintenant
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Modal Instructions Paiement */}
        {showPaymentInstructions && selectedPayment && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <PaymentInstructions
                method={paymentMethods.find(p => p.id === selectedPayment)!}
                amount={carnetTypes.find(ct => ct.id === selectedCarnetType)?.price || 0}
                onComplete={handlePaymentComplete}
              />
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowPaymentInstructions(false)}
              >
                Annuler le paiement
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Détails Carnet */}
        {selectedCarnet && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedCarnet(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Détails du carnet médical</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCarnet(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Informations du carnet */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-4 rounded-lg text-white">
                    <h4 className="font-semibold text-lg">{selectedCarnet.type}</h4>
                    <p className="text-primary-100">{selectedCarnet.id}</p>
                    <p className="text-primary-100 text-sm mt-1">Série: {selectedCarnet.numeroSerie}</p>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-900">Informations du carnet</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Date d'achat</p>
                        <p className="font-medium">{selectedCarnet.dateAchat}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date d'expiration</p>
                        <p className="font-medium">{selectedCarnet.dateExpiration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Prix</p>
                        <p className="font-medium">{selectedCarnet.prix.toLocaleString()} FCFA</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Statut</p>
                        <p className="font-medium">{getStatusText(selectedCarnet.statut)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-900">Établissement</h5>
                    <div className="text-sm">
                      <p className="font-medium">{selectedCarnet.hopital}</p>
                      <p className="text-gray-600">{selectedCarnet.ville}</p>
                    </div>
                  </div>
                </div>

                {/* Informations patient et QR Code */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-900">Informations patient</h5>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nom:</span>
                          <span className="font-medium">{selectedCarnet.patient.nom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prénom:</span>
                          <span className="font-medium">{selectedCarnet.patient.prenom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date de naissance:</span>
                          <span className="font-medium">{selectedCarnet.patient.dateNaissance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">N Carte:</span>
                          <span className="font-medium">{selectedCarnet.patient.numeroCarte}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <div className="bg-white p-4 rounded border-2 border-primary-200">
                      <div className="w-48 h-48 bg-gradient-to-br from-primary-100 to-medical-100 rounded flex items-center justify-center">
                        <Shield className="h-12 w-12 text-primary-600" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Présentez ce QR Code à l'accueil de l'hôpital
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDownloadCarnet(selectedCarnet)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setSelectedCarnet(null)}
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}



