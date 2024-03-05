import type { DocumentSnapshot, DocumentData, SnapshotOptions } from 'firebase/firestore';

export const firestoreConverter = {
	toFirestore<T extends Record<string, any>>(modelObject: T, fields: string[]): DocumentData {
		const firestoreObject: DocumentData = {};
		fields.forEach((field) => {
			if (modelObject[field] !== undefined) {
				firestoreObject[field] = modelObject[field];
			}
		});
		return firestoreObject;
	},

	fromFirestore<T extends new (...args: any[]) => any>(
		snapshot: DocumentSnapshot<DocumentData>,
		type: T
	): InstanceType<T> {
		const data = snapshot.data();
		if (!data) throw new Error('Data not found');

		// Assuming the constructor of the type can take the Firestore data object directly
		return new type(data);
	}
};
