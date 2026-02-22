import api from './api';
import { type AssessmentData } from '@/store/assessmentStore';

/**
 * Assessment Service
 * Handles the step-by-step modular API calls based on the backend contract.
 */
export const assessmentService = {
  
  // STEP 1
  async submitAnthropometrics(data: Partial<AssessmentData>) {
    // Only send Step 1 data to the backend
    const payload = {
      full_name: data.fullName,
      age: data.age,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      waist_circumference: data.waistCircumference,
      arm_circumference: data.armCircumference,
      family_history: data.familyHistory,
      family_condition: data.familyCondition,
      family_relationship: data.familyRelationship,
      has_diabetes: data.hasDiabetes,
      diabetes_type: data.diabetesType,
      other_conditions: data.otherConditions,
      current_medication: data.currentMedication
    };
    const response = await api.post('/data/anthropometric', payload);
    return response.data;
  },

  // STEP 2
  async submitLifestyle(data: Partial<AssessmentData>) {
    const payload = {
      education_level: data.educationLevel,
      social_life: data.socialLife,
      activity_level: data.activityLevel,
      sleep_hours: data.sleepHours,
      smoking: data.smoking,
      alcohol: data.alcohol
    };
    const response = await api.post('/data/lifestyle', payload);
    return response.data;
  },

  // STEP 3
  async uploadPhysicalSigns(data: Partial<AssessmentData>) {
    const formData = new FormData();
    formData.append('acanthosis_nigricans', String(data.acanthosisNigricans));
    formData.append('skin_tags', String(data.skinTags));
    
    if (data.acanthosisImage) formData.append('acanthosis_image', data.acanthosisImage);
    if (data.skinTagsImage) formData.append('skin_tags_image', data.skinTagsImage);

    const response = await api.post('/images/signs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // STEP 4 & 5 (Combined for Final Predict Call per README)
  async runPrediction(data: Partial<AssessmentData>) {
    // We send the final manual labs and trigger the prediction
    const payload = {
      fasting_glucose: data.fastingGlucose,
      total_cholesterol: data.totalCholesterol,
      hba1c: data.hba1c,
      systolic_bp: data.systolicBP,
      use_modalities: ['anthropometric', 'lifestyle', 'signs'] // Genomic/Labs optional based on actual files
    };
    
    const response = await api.post('/predict', payload);
    return response.data;
  }
};