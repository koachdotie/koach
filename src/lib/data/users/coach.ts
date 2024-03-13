// import type { DocumentSnapshot, DocumentData } from 'firebase/firestore';

// export class Coach {
// 	uid: string;
// 	firstName: string;
// 	lastName: string;
// 	email: string;

// 	constructor(uid: string, firstName: string, lastName: string, email: string) {
// 		this.uid = uid;
// 		this.firstName = firstName;
// 		this.lastName = lastName;
// 		this.email = email;
// 	}
// }

// export const coachConverter = {
// 	// Convert Coach to firestore snapshot (for writes)
// 	toFirestore: (client: Coach) => {
// 		return { ...client };
// 	},

// 	// Convert firestore snapshot to Coach (for reads)
// 	fromFirestore: (snapshot: DocumentSnapshot<DocumentData>) => {
// 		const data = snapshot.data();
// 		if (!data) throw new Error('Coach data not found');

// 		return new Coach(data.uid, data.firstName, data.lastName, data.email);
// 	}
// };
