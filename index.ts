import dotenv from 'dotenv';
import Discord, { Intents } from 'discord.js';
const { generateJoke } = require('./jokes');

dotenv.config();
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('READY');

  const guildId = '936225318170161162';
  const guild = client.guilds.cache.get(guildId);

  let commands;

  if (guild) commands = guild.commands;
  else commands = client.application?.commands;

  commands?.create({
    name: 'ping',
    description: 'replies with ping time',
  });

  commands?.create({
    name: 'joke',
    description: 'dad jokes',
  });
});

client.login(process.env.BOT_TOKEN);

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  switch (commandName) {
    case 'ping':
      const timeTaken = Date.now() - interaction.createdTimestamp;
      interaction.reply({
        content: `Pong! This message had a latency of ${timeTaken}ms.`,
        ephemeral: true,
      });
      break;
    // case 'sum':
    //   const numArgs = args.map((x) => parseFloat(x));
    //   const sum = numArgs.reduce((counter, x) => (counter += x));
    //   interaction.reply({
    //     content: `The sum of all the arguments you provided is ${sum}!`,
    //   });
    //   break;
    case 'joke':
      await interaction.deferReply();
      try {
        const { body } = await generateJoke();
        const [joke] = body;
        interaction.editReply({ content: joke.setup });
        setTimeout(() => interaction.reply({ content: joke.punchline }), 2000);
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      interaction.reply({ content: 'Invalid Command' });
      break;
  }
});
