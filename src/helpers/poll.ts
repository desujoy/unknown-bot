import { EmojiInfo } from 'discord-interactions';

export interface PollType {
	question: PollMedia;
	answers: PollAnswer[];
	duration?: number;
	allow_multiselect?: boolean;
	layout_type?: PollLayout;
}

export interface PollMedia {
	text: string;
	emoji?: EmojiInfo;
}

export interface PollAnswer {
	answer_id: number;
	poll_media: PollMedia;
}

export enum PollLayout {
	DEFAULT = 1,
}
