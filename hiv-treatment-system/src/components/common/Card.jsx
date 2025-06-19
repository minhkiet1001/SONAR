import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  footer, 
  noPadding = false,
  variant = 'default',
  onClick,
  role,
  ariaLabel
}) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden transition-all duration-200';
  
  const variantClasses = {
    default: 'shadow-sm hover:shadow',
    elevated: 'shadow-md hover:shadow-lg',
    bordered: 'border border-gray-200 hover:border-gray-300',
    soft: 'bg-gray-50 shadow-sm hover:shadow',
    primary: 'bg-primary-50 border border-primary-100',
    success: 'bg-green-50 border border-green-100',
    warning: 'bg-yellow-50 border border-yellow-100',
    danger: 'bg-red-50 border border-red-100',
  };

  const clickableClasses = onClick ? 'cursor-pointer transform hover:-translate-y-1' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${clickableClasses} ${className}`}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
    >
      {(title || subtitle) && (
        <div className="px-5 py-4 sm:px-6 border-b border-gray-200">
          {title && (
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={noPadding ? '' : 'px-5 py-5 sm:p-6'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-5 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 