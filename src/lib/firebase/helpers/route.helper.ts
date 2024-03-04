import { goto } from '$app/navigation';
import type { User } from 'firebase/auth';
import { db } from '../firebase.client.js';
import { collection, setDoc, doc } from 'firebase/firestore';

export async function afterRegister(url: URL, user: User, invalidateAll: boolean) {
	const route = url.searchParams.get('redirect') || '/';
	// await createUser(user)
	await goto(route, { invalidateAll: invalidateAll });
}

export async function createUser(user: User) {
	try {
		const users = collection(db, 'users');
		await setDoc(doc(users, user.uid), {
			uid: user.uid,
			email: user.email
		});
	} catch (e) {
		console.error(e);
		throw e;
	}
}
