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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Tweet Remixer
        </h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Create multiple engaging tweet variations from your original idea using AI
        </p>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <label htmlFor="inputText" className="block text-gray-700 font-medium mb-2">
              Enter text to generate tweet variations
            </label>
            <textarea
              id="inputText"
              className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter the main idea or content for your tweets..."
            />
          </div>
          
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleRemix}
              disabled={isLoading || !inputText.trim()}
              className={`flex-1 py-3 px-6 rounded-xl font-medium text-white transition-all duration-200 transform ${
                isLoading || !inputText.trim()
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0'
              }`}
            >
              {isLoading ? 'Generating Tweets...' : 'Generate 4 Tweets'}
            </button>
            
            <button
              onClick={handleClear}
              disabled={isLoading || (!inputText && !outputText && !error)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isLoading || (!inputText && !outputText && !error)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0'
              }`}
            >
              Clear
            </button>
          </div>
          
          {isLoading && (
            <div className="flex justify-center my-12">
              <LoadingSpinner />
            </div>
          )}
          
          {error && !showErrorPopup && <ErrorMessage message={error} />}
          
          {outputText && !isLoading && (
            <div className="mt-10 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Tweet Variations:</h2>
                <CopyButton textToCopy={outputText} />
              </div>
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl whitespace-pre-wrap border border-indigo-100 shadow-inner">
                {outputText}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          Powered by Google Gemini AI
        </div>
      </div>

      {/* Error popup for API key issues */}
      {showErrorPopup && error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border border-red-100">
            <h2 className="text-xl font-bold text-red-600 mb-4">API Key Error</h2>
            <p className="mb-6 text-gray-700">{error}</p>
            <div className="flex justify-end">
              <button 
                onClick={closeErrorPopup}
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
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
