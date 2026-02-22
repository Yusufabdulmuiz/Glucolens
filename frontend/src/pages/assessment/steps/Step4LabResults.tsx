import { useForm } from 'react-hook-form';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Check, UploadCloud, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step3Form {
  acanthosisNigricans: boolean | null;
  acanthosisImage: File | null;
  skinTags: boolean | null;
  skinTagsImage: File | null;
}

export default function Step3PhysicalSigns() {
  const { data, updateData, nextStep, prevStep } = useAssessmentStore();
  
  const { handleSubmit, setValue, watch } = useForm<Step3Form>({
    defaultValues: {
      acanthosisNigricans: data.acanthosisNigricans,
      acanthosisImage: data.acanthosisImage,
      skinTags: data.skinTags,
      skinTagsImage: data.skinTagsImage,
    }
  });

  const acanthosisNigricans = watch('acanthosisNigricans');
  const acanthosisImage = watch('acanthosisImage');
  const skinTags = watch('skinTags');
  const skinTagsImage = watch('skinTagsImage');

  const onSubmit = (formData: Step3Form) => {
    updateData(formData);
    // Note: In the final pass, this will trigger assessmentService.uploadPhysicalSigns
    nextStep();
  };

  // Helper to handle file selection
  const handleFileChange = (field: 'acanthosisImage' | 'skinTagsImage', file: File | null) => {
    setValue(field, file, { shouldValidate: true });
  };

  return (
    <WizardLayout 
      title="Physical Signs" 
      description="Please review the images below and indicate if you have any of these signs."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* --- SIGN 1: Acanthosis Nigricans --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-lg font-semibold text-foreground">Acanthosis Nigricans</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Reference Image Placeholder */}
            <div className="bg-slate-100 rounded-xl aspect-video flex flex-col items-center justify-center text-slate-400 border border-slate-200">
              <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm font-medium">Reference Image</span>
              <span className="text-xs px-4 text-center mt-1">Dark, velvety discoloration in body folds</span>
            </div>

            {/* Right: Question & Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">Do you have this?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button" onClick={() => setValue('acanthosisNigricans', true)}
                  className={cn("py-3 px-4 rounded-lg border-2 transition-all font-medium flex items-center justify-center gap-2", acanthosisNigricans === true ? "border-primary bg-primary text-white" : "border-input bg-background hover:border-primary/50")}
                >
                  {acanthosisNigricans === true && <Check className="w-4 h-4" />} Yes
                </button>
                <button
                  type="button" onClick={() => { setValue('acanthosisNigricans', false); setValue('acanthosisImage', null); }}
                  className={cn("py-3 px-4 rounded-lg border-2 transition-all font-medium", acanthosisNigricans === false ? "border-input bg-muted ring-1 ring-ring/50" : "border-input bg-background hover:border-primary/50")}
                >
                  No
                </button>
              </div>

              {/* Conditional Upload Zone */}
              {acanthosisNigricans === true && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-foreground mb-2">Take a photo to compare</label>
                  {!acanthosisImage ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-6 h-6 text-primary mb-2" />
                        <p className="text-sm text-primary font-medium">Click to upload photo</p>
                      </div>
                      <input 
                        type="file" accept="image/*" className="hidden" 
                        onChange={(e) => handleFileChange('acanthosisImage', e.target.files?.[0] || null)} 
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-lg">
                      <span className="text-sm font-medium text-primary truncate">{acanthosisImage.name}</span>
                      <button type="button" onClick={() => handleFileChange('acanthosisImage', null)} className="p-1 hover:bg-primary/20 rounded-md transition-colors text-primary">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SIGN 2: Skin Tags (Acrochordons) --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-lg font-semibold text-foreground">Skin Tags (Acrochordons)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Reference Image Placeholder */}
            <div className="bg-slate-100 rounded-xl aspect-video flex flex-col items-center justify-center text-slate-400 border border-slate-200">
              <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm font-medium">Reference Image</span>
              <span className="text-xs px-4 text-center mt-1">Small, soft, skin-colored growths</span>
            </div>

            {/* Right: Question & Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">Do you have this?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button" onClick={() => setValue('skinTags', true)}
                  className={cn("py-3 px-4 rounded-lg border-2 transition-all font-medium flex items-center justify-center gap-2", skinTags === true ? "border-primary bg-primary text-white" : "border-input bg-background hover:border-primary/50")}
                >
                  {skinTags === true && <Check className="w-4 h-4" />} Yes
                </button>
                <button
                  type="button" onClick={() => { setValue('skinTags', false); setValue('skinTagsImage', null); }}
                  className={cn("py-3 px-4 rounded-lg border-2 transition-all font-medium", skinTags === false ? "border-input bg-muted ring-1 ring-ring/50" : "border-input bg-background hover:border-primary/50")}
                >
                  No
                </button>
              </div>

              {/* Conditional Upload Zone */}
              {skinTags === true && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-foreground mb-2">Take a photo to compare</label>
                  {!skinTagsImage ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-6 h-6 text-primary mb-2" />
                        <p className="text-sm text-primary font-medium">Click to upload photo</p>
                      </div>
                      <input 
                        type="file" accept="image/*" className="hidden" 
                        onChange={(e) => handleFileChange('skinTagsImage', e.target.files?.[0] || null)} 
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-lg">
                      <span className="text-sm font-medium text-primary truncate">{skinTagsImage.name}</span>
                      <button type="button" onClick={() => handleFileChange('skinTagsImage', null)} className="p-1 hover:bg-primary/20 rounded-md transition-colors text-primary">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button type="button" variant="ghost" onClick={prevStep}>Back</Button>
          <Button type="submit" size="lg" className="px-8">Next Step</Button>
        </div>
      </form>
    </WizardLayout>
  );
}