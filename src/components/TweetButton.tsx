import React from 'react';

interface TweetButtonProps {
  textToCopy: string;
}

const TweetButton: React.FC<TweetButtonProps> = ({ textToCopy }) => {
  const handleTweet = () => {
    // Encode the text for a URL
    const encodedText = encodeURIComponent(textToCopy);
    // Create the Twitter intent URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    // Open in a new tab
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleTweet}
      className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 
        hover:bg-blue-500 hover:text-white hover:shadow-md hover:scale-105 hover:border-transparent
        transition-all duration-200 transform text-sm w-[94px]"
      title="Tweet this"
    >
      {/* Twitter bird icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
      </svg>
      <span className="font-medium">Tweet</span>
    </button>
  );
};

export default TweetButton; 