import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { programSchema } from '$lib/data/program/program-scheme.js';
import { zod } from 'sveltekit-superforms/adapters';
import { createProgramSchema } from '../../../lib/components/custom/dialogs/create-program/schema';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabase.js';

async function createProgram() {
	const { error } = await supabase.from('programs').insert({ name: 'My Program' });
	console.log('error: ', error?.message);
}

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	let session = await getSession();
	console.log('\n=> +page.server.ts session userId: ', session?.user.id);
	return {
		form: await superValidate(zod(programSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createProgramSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		createProgram();
		console.log('form', form);
		return {
			form
		};
	}
};
