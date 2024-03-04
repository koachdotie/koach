import type { UserRecord } from 'firebase-admin/auth';
import type { User } from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';

export type SessionState = {
	user: User | UserRecord;
	loading?: boolean;
	loggedIn?: boolean;
};

export const session = <Writable<SessionState>>writable();
