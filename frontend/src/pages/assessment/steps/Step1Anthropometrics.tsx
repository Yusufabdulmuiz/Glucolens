import { useForm } from 'react-hook-form';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calculator } from 'lucide-react';

interface Step1Form {
  age: number;
  gender: 'male' | 'female' | 'other' | '';
  height: number;
  weight: number;
  waistCircumference: number;
  hipCircumference: number;
}

export default function Step1Anthropometrics() {
  const { data, updateData, nextStep } = useAssessmentStore();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Step1Form>({
    defaultValues: {
      age: data.age === '' ? undefined : data.age,
      gender: data.gender,
      height: data.height === '' ? undefined : data.height,
      weight: data.weight === '' ? undefined : data.weight,
      waistCircumference: data.waistCircumference === '' ? undefined : data.waistCircumference,
      hipCircumference: data.hipCircumference === '' ? undefined : data.hipCircumference,
    }
  });

  // Watch height and weight to dynamically calculate BMI matching the UX feature
  const height = watch('height');
  const weight = watch('weight');

  let bmi: number | null = null;
  if (height > 0 && weight > 0) {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  }

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
    if (bmiValue < 25) return { label: 'Normal weight', color: 'text-green-600' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'text-yellow-600' };
    return { label: 'Obese', color: 'text-red-600' };
  };

  const onSubmit = (formData: Step1Form) => {
    updateData(formData);
    nextStep();
  };

  return (
    <WizardLayout 
      title="Basic Information" 
      description="Let's start with your basic health information."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Age and Sex Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Age" 
            type="number" 
            placeholder="Your age"
            error={errors.age && "Age is required"}
            {...register('age', { required: true, min: 18, max: 120, valueAsNumber: true })}
          />
           
           <div className="w-full space-y-1">
              <label className="block text-sm font-medium text-foreground">Sex</label>
              <select 
                className={`flex h-9 w-full rounded-md border bg-input-background px-3 py-1 text-base transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm ${
                  errors.gender ? "border-destructive ring-destructive/20" : "border-input"
                }`}
                {...register('gender', { required: true })}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-xs text-destructive font-medium">Sex is required</p>}
           </div>
        </div>

        {/* Height and Weight Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Height (cm)" 
            type="number" 
            placeholder="e.g., 170"
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
        </div>

        {/* Dynamic BMI Calculator (from UX repo) */}
        {bmi && (
          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900 font-medium text-sm">Body Mass Index (BMI)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{bmi.toFixed(1)}</span>
              <span className={`font-medium ${getBmiCategory(bmi).color}`}>
                {getBmiCategory(bmi).label}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              BMI = Weight (kg) / Height² (m²)
            </p>
          </div>
        )}

        {/* Circumference Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Waist Circumference (cm)" 
            type="number" 
            placeholder="Optional"
            error={errors.waistCircumference && "Waist circumference is required"}
            {...register('waistCircumference', { required: true, min: 30, max: 200, valueAsNumber: true })}
          />
          <Input 
            label="Hip Circumference (cm)" 
            type="number" 
            placeholder="Optional"
            {...register('hipCircumference', { min: 30, max: 200, valueAsNumber: true })}
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-border">
          <Button type="submit" size="lg" className="w-full md:w-auto">
            Next Step
          </Button>
        </div>
      </form>
    </WizardLayout>
  );
}