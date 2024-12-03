import { InteractionResponseType } from 'discord-interactions';
import { createResponse } from '../helpers/response';
import { showcaseHandler } from './showcase';

const discordCommand = (name: string, handler: (args: any[]) => any) => {
	return { name, execute: handler };
};

export const commandList = [
	discordCommand('ping', () => createResponse(InteractionResponseType.PONG)),
	discordCommand('showcase', (args) => showcaseHandler(args)),
];
