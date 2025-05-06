'use client';

export type TabType = 'profile' | 'subscription' | 'onboarding';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="mb-[24px]">
      <div className="flex rounded-[18px] bg-[#F0F0F5] px-[4px] py-[4px] h-[50px]">
        <button
          onClick={() => onTabChange('profile')}
          className={`flex-1 text-sm py-[8px] rounded-[18px] border-none ${
            activeTab === 'profile' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => onTabChange('subscription')}
          className={`flex-1 text-sm py-[8px] rounded-[18px] border-none ${
            activeTab === 'subscription' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''
          }`}
        >
          Subscription
        </button>
        <button
          onClick={() => onTabChange('onboarding')}
          className={`flex-1 text-sm py-[8px] rounded-[18px] border-none ${
            activeTab === 'onboarding' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''
          }`}
        >
          Onboarding
        </button>
      </div>
    </div>
  );
} 