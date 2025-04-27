# Tweet Remixer

A tool to generate tweet variations based on your content using React and the Gemini API.

## Features

1. Enter text you want to remix into tweets
2. Get 4 AI-generated tweet variations
3. Simple, clean interface
4. Copy to clipboard functionality

## Tech Stack

- React with TypeScript
- Tailwind CSS
- Google GenAI SDK for JavaScript
- Gemini API (Google AI)

## Setup and Running

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   You can get your API key from [Google AI Studio](https://ai.google.dev/)
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Deploying to Production

1. Make sure to set the environment variable `REACT_APP_GEMINI_API_KEY` with your actual Gemini API key
2. Build the project:
   ```
   npm run build
   ```
3. Deploy the contents of the `build` folder to your hosting service

## Important Note

The app requires a valid Gemini API key to work. If you don't have an API key, the app will display an error message.

## API References

This project uses the [Google GenAI SDK for JavaScript](https://www.npmjs.com/package/@google/genai) to interact with the Gemini API. For more information about the Gemini API, visit [Google AI for Developers](https://ai.google.dev/gemini-api/docs/text-generation).
