import React, { useEffect, useState } from 'react';
import { getSavedTweets, deleteSavedTweet, SavedTweet } from '../services/firebaseService';
import TweetButton from './TweetButton';

interface SavedTweetsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavedTweetsSidebar: React.FC<SavedTweetsSidebarProps> = ({ isOpen, onClose }) => {
  const [savedTweets, setSavedTweets] = useState<SavedTweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSavedTweets();
    }
  }, [isOpen]);

  const loadSavedTweets = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const tweets = await getSavedTweets();
      setSavedTweets(tweets);
    } catch (err) {
      console.error('Error loading saved tweets:', err);
      setError('Failed to load saved tweets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    try {
      await deleteSavedTweet(tweetId);
      setSavedTweets(currentTweets => 
        currentTweets.filter(tweet => tweet.id !== tweetId)
      );
    } catch (err) {
      console.error('Error deleting tweet:', err);
      alert('Error: Failed to delete tweet');
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform z-40 border-l border-indigo-100 transition-all duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-indigo-700">Saved Tweets</h2>
        <button 
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-indigo-700 transition-colors duration-200 button-bounce"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {error ? (
          <div className="text-red-500 p-4 text-center">
            {error}
            <button
              onClick={loadSavedTweets}
              className="mt-2 px-4 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : savedTweets.length === 0 ? (
          <div className="text-gray-500 p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p>No saved tweets yet</p>
            <p className="text-sm mt-2">Generate some tweets and click "Save" to see them here</p>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {savedTweets.map((tweet, index) => (
              <div 
                key={tweet.id} 
                className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200 opacity-0"
                style={{ 
                  animation: `fadeIn 0.3s ease-out forwards`,
                  animationDelay: `${index * 0.05}s` 
                }}
              >
                <p className="whitespace-pre-wrap text-gray-800 mb-3">{tweet.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => tweet.id && handleDeleteTweet(tweet.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg border border-red-100 
                      hover:bg-red-100 hover:shadow-md hover:scale-105
                      transition-all duration-200 transform"
                    title="Delete tweet"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                  <TweetButton textToCopy={tweet.content} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTweetsSidebar; 