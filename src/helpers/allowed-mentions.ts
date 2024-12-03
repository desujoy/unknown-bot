export interface AllowedMentions {
	parse: AllowedMentionType[];
	roles: string[];
	users: string[];
	replied_user: boolean;
}

export enum AllowedMentionType {
	ROLE = 'roles',
	USER = 'users',
	EVERYONE = 'everyone',
}
