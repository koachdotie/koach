import admin from 'firebase-admin';
import { redirect, type Cookies } from '@sveltejs/kit';
import { createSessionCookieForUserId, getIdTokenFromSessionCookie } from '$lib/server/firebase.js';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { SIX_DAYS_IN_SECONDS, ONE_WEEK_IN_SECONDS } from '$lib/constants.js';
import { session } from '$lib/firebase/session.js';
import '$lib/supabase';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { createServerClient } from '@supabase/ssr';
import { VITE_SUPABASE_KEY, VITE_SUPABASE_URL } from '$env/static/private';

const unprotectedRoutes = ['/auth'];
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
	event.locals.supabase = createServerClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				/**
				 * Note: You have to add the `path` variable to the
				 * set and remove method due to sveltekit's cookie API
				 * requiring this to be set, setting the path to an empty string
				 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
				 */
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' });
				}
			}
		}
	);

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	// let sesh: string | undefined = event.cookies.get('session');

	// if (sesh) {
	// 	const token = await getIdTokenFromSessionCookie(sesh);

	// 	if (token) {
	// 		let user = await getAuth().getUser(token.uid);

	// 		session.update((currentSession) => ({
	// 			...currentSession,
	// 			user,
	// 			loggedIn: true
	// 		}));

	// 		if (unprotectedRoutes.includes(event.url.pathname)) {
	// 			throw redirect(302, '/');
	// 		}

	// 		if (shouldRefreshToken(token)) {
	// 			await updateSessionCookie(token, event.cookies);
	// 		}
	// 	}
	// } else {
	// 	if (protectedRoutes.includes(event.url.pathname)) {
	// 		throw redirect(302, `/auth?redirect=${event.url.pathname}`);
	// 	}
	// }

	// return resolve(event);
}
