const Commando = require("discord.js-commando");
const Discord = require("discord.js");
module.exports = class PingCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "ping",
      group: "misc",
      memberName: "ping",
      description: "Sends the ping info",
      throttling: {
        usages: 1,
        duration: 3,
      },
      guildOnly: true,
    });
  }

  async run(message) {
    message.delete();
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const embed = new Discord.MessageEmbed()
      .setColor(randomColor)
      .setAuthor("Ping Command")
      .setDescription("Calculating Ping...")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      );
    message.channel.send(embed).then((result) => {
      const ping = result.createdTimestamp - message.createdTimestamp;
      const newEmbed = new Discord.MessageEmbed()
        .setColor(randomColor)
        .setAuthor("Ping Command")
        .setDescription(`API ping: ${this.client.ws.ping}\nBot ping: ${ping}`)
        .setFooter(
          "Server Nuker v2",
          "https://i.imgur.com/BCDIf5E.jpg"
        );
      result.edit(newEmbed);
    });

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: ping`);
  }
};
