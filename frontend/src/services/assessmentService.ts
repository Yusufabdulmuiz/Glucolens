import api from './api';
import { type AssessmentData } from '@/store/assessmentStore';

export const assessmentService = {
  /**
   * Submit the full assessment data.
   * Note: In a real app, we use FormData to send files + text.
   */
  submitAssessment: async (data: AssessmentData) => {
    const formData = new FormData();

    // 1. Append Text Fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && typeof value !== 'object') {
        formData.append(key, String(value));
      }
    });

    // 2. Append Files (if they exist)
    if (data.signsImage) formData.append('signsImage', data.signsImage);
    if (data.labFile) formData.append('labFile', data.labFile);
    if (data.genomicFile) formData.append('genomicFile', data.genomicFile);

    // 3. Send to API (intercepted by Mock Adapter for now)
    // Note: We use JSON.stringify for the mock to work easily, 
    // but in real prod you'd send formData directly.
    // For this Mock setup, we will convert to a plain object to prevent mock errors.
    
    // DEV MODE HELPER: Convert files to strings just for the mock to read them
    const mockPayload = { ...data, signsImage: data.signsImage?.name, labFile: data.labFile?.name };
    
    const response = await api.post('/assessment/submit', mockPayload);
    return response.data;
  }
};