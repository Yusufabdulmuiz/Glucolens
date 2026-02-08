import { useState, useRef } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Dna, Upload, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { assessmentService } from '@/services/assessmentService';
import { AnalysisScreen } from '../AnalysisScreen';

export default function Step5Genomic() {
  const navigate = useNavigate();
  const { data, updateData, prevStep, resetAssessment } = useAssessmentStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [fileName, setFileName] = useState<string | null>(
    data.genomicFile ? data.genomicFile.name : null
  );
  
  // State to control the "Visual Theater"
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ genomicFile: file });
      setFileName(file.name);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateData({ genomicFile: null });
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 1. User clicks "Finish" -> Submit Data -> Trigger Animation
  const handleFinish = async () => {
    setIsSubmitting(true);
    
    try {
      // Real (or Mock) submission happens first
      await assessmentService.submitAssessment(data);
      console.log("Assessment Data Uploaded. Starting Simulation...");
      
      // Instead of redirecting immediately, show the analysis screen
      setShowAnalysis(true);
      
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit assessment. Please try again.");
      setIsSubmitting(false);
    }
  };

  // 2. Animation calls this when it hits 100%
  const handleAnalysisComplete = () => {
    resetAssessment();
    navigate('/dashboard'); 
  };

  // 3. Render the Analysis Screen Overlay if active
  if (showAnalysis) {
    return <AnalysisScreen onComplete={handleAnalysisComplete} />;
  }

  // Standard Render
  return (
    <WizardLayout 
      title="Genomic Data" 
      description="Optional: Upload raw DNA data (e.g., 23andMe) for genetic risk profiling."
    >
      <div className="space-y-8">
        
        {/* Upload Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "cursor-pointer relative w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all",
            fileName 
              ? "border-purple-500 bg-purple-50" 
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50 bg-white"
          )}
        >
          {fileName ? (
            <div className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                 <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <p className="font-medium text-gray-900 truncate max-w-xs">{fileName}</p>
              <p className="text-xs text-purple-700 mt-1">Ready for analysis</p>
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
              <div className="mx-auto h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                 <Dna className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Upload DNA Data</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">TXT or CSV (23andMe / Ancestry format)</p>
              <Button type="button" variant="outline" size="sm">
                 <Upload className="mr-2 h-4 w-4" /> Browse Files
              </Button>
            </div>
          )}

          <input 
            ref={fileInputRef}
            type="file" 
            accept=".txt,.csv" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>

        {/* Navigation - The Finish Line */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button variant="ghost" onClick={prevStep} disabled={isSubmitting}>
            Back
          </Button>
          
          <div className="flex gap-3">
            {!fileName && (
              <Button variant="ghost" onClick={handleFinish} disabled={isSubmitting} className="text-gray-500">
                Skip & Finish
              </Button>
            )}
            
            <Button onClick={handleFinish} size="lg" className="px-8" isLoading={isSubmitting}>
              {fileName ? "Analyze Data" : "Finish Assessment"}
            </Button>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}