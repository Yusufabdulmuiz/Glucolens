import api from './api';
import { type AssessmentData } from '@/store/assessmentStore';

export const assessmentService = {
  submitAssessment: async (data: AssessmentData) => {
    const formData = new FormData();

    // 1. Append Text Fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && typeof value !== 'object') {
        formData.append(key, String(value));
      }
    });

    // 2. Append Binary Files (if they exist)
    if (data.signsImage) formData.append('signsImage', data.signsImage);
    if (data.labFile) formData.append('labFile', data.labFile);
    if (data.genomicFile) formData.append('genomicFile', data.genomicFile);

    // 3. Determine Routing based on Environment
    const isMockActive = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK === 'true';

    if (isMockActive) {
      // DEV MODE: Send mapped strings so the mock adapter doesn't crash
      const mockPayload = { 
        ...data, 
        signsImage: data.signsImage?.name, 
        labFile: data.labFile?.name,
        genomicFile: data.genomicFile?.name
      };
      const response = await api.post('/assessment/submit', mockPayload);
      return response.data;
    } else {
      // PRODUCTION: Send true binary FormData to real backend
      const response = await api.post('/assessment/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  }
};