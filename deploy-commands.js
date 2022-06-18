const fs = require('node:fs');
const path = require('node:path');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = 'discord-api-types/v9';
require('dotenv').config();

const creds = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  token: process.env.DISCORD_TOKEN,
};

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(creds.token);

const registerApplicationCommands = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(creds.clientId, creds.guildId),
      {
        body: commands,
      }
    );
    console.log('Successfully registered application commands.');
  } catch (err) {
    console.error(err);
  }
};

registerApplicationCommands();
