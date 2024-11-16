import { ButtonStyleTypes, InteractionResponseType, MessageComponentTypes } from 'discord-interactions';

export function showcaseHandler(args: any[]) {
	switch (args[0].value) {
		case 'start':
			return {
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: 'Click the button below to open the modal!',
					components: [
						{
							type: MessageComponentTypes.ACTION_ROW,
							components: [
								{
									type: MessageComponentTypes.BUTTON,
									style: ButtonStyleTypes.PRIMARY,
									label: 'Open Modal',
									custom_id: 'showcase_modal',
								},
							],
						},
					],
				},
			};
		case 'stop':
			return {
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: 'Stopping showcase...',
				},
			};
		default:
			return {
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: 'Unknown command',
				},
			};
	}
}

export async function showcaseModalSubmitHandler(bot_token: string, data: any) {
	const test_channel = '1307365806585151568';
	const fetch = require('node-fetch');

	let url = `https://discord.com/api/v10/channels/${test_channel}/messages`;

	let options = {
		method: 'POST',
		headers: {
			Authorization: `Bot ${bot_token}`,
			'Content-Type': 'application/json',
		},
		body: `{"content":"${data.components[0].components[0].value}"}`,
	};

	const response = await fetch(url, options);
	const json = await response.json();
	console.log(json);
	if (response.status === 200) {
		return {
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				content: 'Message sent!',
				flags: 64,
			},
		};
	} else {
		return {
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				content: 'Failed to send message',
				flags: 64,
			},
		};
	}
}

export function showcaseModalHandler() {
	return {
		type: InteractionResponseType.MODAL,
		data: {
			custom_id: 'showcase_modal',
			title: 'Example Modal',
			components: [
				{
					type: MessageComponentTypes.ACTION_ROW,
					components: [
						{
							type: MessageComponentTypes.INPUT_TEXT,
							custom_id: 'input_field',
							style: ButtonStyleTypes.PRIMARY,
							label: 'Enter some text',
							placeholder: 'Type something here...',
							required: true,
						},
					],
				},
			],
		},
	};
}
