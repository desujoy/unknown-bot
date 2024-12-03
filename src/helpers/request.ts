import { InteractionType } from 'discord-interactions';

export interface InteractionRequestType {
	type: InteractionType;
	data: InteractionData;
}

export interface InteractionData {
	name: string;
	options: InteractionOption[];
	custom_id?: string;
}

export interface InteractionOption {
	name: string;
	value: string;
}
