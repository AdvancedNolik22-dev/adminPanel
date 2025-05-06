'use client';

import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-primary/15 text-primary border-primary/20 shadow-primary/10',
    success: 'bg-green-100 text-green-700 border-green-200 shadow-green-100/50',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200 shadow-yellow-100/50',
    danger: 'bg-red-100 text-red-700 border-red-200 shadow-red-100/50',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200 shadow-gray-100/50',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        'border shadow-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
} 