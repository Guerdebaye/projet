import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, X } from 'lucide-react'

interface ReminderAlert {
  id: string
  doctorName: string
  specialty: string
  date: string
  time: string
  location: string
  hoursUntil: number
  type: 'upcoming' | 'today' | 'soon'
}

interface AppointmentRemindersProps {
  reminders: ReminderAlert[]
  onDismiss: (id: string) => void
}

export const AppointmentReminders: React.FC<AppointmentRemindersProps> = ({ reminders, onDismiss }) => {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'soon':
        return {
          bg: 'bg-error-50',
          border: 'border-error-300',
          icon: 'text-error-600',
          text: 'text-error-700',
          badge: 'bg-error-100 text-error-700',
          title: '⚠️ Consultation très bientôt!',
          animate: true
        }
      case 'today':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-300',
          icon: 'text-warning-600',
          text: 'text-warning-700',
          badge: 'bg-warning-100 text-warning-700',
          title: '📅 Consultation aujourd\'hui',
          animate: false
        }
      default:
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-300',
          icon: 'text-primary-600',
          text: 'text-primary-700',
          badge: 'bg-primary-100 text-primary-700',
          title: '🔔 Rappel de consultation',
          animate: false
        }
    }
  }

  return (
    <AnimatePresence>
      {reminders.length > 0 && (
        <motion.div
          className="fixed top-24 right-4 max-w-md z-40 space-y-3"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
        >
          {reminders.map((reminder) => {
            const style = getAlertStyle(reminder.type)
            return (
              <motion.div
                key={reminder.id}
                className={`${style.bg} border-l-4 ${style.border} rounded-xl p-4 shadow-xl backdrop-blur-sm`}
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 400 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${style.badge}`}>
                        {reminder.type === 'soon' && '🚨 URGENT'}
                        {reminder.type === 'today' && '⏰ AUJOURD\'HUI'}
                        {reminder.type === 'upcoming' && '📋 À VENIR'}
                      </span>
                      {style.animate && (
                        <span className="inline-block w-2 h-2 bg-error-600 rounded-full animate-pulse"></span>
                      )}
                    </div>
                    <h4 className={`font-semibold ${style.text} mb-2`}>{style.title}</h4>
                    <p className={`text-sm ${style.text} font-medium mb-2`}>
                      Dr. {reminder.doctorName}
                    </p>
                    <p className={`text-xs ${style.text} opacity-80 mb-3`}>
                      {reminder.specialty}
                    </p>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${style.icon}`} />
                        <span className={`text-sm font-medium ${style.text}`}>
                          {reminder.date} à {reminder.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className={`h-4 w-4 ${style.icon}`} />
                        <span className={`text-sm ${style.text} line-clamp-1`}>
                          {reminder.location}
                        </span>
                      </div>
                    </div>

                    <div className={`${style.badge} px-3 py-2 rounded-lg text-sm font-bold w-fit`}>
                      {reminder.hoursUntil === 0 && '📍 MAINTENANT'}
                      {reminder.hoursUntil === 1 && '⏰ Dans 1h'}
                      {reminder.hoursUntil > 1 && reminder.hoursUntil < 24 && `⏱️ Dans ${Math.round(reminder.hoursUntil)}h`}
                      {reminder.hoursUntil >= 24 && `📆 Dans ${Math.ceil(reminder.hoursUntil / 24)}j`}
                    </div>
                  </div>

                  <button
                    onClick={() => onDismiss(reminder.id)}
                    className={`ml-2 mt-1 flex-shrink-0 ${style.icon} hover:opacity-70 transition-opacity p-1 hover:bg-white rounded-lg`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
