import admin from 'firebase-admin';
import { redirect, type Cookies } from '@sveltejs/kit';
import { createSessionCookieForUserId, getIdTokenFromSessionCookie } from '$lib/server/firebase.js';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { SIX_DAYS_IN_SECONDS, ONE_WEEK_IN_SECONDS } from '$lib/constants.js';

const unprotectedRoutes = ['/signup', '/login'];
const protectedRoutes = ['/', '/programs', '/workouts', '/exercises'];

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

export const shouldRefreshToken = (token: DecodedIdToken | null) =>
	token && token.exp - Date.now() / 1000 < SIX_DAYS_IN_SECONDS;

export async function updateSessionCookie(token: DecodedIdToken, cookies: Cookies) {
	const freshSessionCookie = await createSessionCookieForUserId(token.uid, ONE_WEEK_IN_SECONDS);

	cookies.set('session', freshSessionCookie, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: ONE_WEEK_IN_SECONDS
	});
}

export async function handle({ event, resolve }): Promise<Response> {
	let session: string | undefined = event.cookies.get('session');

	if (session) {
		const token = await getIdTokenFromSessionCookie(session);

		event.locals.user = token ? { id: token.uid, email: token.email } : null;

		if (token && unprotectedRoutes.includes(event.url.pathname)) {
			throw redirect(302, '/');
		}

		if (token && shouldRefreshToken(token)) {
			await updateSessionCookie(token, event.cookies);
		}
	} else {
		if (protectedRoutes.includes(event.url.pathname)) {
			throw redirect(302, `/signup?redirect=${event.url.pathname}`);
		}
	}

	return resolve(event);
}
