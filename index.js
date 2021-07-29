const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

const prefix = '!';

client.on('message', (msg) => {
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
  }
});

client.login(config.BOT_TOKEN);
