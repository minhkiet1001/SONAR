import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ariaLabel,
}) => {
  const baseStyle = 'inline-flex items-center justify-center border font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'border-transparent text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow',
    secondary: 'border-transparent text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500 shadow-sm hover:shadow',
    outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-primary-600 hover:border-primary-300 focus:ring-primary-500 shadow-sm hover:shadow',
    danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow',
    subtle: 'border-transparent text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledStyle = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  const styleClasses = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyle} ${className}`;
  
  return (
    <button
      type={type}
      className={styleClasses}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || undefined}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;