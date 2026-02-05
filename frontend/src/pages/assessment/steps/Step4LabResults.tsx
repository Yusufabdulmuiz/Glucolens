import { useState, useRef } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { FileText, Upload, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Step4LabResults() {
  const { data, updateData, nextStep, prevStep } = useAssessmentStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local state to show the file name after selection
  const [fileName, setFileName] = useState<string | null>(
    data.labFile ? data.labFile.name : null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ labFile: file });
      setFileName(file.name);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the click on the parent div
    updateData({ labFile: null });
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <WizardLayout 
      title="Clinical Data" 
      description="Upload recent blood work (HbA1c, Fasting Glucose) for higher accuracy."
    >
      <div className="space-y-8">
        
        {/* Upload Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "cursor-pointer relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all",
            fileName 
              ? "border-green-500 bg-green-50" 
              : "border-gray-300 hover:border-primary-400 hover:bg-gray-50 bg-white"
          )}
        >
          {fileName ? (
            <div className="text-center p-4 animate-in fade-in zoom-in duration-300">
              <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                 <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-medium text-gray-900 truncate max-w-xs">{fileName}</p>
              <p className="text-xs text-green-700 mt-1">File attached successfully</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-4 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleRemove}
              >
                <X className="mr-2 h-4 w-4" /> Remove
              </Button>
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                 <FileText className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Upload Lab Report</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">PDF, JPG, or PNG (Max 5MB)</p>
              <Button type="button" variant="outline" size="sm">
                 <Upload className="mr-2 h-4 w-4" /> Browse Files
              </Button>
            </div>
          )}

          <input 
            ref={fileInputRef}
            type="file" 
            accept=".pdf,image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>

        {/* Navigation - Note the "Skip" Logic */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button variant="ghost" onClick={prevStep}>
            Back
          </Button>
          
          <div className="flex gap-3">
            {/* Secondary Skip Button */}
            {!fileName && (
              <Button variant="ghost" onClick={nextStep} className="text-gray-500">
                Skip for now
              </Button>
            )}
            
            <Button onClick={nextStep} size="lg" className="px-8">
              {fileName ? "Next Step" : "Skip & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}