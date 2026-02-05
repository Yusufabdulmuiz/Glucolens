import api from './api';

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
}

export const settingsService = {
  getPreferences: async () => {
    const response = await api.get<UserPreferences>('/user/preferences');
    return response.data;
  },

  updateProfile: async (data: { name: string; email: string }) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },

  updatePreferences: async (data: Partial<UserPreferences>) => {
    const response = await api.put('/user/preferences', data);
    return response.data;
  }
};