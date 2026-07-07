import React, { useEffect } from 'react';
import { cn } from '@/utils';
import { ModalProps } from '@/types';

/**
 * Modal Component
 * A modal dialog with glassmorphism effect
 * Supports different sizes and handles backdrop clicks
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className={cn(
          'glass-strong rounded-2xl p-6 md:p-8 relative z-10 w-full animate-slide-up',
          'max-h-[90vh] overflow-y-auto',
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="glass rounded-full p-2 hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};
