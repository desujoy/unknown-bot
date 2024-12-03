import { Button, MessageComponent, MessageComponentTypes, StringSelectOption, TextStyleTypes } from 'discord-interactions';

export interface ComponentType {
	type: MessageComponentTypes.ACTION_ROW;
	components: MessageComponent[];
}

export const createComponent = (data: MessageComponent[]) => {
	return {
		type: MessageComponentTypes.ACTION_ROW,
		components: data,
	} as ComponentType;
};

export const createButton = (data: Button) => {
	return {
		type: MessageComponentTypes.BUTTON,
		style: data.style,
	} as MessageComponent;
};

interface InputText {
	custom_id: string;
	style: TextStyleTypes.SHORT | TextStyleTypes.PARAGRAPH;
	label: string;
	min_length?: number;
	max_length?: number;
	required?: boolean;
	value?: string;
	placeholder?: string;
}

export const createInputText = (data: InputText) => {
	return {
		type: MessageComponentTypes.INPUT_TEXT,
		custom_id: data.custom_id,
		style: data.style,
		label: data.label,
		placeholder: data.placeholder,
		required: data.required,
	} as MessageComponent;
};

interface StringSelect {
	custom_id: string;
	placeholder?: string | undefined;
	min_values?: number | undefined;
	max_values?: number | undefined;
	disabled?: boolean | undefined;
	options: StringSelectOption[];
}

export const createStringSelect = (data: StringSelect) => {
	return {
		type: MessageComponentTypes.STRING_SELECT,
		custom_id: data.custom_id,
		placeholder: data.placeholder,
		min_values: data.min_values,
		max_values: data.max_values,
		options: data.options,
	} as MessageComponent;
};

