import admin from 'firebase-admin';
import { redirect } from '@sveltejs/kit';
import svcAccount from '../koachsvcaccount.json';

const unprotectedRoutes = ['/signup', '/login'];
const protectedRoutes = ['/', '/programs', '/workouts', '/exercises'];

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(svcAccount as admin.ServiceAccount)
	});
}

async function getUserFromToken(token: string) {
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		return decodedToken;
	} catch (error) {
		console.error('Error verifying auth token', error);
		return null;
	}
}

export async function handle({ event, resolve }) {
	const url = event.url;
	const token = event.cookies.get('idToken');

	const isProtectedRoute = protectedRoutes.includes(url.pathname);
	const redirectPath = new URLSearchParams(url.search).get('redirect') || url.pathname;

	let redirectString = '';

	if (redirectPath === '/') {
		redirectString = `/signup`;
	} else {
		redirectString = `/signup?redirect=${redirectPath}`;
	}
	if (isProtectedRoute && !unprotectedRoutes.includes(url.pathname)) {
		if (token) {
			const user = await getUserFromToken(token);
			if (!user) {
				// User is not authenticated; redirect to signup with the intended redirect path
				throw redirect(302, redirectString);
			}
			// User is authenticated; proceed with the request
			return resolve(event);
		} else {
			// No token found; redirect to signup with the intended redirect path
			throw redirect(302, redirectString);
		}
	}

	// If not a protected route or specifically allowed (unprotected), proceed with the request
	return resolve(event);
}
