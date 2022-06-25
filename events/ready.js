module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`The bot is ready... logged in as ${client.user.tag}`);
  },
};
