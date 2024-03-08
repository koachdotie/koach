import type { DocumentData } from 'firebase/firestore';
import type { WorkoutInstance } from '../workout/workout';

export class Program {
	uid: string;
	clientUid: string | undefined;
	name: string;
	description: string;
	modality: Modality;
	experienceLevel: ExperienceLevel;
	plannedWorkouts: WorkoutInstance[];

	constructor(
		uid: string,
		clientUid: string | undefined,
		name: string,
		description: string,
		modality: Modality,
		experienceLevel: ExperienceLevel,
		plannedWorkouts: WorkoutInstance[]
	) {
		this.uid = uid;
		this.clientUid = clientUid;
		this.name = name;
		this.description = description;
		this.modality = modality;
		this.experienceLevel = experienceLevel;
		this.plannedWorkouts = plannedWorkouts;
	}

	static fromFirestore(data: DocumentData): Program {
		return new Program(
			data.uid,
			data.clientId,
			data.name,
			data.description,
			data.modality,
			data.experienceLevel,
			data.plannedWorkouts
		);
	}
}

export enum Modality {
	Hypertrophy = 'Hypertrophy',
	Strength = 'Strength',
	Powerbuilding = 'Powerbuilding',
	SportSpecific = 'Sport-Specific',
	Power = 'Power',
	Cardiovascular = 'Cardiovascular'
}

export enum ExperienceLevel {
	Beginner = 'Beginner',
	LateBeginner = 'Late Beginner',
	EarlyIntermediate = 'Early Intermediate',
	Intermediate = 'Intermediate',
	LateIntermediate = 'Late Intermediate',
	Advanced = 'Advanced'
}
