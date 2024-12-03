import { InteractionResponseType } from 'discord-interactions';
import { AllowedMentions } from './allowed-mentions';
import { AttachmentType } from './attachments';
import { ComponentType } from './components';
import { EmbedType } from './embed';
import { PollType } from './poll';

export type InteractionResponseData = MessageResponseData | ModalResponseData;

export interface MessageResponseData {
	tts?: boolean;
	content?: string;
	embeds?: EmbedType[];
	allowed_mentions?: AllowedMentions;
	flags?: number;
	components?: ComponentType[];
	attachments?: AttachmentType[];
	poll?: PollType;
}

export interface ModalResponseData {
	custom_id: string;
	title: string;
	components: ComponentType[];
}

export const createResponse = (type: InteractionResponseType, data?: InteractionResponseData) => {
	return {
		type,
		data,
	};
};

export const createMessage = (data: MessageResponseData) => {
	return createResponse(InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data);
};

export const createModal = (data: ModalResponseData) => {
	return createResponse(InteractionResponseType.MODAL, data);
};
