// import { writable } from 'svelte/store';
// import { fetchPrograms } from '$lib/supabase/supabase';

// function createProgramsStore() {
//     const { subscribe, set } = writable([]);

//     return {
//         subscribe,
//         refresh: async () => {
//             const programs = await fetchPrograms();
//             set(programs);
//         }
//     };
// }

// export const programsStore = createProgramsStore();