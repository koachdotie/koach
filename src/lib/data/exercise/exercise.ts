// import { BaseEntityInstance, BaseEntityTemplate } from '../BaseEntity';

// export class ExerciseTemplate extends BaseEntityTemplate {
// 	constructor(uid: string, name: string, description: string) {
// 		super(uid, name, '');
// 		this.uid = uid;
// 		this.name = name;
// 		this.description = description;
// 	}
// }

// export class ExerciseInstance extends BaseEntityInstance {
// 	sets: ExerciseSet[];

// 	constructor(uid: string, templateUid: string, exercise: ExerciseTemplate, sets: ExerciseSet[]) {
// 		super(uid, exercise.name, exercise.description, templateUid);
// 		this.sets = sets;
// 	}
// }

// interface ExerciseSet {
// 	reps: number;
// 	weight?: number;
// 	rir?: number;
// 	rest: Duration;
// }

// class Duration {
// 	minutes: number;
// 	seconds: number;

// 	constructor(minutes: number = 0, seconds: number = 0) {
// 		this.minutes = minutes;
// 		this.seconds = seconds;
// 		this.normalize();
// 	}

// 	private normalize() {
// 		if (this.seconds >= 60) {
// 			this.minutes += Math.floor(this.seconds / 60);
// 			this.seconds %= 60;
// 		}
// 	}

// 	addSeconds(seconds: number) {
// 		this.seconds += seconds;
// 		this.normalize();
// 	}

// 	toString() {
// 		return `${this.minutes.toString().padStart(2, '0')}:${this.seconds
// 			.toString()
// 			.padStart(2, '0')}`;
// 	}
// }
