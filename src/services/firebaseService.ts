// Firebase service for saving and retrieving tweets
import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  Firestore
} from 'firebase/firestore';

// Firebase configuration - replace with your own config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
console.log('Firebase initialized successfully');

export interface SavedTweet {
  id?: string;
  content: string;
  createdAt: any;
}

// Save tweet to Firestore
export const saveTweet = async (tweetContent: string): Promise<SavedTweet> => {
  try {
    const tweetData = {
      content: tweetContent,
      createdAt: serverTimestamp()
    };
    
    const tweetsCollection = collection(db, 'savedTweets');
    const docRef = await addDoc(tweetsCollection, tweetData);
    
    console.log('Tweet saved successfully with ID:', docRef.id);
    
    return {
      id: docRef.id,
      ...tweetData
    };
  } catch (error) {
    console.error('Error saving tweet:', error);
    throw new Error('Failed to save tweet');
  }
};

// Get all saved tweets
export const getSavedTweets = async (): Promise<SavedTweet[]> => {
  try {
    const tweetsCollection = collection(db, 'savedTweets');
    const tweetsQuery = query(tweetsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(tweetsQuery);
    
    return querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    } as SavedTweet));
  } catch (error) {
    console.error('Error getting saved tweets:', error);
    throw new Error('Failed to load tweets');
  }
};

// Delete a saved tweet
export const deleteSavedTweet = async (tweetId: string): Promise<void> => {
  try {
    const tweetDocRef = doc(db, 'savedTweets', tweetId);
    await deleteDoc(tweetDocRef);
  } catch (error) {
    console.error('Error deleting tweet:', error);
    throw new Error('Failed to delete tweet');
  }
};

export default {
  saveTweet,
  getSavedTweets,
  deleteSavedTweet
}; 