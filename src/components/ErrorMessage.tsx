import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-5 my-6 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm animate-fade-in">
      <div className="flex items-start">
        <svg 
          className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
            clipRule="evenodd" 
          />
        </svg>
        <span className="text-sm leading-relaxed">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage; 