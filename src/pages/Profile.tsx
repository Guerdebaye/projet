import React, { useState } from 'react';
import { useAuthStore } from '../store/auth-store';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTranslation } from 'react-i18next';

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { t, i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+221 77 123 45 67',
    location: user?.location || 'Dakar, Sénégal',
    dateOfBirth: user?.dateOfBirth || '1990-01-15',
    bio: user?.bio || 'Passionné par ma santé et le bien-être',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Mettre à jour le profil via API
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="h-32 bg-gradient-vibrant"></div>
          
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div className="h-32 w-32 bg-gradient-to-r from-primary-600 to-medical-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                  <User className="h-16 w-16 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>
                  <p className="text-gray-500">{t('profile.role')}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-primary-600 to-medical-500 hover:from-primary-700 hover:to-medical-600 flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    {t('profile.edit')}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="bg-accent-500 hover:bg-accent-600 flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {t('profile.save')}
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      {t('profile.cancel')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('profile.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('profile.name')}</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="h-4 w-4" />
                {t('profile.email')}
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone className="h-4 w-4" />
                {t('profile.phone')}
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.phone}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="h-4 w-4" />
                {t('profile.location')}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.location}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="h-4 w-4" />
                {t('profile.dob')}
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 font-medium">{new Date(formData.dateOfBirth).toLocaleDateString(i18n.language)}</p>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('profile.bio')}</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.bio}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Health Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-primary-600 to-medical-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{t('profile.stats.appointments')}</h3>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-gray-500 text-xs mt-2">3 à venir</p>
          </div>

          {/* Medical Records */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-medical-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{t('profile.stats.carnets')}</h3>
            <p className="text-3xl font-bold text-gray-900">2</p>
            <p className="text-gray-500 text-xs mt-2">Mis à jour aujourd'hui</p>
          </div>

          {/* Doctors */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="h-12 w-12 bg-gradient-to-r from-accent-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{t('profile.stats.doctors')}</h3>
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-gray-500 text-xs mt-2">Spécialistes</p>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-8 border-l-4 border-error-600"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('profile.danger.title')}</h2>
          <p className="text-gray-600 mb-6">{t('profile.danger.warning')}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="border-error-600 text-error-600 hover:bg-error-50"
            >
              {t('profile.danger.change_password')}
            </Button>
            <Button
              className="bg-error-600 hover:bg-error-700 text-white"
            >
              {t('profile.danger.delete_account')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
