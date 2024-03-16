import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import type { Infer } from 'sveltekit-superforms';
import type { ProgramFormSchema } from '$lib/components/custom/dialogs/create-program/schema';
const options = {
	auth: {
		persistSession: true,
		storageKey: 'supabase'
	}
};

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
	options
);

export async function createProgram(
	program: Infer<ProgramFormSchema>
): Promise<string | undefined> {
	try {
		console.log('Creating program:', program);

		const { data, error } = await supabase.from('programs').insert({
			name: program.name,
			description: program.description,
			modality: program.modality,
			experienceLevel: program.experienceLevel
		});

		if (error) {
			console.error('Error creating program:', error.message);
			return error.message;
		}

		console.log('Program created successfully:', data);
	} catch (error) {
		console.error('Unexpected error creating program:', error);
		return 'An unexpected error occurred while creating the program.';
	}
}
