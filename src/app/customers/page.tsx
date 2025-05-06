'use client';

import { useState, useEffect } from 'react';
import { CustomerTable } from '@/components/customers/customer-table';
import { CustomerFilter } from '@/components/customers/customer-filter';
import { Pagination } from '@/components/ui/pagination';
import { getUsers} from '@/lib/api';
import {User} from '@/types/user';
import { CustomerDrawer } from '@/components/customers/customer-drawer';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCustomers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers(currentPage, 5, searchTerm, statusFilter);
      setCustomers(data.users);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to load customers. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  // Separate effect for page changes to avoid recursion
  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);
  
  // Separate effect for search/filter changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search or filter changes
    fetchCustomers();
  }, [searchTerm, statusFilter]);

  const handleCustomerClick = (customer: User) => {
    console.log('Customer clicked:', customer);
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleCloseDrawer = () => {
    console.log('Closing drawer');
    setIsDrawerOpen(false);
    // Don't clear selectedCustomer immediately to avoid UI flicker during transition
    setTimeout(() => {
      setSelectedCustomer(null);
    }, 500); // Збільшуємо час для анімації закриття
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container px-4 py-8 pt-[20px]">
        <div className="max-w-6xl">
          <div className="mb-[40px]">
            <h1 className="text-2xl font-bold ">Customers</h1>
            <p className="text-[16px] mt-1">Manage and view customer information</p>
          </div>
          <CustomerFilter onSearch={handleSearch} onFilter={handleFilter} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="bg-white  h-[400px] flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="loader rounded-full border-4 border-t-4 border-gray-200  h-12 w-12 animate-spin mb-4"></div>
                <p className="text-[16px] font-medium">Loading customers...</p>
              </div>
            </div>
          ) : (
            <>
              {customers.length > 0 ? (
                <>
                  <CustomerTable 
                    customers={customers} 
                    onCustomerClick={handleCustomerClick}
                    selectedCustomer={selectedCustomer}
                  />
                  
                  {totalPages > 0 && (
                    <div className="mt-4 flex items-center justify-center lg:justify-end">
                      
                      <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-md border border-gray-200 p-12 text-center">
                  <p className="text-gray-500">
                    {searchTerm || statusFilter ? 'No matching customers found' : 'No customers found'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {selectedCustomer && (
        <CustomerDrawer 
          customer={selectedCustomer}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          onUpdate={fetchCustomers}
        />
      )}
    </div>
  );
} 