/**
 * @file src/services/mockAdapter.ts
 * @description
 * This file implements the "Mock Mode" for the frontend.
 * It intercepts HTTP requests sent via the global Axios instance and returns
 * simulated responses. This allows frontend development to proceed independently
 * of backend availability.
 * * @note This file is ONLY active when import.meta.env.DEV is true or VITE_USE_MOCK is set.
 */

import MockAdapter from 'axios-mock-adapter';
import api from '@/services/api';

// Define the simulated user delay (in milliseconds) to mimic real network latency
const RESPONSE_DELAY = 800;

/**
 * Initialize the Mock Adapter on the 'api' axios instance.
 * We use { onNoMatch: "passthrough" } to allow un-mocked requests (like external APIs)
 * to still go through to the real internet if needed.
 */
const mock = new MockAdapter(api, { 
  delayResponse: RESPONSE_DELAY,
  onNoMatch: "passthrough" 
});

// ----------------------------------------------------------------------
// MOCK DATA CONSTANTS
// ----------------------------------------------------------------------

const MOCK_USER = {
  id: 'user_12345',
  name: 'Jean Pierre', // Personalized for the developer
  email: 'jp@glucolens.com',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JeanPierre',
  role: 'researcher'
};

const MOCK_TOKEN = {
  access_token: 'mock_jwt_token_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  expires_in: 3600, // 1 hour
  token_type: 'bearer'
};

// ----------------------------------------------------------------------
// ENDPOINTS
// ----------------------------------------------------------------------

/**
 * POST /auth/login
 * @returns {AuthResponse}
 */
mock.onPost('/auth/login').reply((config) => {
  console.info(`[MockAPI] 🟢 POST ${config.url}`, JSON.parse(config.data));
  
  // Simulate a successful login for ANY valid email/password combo
  return [200, {
    ...MOCK_TOKEN,
    user: MOCK_USER
  }];
});

/**
 * POST /auth/register
 * @returns {AuthResponse}
 */
mock.onPost('/auth/register').reply((config) => {
  console.info(`[MockAPI] 🟢 POST ${config.url}`, JSON.parse(config.data));
  
  const requestData = JSON.parse(config.data);

  return [201, {
    ...MOCK_TOKEN,
    user: {
      ...MOCK_USER,
      name: requestData.full_name || 'New User',
      email: requestData.email
    }
  }];
});

const MOCK_GLUCOSE_HISTORY = [
  { time: '06:00', value: 95 },
  { time: '09:00', value: 140 },
  { time: '12:00', value: 110 },
  { time: '15:00', value: 135 },
  { time: '18:00', value: 105 },
  { time: '21:00', value: 120 },
  { time: '00:00', value: 98 },
];

// ----------------------------------------------------------------------
// ASSESSMENT MOCKS
// ----------------------------------------------------------------------

// POST /assessment/submit
mock.onPost('/assessment/submit').reply((config) => {
  console.info('[MockAPI] 🟢 Submitting Assessment:', JSON.parse(config.data));
  
  // Simulate server processing time and return a success message
  return [200, { 
    success: true, 
    message: 'Assessment analyzed successfully.',
    riskScore: 'Low',
    nextAction: 'Schedule follow-up'
  }];
});

// ----------------------------------------------------------------------
// SETTINGS MOCKS
// ----------------------------------------------------------------------

const MOCK_PREFERENCES = {
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
  twoFactorAuth: true
};

// GET /user/preferences
mock.onGet('/user/preferences').reply(200, MOCK_PREFERENCES);

// PUT /user/profile (Simulate updating details)
mock.onPut('/user/profile').reply((config) => {
  console.info('[MockAPI] 🔵 Updating Profile:', JSON.parse(config.data));
  return [200, { success: true, message: 'Profile updated successfully' }];
});

// PUT /user/preferences (Simulate toggling switches)
mock.onPut('/user/preferences').reply((config) => {
  console.info('[MockAPI] 🔵 Updating Preferences:', JSON.parse(config.data));
  return [200, { success: true, message: 'Preferences saved' }];
});

const MOCK_STATS = {
  avgGlucose: 115,
  glucoseChange: -4, // Percentage
  riskScore: 'Low',
  riskConfidence: 94,
  hba1c: 5.4
};

const MOCK_ACTIVITY = [
  { id: 1, title: 'Assessment Completed', desc: 'Risk Analysis: Low', time: '2h ago' },
  { id: 2, title: 'Lab Results Uploaded', desc: 'blood_work_jan.pdf', time: 'Yesterday' },
  { id: 3, title: 'Profile Updated', desc: 'Weight changed to 72kg', time: '3 days ago' }
];

// GET /dashboard/stats
mock.onGet('/dashboard/stats').reply(200, MOCK_STATS);

// GET /dashboard/glucose-history
mock.onGet('/dashboard/glucose-history').reply(200, MOCK_GLUCOSE_HISTORY);

// GET /dashboard/activity
mock.onGet('/dashboard/activity').reply(200, MOCK_ACTIVITY);

console.log('[MockAPI] Dashboard endpoints initialized');

/**
 * GET /user/profile
 * @returns {User}
 */
mock.onGet('/user/profile').reply(200, MOCK_USER);

console.warn(
  '%c ⚠️ MOCK ADAPTER INITIALIZED ⚠️ \n API calls are being intercepted by the frontend. ',
  'background: #F59E0B; color: black; font-weight: bold; padding: 4px; border-radius: 4px;'
);

export default mock;