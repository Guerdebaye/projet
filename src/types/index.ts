export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  location?: string
  dateOfBirth?: string
  bio?: string
}

export interface Carnet {
  id: string
  type: string
  date: string
  status: 'active' | 'used' | 'expired'
  doctor: string
  specialty: string
  qrCode: string
}

export interface Appointment {
  id: string
  doctor: string
  specialty: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
  location: string
}