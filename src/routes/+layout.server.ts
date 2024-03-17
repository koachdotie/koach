import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	let sesh = await getSession();
	// console.log('\n=> +layout.server.ts session userId: ', sesh?.user.id);

	return {
		session: sesh
	};
};
