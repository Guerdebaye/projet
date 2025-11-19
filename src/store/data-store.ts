import { create } from 'zustand'

export const useDataStore = create(() => ({
  cities: [
    'Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 
    'Mbour', 'Diourbel', 'Louga', 'Tambacounda', 'Kolda', 'Richard-Toll'
  ],
  
  hospitals: [
    // Dakar
    {
      id: '1',
      name: 'Hôpital Aristide Le Dantec',
      city: 'Dakar',
      address: 'Route de la Corniche, Dakar',
      phone: '+221 33 839 50 50',
      specialties: ['Médecine Générale', 'Cardiologie', 'Chirurgie', 'Pédiatrie', 'Urgence']
    },
    {
      id: '2',
      name: 'Hôpital Principal de Dakar',
      city: 'Dakar',
      address: 'Avenue du Président Lamine Guèye, Dakar',
      phone: '+221 33 839 50 50',
      specialties: ['Médecine Générale', 'Dermatologie', 'Ophtalmologie', 'Gynécologie']
    },
    {
      id: '3',
      name: 'Hôpital d\'enfants Albert Royer',
      city: 'Dakar',
      address: 'Route de l\'Aéroport, Dakar',
      phone: '+221 33 869 10 10',
      specialties: ['Pédiatrie', 'Urgence Pédiatrique']
    },
    // Thiès
    {
      id: '4',
      name: 'Centre Hospitalier Régional de Thiès',
      city: 'Thiès',
      address: 'Route de Khombole, Thiès',
      phone: '+221 33 951 10 10',
      specialties: ['Médecine Générale', 'Pédiatrie', 'Radiologie', 'Maternité']
    },
    // Saint-Louis
    {
      id: '5',
      name: 'Hôpital Régional de Saint-Louis',
      city: 'Saint-Louis',
      address: 'Avenue Jean Mermoz, Saint-Louis',
      phone: '+221 33 961 10 10',
      specialties: ['Médecine Générale', 'Chirurgie', 'Maternité', 'Urgence']
    },
    // Autres régions
    {
      id: '6',
      name: 'Centre Hospitalier Régional de Kaolack',
      city: 'Kaolack',
      address: 'Route de Nioro, Kaolack',
      phone: '+221 33 941 10 10',
      specialties: ['Médecine Générale', 'Pédiatrie', 'Chirurgie']
    },
    {
      id: '7',
      name: 'Hôpital Régional de Ziguinchor',
      city: 'Ziguinchor',
      address: 'Route de Kabrousse, Ziguinchor',
      phone: '+221 33 991 10 10',
      specialties: ['Médecine Générale', 'Maternité', 'Urgence']
    }
  ],

  // Ajoute les médecins par hôpital
  doctors: [
    {
      id: '1',
      name: 'Dr. Amadou Bâ',
      specialty: 'Médecin Généraliste',
      hospitalId: '1',
      rating: 4.8,
      experience: 15,
      languages: ['Français', 'Wolof'],
      availableSlots: ['08:00', '09:30', '11:00', '14:00', '15:30']
    },
    {
      id: '2',
      name: 'Dr. Marie Ndiaye',
      specialty: 'Pédiatre',
      hospitalId: '1',
      rating: 4.9,
      experience: 12,
      languages: ['Français', 'Wolof'],
      availableSlots: ['08:30', '10:00', '11:30', '14:30', '16:00']
    },
    {
      id: '3',
      name: 'Dr. Ibrahima Sow',
      specialty: 'Cardiologue',
      hospitalId: '1',
      rating: 4.7,
      experience: 20,
      languages: ['Français', 'Wolof', 'Anglais'],
      availableSlots: ['09:00', '10:30', '13:00', '15:00']
    },
    {
      id: '4',
      name: 'Dr. Fatou Diop',
      specialty: 'Gynécologue',
      hospitalId: '2',
      rating: 4.8,
      experience: 10,
      languages: ['Français', 'Wolof'],
      availableSlots: ['08:00', '09:30', '11:00', '14:00', '15:30']
    }
  ],

  paymentMethods: [
    { id: 'wave', name: 'Wave', type: 'mobile', logo: '🌊', instructions: 'Composez *221#' },
    { id: 'orange', name: 'Orange Money', type: 'mobile', logo: '🟠', instructions: 'Composez *144#' },
    { id: 'free', name: 'Free Money', type: 'mobile', logo: '🟢', instructions: 'Composez *123#' },
    { id: 'carte', name: 'Carte Bancaire', type: 'card', logo: '💳', instructions: 'Paiement sécurisé' },
    { id: 'virement', name: 'Virement Bancaire', type: 'bank', logo: '🏦', instructions: 'RIB disponible' }
  ],

  carnetTypes: [
    { id: 'consultation', name: 'Consultation Générale', price: 5000, validite: '3 mois' },
    { id: 'specialiste', name: 'Consultation Spécialiste', price: 10000, validite: '6 mois' },
    { id: 'urgence', name: 'Consultation Urgence', price: 15000, validite: '1 mois' },
    { id: 'maternite', name: 'Consultation Maternité', price: 8000, validite: '9 mois' },
    { id: 'pediatrie', name: 'Consultation Pédiatrie', price: 6000, validite: '3 mois' },
    { id: 'chirurgie', name: 'Consultation Chirurgie', price: 20000, validite: '6 mois' }
  ]
}))