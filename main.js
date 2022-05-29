// Import node modules
import fs from 'fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// Import the necessary discord classes
import { Client, Collection, Intents } from 'discord.js';
import 'dotenv/config';

const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Attaching commands to client instance
client.commands = new Collection();

// commands path
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
  const filePath = path.join(commandsPath, file);
  const command =
    // Set a new item in the Collection
    // With the key as the command nmae and the value as the exported module
    client.commands.set(command.data.name, command);
});

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
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${
        interaction.user.id
      }\nProfile pic: ${interaction.user.avatarURL()}`
    );
  }
});

// Login to Discord with the token
client.login(token);
