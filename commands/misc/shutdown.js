const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class ShutdownCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "shutdown",
      group: "misc",
      memberName: "shutdown",
      description: "Shuts down the bot",
      guildOnly: true,
    });
  }

  async run(message) {
    message.delete();
    console.warn("Shutting down the bot...");
    setTimeout(() => {
      this.client.destroy();
    }, 2000);
  }
};
