import { useState, useRef } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Upload, X, HelpCircle, Check } from 'lucide-react';

export default function Step4LabResults() {
  const { data, updateData, nextStep, prevStep } = useAssessmentStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(data.labFile ? data.labFile.name : null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ labFile: file });
      setFileName(file.name);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateData({ labFile: null });
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <WizardLayout 
      title="Lab Results" 
      description="Add your recent laboratory test results to improve accuracy."
    >
      <div className="space-y-6">
        
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="mb-1"><strong>This step is optional.</strong></p>
              <p>Upload a PDF or image of your lab results (HbA1c, Fasting Glucose). We'll extract the values securely. If you don't have them, use the Skip button.</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-input rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-background"
        >
          <input ref={fileInputRef} type="file" accept=".pdf,image/*" className="hidden" onChange={handleFileChange} />
          
          <div className="flex flex-col items-center gap-3">
            <div className="bg-primary/10 p-4 rounded-full">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-muted-foreground text-sm">PDF, JPG, or PNG (max 5MB)</p>
            </div>
            
            {fileName && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-4 animate-in fade-in zoom-in">
                <Check className="w-4 h-4" />
                <span className="font-medium truncate max-w-[200px]">{fileName}</span>
                <button onClick={handleRemove} className="ml-2 p-1 hover:bg-green-100 rounded text-green-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Button variant="ghost" onClick={prevStep}>Back</Button>
          <div className="flex gap-3">
            {!fileName && <Button variant="ghost" onClick={nextStep} className="text-muted-foreground">Skip for now</Button>}
            <Button onClick={nextStep} size="lg" className="px-8">
              {fileName ? "Next Step" : "Skip & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}