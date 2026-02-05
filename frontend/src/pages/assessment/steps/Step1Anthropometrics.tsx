import { useForm } from 'react-hook-form';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Define strict validation types for this step
interface Step1Form {
  age: number;
  height: number;
  weight: number;
  waistCircumference: number;
}

export default function Step1Anthropometrics() {
  const { data, updateData, nextStep } = useAssessmentStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Form>({
    defaultValues: {
      age: data.age === '' ? undefined : data.age,
      height: data.height === '' ? undefined : data.height,
      weight: data.weight === '' ? undefined : data.weight,
      waistCircumference: data.waistCircumference === '' ? undefined : data.waistCircumference,
    }
  });

  const onSubmit = (formData: Step1Form) => {
    // 1. Save data to store
    updateData(formData);
    // 2. Move to Step 2
    nextStep();
  };

  return (
    <WizardLayout 
      title="Basic Body Metrics" 
      description="Let's start with your key anthropometric measurements."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input 
            label="Age (Years)" 
            type="number" 
            placeholder="e.g., 25"
            error={errors.age && "Age is required"}
            {...register('age', { required: true, min: 18, max: 100, valueAsNumber: true })}
          />
           
           {/* Placeholder for Gender Selection (We will add a custom component later) */}
           <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white"
                onChange={(e) => updateData({ gender: e.target.value as any })}
                defaultValue={data.gender}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
           </div>

          <Input 
            label="Height (cm)" 
            type="number" 
            placeholder="e.g., 175"
            error={errors.height && "Height is required"}
            {...register('height', { required: true, min: 50, max: 300, valueAsNumber: true })}
          />
          <Input 
            label="Weight (kg)" 
            type="number" 
            placeholder="e.g., 70"
            error={errors.weight && "Weight is required"}
            {...register('weight', { required: true, min: 20, max: 300, valueAsNumber: true })}
          />
          <Input 
            label="Waist Circumference (cm)" 
            type="number" 
            placeholder="e.g., 85"
            error={errors.waistCircumference && "Waist circumference is required"}
            {...register('waistCircumference', { required: true, min: 30, max: 200, valueAsNumber: true })}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" className="w-full md:w-auto px-8">
            Next Step
          </Button>
        </div>
      </form>
    </WizardLayout>
  );
}