import { writable, type Writable } from 'svelte/store';

export type SessionState = {
	user: any;
	loading?: boolean;
	loggedIn?: boolean;
};

export const session = <Writable<SessionState>>writable();
