import React from 'react';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  includeHashtags: boolean;
  includeEmojis: boolean;
  setIncludeHashtags: (value: boolean) => void;
  setIncludeEmojis: (value: boolean) => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({
  isOpen,
  onClose,
  includeHashtags,
  includeEmojis,
  setIncludeHashtags,
  setIncludeEmojis
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border border-indigo-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-indigo-600">Tweet Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="includeHashtags"
              checked={includeHashtags}
              onChange={(e) => setIncludeHashtags(e.target.checked)}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="includeHashtags" className="text-gray-700">
              Include Hashtags
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="includeEmojis"
              checked={includeEmojis}
              onChange={(e) => setIncludeEmojis(e.target.checked)}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="includeEmojis" className="text-gray-700">
              Include Emojis
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 button-bounce"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup; 