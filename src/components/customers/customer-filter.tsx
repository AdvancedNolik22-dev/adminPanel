'use client';

import { Input } from '@/components/ui/input';
import {XMarkIcon } from '@heroicons/react/24/outline';
import { FormEvent, useState, useEffect } from 'react';

interface CustomerFilterProps {
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
}

export function CustomerFilter({ onSearch, onFilter }: CustomerFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term to reduce API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Apply search when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    onFilter(status);
  };
  
  return (
    <div className="flex lg:flex-row flex-col justify-between w-full mb-[40px] gap-[10px]">
      <div className="flex flex-row gap-[24px] items-center">
        <span className="text-[16px] font-medium leading-[120%]">Status</span>
        <div className="flex  rounded-[18px] w-[402px] h-[40px] bg-[#F0F0F5] px-[4px] py-[4px]">
          <button
            type="button"
            onClick={() => handleStatusChange('')}
            className={`w-1/4 text-sm rounded-[18px] border-none ${statusFilter === '' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''}`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('active')}
            className={`w-1/4 text-sm rounded-[18px] border-none ${statusFilter === 'active' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''}`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('pending')}
            className={`w-1/4 text-sm rounded-[18px] border-none ${statusFilter === 'pending' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''}`}
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('inactive')}
            className={`w-1/4 text-sm rounded-[18px] border-none ${statusFilter === 'inactive' ? 'bg-[#1F3A8A] text-[#ffffff]' : ''}`}
          >
            Inactive
          </button>
        </div>
      </div>
      <div className="flex items-center ">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[40px] rounded-[18px] border-none bg-[#F0F0F5] h-[40px] w-[300px] pl-[16px]"
            />
            {searchTerm && (
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleClearSearch}
              >
                <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 