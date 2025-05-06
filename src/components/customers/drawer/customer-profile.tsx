'use client';

import { User } from "@/types/user";
import { getStatusColor } from "@/utils/functions";

interface CustomerProfileProps {
  customer: User;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Company</h4>
          <p className="mt-[8px] text-sm text-[#111827]">{customer.profile.company}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Role</h4>
          <p className="mt-[8px] text-sm text-[#111827]">{customer.profile.role}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Location</h4>
          <p className="mt-[8px] text-sm text-[#111827]">{customer.profile.location}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Contact</h4>
          <p className="mt-[8px] text-sm text-[#111827]">{customer.profile.phone}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Status</h4>
          <div className="mt-[8px] flex items-center">
            <div className={`h-[10px] w-[10px] rounded-full ${getStatusColor(customer.status)} mr-[8px]`}></div>
            <span className="text-sm text-[#6B7280]">{customer.status}</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-[#6B7280]">Customer since</h4>
          <p className="mt-[8px] text-sm text-[#111827]">
            {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
} 