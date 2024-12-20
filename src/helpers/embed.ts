export interface EmbedType {
	title?: string;
	type?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: EmbedFooter;
	image?: EmbedImage;
	thumbnail?: EmbedThumbnail;
	video?: EmbedVideo;
	provider?: EmbedProvider;
	author?: EmbedAuthor;
	fields?: EmbedField[];
}

export interface EmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

export interface EmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedAuthor {
	name?: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedImage {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedThumbnail {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedVideo {
	url: string;
	height?: number;
	width?: number;
}

export interface EmbedProvider {
	name?: string;
	url?: string;
}
