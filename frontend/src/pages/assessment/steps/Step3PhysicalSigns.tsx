import { useState, useRef } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Camera, Upload, X, AlertCircle } from 'lucide-react';
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

  const handleRemove = () => {
    updateData({ signsImage: null });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleNext = () => {
    // Validation: Image is mandatory
    if (!data.signsImage) {
      alert("Please upload or capture an image to proceed.");
      return;
    }
    nextStep();
  };

  return (
    <WizardLayout 
      title="Physical Indicators" 
      description="We analyze skin biomarkers (like Acanthosis Nigricans) for early signs of insulin resistance."
    >
      <div className="space-y-8">
        
        {/* educational context */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">What to capture?</p>
            <p>Please take a clear photo of the <strong>back of your neck</strong> or <strong>underarm area</strong>. These areas often show darkening skin which is a key marker.</p>
          </div>
        </div>

        {/* The Drop Zone / Preview Area */}
        <div 
          className={cn(
            "relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all bg-gray-50",
            preview ? "border-primary-500 bg-gray-100" : "border-gray-300 hover:border-primary-400 hover:bg-gray-100"
          )}
        >
          {preview ? (
            // Image Preview State
            <div className="relative w-full h-full p-2">
              <img 
                src={preview} 
                alt="Skin Check Preview" 
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={handleRemove}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-50 text-red-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            // Upload Prompt State
            <div className="text-center p-6" onClick={() => fileInputRef.current?.click()}>
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                 <Camera className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tap to Capture</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">or upload from gallery</p>
              <Button type="button" variant="outline" size="sm">
                 <Upload className="mr-2 h-4 w-4" /> Select Image
              </Button>
            </div>
          )}

          {/* Hidden Real Input */}
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            capture="environment" // This triggers the camera on mobile
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-100">
          <Button variant="ghost" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={handleNext} size="lg" className="px-8">
            Next Step
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
}