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
      argsType: "multiple",
      clientPermissions: ["MANAGE_MESSAGES"],
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  async run(message, args) {
    const { channel } = message;

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Purge Command")
      .setFooter(
        "Server Nuker v2.0.0 [BETA]",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(
        "Error! Enter a valid number for the count\n`.purge <count> | .purge 3`"
      )
      .setColor("#ff0000");
    if (!args[0] || isNaN(parseFloat(args[0]))) {
      message.channel.send(noNumEmbed);
      return;
    }

    let count = Math.round(args[0]);
    var delCount = (count + 1).toString(); //The '+1' is to include the user sent message in bulkDelete() itself
    let toBeDeleted;

    if (delCount > 500) {
      delCount = 500;
    }

    while (delCount > 100) {
      await channel.messages.fetch({ limit: 100 }).then((m) => {
        toBeDeleted = m.filter((msg) => !msg.pinned);
      });

      channel
        .bulkDelete(toBeDeleted)
        .catch((err) => console.error(err + "\n\nAn error seems to have occured, please submit a bug report in the git repo if it persists!"));

      delCount = delCount - 100;
    }

    await channel.messages.fetch({ limit: delCount }).then((m) => {
      toBeDeleted = m.filter((msg) => !msg.pinned);
    });

    channel
      .bulkDelete(toBeDeleted)
      .catch();

    if (count <= 1) {
      message.channel.send(`Purged ${count} message`).then((m) => {
        setTimeout(() => {
          m.delete();
        }, 6500);
      });
    } else {
      message.channel.send(`Purged ${count} messages`).then((m) => {
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
