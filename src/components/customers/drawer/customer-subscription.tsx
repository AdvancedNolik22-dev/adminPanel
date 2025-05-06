'use client';

import { User } from "@/types/user";
import { getPlanColor, getPlanLabel } from "@/utils/functions";

interface CustomerSubscriptionProps {
  customer: User;
  selectedPlan: string;
  updatingSubscription: boolean;
  onPlanChange: (plan: string) => void;
}

export function CustomerSubscription({ 
  customer, 
  selectedPlan, 
  updatingSubscription, 
  onPlanChange 
}: CustomerSubscriptionProps) {
  const handleUpgradeClick = () => {
    const nextPlan = 
      selectedPlan === 'basic' ? 'pro' : 
      selectedPlan === 'pro' ? 'enterprise' : 
      'enterprise'; // якщо вже enterprise, залишаємо його
    
    if (nextPlan !== selectedPlan) {
      onPlanChange(nextPlan);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-[#6B7280]">Current Plan</h4>
        <div className="flex items-center mt-[8px]">
          <span className={`inline-flex items-center px-[10px] py-[4px] text-sm font-normal ${getPlanColor(selectedPlan)} text-[#ffffff] rounded-[10px]`}>
            {getPlanLabel(selectedPlan)}
          </span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-[#6B7280]">Change Plan</h4>
        <div className="mt-[8px] grid grid-cols-3 gap-[8px]">
          <button
            className={`px-[12px] py-[8px] text-xs font-medium rounded-[8px] ${
              selectedPlan === 'basic' 
                ? 'text-[#FFFFFF] bg-[#5B86FF]' 
                : 'text-[#111827] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
            }`}
            onClick={() => onPlanChange('basic')}
            disabled={updatingSubscription || selectedPlan === 'basic'}
          >
            Basic
          </button>
          <button
            className={`px-[12px] py-[8px] text-xs font-medium rounded-[8px] ${
              selectedPlan === 'pro' 
                ? 'text-[#FFFFFF] bg-[#1D7656]' 
                : 'text-[#111827] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
            }`}
            onClick={() => onPlanChange('pro')}
            disabled={updatingSubscription || selectedPlan === 'pro'}
          >
            Pro
          </button>
          <button
            className={`px-[12px] py-[8px] text-xs font-medium rounded-[8px] ${
              selectedPlan === 'enterprise' 
                ? 'text-[#FFFFFF] bg-[#E43138]' 
                : 'text-[#111827] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
            }`}
            onClick={() => onPlanChange('enterprise')}
            disabled={updatingSubscription || selectedPlan === 'enterprise'}
          >
            Enterprise
          </button>
        </div>
        {updatingSubscription && (
          <p className="text-xs text-[#6B7280] mt-[8px]">Updating subscription...</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Billing Cycle</h4>
          <p className="mt-[8px] text-sm text-[#111827]">
            {customer.subscription.billingCycle}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Payment Method</h4>
          <p className="mt-[8px] text-sm text-[#111827]">
            {customer.subscription.paymentMethod ? customer.subscription.paymentMethod.replace('_', ' ') : 'Not set'}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Next Billing</h4>
          <p className="mt-[8px] text-sm text-[#111827]">
            {new Date(customer.subscription.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Amount</h4>
          <p className="mt-[8px] text-sm text-[#111827]">
            ${customer.subscription.amount} / {customer.subscription.billingCycle}
          </p>
        </div>
      </div>
      <div className="pt-[16px] border-t border-[#E5E7EB] mt-[16px]">
        <button 
          onClick={handleUpgradeClick}
          className={`w-full inline-flex items-center justify-center px-[16px] py-[10px] text-sm font-medium text-center text-[#FFFFFF] ${
            selectedPlan === 'enterprise' ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#1F3A8A] hover:bg-[#1C3376]'
          } rounded-[8px] focus:ring-4 focus:ring-[#1F3A8A]/30 focus:outline-none`}
          disabled={selectedPlan === 'enterprise' || updatingSubscription}
        >
          {selectedPlan === 'enterprise' ? 'Highest Plan' : `Upgrade to ${selectedPlan === 'basic' ? 'Pro' : 'Enterprise'}`}
        </button>
      </div>
    </div>
  );
} 