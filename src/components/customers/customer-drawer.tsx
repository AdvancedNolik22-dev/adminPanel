'use client';

import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { User } from "@/types/user";
import { useCustomerDrawer } from '../../hooks/customer-drawer-hooks';
import { CustomerHeader } from './drawer/customer-header';
import { Tabs } from './drawer/tabs';
import { CustomerProfile } from './drawer/customer-profile';
import { CustomerSubscription } from './drawer/customer-subscription';
import { CustomerOnboarding } from './drawer/customer-onboarding';

interface CustomerDrawerProps {
  customer: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function CustomerDrawer({
  customer,
  isOpen,
  onClose,
  onUpdate,
}: CustomerDrawerProps) {
  const {
    activeTab,
    onboardingData,
    loading,
    updatingSubscription,
    selectedPlan,
    isClosing,
    handleTabChange,
    handlePlanChange,
    handleOnboardingStepToggle,
    handleCloseWithAnimation
  } = useCustomerDrawer(customer, onUpdate, onClose);

  if (!isOpen && !isClosing) return null;
  
  const translateClass = isClosing ? 'translate-x-[100%]' : 'translate-x-0';

  return (
    <>
      <div 
        className={`fixed inset-0 bg-[#000000] transition-opacity duration-300 z-40 ${isClosing ? 'opacity-0 bg-opacity-0' : 'opacity-50 bg-opacity-50'}`}
        onClick={handleCloseWithAnimation}
      />
      <div 
        className={`fixed top-[0px] right-[0px] z-50 h-screen overflow-y-auto transition-transform duration-300 bg-[#FFFFFF] shadow-xl ${translateClass} 
         w-[400px] 
          px-[12px] sm:px-[16px] py-[16px]`}
        tabIndex={-1}
        aria-labelledby="drawer-label">
        <h5 id="drawer-label" className="inline-flex items-center mb-[16px] text-base font-semibold text-[#6B7280]">
          <InformationCircleIcon className="w-[20px] h-[20px] mr-[10px]" aria-hidden="true" />
          Customer Details
        </h5>
        <button 
          type="button" 
          onClick={handleCloseWithAnimation}
          className="text-[#9CA3AF] border-none bg-transparent hover:bg-[#F3F4F6] hover:text-[#111827] rounded-[8px] text-sm w-[32px] h-[32px] absolute top-[25px] right-[10px] flex items-center justify-center"
        >
          <XMarkIcon className="w-[16px] h-[16px]" aria-hidden="true" />
          <span className="sr-only">Close drawer</span>
        </button>

        <CustomerHeader customer={customer} />
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="space-y-4">
          {activeTab === 'profile' && (
            <CustomerProfile customer={customer} />
          )}

          {activeTab === 'subscription' && (
            <CustomerSubscription 
              customer={customer} 
              selectedPlan={selectedPlan}
              updatingSubscription={updatingSubscription}
              onPlanChange={handlePlanChange}
            />
          )}

          {activeTab === 'onboarding' && (
            <CustomerOnboarding 
              onboardingData={onboardingData}
              loading={loading}
              onStepToggle={handleOnboardingStepToggle}
            />
          )}
        </div>
      </div>
    </>
  );
} 