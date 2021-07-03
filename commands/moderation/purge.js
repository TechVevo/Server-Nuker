const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class PurgeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "purge",
      memberName: "purge",
      description: "Purges a bunch of messages",
      group: "moderation",
      guildOnly: true,
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async run(message, args) {
    message.delete();
    const { channel } = message;

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Purge Command")
      .setFooter("Server Nuker v2", "https://i.imgur.com/BCDIf5E.jpg")
      .setDescription(
        "Error! Enter a valid number for the count\n`.purge <count> | .purge 3`"
      )
      .setColor("#ff0000");
    if (!args || isNaN(parseFloat(args))) {
      channel.send(noNumEmbed);
      return;
    }

    let count = Math.round(parseFloat(args));
    let initialCount = count;

    if (count < 0) {
      channel.send("Negative values are not allowed!" + noNumEmbed);
      return;
    }
    let toBeDeleted;
    if (count > 300) count = 300;

    while (count > 100) {
      await channel.messages.fetch({ limit: 100 }).then((m) => {
        toBeDeleted = m.filter((msg) => !msg.pinned);
      });

      channel
        .bulkDelete(toBeDeleted)
        .catch((err) =>
          console.error(err + "\nAn error occured in purge.js Line:47")
        );
      count -= 100;
    }

    await channel.messages.fetch({ limit: 100 }).then((m) => {
      toBeDeleted = m.filter((msg) => !msg.pinned);
    });

    channel
      .bulkDelete(toBeDeleted)
      .catch((err) =>
        console.error(err + "\nAn error occured in purge.js Line:60")
      );

    if (count <= 1) {
      channel.send(`Purged ${initialCount} message`).then((m) => {
        setTimeout(() => {
          m.delete();
        }, 6500);
      });
    } else {
      channel.send(`Purged ${initialCount} messages`).then((m) => {
        setTimeout(() => {
          m.delete();
        }, 6500);
      });
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: purge`);
  }
};
