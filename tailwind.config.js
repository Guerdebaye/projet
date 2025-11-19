/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs primaires - Bleu moderne et dynamique
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Couleurs secondaires - Teal vibrant
        medical: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Couleurs d'accent - Orange/Coral dynamique
        accent: {
          50: '#fff7ed',
          100: '#fed7aa',
          200: '#fdba74',
          300: '#fb923c',
          400: '#f97316',
          500: '#ea580c',
          600: '#c2410c',
          700: '#9a3412',
          800: '#7c2d12',
          900: '#431407',
        },
        // Couleurs neutres pro
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Couleurs de feedback
        success: {
          50: '#f0fdf4',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      backgroundImage: {
        'gradient-pro': 'linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #fef3c7 100%)',
        'gradient-medical': 'linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e40af 0%, #0f766e 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 50%, #ea580c 100%)',
      },
      boxShadow: {
        'sm-pro': '0 1px 2px 0 rgba(31, 53, 85, 0.05)',
        'md-pro': '0 4px 6px -1px rgba(31, 53, 85, 0.1), 0 2px 4px -2px rgba(31, 53, 85, 0.1)',
        'lg-pro': '0 10px 15px -3px rgba(31, 53, 85, 0.1), 0 4px 6px -4px rgba(31, 53, 85, 0.1)',
        'xl-pro': '0 20px 25px -5px rgba(31, 53, 85, 0.1), 0 8px 10px -6px rgba(31, 53, 85, 0.1)',
        'card-pro': '0 2px 8px -2px rgba(31, 53, 85, 0.08)',
      },
    },
  },
  plugins: [],
}