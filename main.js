// Import the necessary discord classes
import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('The bot is ready!');
});

// Interacting with commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}`);
  }

  if (commandName === 'user') {
    await interaction.reply('User info');
  }
});

// Login to Discord with the token
client.login(token);
