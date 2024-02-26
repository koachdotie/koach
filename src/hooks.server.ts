import admin from 'firebase-admin';
import { redirect } from '@sveltejs/kit';

const unprotectedRoutes = ['/signup', '/login'];
const protectedRoutes = ['/', '/programs', '/workouts', '/exercises'];

const svcAccount = {
	type: import.meta.env.VITE_TYPE,
	project_id: import.meta.env.VITE_PROJECT_ID,
	private_key_id: import.meta.env.VITE_PRIVATE_KEY_ID,
	private_key: import.meta.env.VITE_PRIVATE_KEY,
	client_email: import.meta.env.VITE_CLIENT_EMAIL,
	client_id: import.meta.env.VITE_CLIENT_ID,
	auth_uri: import.meta.env.VITE_AUTH_URI,
	token_uri: import.meta.env.VITE_TOKEN_URI,
	auth_provider_x509_cert_url: import.meta.env.VITE_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: import.meta.env.VITE_CLIENT_X509_CERT_URL,
	unierse_domain: import.meta.env.VITE_UNIVERSE_DOMAIN
};

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
