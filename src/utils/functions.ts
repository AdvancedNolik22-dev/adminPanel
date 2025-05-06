'use client';

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-[#1D7656]';
      case 'pending':
        return 'bg-[#E43138]';
      case 'inactive':
        return 'bg-[#5B86FF]';
      default:
        return 'bg-[#5B86FF]';
    }
  };

export const getPlanColor = (plan: string) => {
  switch (plan.toLowerCase()) {
    case 'pro':
      return 'bg-[#1D7656]';
    case 'enterprise':
      return 'bg-[#E43138]';
    default:
      return 'bg-[#5B86FF]';
  }
};

export const getPlanLabel = (plan: string) => {
  switch (plan.toLowerCase()) {
    case 'pro':
      return 'Pro';
    case 'enterprise':
      return 'Enterprise';
    default:
      return 'Basic';
  }
};