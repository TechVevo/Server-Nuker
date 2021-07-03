const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class BanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "ban",
      memberName: "ban",
      group: "moderation",
      description: "Bans a mentioned user",
      argsType: "multiple",
      clientPermissions: ["BAN_MEMBERS"],
      examples: ["ban <@User> <Reason>"],
      throttling: {
        usages: 1,
        duration: 3,
      },
      guildOnly: true,
    });
  }

  async run(message, args) {
    message.delete();
    let uid;
    let target = message.mentions.users.first();

    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("Ban Command")
        .setFooter(
          "Server Nuker v2.0.0 [BETA]",
          "https://i.imgur.com/BCDIf5E.jpg"
        )
        .setDescription(
          "User not found. Please tag a valid user or enter the UID of a user in this server"
        );
      message.channel.send(embed);
      return;
    }

    if (!target) {
      uid = args[0];
    } else {
      uid = target.id;
    }

    let targetUser = await message.guild.members.fetch(uid);
    args.shift();

    if (args[0]) {
      args = args.join(" ");
    } else {
      args = "Not Specified";
    }

    if (!targetUser) {
      let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("Ban Command")
        .setFooter(
          "Server Nuker v2.0.0 [BETA]",
          "https://i.imgur.com/BCDIf5E.jpg"
        )
        .setDescription(
          "User not found. Please tag a valid user or enter the UID of a user in this server"
        );
      message.channel.send(embed);
      return;
    }

    if (!targetUser.bannable) {
      message.reply("Unable to ban this user");
      return;
    }

    let dmEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setFooter(
        "Server Nuker v2.0.0 [BETA]",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(
        `You have been banned!\n\n**Server:** ${message.guild.name}\n**Reason:** ${args}`
      )
      .setAuthor("Ban Command");
    targetUser
      .createDM()
      .then(async (channel) => {
        await channel.send(dmEmbed);
        targetUser.ban({ reason: args }).catch(console.error);
      })
      .catch((err) => {
        console.error(`${err}\nUnable to DM this user`);
        targetUser.ban({ reason: args }).catch(console.error);
      });

    let banEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor("Ban Command")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(
        `<@${uid}> has been banned!\n\n**Moderator:** <@${message.author.id}>\n**Reason:** ${args}`
      );
    message.channel.send(banEmbed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: ban`);
  }
};
