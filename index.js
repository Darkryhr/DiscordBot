require('dotenv').config();
const Discord = require('discord.js');
const { generateJoke } = require('./jokes');
const client = new Discord.Client();

const prefix = '!';

client.on('message', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const cmdBody = msg.content.slice(prefix.length);
  const args = cmdBody.split(' ');
  const cmd = args.shift().toLowerCase();

  if (cmd === 'ping') {
    const timeTaken = Date.now() - msg.createdTimestamp;
    msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (cmd === 'sum') {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter += x));
    msg.reply(`The sum of all the arguments you provided is ${sum}!`);
  } else if (cmd === 'joke') {
    try {
      const { body } = await generateJoke();
      const [joke] = body;
      msg.reply(joke.setup);
      setTimeout(() => msg.reply(joke.punchline), 2000);
    } catch (err) {
      console.log(err);
    }
  }
});

client.on('guildMemberAdd', async (member) => {
  console.log('JOINED');
  if (msg.author.bot) return;
  const username = member.user.username;
  member.send(`Hello, ${username}! Welcome Aboard!`);
});

client.login(process.env.BOT_TOKEN);
