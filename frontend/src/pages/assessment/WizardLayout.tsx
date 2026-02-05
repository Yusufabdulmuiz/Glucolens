import React from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/layout/AppLayout';

interface WizardLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const WizardLayout = ({ title, description, children }: WizardLayoutProps) => {
  const { currentStep, totalSteps } = useAssessmentStore();

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 1. Progress Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-primary-600 font-bold tracking-wide text-sm uppercase">
                Step {currentStep} of {totalSteps}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{title}</h1>
            </div>
            <div className="text-sm text-gray-500 font-medium hidden sm:block">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
          </div>

          {/* 2. Segmented Progress Bar */}
          <div className="flex gap-2 h-2">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNum = index + 1;
              const isActive = stepNum <= currentStep;
              
              return (
                <div 
                  key={index}
                  className={cn(
                    "h-full flex-1 rounded-full transition-all duration-500",
                    isActive ? "bg-primary-500" : "bg-gray-200"
                  )}
                />
              );
            })}
          </div>
          
          {description && (
            <p className="text-gray-500 text-lg">{description}</p>
          )}
        </div>

        {/* 3. Form Content */}
        <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>

      </div>
    </AppLayout>
  );
};