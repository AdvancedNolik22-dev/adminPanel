export type User = {
    id: string;
    name: string;
    email: string;
    plan: string;
    status: string;
    createdAt: string;
    profile: {
      avatar: string;
      company: string;
      role: string;
      location: string;
      phone: string;
    };
    subscription: {
      plan: string;
      startDate: string;
      endDate: string;
      paymentMethod: string;
      amount: number;
      billingCycle: string;
      autoRenew: boolean;
    };
    onboardingId: string;
  };
  
  export type OnboardingStep = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  
  export type Onboarding = {
    id: string;
    userId: string;
    steps: OnboardingStep[];
  };