const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class HelpCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "help",
      group: "misc",
      memberName: "help",
      description: "Sends a list of available command",
      guildOnly: true,
    });
  }

  async run(message) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor("Help Command")
      .setDescription(
        "Total no. of available commands: **19**\n" +
          "`- Everything within <> is supposed to be replaced by a value!`\n" +
          '`- Anything within "[]" means that it is an optional argument`'
      )
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .addFields(
        {
          name: "`.add <Num1> <Num2> ...`",
          value: "Adds the specified number",
        },
        {
          name: "`.av/.avatar [<@User/User ID>]`",
          value:
            "Sends an enlarged image of the user's profile pic\nDefault: Yourself",
        },
        {
          name: "`.ping`",
          value: "Sends the ping info of the bot",
        },
        {
          name: "`.help`",
          value: "Sends a list of available commands",
        },
        {
          name: "`.serverinfo`",
          value: "Sends some basic info related to the server",
        },
        {
          name: "`.shutdown`",
          value: "Shuts down the bot",
        },
        {
          name: "`.ban <@User/User ID> [<Reason>]`",
          value: "Bans the specified user",
        },
        {
          name: "`.kick <@User/UserID> [<Reason>]`",
          value: "Kicks the specified user",
        },
        {
          name: "`.clean <count>`",
          value: "Purges the specified amt of messages including pinned messages | Max Limit: 500",
        },
        {
          name: "`.purge <count>`",
          value:
            "Purges/Deletes the specified amount of messages excluding pinned messages | Max Limit: 300",
        },
        {
          name: "`.warn <@User/User ID> <Reason>`",
          value: "Warns the user",
        },
        {
          name: "`.banall`",
          value:
            "Bans every single bannable person\n" +
            "**`DO NOT ABUSE! YOU MIGHT BE FLAGGED BY DISCORD`**\n" +
            "**`Requirement:`** `SERVER MEMBERS INTNET` under Privileged Gateway Intents **must be enabled**! [Click here](https://i.imgur.com/aWlEXab.png)",
        },
        {
          name: "`.kickall`",
          value:
            "Kicks every single kickable person\n" +
            "**`DO NOT ABUSE! YOU MIGHT BE FLAGGED BY DISCORD`**\n" +
            "**`Requirement:`** `SERVER MEMBERS INTNET` under Privileged Gateway Intents **must be enabled**! [Click here](https://i.imgur.com/aWlEXab.png)",
        },
        {
          name: "`.delchannels`",
          value: "Deletes all the channels in the server"
        },
        {
          name: "`.delroles`",
          value: "Deletes all the deletable roles in the server"
        },
        {
          name: "`.dmowner <count>`",
          value: "Spam DMs the owner",
        },
        {
          name: "`.spam <count>`",
          value: "Spams some preset messages in the text channel",
        },
        {
          name: "`.spamdm <@User/User ID> <count>`",
          value: "Spam DMs the mentioned user",
        },
        {
          name: "`.spameveryone <count>`",
          value: "Spam pings everyone",
        },
        {
          name: "`.spamowner <count>`",
          value: "Spam pings the owner in the text channel",
        },
        {
          name: "`.spamroles <count>`",
          value:
            "Spam creates `<count>` no. of roles [P.S: It would be in rainbow color too 😉]",
        },
        {
          name: "`.spamtextchannels <count>`",
          value: "Spam creates `<count>` no. of text channels",
        }
      );
    message.channel.send(embed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: help`);
  }
};
