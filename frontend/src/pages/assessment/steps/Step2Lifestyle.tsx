import { useForm } from 'react-hook-form';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Activity, Moon, Users, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step2Form {
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  sleepHours: number;
  familyHistory: boolean;
}

export default function Step2Lifestyle() {
  const { data, updateData, nextStep, prevStep } = useAssessmentStore();
  
  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<Step2Form>({
    defaultValues: {
      activityLevel: data.activityLevel || undefined,
      sleepHours: data.sleepHours || 7, // Default to 7 for the slider
      familyHistory: data.familyHistory
    }
  });

  const activityLevel = watch('activityLevel');
  const sleepHours = watch('sleepHours');
  const familyHistory = watch('familyHistory');

  const onSubmit = (formData: Step2Form) => {
    updateData(formData);
    nextStep();
  };

  const activityOptions = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
    { value: 'light', label: 'Light', desc: '1-2 days per week' },
    { value: 'moderate', label: 'Moderate', desc: '3-5 days per week' },
    { value: 'active', label: 'Active', desc: '6-7 days per week' },
  ] as const;

  return (
    <WizardLayout 
      title="Lifestyle Information" 
      description="Help us understand your daily habits and lifestyle."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Activity Level */}
        <div>
          <label className="flex items-center gap-2 text-foreground font-medium mb-3">
            <Activity className="w-5 h-5 text-primary" />
            Daily Physical Activity
          </label>
          <div className="space-y-2">
            {activityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue('activityLevel', option.value, { shouldValidate: true })}
                className={cn(
                  "w-full text-left py-3 px-4 rounded-lg border-2 transition-all",
                  activityLevel === option.value
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-input hover:border-ring bg-background"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={cn("font-medium", activityLevel === option.value ? "text-primary" : "text-foreground")}>
                      {option.label}
                    </div>
                    <div className="text-muted-foreground text-sm">{option.desc}</div>
                  </div>
                  {activityLevel === option.value && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          {errors.activityLevel && <p className="text-xs text-destructive mt-2">Please select an activity level</p>}
        </div>

        {/* Sleep Slider */}
        <div>
          <label className="flex items-center gap-2 text-foreground font-medium mb-3">
            <Moon className="w-5 h-5 text-primary" />
            Average Sleep (hours per night)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setValue('sleepHours', parseFloat(e.target.value))}
              className="flex-1 accent-primary"
            />
            <div className="bg-input-background px-4 py-2 rounded-lg min-w-[80px] text-center border border-input">
              <span className="text-foreground font-medium">{sleepHours} hrs</span>
            </div>
          </div>
        </div>

        {/* Family History */}
        <div>
          <label className="flex items-center gap-2 text-foreground font-medium mb-3">
            <Users className="w-5 h-5 text-primary" />
            Family history of diabetes?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue('familyHistory', true)}
              className={cn(
                "py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-medium",
                familyHistory === true
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-foreground hover:border-ring"
              )}
            >
              {familyHistory === true && <Check className="w-4 h-4" />} Yes
            </button>
            <button
              type="button"
              onClick={() => setValue('familyHistory', false)}
              className={cn(
                "py-3 px-4 rounded-lg border-2 transition-all font-medium",
                familyHistory === false
                  ? "border-input bg-background text-foreground ring-1 ring-ring/50"
                  : "border-input bg-background text-foreground hover:border-ring"
              )}
            >
              No
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-border">
          <Button type="button" variant="ghost" onClick={prevStep}>Back</Button>
          <Button type="submit" size="lg" className="px-8">Next Step</Button>
        </div>
      </form>
    </WizardLayout>
  );
}