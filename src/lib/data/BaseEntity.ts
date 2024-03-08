export abstract class BaseEntityTemplate {
	uid: string;
	name: string;
	description: string;

	constructor(uid: string, name: string, description: string) {
		this.uid = uid;
		this.name = name;
		this.description = description;
	}
}

export abstract class BaseEntityInstance extends BaseEntityTemplate {
	templateUid: string;

	constructor(uid: string, name: string, description: string, templateUid: string) {
		super(uid, name, description);
		this.templateUid = templateUid;
	}
}
