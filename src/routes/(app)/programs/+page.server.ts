import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { programSchema } from '$lib/data/program/program-scheme.js';
import { zod } from 'sveltekit-superforms/adapters';
import { createProgramSchema } from '../../../lib/components/custom/dialogs/create-program/schema';
import { fail } from '@sveltejs/kit';
import { fetchPrograms } from '$lib/supabase/supabase.js';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	let session = await getSession();
	// console.log('\n=> +page.server.ts session userId: ', session?.user.id);
	let programs = await fetchPrograms();
	return {
		form: await superValidate(zod(programSchema)),
		programs: programs,
		session: session
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createProgramSchema));
		if (!form.valid) {
			console.error('Invalid form submitted:', form);
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
