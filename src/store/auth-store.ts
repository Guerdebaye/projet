import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (userData: Omit<User, 'id'> & { password: string; confirmPassword: string }) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulation d'une API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        if (email === 'patient@medipass.com' && password === 'password') {
          set({
            user: {
              id: '1',
              name: 'Jean Dupont',
              email: email,
              phone: '+33 6 12 34 56 78'
            },
            isAuthenticated: true,
          })
          return { success: true }
        } else {
          return { success: false, message: 'Email ou mot de passe incorrect' }
        }
      },
      register: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        if (userData.password !== userData.confirmPassword) {
          return { success: false, message: 'Les mots de passe ne correspondent pas' }
        }
        
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: userData.name,
            email: userData.email,
            phone: userData.phone
          },
          isAuthenticated: true,
        })
        return { success: true }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)