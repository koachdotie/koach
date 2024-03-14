import { redirect, type Cookies } from '@sveltejs/kit';
import { SIX_DAYS_IN_SECONDS, ONE_WEEK_IN_SECONDS } from '$lib/constants.js';
import '$lib/supabase/supabase';
import { createServerClient } from '@supabase/ssr';

const unprotectedRoutes = ['/auth'];
const protectedRoutes = ['/', '/programs', '/workouts', '/exercises'];

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
