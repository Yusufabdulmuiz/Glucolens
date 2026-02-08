import { useEffect, useState } from 'react';
import { Brain, Dna, FileCheck, ScanLine } from 'lucide-react';

interface AnalysisScreenProps {
  onComplete: () => void;
}

const STEPS = [
  { id: 1, label: "Encrypting and Uploading Data...", icon: FileCheck, duration: 1500 },
  { id: 2, label: "Analyzing Dermatological Biomarkers...", icon: ScanLine, duration: 2500 },
  { id: 3, label: "Processing Genomic VCF Data...", icon: Dna, duration: 2500 },
  { id: 4, label: "Calculating Metabolic Risk Score...", icon: Brain, duration: 2000 },
];

export const AnalysisScreen = ({ onComplete }: AnalysisScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    const processSteps = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (!isMounted) return;
        setCurrentStepIndex(i);
        
        const stepDuration = STEPS[i].duration;
        const steps = 20; // Updates per step
        const intervalTime = stepDuration / steps;
        const progressIncrement = 100 / STEPS.length / steps;

        for (let j = 0; j <= steps; j++) {
          if (!isMounted) return;
          await new Promise(r => setTimeout(r, intervalTime));
          setProgress(prev => Math.min(prev + progressIncrement, 100));
        }
      }
      
      // Small delay at 100% before finishing
      await new Promise(r => setTimeout(r, 500));
      if (isMounted) onComplete();
    };

    processSteps();

    return () => { isMounted = false; };
  }, [onComplete]);

  const CurrentIcon = STEPS[currentStepIndex].icon;

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        
        {/* Animated Icon Circle */}
        <div className="relative mx-auto h-24 w-24">
           {/* Ripple Effect */}
           <div className="absolute inset-0 rounded-full border-4 border-primary-100 animate-ping opacity-25"></div>
           <div className="absolute inset-0 rounded-full border-4 border-primary-500/20"></div>
           
           <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-soft">
              <CurrentIcon className="h-10 w-10 text-primary-600 animate-pulse" />
           </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Glucolens AI Processing
          </h2>
          <p className="text-sm font-medium text-primary-600 min-h-[20px] animate-pulse">
            {STEPS[currentStepIndex].label}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right">{Math.round(progress)}%</p>
        </div>

        {/* "Hacker" Terminal Output */}
        <div className="mt-8 p-4 bg-gray-900 rounded-lg text-left shadow-lg overflow-hidden font-mono text-xs">
          <div className="space-y-1 text-green-400 opacity-80">
            <p>&gt; Initializing secure handshake...</p>
            {currentStepIndex >= 1 && <p>&gt; Image vector extraction [SUCCESS]</p>}
            {currentStepIndex >= 2 && <p>&gt; Sequencing variant call format...</p>}
            {currentStepIndex >= 3 && <p>&gt; Inference engine warming up...</p>}
            <p className="animate-pulse">_</p>
          </div>
        </div>

      </div>
    </div>
  );
};