import { goto } from '$app/navigation';

export async function afterRegister(url: URL, invalidateAll: boolean) {
	console.log('afterRegister', url, invalidateAll);
	const route = url.searchParams.get('redirect') || '/';
	console.log('route', route);
	await goto(route, { invalidateAll: invalidateAll });
}
