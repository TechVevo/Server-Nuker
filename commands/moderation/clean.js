const Discord = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class CleanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "clean",
      memberName: "clean",
      group: "moderation",
      description: "Cleans the channel including pinned messages",
      guildOnly: true,
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async run(message, args) {
    message.delete();

    const { channel } = message;

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Clean Command")
      .setFooter(
        "Server Nuker v2.0.0 [BETA]",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(
        "Error! Enter a valid number for the count\n`.spamroles <count> | .spamroles 3`"
      )
      .setColor("#ff0000");

    if (!args || isNaN(parseFloat(args))) {
      channel.send(noNumEmbed);
      return;
    }

    let count = Math.round(parseFloat(args));
    let initialCount = count;

    if (count > 500) {
      count = 500;
      initialCount = 500;
    }

    while (count > 100) {
      await channel.bulkDelete(100).catch(err => console.error(err+"\n API Error caught!"));
      count -= 100;
    }

    if (count > 0) {
      await channel.bulkDelete(count).catch(err => console.error(err+"\n API Error caught!"));
    }

    let newMsg;

    if (initialCount == 1) {
      newMsg = channel.send(`Successfully deleted 1 message`);
    } else if (initialCount > 1) {
      newMsg = channel.send(`Successfully deleted ${initialCount} messages`);
    } else {
      newMsg = channel.send(`Deleted **00** messages!`);
    }

    if(newMsg){
        setTimeout(() => {
            newMsg.delete()
        }, 6000)
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: purge`);
  }
};
