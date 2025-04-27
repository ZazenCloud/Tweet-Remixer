import React, { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-md transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton; 