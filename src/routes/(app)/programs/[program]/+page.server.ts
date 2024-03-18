import { fetchProgram } from '$lib/supabase/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession }, url }) => {
	return {
		program: await fetchProgram(url.pathname.split('/').pop() as string),
		session: await getSession()
	};
};
