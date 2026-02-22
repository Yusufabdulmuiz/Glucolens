import { useState, useRef } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { WizardLayout } from '../WizardLayout';
import { Button } from '@/components/ui/Button';
import { Upload, X, Check, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assessmentService } from '@/services/assessmentService';
import { AnalysisScreen } from '../AnalysisScreen';

export default function Step5Genomic() {
  const navigate = useNavigate();
  const { data, updateData, prevStep, resetAssessment } = useAssessmentStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [fileName, setFileName] = useState<string | null>(data.genomicFile ? data.genomicFile.name : null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGeneInfo, setShowGeneInfo] = useState(false);

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

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await assessmentService.submitAssessment(data);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit assessment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleAnalysisComplete = () => {
    resetAssessment();
    navigate('/dashboard'); 
  };

  if (showAnalysis) return <AnalysisScreen onComplete={handleAnalysisComplete} />;

  const supportedGenes = ['TCF7L2 (rs7903146)', 'KCNJ11 (rs5219)', 'PPARG (Pro12Ala)', 'APOL1 (G1/G2)'];

  return (
    <WizardLayout 
      title="Genomic Data" 
      description="Upload raw DNA data (e.g., 23andMe) for precise genetic risk profiling."
    >
      <div className="space-y-6">
        
        <div className="bg-background border border-border rounded-xl p-6">
          <h4 className="text-foreground font-medium mb-3">Supported Genes for Analysis</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {supportedGenes.map((gene) => (
              <div key={gene} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-input-background border border-input text-muted-foreground text-sm">
                <span>{gene}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowGeneInfo(!showGeneInfo)} className="flex items-center gap-2 text-sm text-[#d4183d] hover:underline">
            <Info className="w-4 h-4" /> Why do these genes matter?
          </button>
          
          {showGeneInfo && (
             <div className="mt-4 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
               These variants are heavily associated with insulin response, beta-cell function, and metabolic regulation.
             </div>
          )}
        </div>

        <div 
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-[#d4183d]/30 rounded-xl p-8 text-center hover:border-[#d4183d]/60 transition-colors bg-background"
        >
          <input ref={fileInputRef} type="file" accept=".txt,.csv,.vcf" className="hidden" onChange={handleFileChange} />
          
          <div className="flex flex-col items-center gap-3">
            <div className="bg-[#d4183d]/10 p-4 rounded-full">
              <Upload className="w-8 h-8 text-[#d4183d]" />
            </div>
            <div>
              <p className="text-foreground font-medium mb-1">Upload Genomic File</p>
              <p className="text-muted-foreground text-sm">Accepted formats: .vcf, .txt, .csv</p>
            </div>
            
            {fileName && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-4 w-full max-w-xs animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-green-700 font-medium mb-1">
                  <Check className="w-4 h-4" /> Ready for Analysis
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 truncate">
                  {fileName}
                  <button onClick={handleRemove} className="ml-2 hover:text-green-800"><X className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Button variant="ghost" onClick={prevStep} disabled={isSubmitting}>Back</Button>
          <div className="flex gap-3">
            {!fileName && <Button variant="ghost" onClick={handleFinish} disabled={isSubmitting} className="text-muted-foreground">Skip & Finish</Button>}
            <Button onClick={handleFinish} size="lg" className="px-8" isLoading={isSubmitting}>
              {fileName ? "Analyze Data" : "Finish Assessment"}
            </Button>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}