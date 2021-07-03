const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class KickCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "kick",
      memberName: "kick",
      description: "Kicks a user",
      group: "moderation",
      examples: ["kick <@User> <Reason>"],
      guildOnly: true,
      clientPermissions: ["KICK_MEMBERS"],
      throttling: {
        usages: 1,
        duration: 3,
      },
      argsType: "multiple",
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
        .setAuthor("Kick Command")
        .setFooter(
          "Server Nuker v2",
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
        .setAuthor("Kick Command")
        .setFooter(
          "Server Nuker v2",
          "https://i.imgur.com/BCDIf5E.jpg"
        )
        .setDescription(
          "User not found. Please tag a valid user or enter the UID of a user in this server"
        );
      message.channel.send(embed);
      return;
    }

    if (!targetUser.kickable) {
      message.reply("Unable to Kick the user");
      return;
    }

    let dmEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setDescription(
        `You have been kicked!\n\n**Server:** ${message.guild.name}\n**Reason:** ${args}`
      )
      .setAuthor("Kick Command")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      );

    targetUser
      .createDM()
      .then(async (channel) => {
        await channel.send(dmEmbed);
        targetUser.kick(args).catch(console.error);
      })
      .catch((err) => {
        console.error(`${err}\nUnable to DM this user`);
        targetUser.kick(args).catch(console.error);
      });

    let kickEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setDescription(
        `<@${uid}> has been kicked!\n\n**Moderator:** <@${message.author.id}>\n**Reason:** ${args}`
      )
      .setAuthor("Kick Command")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      );
    message.channel.send(kickEmbed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: kick`);
  }
};
