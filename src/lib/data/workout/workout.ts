// import { BaseEntityTemplate, BaseEntityInstance } from '../BaseEntity';
// import type { ExerciseInstance } from '../exercise/exercise';

// export class WorkoutTemplate extends BaseEntityTemplate {
// 	exercises: ExerciseInstance[];

// 	constructor(uid: string, name: string, description: string, exercises: ExerciseInstance[]) {
// 		super(uid, name, description);
// 		this.exercises = exercises;
// 	}
// }

// export class WorkoutInstance extends BaseEntityInstance {
// 	date: Date;
// 	exercises: ExerciseInstance[];

// 	constructor(
// 		uid: string,
// 		templateUid: string,
// 		workout: WorkoutTemplate,
// 		date: Date,
// 		exercises: ExerciseInstance[]
// 	) {
// 		super(uid, workout.name, workout.description, templateUid);
// 		this.date = date;
// 		this.exercises = exercises;
// 	}
// }
