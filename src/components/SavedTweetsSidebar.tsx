import React, { useEffect, useState } from 'react';
import { getSavedTweets, deleteSavedTweet, updateSavedTweet, SavedTweet } from '../services/firebaseService';
import TweetButton from './TweetButton';

interface SavedTweetsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavedTweetsSidebar: React.FC<SavedTweetsSidebarProps> = ({ isOpen, onClose }) => {
  const [savedTweets, setSavedTweets] = useState<SavedTweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

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

  const handleEditTweet = (tweet: SavedTweet) => {
    if (tweet.id) {
      setEditingTweetId(tweet.id);
      setEditedContent(tweet.content);
    }
  };

  const handleSaveEdit = async (tweetId: string) => {
    try {
      await updateSavedTweet(tweetId, editedContent);
      setSavedTweets(currentTweets => 
        currentTweets.map(tweet => 
          tweet.id === tweetId 
            ? { ...tweet, content: editedContent } 
            : tweet
        )
      );
      setEditingTweetId(null);
    } catch (err) {
      console.error('Error updating tweet:', err);
      alert('Error: Failed to update tweet');
    }
  };

  const handleCancelEdit = () => {
    setEditingTweetId(null);
    setEditedContent('');
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
                {editingTweetId === tweet.id ? (
                  <>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full p-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 resize-none"
                      rows={3}
                      maxLength={280}
                    />
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">{editedContent.length}/280</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleCancelEdit}
                          className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700 font-medium border border-gray-200
                            hover:bg-gray-100 hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => tweet.id && handleSaveEdit(tweet.id)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 text-white font-medium
                            hover:from-green-500 hover:to-emerald-500 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 button-bounce"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap text-gray-800 mb-3">{tweet.content}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTweet(tweet)}
                          className="p-2 bg-blue-50 text-blue-500 rounded-lg border border-blue-100 
                            hover:bg-blue-100 hover:shadow-md hover:scale-105
                            transition-all duration-200 transform"
                          title="Edit tweet"
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
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
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
                      </div>
                      <TweetButton textToCopy={tweet.content} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTweetsSidebar; 