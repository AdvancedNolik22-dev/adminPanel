'use client';

import { Onboarding } from "@/types/user";

interface CustomerOnboardingProps {
  onboardingData: Onboarding | null;
  loading: boolean;
  onStepToggle: (stepId: string, completed: boolean) => void;
}

export function CustomerOnboarding({
  onboardingData,
  loading,
  onStepToggle
}: CustomerOnboardingProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-[32px]">
        <div className="loader rounded-full border-4 border-t-4 border-[#E5E7EB] border-t-[#1F3A8A] h-[40px] w-[40px] animate-spin"></div>
      </div>
    );
  }

  if (!onboardingData) {
    return <p className="text-[#6B7280]">No onboarding data available.</p>;
  }

  return (
    <div className="space-y-[16px]">
      <h4 className="font-medium text-[#111827]">Onboarding Progress</h4>
      <div className="space-y-[12px]">
        {onboardingData.steps.map((step) => (
          <div key={step.id} className="flex items-start space-x-[12px]">
            <div className="flex-shrink-0 pt-[2px]">
              <input
                type="checkbox"
                className="h-[16px] w-[16px] rounded border-[#D1D5DB] text-[#1F3A8A] focus:ring-[#1F3A8A]"
                checked={step.completed}
                onChange={(e) => onStepToggle(step.id, e.target.checked)}
                id={`step-${step.id}`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label 
                htmlFor={`step-${step.id}`} 
                className={`font-medium ${step.completed ? 'text-[#9CA3AF] line-through' : 'text-[#111827]'}`}
              >
                {step.title}
              </label>
              <p className={`text-xs ${step.completed ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 