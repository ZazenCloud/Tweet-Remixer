import React, { useState } from 'react';
import './App.css';
// Import our API service
import { remixContent } from './services/apiService';
import LoadingSpinner from './components/LoadingSpinner';
import CopyButton from './components/CopyButton';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleRemix = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText('');
    setError(null);
    setShowErrorPopup(false);
    
    try {
      // Using our API service
      const response = await remixContent({
        text: inputText
      });

      setOutputText(response.remixedText);
    } catch (error: any) {
      console.error('Error generating tweets:', error);
      
      // Set appropriate error message based on error content
      if (error.message) {
        if (error.message.includes('API key is not configured')) {
          setError('Gemini API key is not configured. Please add your API key to the .env file with the name REACT_APP_GEMINI_API_KEY.');
          setShowErrorPopup(true);
        } else if (error.message.includes('Invalid API key')) {
          setError('Invalid API key. Please check your Gemini API key in the .env file and try again.');
          setShowErrorPopup(true);
        } else {
          setError('Error generating tweets. Please try again.');
        }
      } else {
        setError('Error generating tweets. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
    setShowErrorPopup(false);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Tweet Remixer</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label htmlFor="inputText" className="block text-gray-700 font-medium mb-2">
              Enter text to generate tweet variations
            </label>
            <textarea
              id="inputText"
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter the main idea or content for your tweets..."
            />
          </div>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleRemix}
              disabled={isLoading || !inputText.trim()}
              className={`flex-1 py-3 rounded-md font-medium text-white transition-colors ${
                isLoading || !inputText.trim()
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isLoading ? 'Generating Tweets...' : 'Generate 4 Tweets'}
            </button>
            
            <button
              onClick={handleClear}
              disabled={isLoading || (!inputText && !outputText && !error)}
              className={`px-4 py-3 rounded-md font-medium transition-colors ${
                isLoading || (!inputText && !outputText && !error)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Clear
            </button>
          </div>
          
          {isLoading && <LoadingSpinner />}
          
          {error && !showErrorPopup && <ErrorMessage message={error} />}
          
          {outputText && !isLoading && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800">Tweet Variations:</h2>
                <CopyButton textToCopy={outputText} />
              </div>
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
                {outputText}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error popup for API key issues */}
      {showErrorPopup && error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">API Key Error</h2>
            <p className="mb-6">{error}</p>
            <div className="flex justify-end">
              <button 
                onClick={closeErrorPopup}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
