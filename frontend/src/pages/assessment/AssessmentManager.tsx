import { useAssessmentStore } from '@/store/assessmentStore';
import Step1Anthropometrics from './steps/Step1Anthropometrics';
import Step2Lifestyle from './steps/Step2Lifestyle';
import Step3PhysicalSigns from './steps/Step3PhysicalSigns';
import Step4LabResults from './steps/Step4LabResults';
import Step5Genomic from './steps/Step5Genomic';

export default function AssessmentManager() {
  const currentStep = useAssessmentStore((state) => state.currentStep);

  // The Switch: Decides which component to show
  switch (currentStep) {
    case 1:
      return <Step1Anthropometrics />; //Antropometrics
    case 2:
      return <Step2Lifestyle />; // Lifestyle
    case 3:
      return <Step3PhysicalSigns />; // Physical Signs
    case 4:
      return <Step4LabResults />; // Lab Results
    case 5:
      return <Step5Genomic />; // Genomic
    default:
      return <div>Error: Unknown Step</div>;
  }
}