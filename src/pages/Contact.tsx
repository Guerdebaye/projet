import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-medical flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 border border-slate-200"
      >
        <h1 className="text-3xl font-bold text-primary-700 mb-4 text-center">{t('contact_title')}</h1>
        <p className="text-gray-600 text-center mb-8">{t('contact.subtitle', 'Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.')}</p>
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-medical-600" />
            <span className="text-gray-700 font-medium">+221 700 000 000</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-medical-600" />
            <span className="text-gray-700 font-medium">support@medipass.sn</span>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.name')}</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('contact.name_placeholder', 'Votre nom')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.email')}</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('contact.email_placeholder', 'votre@email.com')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.message')}</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none" placeholder={t('contact.message_placeholder', 'Comment pouvons-nous vous aider ?')} />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-medical-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {t('contact_submit')}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
