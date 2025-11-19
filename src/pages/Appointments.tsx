import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, User, Plus, X, Search, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useAuthStore } from "../store/auth-store"
import { AuthRequired } from "../components/auth/AuthRequired"
import { AppointmentReminders } from "../components/appointments/ReminderAlerts"

interface Appointment {
  id: string
  doctor: string
  specialty: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  location: string
  address: string
  queueNumber?: number
  estimatedWaitTime?: number
}

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  availableSlots: string[]
  location: string
}

export const Appointments: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <AuthRequired
        title="Connectez-vous pour gérer vos rendez-vous"
        description="Accédez à vos rendez-vous médicaux, suivez votre file d'attente et gérez vos consultations"
        icon={<Calendar className="h-10 w-10 text-white" />}
        feature="appointments"
      />
    )
  }

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "APT-001",
      doctor: "Dr. Marie Martin",
      specialty: "Médecin Généraliste",
      date: "15 Fév 2024",
      time: "14:30",
      status: "confirmed",
      location: "Clinique Médicale Paris",
      address: "123 Avenue des Champs-Élysées, Paris",
      queueNumber: 5,
      estimatedWaitTime: 15
    },
    {
      id: "APT-002",
      doctor: "Dr. Pierre Lambert",
      specialty: "Dermatologue",
      date: "20 Fév 2024",
      time: "10:00",
      status: "pending",
      location: "Centre Dermatologique",
      address: "456 Rue de la Paix, Paris",
      queueNumber: 2,
      estimatedWaitTime: 5
    }
  ])

  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedAppointmentToCancel, setSelectedAppointmentToCancel] = useState<Appointment | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedSlot, setSelectedSlot] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set())

  // Fonction pour calculer les rappels
  const calculateReminders = () => {
    const activeAppointments = appointments.filter(apt => apt.status !== "cancelled")
    const reminders = activeAppointments
      .filter(apt => apt.status === "confirmed")
      .map(apt => {
        const appointmentDateTime = new Date(`${apt.date} ${apt.time}`)
        const now = new Date()
        const hoursUntil = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
        
        let type: 'upcoming' | 'today' | 'soon' = 'upcoming'
        if (hoursUntil <= 1 && hoursUntil > 0) type = 'soon'
        else if (hoursUntil <= 24 && hoursUntil > 1) type = 'today'
        
        return {
          id: apt.id,
          doctorName: apt.doctor.replace('Dr. ', ''),
          specialty: apt.specialty,
          date: apt.date,
          time: apt.time,
          location: apt.location,
          hoursUntil: Math.max(0, Math.round(hoursUntil * 10) / 10),
          type
        }
      })
      .filter(r => r.hoursUntil <= 24 && !dismissedReminders.has(r.id))
      .sort((a, b) => a.hoursUntil - b.hoursUntil)

    return reminders
  }

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Marie Martin",
      specialty: "Médecin Généraliste",
      rating: 4.8,
      availableSlots: ["14:30", "15:00", "15:30", "16:00"],
      location: "Clinique Médicale Paris"
    },
    {
      id: "2",
      name: "Dr. Pierre Lambert",
      specialty: "Dermatologue",
      rating: 4.9,
      availableSlots: ["10:00", "10:30", "11:00", "14:00"],
      location: "Centre Dermatologique"
    },
    {
      id: "3",
      name: "Dr. Sophie Bernard",
      specialty: "Cardiologue",
      rating: 4.7,
      availableSlots: ["09:00", "09:30", "10:30", "11:00"],
      location: "Institut Cardiologique"
    }
  ]

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculer le prochain numéro d'ordre
  const getNextQueueNumber = (doctorName: string, appointmentDate: string) => {
    const sameDocAppointments = appointments.filter(
      apt => apt.doctor === doctorName && apt.date === appointmentDate && apt.status !== "cancelled"
    )
    return sameDocAppointments.length + 1
  }

  // Estimer le temps d'attente (15 minutes par patient avant)
  const estimateWaitTime = (queueNumber: number) => {
    return (queueNumber - 1) * 15
  }

  const handleBookAppointment = (doctor: Doctor, slot: string) => {
    const appointmentDate = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
    const queueNumber = getNextQueueNumber(doctor.name, appointmentDate)
    const estimatedWaitTime = estimateWaitTime(queueNumber)

    const newAppointment: Appointment = {
      id: `APT-${String(appointments.length + 1).padStart(3, "0")}`,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: appointmentDate,
      time: slot,
      status: "confirmed",
      location: doctor.location,
      address: "Adresse de la clinique",
      queueNumber: queueNumber,
      estimatedWaitTime: estimatedWaitTime
    }

    setAppointments(prev => [...prev, newAppointment])
    setShowBookingModal(false)
    setSelectedDoctor(null)
    setSelectedSlot("")
    
    alert(` Rendez-vous confirmé avec ${doctor.name} à ${slot}\n\n Numéro d'ordre: ${queueNumber}\n Temps d'attente estimé: ${estimatedWaitTime} minutes`)
  }

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointmentToCancel(appointment)
    setShowCancelModal(true)
  }

  const confirmCancelAppointment = () => {
    if (selectedAppointmentToCancel) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === selectedAppointmentToCancel.id
            ? { ...apt, status: "cancelled" }
            : apt
        )
      )
      setShowCancelModal(false)
      setSelectedAppointmentToCancel(null)
      alert(` Rendez-vous annulé avec ${selectedAppointmentToCancel.doctor}`)
    }
  }

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed": return "Confirmé"
      case "pending": return "En attente"
      case "cancelled": return "Annulé"
      default: return "Inconnu"
    }
  }

  const activeAppointments = appointments.filter(apt => apt.status !== "cancelled")
  const cancelledAppointments = appointments.filter(apt => apt.status === "cancelled")
  const reminders = calculateReminders()

  const handleDismissReminder = (reminderId: string) => {
    setDismissedReminders(prev => new Set([...prev, reminderId]))
  }

  return (
    <div className="min-h-screen bg-gradient-medical py-8">
      <AppointmentReminders reminders={reminders} onDismiss={handleDismissReminder} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Rendez-vous</h1>
              <p className="text-gray-600 mt-2">Gérez vos consultations médicales</p>
            </div>
            <Button onClick={() => setShowBookingModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Prendre rendez-vous
            </Button>
          </div>

          {/* Section des rappels importants */}
          {reminders.length > 0 && (
            <motion.div
              className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-medical-50 border-2 border-primary-200 rounded-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-600 text-white">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">
                    {reminders.length} Rappel{reminders.length > 1 ? 's' : ''} de consultation
                  </h3>
                  <div className="space-y-2">
                    {reminders.slice(0, 3).map(reminder => (
                      <div key={reminder.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-primary-600" />
                          <div>
                            <p className="font-medium text-slate-900">
                              Dr. {reminder.doctorName} ({reminder.specialty})
                            </p>
                            <p className="text-sm text-slate-600">
                              {reminder.date} à {reminder.time}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          reminder.type === 'soon' ? 'bg-error-100 text-error-700' :
                          reminder.type === 'today' ? 'bg-warning-100 text-warning-700' :
                          'bg-primary-100 text-primary-700'
                        }`}>
                          {reminder.hoursUntil === 0 && '📍 MAINTENANT'}
                          {reminder.hoursUntil === 1 && '⏰ 1h'}
                          {reminder.hoursUntil > 1 && reminder.hoursUntil < 24 && `⏱️ ${Math.round(reminder.hoursUntil)}h`}
                          {reminder.hoursUntil >= 24 && `📆 ${Math.ceil(reminder.hoursUntil / 24)}j`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Rendez-vous actifs */}
          {activeAppointments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rendez-vous à venir</h2>
              <div className="grid gap-6">
                {activeAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                        <p className="text-gray-600">{appointment.specialty}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{appointment.date} à {appointment.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span>Consultation</span>
                      </div>
                    </div>

                    {/* Numéro d'ordre et temps d'attente */}
                    {appointment.queueNumber && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <p className="text-sm text-blue-700 font-medium">Numéro d'ordre</p>
                              <p className="text-2xl font-bold text-blue-900">#{appointment.queueNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                              <p className="text-sm text-blue-700 font-medium">Temps d'attente estimé</p>
                              <p className="text-2xl font-bold text-blue-900">{appointment.estimatedWaitTime} min</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                           Estimation basée sur 15 minutes par consultation
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleCancelAppointment(appointment)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Annuler
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Rendez-vous annulés */}
          {cancelledAppointments.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Rendez-vous annulés</h2>
              <div className="grid gap-4">
                {cancelledAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 opacity-60"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.date} à {appointment.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {appointments.length === 0 && (
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rendez-vous</h3>
              <p className="text-gray-500 mb-6">Vous n'avez pas de rendez-vous programmé</p>
              <Button onClick={() => setShowBookingModal(true)}>
                Prendre un rendez-vous
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal de confirmation d'annulation */}
      {showCancelModal && selectedAppointmentToCancel && (
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
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">Annuler le rendez-vous?</h3>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>{selectedAppointmentToCancel.doctor}</strong> - {selectedAppointmentToCancel.specialty}
              </p>
              <p className="text-sm text-red-700 mt-1">
                {selectedAppointmentToCancel.date} à {selectedAppointmentToCancel.time}
              </p>
            </div>

            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir annuler ce rendez-vous? Cette action ne peut pas être annulée.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCancelModal(false)
                  setSelectedAppointmentToCancel(null)
                }}
              >
                Garder le RV
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={confirmCancelAppointment}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Annuler le RV
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Prendre un rendez-vous</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowBookingModal(false)
                  setSelectedDoctor(null)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {!selectedDoctor ? (
              <div>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un médecin ou une spécialité..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      className="bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-primary-200"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                          <p className="text-primary-600">{doctor.specialty}</p>
                        </div>
                        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          <span></span>
                          <span className="ml-1">{doctor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        {doctor.location}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availableSlots.slice(0, 3).map(slot => (
                          <span key={slot} className="bg-white px-3 py-1 rounded-lg text-sm border">
                            {slot}
                          </span>
                        ))}
                        {doctor.availableSlots.length > 3 && (
                          <span className="text-gray-500 text-sm">
                            +{doctor.availableSlots.length - 3} autres
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                    <p className="text-primary-600">{selectedDoctor.specialty}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDoctor(null)}
                  >
                     Retour
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-4">Créneaux disponibles</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedDoctor.availableSlots.map(slot => (
                        <Button
                          key={slot}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          className="justify-center"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h5 className="font-medium text-gray-900 mb-4">Détails du rendez-vous</h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Médecin:</span>
                        <span className="font-medium">{selectedDoctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spécialité:</span>
                        <span className="font-medium">{selectedDoctor.specialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lieu:</span>
                        <span className="font-medium">{selectedDoctor.location}</span>
                      </div>
                      {selectedSlot && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Horaire:</span>
                          <span className="font-medium">{selectedSlot}</span>
                        </div>
                      )}
                    </div>

                    {selectedSlot && (
                      <Button
                        className="w-full mt-6 bg-gradient-to-r from-primary-600 to-medical-500"
                        onClick={() => handleBookAppointment(selectedDoctor, selectedSlot)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Confirmer le rendez-vous
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
