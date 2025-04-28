import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-200 animate-spin"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-l-4 border-indigo-600 animate-spin-fast"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 