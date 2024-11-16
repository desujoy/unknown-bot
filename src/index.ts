import { Hono } from 'hono';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import { showcaseHandler, showcaseModalHandler, showcaseModalSubmitHandler } from './commands/showcase';

const app = new Hono<{ Bindings: Env }>();

app.post('/interactions', async (c) => {
	if (c.req.method !== 'POST') {
		return c.text('Method Not Allowed', { status: 405 });
	}

	const signature = c.req.header('X-Signature-Ed25519');
	const timestamp = c.req.header('X-Signature-Timestamp');

	if (!signature || !timestamp) {
		return c.text('Unauthorized', { status: 401 });
	}
	const isValid = await verifyKey(await c.req.arrayBuffer(), signature, timestamp, c.env.DISCORD_PUBLIC_KEY);

	if (!isValid) {
		return c.text('Unauthorized', { status: 401 });
	}

	const interaction = await c.req.json();

	if (interaction.type === InteractionType.PING) {
		return c.json({ type: 1 });
	}

	if (interaction.type === InteractionType.APPLICATION_COMMAND) {
		const command = interaction.data.name;
		const args = interaction.data.options || [];

		if (command === 'showcase') {
			return c.json(showcaseHandler(args));
		}

		return c.json({
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				// content: command + ' ' + args.map((arg: any) => arg.value).join(' '),
				content: '```json\n' + JSON.stringify(interaction.data, null, 2) + '```',
			},
		});
	}

	if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
		if (interaction.data.custom_id === 'showcase_modal') {
			console.log(showcaseModalHandler());
			return c.json(showcaseModalHandler());
		}
	}

	if (interaction.type === InteractionType.MODAL_SUBMIT) {
		if (interaction.data.custom_id === 'showcase_modal') {
			return c.json(await showcaseModalSubmitHandler(c.env.DISCORD_BOT_TOKEN, interaction.data));
		}
	}

	return c.text('Bad Request', { status: 400 });
});

export default app;
