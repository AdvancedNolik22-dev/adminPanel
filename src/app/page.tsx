import Link from 'next/link';
import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">Customers</h2>
              <p className="text-gray-600 mb-4">
                Manage your customer data and subscriptions
              </p>
              <Link 
                href="/customers" 
                className="inline-flex   rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
              >
                View Customers
              </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
