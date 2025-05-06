'use client';

import { User } from "@/types/user";

interface CustomerHeaderProps {
  customer: User;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  return (
    <div className="flex flex-row w-full items-center mb-[16px] pb-[16px] border-b border-[#E5E7EB]">
      <div className="flex-shrink-0">
        <img
          className="h-[48px] w-[48px] rounded-full"
          src={customer.profile.avatar}
          alt={customer.name}
        />
      </div>
      <div className="flex flex-col gap-[8px] ml-[12px]">
        <h4 className="text-[16px] font-medium text-[#111827] leading-[1.2] mb-[0px] ">{customer.name}</h4>
        <p className="text-[14px] text-[#6B7280] leading-[1.2] mt-[0px]">{customer.email}</p>
      </div>
    </div>
  );
} 