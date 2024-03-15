import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY,
		{
			global: {
				fetch
			},
			cookies: {
				get(key) {
					if (!isBrowser()) {
						return JSON.stringify(data.session);
					}

					const cookie = parse(document.cookie);
					return cookie[key];
				}
			}
		}
	);

	const {
		data: { session }
	} = await supabase.auth.getSession();
	console.log('\n=> +layout.ts session userId: ', session?.user.id);
	return { supabase, session };
};
