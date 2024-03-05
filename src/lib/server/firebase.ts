import type { App, AppOptions } from 'firebase-admin/app';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';

const projectId = import.meta.env.VITE_PROJECT_ID;
const clientEmail = import.meta.env.VITE_CLIENT_EMAIL;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const apiKey = import.meta.env.VITE_API_KEY;

const adminConfig: AppOptions = {
	projectId: 'sveltekit-adapter'
};

export const getAdminApp = (): App => (getApps().length ? getApp() : initializeApp(adminConfig));

export const createSessionCookie = async (token: string, maxAge: number) => {
	const expiresIn = maxAge * 1000;
	const auth = getAuth(getAdminApp());
	return await auth.createSessionCookie(token, {
		expiresIn
	});
};

export const createSessionCookieForUserId = async (userId: string, maxAge: number) => {
	const auth = getAuth(getAdminApp());

	const customToken = await auth.createCustomToken(userId, {});
	const firebaseIdToken = await fetch(
		`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${apiKey}`,
		{
			method: 'POST',
			body: JSON.stringify({ token: customToken, returnSecureToken: true })
		}
	)
		.then((res) => res.json())
		.then((res) => res.idToken);

	return createSessionCookie(firebaseIdToken, maxAge);
};

export const verifyIdToken = (token: string): Promise<DecodedIdToken> => {
	const auth = getAuth(getAdminApp());
	return auth.verifyIdToken(token);
};

export const getIdTokenFromSessionCookie = async (
	sessionCookie: string | null
): Promise<DecodedIdToken | null> => {
	if (!sessionCookie) return null;

	const auth = getAuth(getAdminApp());

	return auth.verifySessionCookie(sessionCookie, true).catch(() => null);
};
