import { create } from 'zustand';

// 1. Define the Shape of the Data
export interface AssessmentData {
  // Step 1: Anthropometrics
  age: number | '';
  gender: 'male' | 'female' | '';
  height: number | ''; // cm
  weight: number | ''; // kg
  waistCircumference: number | ''; // cm
  hipCircumference: number | ''; // cm
  
  // Step 2: Lifestyle
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | '';
  sleepHours: number | '';
  familyHistory: boolean;
  
  // Step 3: Physical Signs (Images)
  signsImage: File | null;
  
  // Step 4 & 5: Lab & Genomic (Optional)
  labFile: File | null;
  genomicFile: File | null;
}

interface AssessmentState {
  currentStep: number;
  totalSteps: number;
  data: AssessmentData;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (fields: Partial<AssessmentData>) => void;
  resetAssessment: () => void;
}

const INITIAL_DATA: AssessmentData = {
  age: '', gender: '', height: '', weight: '', waistCircumference: '', hipCircumference: '',
  activityLevel: '', sleepHours: '', familyHistory: false,
  signsImage: null, labFile: null, genomicFile: null
};

export const useAssessmentStore = create<AssessmentState>((set) => ({
  currentStep: 1,
  totalSteps: 5,
  data: INITIAL_DATA,

  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, state.totalSteps) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
  
  updateData: (fields) => set((state) => ({ 
    data: { ...state.data, ...fields } 
  })),
  
  resetAssessment: () => set({ 
    currentStep: 1, 
    data: INITIAL_DATA 
  })
}));