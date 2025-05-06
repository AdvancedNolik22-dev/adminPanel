'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Create an array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Add pages around the current page
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      // Add middle pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        if (i < totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis if there's a gap between the displayed pages and the last page
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-[50px]">
      <div className="flex items-center rounded-md overflow-hidden gap-[10px]">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[32px] h-[32px] text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-[30px] w-[25px] " />
        </button>
        
        {getPageNumbers().map((page, i) => (
          <div key={`page-${i}`}>
            {page === 'ellipsis' ? (
              <span className="w-[32px] h-[32px] flex items-center justify-center text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => typeof page === 'number' && onPageChange(page)}
                className={`
                  w-[32px] h-[32px] flex items-center justify-center text-sm
                  ${currentPage === page
                    ? 'text-blue-600 border-1 rounded-[4px] font-medium '
                    : 'bg-[#ffffff] border-1 border-[#DFE3E8] rounded-[4px]'
                  }
                `}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[32px] h-[32px] text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-[30px] w-[25px]" />
        </button>
      </div>
    </div>
  );
} 