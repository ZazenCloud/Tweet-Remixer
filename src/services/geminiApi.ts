// Real Gemini API service using the official Google GenAI SDK
import { GoogleGenAI } from "@google/genai";

type RemixRequest = {
  text: string;
  style?: string; // Making style optional as we're not using it anymore
};

type RemixResponse = {
  remixedText: string;
};

// Get API key from environment variable using Vite's format
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize the Google GenAI client
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const remixContent = async (request: RemixRequest): Promise<RemixResponse> => {
  if (!ai || !API_KEY) {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file with the name VITE_GEMINI_API_KEY.');
  }

  const { text } = request;
  
  try {
    // Construct prompt to generate 4 different tweet variations
    const prompt = `Create 4 different tweet variations based on the following text. 
Each tweet should be unique, engaging, and formatted properly for Twitter (under 280 characters). 
Make them varied in tone and style. Number each tweet 1-4.

Input text: ${text}`;
    
    // Generate content using the models API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt
    });
    
    // Get the text from the response
    const generatedText = response.text || '';
    
    return {
      remixedText: generatedText
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
  remixContent
}; 