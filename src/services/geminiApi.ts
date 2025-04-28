// Real Gemini API service using the official Google GenAI SDK
import { GoogleGenAI } from "@google/genai";

type RemixRequest = {
  text: string;
  style?: string; // Making style optional as we're not using it anymore
};

type RemixResponse = {
  remixedText: string;
  tweets?: string[]; // Add tweets array to the response
};

// Get API key from environment variable using Vite's format
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize the Google GenAI client
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const tweetFromPostPrompt = `
You are a social media expert and ghostwriter.

You work for a popular blogger, and your job is to take their blog post and come up with a variety of
tweets to share ideas from the post.

Since you are a ghostwriter, you need to make sure to follow the style, tone, and voice of the blog post
as closely as possible.

Remember: Tweets cannot be longer than 280 characters.

Please return exactly 5 tweets, with each tweet separated by three dashes like this: "---"
This format is important as it will be used to display each tweet in its own box on the website.

Do not use any hashtags or emojis.

Here is the blog post:

`

export const tweetsFromPost = async (request: RemixRequest): Promise<RemixResponse> => {
  if (!ai || !API_KEY) {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file with the name VITE_GEMINI_API_KEY.');
  }

  const { text } = request;
  
  try {
    // Construct prompt to generate 4 different tweet variations
    const prompt = `${tweetFromPostPrompt} ${text}`;
    
    // Generate content using the models API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt
    });
    
    // Get the text from the response
    const generatedText = response.text || '';
    
    // Split the response by the "---" separator to get individual tweets
    const tweets = generatedText.split('---').map(tweet => tweet.trim()).filter(tweet => tweet);
    
    return {
      remixedText: generatedText,
      tweets: tweets
    };
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    
    // Check for invalid API key
    if (error.message && (
      error.message.includes('API key not valid') || 
      error.message.includes('INVALID_ARGUMENT') ||
      error.message.includes('invalid API key')
    )) {
      throw new Error('Invalid API key. Please check your Gemini API key in the .env file and try again.');
    }
    
    // Re-throw original error with more context
    throw error;
  }
};

export default {
  tweetsFromPost
}; 