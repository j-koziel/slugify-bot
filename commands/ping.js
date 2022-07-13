const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')
    .addStringOption(option =>
      option.setName('input').setDescription('Enter a string')
    )
    .addIntegerOption(option =>
      option.setName('int').setDescription('Enter an integer')
    )
    .addBooleanOption(option =>
      option.setName('choice').setDescription('Select a boolean')
    )
    .addUserOption(option =>
      option.setName('target').setDescription('Select a user')
    )
    .addChannelOption(option =>
      option.setName('destination').setDescription('Select a channel')
    )
    .addRoleOption(option =>
      option.setName('muted').setDescription('Select a role')
    )
    .addMentionableOption(option =>
      option.setName('mentionable').setDescription('Mention something')
    )
    .addNumberOption(option =>
      option.setName('num').setDescription('Enter a number')
    )
    .addAttachmentOption(option =>
      option.setName('attachment').setDescription('Attach something')
    ),
};
