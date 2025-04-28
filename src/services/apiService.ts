// API Service that uses the Gemini API
import * as geminiApi from './geminiApi';

// Export the Gemini API directly
export const tweetsFromPost = geminiApi.tweetsFromPost;

export default {
  tweetsFromPost
}; 