import { useState, useRef } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Camera, Upload, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Step3PhysicalSigns() {
  const { data, updateData, nextStep, prevStep } = useAssessmentStore();
  const [preview, setPreview] = useState<string | null>(
    data.signsImage ? URL.createObjectURL(data.signsImage) : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ signsImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateData({ signsImage: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleNext = () => {
    if (!data.signsImage) {
      alert("Please upload or capture an image to proceed.");
      return;
    }
    nextStep();
  };

  return (
    <WizardLayout 
      title="Physical Signs" 
      description="We analyze skin biomarkers for early signs of insulin resistance."
    >
      <div className="space-y-6">
        
        <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold text-gray-900 mb-1">What to capture?</p>
            <p>Please take a clear photo of the <strong>back of your neck</strong> or <strong>underarm area</strong>. Darkening skin in these areas (Acanthosis Nigricans) is a key visual marker.</p>
          </div>
        </div>

        <div 
          onClick={() => !preview && fileInputRef.current?.click()}
          className={cn(
            "relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all",
            preview ? "border-primary/50 bg-input-background" : "border-input cursor-pointer hover:border-primary/50 hover:bg-input-background/50 bg-background"
          )}
        >
          {preview ? (
            <div className="relative w-full h-full p-2">
              <img src={preview} alt="Skin Check Preview" className="w-full h-full object-contain rounded-lg" />
              <button
                onClick={handleRemove}
                className="absolute top-4 right-4 bg-background/90 p-2 rounded-full shadow-md hover:bg-destructive/10 text-destructive transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                 <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Tap to Capture</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">or upload from gallery</p>
              <Button type="button" variant="outline" size="sm" className="pointer-events-none">
                 <Upload className="mr-2 h-4 w-4" /> Select Image
              </Button>
            </div>
          )}

          <input 
            ref={fileInputRef} type="file" accept="image/*" capture="environment" 
            className="hidden" onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-between pt-6 border-t border-border">
          <Button variant="ghost" onClick={prevStep}>Back</Button>
          <Button onClick={handleNext} size="lg" className="px-8">Next Step</Button>
        </div>
      </div>
    </WizardLayout>
  );
}