import { createClient, type PostgrestError } from '@supabase/supabase-js';
import type { Database } from './database.types';
import type { Infer } from 'sveltekit-superforms';
import type { ProgramFormSchema } from '$lib/components/custom/dialogs/create-program/schema';
import { type Program } from '$lib/data/program/program-scheme';
const options = {
	auth: {
		persistSession: true,
		storageKey: 'supabase'
	}
};

export const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
	options
);

export async function createProgram(
	program: Infer<ProgramFormSchema>
): Promise<PostgrestError | undefined> {
	try {
		const { data, error } = await supabase
			.from('programs')
			.insert({
				name: program.name,
				description: program.description,
				modality: program.modality,
				experienceLevel: program.experienceLevel
			})
			.select('*');

		if (error) {
			console.error('Error creating program:', error.message);
			return error;
		}

		if (!data) {
			console.error('Error creating program: no data returned');
			return {
				code: '500',
				message:
					'No data returned during program creation. Program may? have been created successfully',
				details: '',
				hint: ''
			};
		}

		console.log('Program created successfully');
	} catch (error) {
		console.error('Unexpected error creating program:', error);
		return error as PostgrestError;
	}
}

export async function fetchPrograms(): Promise<Program[]> {
	let { data: programs, error } = await supabase.from('programs').select('*');

	if (programs && !error) {
		return programs;
	} else {
		console.error('Error fetching programs with error: ', error);
		return [];
	}
}

export async function fetchProgram(id: string): Promise<Program | undefined> {
	let { data: program, error } = await supabase.from('programs').select('*').eq('id', id).single();

	if (program && !error) {
		return program;
	} else {
		console.error(`Error fetching program ${id} with error: `, error);
		return undefined;
	}
}
