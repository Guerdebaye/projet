import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Clock, 
  Calendar, 
  Heart, 
  ArrowRight,
  PlayCircle,
  Star,
  Users,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Clock,
      title: 'Zéro Attente',
      description: 'Finies les longues files d\'attente pour vos carnets de santé. Achetez et gérez vos tickets en ligne.'
    },
    {
      icon: Shield,
      title: 'Sécurité Maximale',
      description: 'Vos données médicales protégées avec chiffrement de bout en bout et authentification sécurisée.'
    },
    {
      icon: Calendar,
      title: 'Rendez-vous Intelligents',
      description: 'Planification et gestion simplifiée de vos consultations avec rappels automatiques.'
    },
    {
      icon: Heart,
      title: 'Suivi Santé Complet',
      description: 'Surveillez votre santé avec des outils dédiés et un historique médical centralisé.'
    },
    {
      icon: Zap,
      title: 'Rapide & Efficace',
      description: 'Interface optimisée pour une expérience utilisateur fluide et intuitive.'
    },
    {
      icon: Users,
      title: 'Réseau Médical',
      description: 'Accédez à un réseau de professionnels de santé qualifiés et certifiés.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Patients satisfaits' },
    { value: '200+', label: 'Médecins partenaires' },
    { value: '98%', label: 'Taux de satisfaction' },
    { value: '24/7', label: 'Support disponible' }
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Patient',
      content: 'MediPass a révolutionné ma façon de gérer mes soins. Plus jamais de files d\'attente !',
      rating: 5
    },
    {
      name: 'Dr. Martin S.',
      role: 'Médecin',
      content: 'Une plateforme exceptionnelle qui simplifie la relation avec mes patients.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-medical">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8"
            >
              <Star className="h-4 w-4 mr-2 fill-current" />
              Solution médicale innovante
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {t('hero_title')}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('hero_sub')}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/carnets">
                <Button size="lg" className="text-lg px-8 py-3 h-auto group">
                  {t('home.cta_explore')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 h-auto">
                <PlayCircle className="mr-2 h-5 w-5" />
                {t('home.cta_demo')}
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-medical-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Une expérience médicale{' '}
              <span className="bg-gradient-to-r from-primary-600 to-medical-500 bg-clip-text text-transparent">
                réinventée
              </span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment MediPass transforme votre parcours de santé avec des fonctionnalités innovantes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-3 rounded-xl w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Ils nous font{' '}
              <span className="bg-gradient-to-r from-primary-600 to-medical-500 bg-clip-text text-transparent">
                confiance
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-lg italic mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-medical-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à révolutionner votre santé ?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Rejoignez des milliers de patients et professionnels de santé qui ont déjà adopté MediPass
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/carnets">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-8 py-3 h-auto border-white text-black hover:text-primary-600"
                >
                  Commencer maintenant
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 h-auto border-white text-black hover:text-primary-600"
              >
                Contacter un expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};