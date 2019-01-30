export class Role {
	id: number;
	role: string;

	public constructor(init?: Partial<Role>) {
		Object.assign(this, init);
	}
}
