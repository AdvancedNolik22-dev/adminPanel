'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getOnboarding, updateSubscription, updateOnboardingStep } from '@/lib/api';
import { User, Onboarding } from "@/types/user";
import { TabType } from '../components/customers/drawer/tabs';

export function useCustomerDrawer(customer: User, onUpdate: () => void, onClose: () => void) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [onboardingData, setOnboardingData] = useState<Onboarding | null>(null);
  const [loading, setLoading] = useState(false);
  const [updatingSubscription, setUpdatingSubscription] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(customer.subscription.plan);
  const [isClosing, setIsClosing] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOnboardingData = useCallback(async () => {
    if (!customer.onboardingId) return;

    setLoading(true);
    try {
      const data = await getOnboarding(customer.onboardingId);
      setOnboardingData(data);
    } catch (error) {
      console.error('Error fetching onboarding data:', error);
    } finally {
      setLoading(false);
    }
  }, [customer.onboardingId]);

  useEffect(() => {
    // Clear any existing animation timeouts when customer changes
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setActiveTab('profile');
    
    if (customer && customer.onboardingId) {
      fetchOnboardingData();
    }
    
    // Reset selected plan when customer changes
    if (customer) {
      setSelectedPlan(customer.subscription.plan);
    }

    // Cleanup timeout when component unmounts or customer changes
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [customer, fetchOnboardingData]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handlePlanChange = async (newPlan: string) => {
    // Перевіряємо, чи користувач не намагається понизити свій план
    if (
      (selectedPlan === 'enterprise' && (newPlan === 'pro' || newPlan === 'basic')) ||
      (selectedPlan === 'pro' && newPlan === 'basic')
    ) {
      if (!confirm(`Are you sure you want to downgrade from ${selectedPlan} to ${newPlan}?`)) {
        return;
      }
    }
    
    console.log(`[Plan Change] Updating plan from ${selectedPlan} to ${newPlan} for user ${customer.id}`);
    setUpdatingSubscription(true);
    
    try {
      const updatedUser = await updateSubscription(customer.id, { plan: newPlan });
      console.log('[Plan Change] Updated user data:', updatedUser);
      setSelectedPlan(newPlan);
      
      // Викликаємо onUpdate для оновлення даних у батьківському компоненті
      console.log('[Plan Change] Refreshing customer data');
      onUpdate();
    } catch (error) {
      console.error('[Plan Change] Error updating subscription:', error);
      alert('Failed to update subscription plan. Please try again.');
    } finally {
      setUpdatingSubscription(false);
    }
  };

  const handleOnboardingStepToggle = async (stepId: string, completed: boolean) => {
    if (!customer.onboardingId || !onboardingData) return;
    
    // Optimistic update
    setOnboardingData({
      ...onboardingData,
      steps: onboardingData.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      ),
    });
    
    try {
      await updateOnboardingStep(customer.onboardingId, stepId, completed);
      onUpdate();
    } catch (error) {
      console.error('Error updating onboarding step:', error);
      fetchOnboardingData();
    }
  };

  const handleCloseWithAnimation = () => {
    setIsClosing(true);
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    animationTimeoutRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 280);
  };

  return {
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
  };
} 