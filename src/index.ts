import { Hono } from 'hono';
import { InteractionType } from 'discord-interactions';
import { showcaseModalHandler, showcaseModalSubmitHandler } from './commands/showcase';
import { verifySignature } from './middleware/verifySignature';
import { commandList } from './commands';
import { createMessage } from './helpers/response';

const app = new Hono<{ Bindings: Env }>();

app.post('/interactions', verifySignature, async (c) => {
	const interaction = await c.req.json();

	if (interaction.type === InteractionType.PING) {
		return c.json({ type: 1 });
	}

	if (interaction.type === InteractionType.APPLICATION_COMMAND) {
		const command = interaction.data.name;
		const args = interaction.data.options || [];

		if (commandList.find((cmd) => cmd.name === command)) {
			return c.json(commandList.find((cmd) => cmd.name === command)?.execute(args));
		}

		return c.json(createMessage({ content: 'Command not found' }));
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
