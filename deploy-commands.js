import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';

const creds = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  token: process.env.DISCORD_TOKEN,
};

const commands = [
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),
].map(command => command.toJSON());

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
