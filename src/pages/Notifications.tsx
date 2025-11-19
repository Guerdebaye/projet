import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  InfoIcon,
  Clock,
  Trash2,
  Archive,
  Settings,
  ArrowRight,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { AuthRequired } from '../components/auth/AuthRequired';
import { useAuthStore } from '../store/auth-store';

interface Notification {
  id: string;
  type: 'alert' | 'reminder' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export const Notifications: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Consultation urgente',
      message: 'Votre rendez-vous avec Dr. Martin S. commence dans 1 heure. Lieu : Clinique Médicale de Dakar.',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      actionUrl: '/appointments'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Carnet de santé expirant',
      message: 'Votre carnet de santé général expire dans 15 jours. Pensez à le renouveler.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      read: false,
      actionUrl: '/carnets'
    },
    {
      id: '3',
      type: 'success',
      title: 'Rendez-vous confirmé',
      message: 'Votre rendez-vous du 25 novembre à 14h00 avec Dr. Fatou D. a été confirmé.',
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      read: true,
      actionUrl: '/appointments'
    },
    {
      id: '4',
      type: 'info',
      title: 'Nouvelle fonctionnalité',
      message: 'Découvrez notre nouveau système de suivi médical en temps réel.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000),
      read: true
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Rappel : Vaccination',
      message: 'N\'oubliez pas votre rappel de vaccination prévu pour le 20 novembre.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000),
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'alerts' | 'reminders'>('all');
  const [showContactForm, setShowContactForm] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'reminder':
        return <Clock className="h-5 w-5" />;
      default:
        return <InfoIcon className="h-5 w-5" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-error-50 border-error-200 text-error-700';
      case 'success':
        return 'bg-success-50 border-success-200 text-success-700';
      case 'reminder':
        return 'bg-warning-50 border-warning-200 text-warning-700';
      default:
        return 'bg-primary-50 border-primary-200 text-primary-700';
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'bg-error-100 text-error-600';
      case 'success':
        return 'bg-success-100 text-success-600';
      case 'reminder':
        return 'bg-warning-100 text-warning-600';
      default:
        return 'bg-primary-100 text-primary-600';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'alerts') return notif.type === 'alert';
    if (filter === 'reminders') return notif.type === 'reminder';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifs =>
      notifs.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifs => notifs.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    // simple relative formatter; keep dates localized
    if (minutes < 60) return `${t('notifications_page.time_ago_minutes', { count: minutes })}`;
    if (hours < 24) return `${t('notifications_page.time_ago_hours', { count: hours })}`;
    if (days < 7) return `${t('notifications_page.time_ago_days', { count: days })}`;
    return date.toLocaleDateString(i18n.language);
  };

  if (!isAuthenticated) {
    return <AuthRequired title={t('auth.login')} description={t('notifications_page.auth_required') || 'Veuillez vous connecter pour accéder à vos notifications'} feature="notifications" />;
  }

  return (
    <div className="min-h-screen bg-gradient-medical">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="bg-gradient-to-r from-error-600 to-warning-500 p-3 rounded-xl">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{t('notifications_page.title')}</h1>
                  <p className="text-gray-600">{t('notifications_page.subtitle')}</p>
                </div>
              </motion.div>
            </div>
            
            {unreadCount > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={markAllAsRead}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
              >
                {t('notifications_page.mark_all_read')} ({unreadCount})
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-xl shadow-card-pro p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">{t('notifications_page.filters_title')}</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: t('notifications_page.filters.all'), count: notifications.length },
                    { value: 'unread', label: t('notifications_page.filters.unread'), count: unreadCount },
                    { value: 'alerts', label: t('notifications_page.filters.alerts'), count: notifications.filter(n => n.type === 'alert').length },
                    { value: 'reminders', label: t('notifications_page.filters.reminders'), count: notifications.filter(n => n.type === 'reminder').length }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value as any)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        filter === option.value
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-card-pro p-6 border border-gray-200 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">{t('notifications_page.quick_actions_title')}</h3>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('notifications_page.quick_actions.settings')}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Archive className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('notifications_page.quick_actions.archive')}</span>
                </button>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-primary-600 to-medical-500 rounded-xl shadow-lg p-6 text-white space-y-4">
                <h3 className="font-semibold">{t('notifications_page.help_title') || 'Need help?'}</h3>
                <p className="text-sm text-primary-100">
                  {t('notifications_page.help_text') || 'Our team is available 24/7 to assist you.'}
                </p>
                <div className="space-y-2">
                  <a href="tel:+221700000000" className="flex items-center gap-2 text-sm hover:text-primary-50 transition-colors">
                    <Phone className="h-4 w-4" />
                    +221 700 000 000
                  </a>
                  <a href="mailto:support@medipass.sn" className="flex items-center gap-2 text-sm hover:text-primary-50 transition-colors">
                    <Mail className="h-4 w-4" />
                    support@medipass.sn
                  </a>
                </div>
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full mt-4 px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t('contact_submit')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content - Notifications List */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-card-pro p-12 text-center border border-gray-200"
                >
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune notification</h3>
                  <p className="text-gray-600 mb-6">Vous êtes à jour ! Aucune notification à afficher.</p>
                  <Link to="/appointments">
                    <Button>Voir vos rendez-vous</Button>
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                      className={`bg-white rounded-xl shadow-card-pro border-l-4 p-6 cursor-pointer hover:shadow-lg transition-all ${getColorClasses(notification.type)} ${!notification.read ? 'bg-opacity-50' : 'bg-opacity-100'}`}
                    >
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 p-3 rounded-lg ${getIconBgColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0 h-3 w-3 bg-primary-600 rounded-full mt-2"></div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-500">{formatTime(notification.timestamp)}</span>
                            
                            <div className="flex gap-2">
                              {notification.actionUrl && (
                                <Link to={notification.actionUrl}>
                                  <button className="px-3 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center gap-1">
                                    Voir
                                    <ArrowRight className="h-3 w-3" />
                                  </button>
                                </Link>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-medical-500 mt-20">
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
                  className="text-lg px-8 py-3 h-auto"
                >
                  Commencer maintenant
                </Button>
              </Link>
              <Link to="/contact" className="w-full">
                <button
                  className="w-full px-8 py-3 h-auto text-lg rounded-xl border border-medical-600 bg-white text-medical-600 font-bold focus:outline-none focus:ring-2 focus:ring-medical-500 transition-all"
                  style={{ color: '#2ba39f', background: '#fff', borderColor: '#2ba39f' }}
                >
                  Contacter un expert
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactForm(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contacter un expert</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-medical-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
