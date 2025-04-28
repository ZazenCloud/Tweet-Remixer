import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-4 border-t-blue-600 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner; 