'use client';
import { User } from '@/types/user';
import { getStatusColor, getPlanColor, getPlanLabel } from '@/utils/functions';

interface CustomerTableProps {
  customers: User[];
  onCustomerClick: (customer: User) => void;
  selectedCustomer?: User | null;
}

export function CustomerTable({ customers, onCustomerClick, selectedCustomer }: CustomerTableProps) {
  const getPlanBadge = (plan: string) => {
    return (
      <span className={`inline-flex items-center px-[10px] py-[4px] text-sm font-normal ${getPlanColor(plan)} text-[#ffffff] rounded-[10px]`}>
        {getPlanLabel(plan)}
      </span>
    );
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full  border-collapse">
          <thead className='h-[60px]'>
            <tr>
              <th scope="col" className="text-left text-sm font-medium text-[#646464] tracking-wider">
                User
              </th>
              <th scope="col" className="text-left text-sm font-medium text-[#646464] tracking-wider">
                Email
              </th>
              <th scope="col" className="text-left text-sm font-bold text-[#646464] tracking-wider">
                Plan
              </th>
              <th scope="col" className="text-left text-sm font-medium text-[#646464] tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-sm text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className={`h-[80px] hover:bg-gray-50 transition-colors cursor-pointer border-none ${selectedCustomer && selectedCustomer.id === customer.id ? 'bg-[#F0F0F5] border ' : ''}`}
                  onClick={() => onCustomerClick(customer)}
                >
                  <td className="whitespace-nowrap">
                    <div className="flex flex-row items-center gap-[16px] ml-[4px]">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-[40px] w-[40px] rounded-full object-cover"
                          src={customer.profile.avatar}
                          alt={customer.name}
                        />
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <div className="text-[16px] font-medium">{customer.name}</div>
                        <div className="text-[12px] text-[#646464]">{customer.profile.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-[16px] text-[#7D7D7D] ">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap">
                    {getPlanBadge(customer.plan)}
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-[10px] w-[10px] rounded-full ${getStatusColor(customer.status)} mr-[8px]`}></div>
                      <span className="text-sm">{customer.status}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 