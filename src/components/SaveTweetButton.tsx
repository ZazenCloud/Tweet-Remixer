import React, { useState } from 'react';
import { saveTweet } from '../services/firebaseService';

interface SaveTweetButtonProps {
  textToSave: string;
  onSaveSuccess?: () => void;
}

const SaveTweetButton: React.FC<SaveTweetButtonProps> = ({ textToSave, onSaveSuccess }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (isSaving || saved) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      if (!textToSave.trim()) {
        throw new Error('Cannot save empty tweet');
      }
      
      await saveTweet(textToSave);
      setSaved(true);
      
      // Reset saved state after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
      
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } catch (err: any) {
      console.error('Error saving tweet:', err);
      setError('Failed to save');
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button 
      onClick={handleSave}
      disabled={isSaving}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all duration-200 transform hover:shadow-md hover:scale-105 hover:border-transparent button-bounce w-[94px] justify-center ${
        saved 
          ? 'bg-green-50 text-green-600 border-green-200' 
          : error
            ? 'bg-red-50 text-red-600 border-red-200'
            : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-500 hover:text-white'
      }`}
      title={error ? 'Error saving tweet' : saved ? 'Tweet saved' : 'Save tweet for later'}
    >
      {isSaving ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-medium">Saving</span>
        </span>
      ) : saved ? (
        <span className="flex items-center animate-fade-in">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Saved</span>
        </span>
      ) : error ? (
        <span className="flex items-center animate-fade-in">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Error</span>
        </span>
      ) : (
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="font-medium">Save</span>
        </span>
      )}
    </button>
  );
};

export default SaveTweetButton; 