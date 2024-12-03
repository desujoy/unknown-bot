import { ButtonStyleTypes, MessageComponentTypes, TextStyleTypes } from 'discord-interactions';
import { createMessage, createModal } from '../helpers/response';
import { createButton, createComponent, createInputText } from '../helpers/components';

export function showcaseHandler(args: any[]) {
	switch (args[0].value) {
		case 'start':
			return createMessage({
				content: 'Click the button below to open the modal!',
				components: [
					createComponent([
						createButton({
							type: MessageComponentTypes.BUTTON,
							style: ButtonStyleTypes.PRIMARY,
							label: 'Open Modal',
							custom_id: 'showcase_modal',
						}),
					]),
				],
			});
		case 'stop':
			return createMessage({
				content: 'Stopping showcase...',
			});
		default:
			return createMessage({
				content: 'Unknown command',
			});
	}
}

export async function showcaseModalSubmitHandler(bot_token: string, data: any) {
	const test_channel = '1307365806585151568';

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
		return createMessage({
			content: 'Message sent!',
			flags: 64,
		});
	} else {
		return createMessage({
			content: 'Failed to send message',
		});
	}
}

export function showcaseModalHandler() {
	return createModal({
			custom_id: 'showcase_modal',
			title: 'Example Modal',
			components: [
				createComponent([
					createInputText({
						custom_id: 'input_field',
						style: TextStyleTypes.SHORT,
						label: 'Enter some text',
						placeholder: 'Type something here...',
						required: true,
					}),
				]),
		],
	});
}
