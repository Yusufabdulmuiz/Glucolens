import api from './api';

export interface DashboardStats {
  avgGlucose: number;
  glucoseChange: number;
  riskScore: string | number;
  riskConfidence: number;
  hba1c: number;
  
  // NEW: Profile data expected from the backend
  weight?: number;
  height?: number;
  waistCircumference?: number;
  activityLevel?: string;
}

export interface GlucoseDataPoint {
  time: string;
  value: number;
}

export interface ActivityItem {
  id: number;
  title: string;
  desc: string;
  time: string;
}

export const dashboardService = {
  getStats: async () => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
  
  getGlucoseHistory: async () => {
    const response = await api.get<GlucoseDataPoint[]>('/dashboard/glucose-history');
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await api.get<ActivityItem[]>('/dashboard/activity');
    return response.data;
  }
};