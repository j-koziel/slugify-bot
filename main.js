// Import node modules
const fs = require('fs');
const path = require('node:path');
const { dirname } = 'path';
const { fileURLToPath } = require('url');
// const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the necessary discord classes
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

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
  const command = require(filePath);

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

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// Login to Discord with the token
client.login(token);
