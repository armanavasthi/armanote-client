import { Role } from "./role";

export class User {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	roles: Role[];

	// https://stackoverflow.com/a/37682352/7456022
	public constructor(init?: Partial<User>) {
		Object.assign(this, init);
	}
}
