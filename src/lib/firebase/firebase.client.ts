import { browser } from '$app/environment';
import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { type Firestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { getAnalytics, type Analytics } from 'firebase/analytics';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;
export let analytics: Analytics;

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

export const initializeFirebase = () => {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(firebaseConfig);
		analytics = getAnalytics(app);
		auth = getAuth(app);
		setPersistence(auth, browserLocalPersistence)
		db = initializeFirestore(app, {
			cacheSizeBytes: CACHE_SIZE_UNLIMITED
		});
	}
};
