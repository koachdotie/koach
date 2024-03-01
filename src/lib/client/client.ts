// import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import {
// 	getAuth,
// 	isSignInWithEmailLink,
// 	sendSignInLinkToEmail,
// 	setPersistence,
// 	signInWithEmailLink,
// 	inMemoryPersistence,
// } from 'firebase/auth';
// import {
// 	PUBLIC_FIREBASE_API_KEY,
// 	PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	PUBLIC_FIREBASE_PROJECT_ID
// } from '$env/static/public';

// const firebaseConfig: FirebaseOptions = {
// 	apiKey: PUBLIC_FIREBASE_API_KEY,
// 	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	projectId: PUBLIC_FIREBASE_PROJECT_ID
// };
// export const getClientApp: () => Promise<FirebaseApp> = async () => {
// 	if (getApps().length) return getApp();

// 	const clientApp = initializeApp(firebaseConfig);
// 	const auth = getAuth(clientApp);
// 	await setPersistence(auth, inMemoryPersistence);

// 	return clientApp;
// };
