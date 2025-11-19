import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Activity, TrendingUp, Calendar, Target, Award } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useAuthStore } from '../store/auth-store'
import { AuthRequired } from '../components/auth/AuthRequired'

interface HealthMetric {
  name: string
  value: number
  unit: string
  target: number
  trend: 'up' | 'down' | 'stable'
}

export const Health: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <AuthRequired
        title="Connectez-vous pour suivre votre santé"
        description="Accédez à vos indicateurs de santé, analysez vos tendances médicales et recevez des recommandations personnalisées"
        icon={<Heart className="h-10 w-10 text-white" />}
        feature="health"
      />
    )
  }

  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'progress'>('overview')

  const healthMetrics: HealthMetric[] = [
    { name: 'Fréquence cardiaque', value: 72, unit: 'bpm', target: 70, trend: 'stable' },
    { name: 'Pression artérielle', value: 120, unit: 'mmHg', target: 120, trend: 'stable' },
    { name: 'Steps today', value: 8432, unit: 'steps', target: 10000, trend: 'up' },
    { name: 'Heures de sommeil', value: 7.5, unit: 'hours', target: 8, trend: 'up' }
  ]

  const activities = [
    { type: 'Marche', duration: '30 min', calories: 150, date: 'Aujourd\'hui' },
    { type: 'Yoga', duration: '45 min', calories: 180, date: 'Hier' },
    { type: 'Course', duration: '20 min', calories: 240, date: '15 Fév' }
  ]

  const progressData = [
    { month: 'Jan', steps: 8000, sleep: 7.2, heartRate: 75 },
    { month: 'Fév', steps: 8500, sleep: 7.5, heartRate: 72 },
    { month: 'Mar', steps: 9000, sleep: 7.8, heartRate: 70 }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
      default: return <TrendingUp className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-medical py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Mon Suivi Santé</h1>
          <p className="text-gray-600 mt-2">Surveillez votre santé au quotidien</p>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mt-8 mb-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Heart },
              { id: 'activity', label: 'Activité', icon: Activity },
              { id: 'progress', label: 'Progrès', icon: TrendingUp }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {metric.value} {metric.unit}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="h-4 w-4 mr-1" />
                      Objectif: {metric.target} {metric.unit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-gradient-to-r from-primary-600 to-medical-500 h-2 rounded-full"
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Santé Cardiovasculaire</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800">Fréquence cardiaque au repos</span>
                      <span className="font-semibold text-green-800">72 bpm</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-800">Pression artérielle</span>
                      <span className="font-semibold text-blue-800">120/80 mmHg</span>
                    </div>
                    <Button className="w-full mt-4">
                      <Heart className="h-4 w-4 mr-2" />
                      Voir le détail
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Activité Physique</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-orange-800">Steps aujourd'hui</span>
                      <span className="font-semibold text-orange-800">8,432</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-800">Calories brûlées</span>
                      <span className="font-semibold text-purple-800">570 kcal</span>
                    </div>
                    <Button className="w-full mt-4">
                      <Activity className="h-4 w-4 mr-2" />
                      Voir le détail
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-6">Dernières activités</h3>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-primary-600 to-medical-500 p-2 rounded-lg">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">{activity.type}</h4>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{activity.duration}</p>
                        <p className="text-sm text-gray-600">{activity.calories} calories</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button className="w-full mt-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ajouter une activité
                </Button>
              </div>
            </motion.div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-6">Évolution mensuelle</h3>
                <div className="space-y-6">
                  {progressData.map((month, index) => (
                    <motion.div
                      key={month.month}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-16 text-sm font-medium text-gray-900">{month.month}</div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{month.steps}</div>
                          <div className="text-xs text-gray-600">steps</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{month.sleep}h</div>
                          <div className="text-xs text-gray-600">sommeil</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{month.heartRate}</div>
                          <div className="text-xs text-gray-600">bpm</div>
                        </div>
                      </div>
                      <Award className="h-5 w-5 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Progrès</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800">Objectif mensuel atteint</span>
                    <span className="font-semibold text-green-800">85%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800">Jours consécutifs</span>
                    <span className="font-semibold text-blue-800">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-800">Badges obtenus</span>
                    <span className="font-semibold text-purple-800">8</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}