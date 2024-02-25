import admin from 'firebase-admin';
import { redirect } from '@sveltejs/kit';
import svcAccount from '../koachsvcaccount.json';

// Initialize Firebase Admin SDK
if (admin.apps.length === 0 ) {
    admin.initializeApp({
        credential: admin.credential.cert(svcAccount as admin.ServiceAccount),
    });
}

async function getUserFromToken(token: string) {
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		return decodedToken;
	} catch (error) {
		console.error('Error verifying auth token', error);
		return null;
	}
}

export async function handle({ event, resolve }) {
    const url = event.url;
    const token = event.cookies.get('idToken');
    const unprotectedRoutes = ['/signup', '/login'];

    if (unprotectedRoutes.includes(url.pathname)) {
        return resolve(event);
    } else {
        if (token) {
            try {
                const user = await getUserFromToken(token);
                if (!user) {
                    throw redirect(302, '/signup?redirect=' + encodeURIComponent(url.pathname));
                }
                return resolve(event);
            } catch (error) {
                console.error('Error verifying auth token', error);
                throw redirect(302, '/signup');
            }
        } else {
            throw redirect(302, '/signup');
        }
    }
}

