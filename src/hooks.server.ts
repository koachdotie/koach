import type { Database } from '$lib/supabase/database.types';
import '$lib/supabase/supabase';
import { createServerClient } from '@supabase/ssr';

// const unprotectedRoutes = ['/auth'];
// const protectedRoutes = ['/', '/programs', '/workouts', '/exercises'];

export async function handle({ event, resolve }): Promise<Response> {
	console.log('\nfetching enpoint:', event.url.pathname);
	event.locals.serverSupabase = createServerClient<Database>(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
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
		} = await event.locals.serverSupabase.auth.getSession();
		return session;
	};

	let session = await event.locals.getSession();
	// console.log('\n=> hooks.server.ts session userId: ', session?.user.id);

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
}

// export async function handle({ event, resolve }): Promise<Response> {
// 	event.locals.supabase = createServerClient(
// 		import.meta.env.VITE_SUPABASE_URL,
// 		import.meta.env.VITE_SUPABASE_ANON_KEY,
// 		{
// 			cookies: {
// 				get: (key) => event.cookies.get(key),
// 				set: (key, value, options) => {
// 					event.cookies.set(key, value, { ...options, path: '/' });
// 				},
// 				remove: (key, options) => {
// 					event.cookies.delete(key, { ...options, path: '/' });
// 				}
// 			}
// 		}
// 	);

// 	event.locals.getSession = async () => {
// 		const {
// 			data: { session }
// 		} = await event.locals.supabase.auth.getSession();
// 		return session;
// 	};

// 	return resolve(event, {
// 		filterSerializedResponseHeaders(name) {
// 			return name === 'content-range';
// 		}
// 	});

// 	// let sesh: string | undefined = event.cookies.get('session');

// 	// if (sesh) {
// 	// 	const token = await getIdTokenFromSessionCookie(sesh);

// 	// 	if (token) {
// 	// 		let user = await getAuth().getUser(token.uid);

// 	// 		session.update((currentSession) => ({
// 	// 			...currentSession,
// 	// 			user,
// 	// 			loggedIn: true
// 	// 		}));

// 	// 		if (unprotectedRoutes.includes(event.url.pathname)) {
// 	// 			throw redirect(302, '/');
// 	// 		}

// 	// 		if (shouldRefreshToken(token)) {
// 	// 			await updateSessionCookie(token, event.cookies);
// 	// 		}
// 	// 	}
// 	// } else {
// 	// 	if (protectedRoutes.includes(event.url.pathname)) {
// 	// 		throw redirect(302, `/auth?redirect=${event.url.pathname}`);
// 	// 	}
// 	// }

// 	// return resolve(event);
// }
