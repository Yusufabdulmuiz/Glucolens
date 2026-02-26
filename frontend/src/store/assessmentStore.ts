import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AssessmentData {
  // --- Step 1: Basic Info & Health History ---
  fullName: string;
  age: number | '';
  gender: 'male' | 'female' | 'other' | '';
  height: number | ''; // cm
  weight: number | ''; // kg
  waistCircumference: number | ''; // cm
  armCircumference: number | ''; // cm
  
  familyHistory: boolean | null;
  familyCondition: string; 
  familyRelationship: 'Parent' | 'Sibling' | 'Grandparent' | 'Other' | '';
  
  hasDiabetes: boolean | null;
  diabetesType: string;
  
  otherConditions: string;
  currentMedication: string;
  
  // --- Step 2: Lifestyle ---
  educationLevel: 'primary' | 'secondary' | 'college' | 'postgraduate' | '';
  socialLife: 'very_active' | 'moderate' | 'limited' | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | '';
  sleepHours: number | '';
  smoking: 'never' | 'occasionally' | 'yes' | '';
  alcohol: 'never' | 'occasionally' | 'regularly' | '';
  
  // --- Step 3: Physical Signs ---
  acanthosisNigricans: boolean | null;
  acanthosisImage: File | null;
  skinTags: boolean | null;
  skinTagsImage: File | null;
  
  // --- Step 4: Lab Results ---
  labFile: File | null;
  fastingGlucose: number | '';
  totalCholesterol: number | '';
  hba1c: number | '';
  systolicBP: number | '';
  
  // --- Step 5: Genomic Data ---
  genomicFile: File | null;
}

interface AssessmentState {
  currentStep: number;
  totalSteps: number;
  data: AssessmentData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (fields: Partial<AssessmentData>) => void;
  resetAssessment: () => void;
}

const INITIAL_DATA: AssessmentData = {
  fullName: '', age: '', gender: '', height: '', weight: '', waistCircumference: '', armCircumference: '',
  familyHistory: null, familyCondition: '', familyRelationship: '',
  hasDiabetes: null, diabetesType: '', otherConditions: '', currentMedication: '',
  educationLevel: '', socialLife: '', activityLevel: '', sleepHours: 7, smoking: '', alcohol: '',
  acanthosisNigricans: null, acanthosisImage: null, skinTags: null, skinTagsImage: null,
  labFile: null, fastingGlucose: '', totalCholesterol: '', hba1c: '', systolicBP: '',
  genomicFile: null
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      currentStep: 1,
      totalSteps: 5,
      data: INITIAL_DATA,
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      updateData: (fields) => set((state) => ({ data: { ...state.data, ...fields } })),
      resetAssessment: () => set({ currentStep: 1, data: INITIAL_DATA })
    }),
    {
      name: 'glucolens-assessment-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        ...state,
        data: {
          ...state.data,
          acanthosisImage: null,
          skinTagsImage: null,
          labFile: null,
          genomicFile: null
        }
      })
    }
  )
);