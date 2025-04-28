# Tweet Remixer

Create and save multiple engaging tweet variations from your original idea using AI.

## Features

- Generate 5 tweet variations from your original content
- Copy tweets directly to clipboard
- Save your favorite tweets for later use
- View and manage your saved tweets in a sidebar

## Setup

### Prerequisites

- Node.js (v20 or higher)
- Google Gemini API key
- Firebase project (for saved tweets feature)

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Add a web app to your project
4. Enable Firestore Database in your project

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   npm install firebase
   ```
3. Create a `.env` file in the project root with the following variables:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```
   
   You can find your Firebase config values in the Firebase console under Project Settings > General > Your Apps > Firebase SDK snippet.

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Enter your content in the text area
2. Click "Generate 5 Tweets" to create tweet variations
3. Use the "Copy" button to copy a tweet to your clipboard
4. Use the "Save" button to save a tweet for later
5. Click "Saved Tweets" in the header to view your saved tweets

## Technologies Used

- React with TypeScript
- Tailwind CSS
- Google Gemini AI
- Firebase Firestore (for storing saved tweets)

## Tech Stack

- React with TypeScript
- Tailwind CSS
- Google GenAI SDK for JavaScript
- Gemini API (Google AI)