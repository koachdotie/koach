import type { DocumentSnapshot, DocumentData } from 'firebase/firestore';

export class Client {
	uid: string;
	firstName: string;
	lastName: string;
	email: string;
	constructor(uid: string, firstName: string, lastName: string, email: string) {
		this.uid = uid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
}

export const clientConverter = {
	// Convert Client to firestore snapshot (for writes)
	toFirestore: (client: Client) => {
		return { ...client };
	},

	// Convert firestore snapshot to Client (for reads)
	fromFirestore: (snapshot: DocumentSnapshot<DocumentData>) => {
		const data = snapshot.data();
		if (!data) throw new Error('Client data not found');

		return new Client(
			data.uid,
			data.firstName,
			data.lastName,
			data.email
		);
	}
};
