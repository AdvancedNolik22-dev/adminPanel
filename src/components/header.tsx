'use client';

import React from 'react';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="flex justify-between bg-gradient-to-r h-[60px]">
        <div className="flex items-center ">
          <Link href="/" className="no-underline hover:underline font-bold text-[20px] leading-[120%] text-[#000000]">
            Admin Panel
          </Link>
        </div>
        
        <div className="flex flex-row items-center gap-2">
              <UserIcon className="h-4 w-4" />
            <span className="text-sm font-normal text-[16px] leading-[120%]">
              Admin User
            </span>
        </div>
    </header>
  );
} 