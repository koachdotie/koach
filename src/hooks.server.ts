import admin from 'firebase-admin';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { createSessionCookieForUserId } from '$lib/server/firebase.js';

const unprotectedRoutes = ['/signup', '/login'];
const protectedRoutes = ['/', '/programs', '/workouts', '/exercises'];
export const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
const SIX_DAYS_IN_SECONDS = ONE_DAY_IN_SECONDS * 6;
export const ONE_WEEK_IN_SECONDS = 7 * ONE_DAY_IN_SECONDS;

/**
 * Firebase-admin SDK setup.
 * This is used for tokens on the server side (auth persistence)
 */
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

export async function handle({ event, resolve }): Promise<Response> {
	const url = event.url;
	const token = event.cookies.get('idToken');

	if (unprotectedRoutes.includes(url.pathname)) {
		return resolve(event);
	}

	if (protectedRoutes.includes(url.pathname)) {
		if (token) {
			const user = await getUserFromToken(token);
			if (!user) {
				return redirect(302, `/signup?redirect=${url.pathname}`);
			}
			event.locals.user = { id: user.uid, email: user.email };
			return resolve(event);
		} else {
			return redirect(302, `/signup?redirect=${url.pathname}`);
		}
	}

	return resolve(event);
}

const shouldRefreshToken = (token: DecodedIdToken | null) =>
	token && token.exp - Date.now() / 1000 < SIX_DAYS_IN_SECONDS;

async function updateSessionCookie(token: DecodedIdToken, cookies: Cookies) {
	const freshSessionCookie = await createSessionCookieForUserId(token.uid, ONE_WEEK_IN_SECONDS);

	cookies.set('session', freshSessionCookie, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: ONE_WEEK_IN_SECONDS
	});
}
