// Import node modules
const fs = require('fs');
const path = require('node:path');
const { dirname } = 'path';
const { fileURLToPath } = require('url');
const wait = require('timers/promises').setTimeout;

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

////////////////////////////////////
// EVENTS
////////////////////////////////////

// Reading event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// When the client is ready, run this code (only once)
// client.once('ready', c => {
//   console.log(`The bot is ready... logged in as ${c.user.tag}`);
// });

// // Interacting with commands
// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return;

//   const command = client.commands.get(interaction.commandName);

//   if (!command) return;

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({
//       content: 'There was an error while executing this command!',
//       ephemeral: true,
//     });
//   }
// });

////////////////////////////////////
// Listening for slash commands
////////////////////////////////////

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
    const message = await interaction.fetchReply();
    console.log(message);
    // await interaction.followUp('Pong again!');
    // await interaction.deleteReply()
    // await interaction.editReply('Pong again!')
  }

  const string = interaction.options.getString('input');
  // const integer = interaction.options.getInteger('int');
  // const boolean = interaction.options.getBoolean('choice');
  // const user = interaction.options.getUser('target');
  // const member = interaction.options.getMember('target');
  // const channel = interaction.options.getChannel('destination');
  // const role = interaction.options.getRole('muted');
  // const mentionable = interaction.options.getMentionable('mentionable');
  // const number = interaction.options.getNumber('num');
  // const attachment = interaction.options.getAttachment('attachment');

  // string.toString()
  // integer,
  // boolean,
  // user,
  // member,
  // channel,
  // role,
  // mentionable,
  // number,
  // attachment
});

// Login to Discord with the token
client.login(token);
