import { useForm } from 'react-hook-form';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { Moon, Activity, Users } from 'lucide-react';

interface Step2Form {
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  sleepHours: number;
  familyHistory: boolean; // true = Yes, false = No
}

// Helper component for the Big Selection Cards
const SelectionCard = ({ selected, onClick, title, description, icon: Icon }: any) => (
  <div 
    onClick={onClick}
    className={cn(
      "cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-primary-300 hover:bg-primary-50",
      selected 
        ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" 
        : "border-gray-100 bg-white"
    )}
  >
    <div className="flex items-start gap-3">
      <div className={cn("p-2 rounded-lg", selected ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500")}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className={cn("font-semibold text-sm", selected ? "text-primary-700" : "text-gray-900")}>{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

export default function Step2Lifestyle() {
  const { data, updateData, nextStep, prevStep } = useAssessmentStore();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Step2Form>({
    defaultValues: {
      activityLevel: data.activityLevel || undefined,
      sleepHours: data.sleepHours || undefined,
      familyHistory: data.familyHistory
    }
  });

  // Watch values to update UI state for custom selectors
  const activityLevel = watch('activityLevel');
  const familyHistory = watch('familyHistory');

  const onSubmit = (formData: Step2Form) => {
    updateData(formData);
    nextStep();
  };

  return (
    <WizardLayout 
      title="Lifestyle Factors" 
      description="Your habits play a huge role in metabolic health."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* 1. Activity Level Section */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-900">Physical Activity Level</label>
          <div className="grid md:grid-cols-2 gap-3">
            <SelectionCard 
              title="Sedentary"
              description="Little to no exercise, desk job."
              icon={Activity}
              selected={activityLevel === 'sedentary'}
              onClick={() => setValue('activityLevel', 'sedentary')}
            />
            <SelectionCard 
              title="Lightly Active"
              description="Light exercise 1-3 days/week."
              icon={Activity}
              selected={activityLevel === 'light'}
              onClick={() => setValue('activityLevel', 'light')}
            />
            <SelectionCard 
              title="Moderately Active"
              description="Moderate exercise 3-5 days/week."
              icon={Activity}
              selected={activityLevel === 'moderate'}
              onClick={() => setValue('activityLevel', 'moderate')}
            />
            <SelectionCard 
              title="Very Active"
              description="Hard exercise 6-7 days/week."
              icon={Activity}
              selected={activityLevel === 'active'}
              onClick={() => setValue('activityLevel', 'active')}
            />
          </div>
          {errors.activityLevel && <p className="text-xs text-red-500">Please select an activity level</p>}
          {/* Hidden input for validation to work with React Hook Form */}
          <input type="hidden" {...register('activityLevel', { required: true })} />
        </div>

        {/* 2. Sleep Section */}
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <Moon className="h-5 w-5 text-gray-400" />
                 <label className="text-sm font-medium text-gray-900">Average Sleep (Hours/Night)</label>
              </div>
              <Input 
                type="number" 
                placeholder="e.g. 7.5" 
                {...register('sleepHours', { required: true, min: 1, max: 24, valueAsNumber: true })}
                error={errors.sleepHours && "Required (1-24)"}
              />
           </div>

           {/* 3. Family History Section */}
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <Users className="h-5 w-5 text-gray-400" />
                 <label className="text-sm font-medium text-gray-900">Family Diabetes History?</label>
              </div>
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant={familyHistory === true ? 'primary' : 'outline'}
                  onClick={() => setValue('familyHistory', true)}
                  className="flex-1"
                >
                  Yes
                </Button>
                <Button 
                  type="button" 
                  variant={familyHistory === false ? 'primary' : 'outline'}
                  onClick={() => setValue('familyHistory', false)}
                  className="flex-1"
                >
                  No
                </Button>
              </div>
           </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-100">
          <Button type="button" variant="ghost" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" size="lg" className="px-8">
            Next Step
          </Button>
        </div>
      </form>
    </WizardLayout>
  );
}