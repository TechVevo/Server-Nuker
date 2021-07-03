const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class WarnCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "warn",
      group: "moderation",
      memberName: "warn",
      description: "Warns a member",
      guildOnly: true,
      argsType: "multiple",
    });
  }

  async run(message, args) {
    message.delete();

    const failEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor("Warn Command")
      .setDescription(
        "Error, Unable to warn the user | Please enter a vali user and also make sure that you follow this syntax:\n`.warn <@User/User ID> <Reason>`"
      )
      .setFooter(
        "Server Nuker v2.0.0 [BETA]",
        "https://i.imgur.com/BCDIf5E.jpg"
      );
    if (!args[0]) {
      message.channel.send(failEmbed);
      return;
    }

    const target = message.mentions.users.first();
    let uid;

    if (!target) {
      uid = args[0];
    } else {
      uid = target.id;
    }

    let targetUser = await message.guild.members.fetch(uid);
    args.shift();

    if (!targetUser) {
      message.channel.send(failEmbed);
      return;
    }

    let reason = args.join(" ");
    if (!reason) {
      reason = "Reason not specified";
    }

    let dmEmbed = new Discord.MessageEmbed()
      .setAuthor("Warn Command")
      .setColor("#000001")
      .setFooter(
        "Server Nuker v2.0.0 [BETA]",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(
        `You have been warned in ${message.guild.name}!\nReason: \`${reason}\``
      );

    //Because this is an Open-Source bot, I will not be setting up a server side warning reciever
    //This command will just DM the user!

    let error = false;

    targetUser.send(dmEmbed).catch((err) => {
      console.error(err + "\n\nUnable to DM this user!");
      error = true;
    });

    if (error === false) {
      const embed = new Discord.MessageEmbed()
        .setColor("#00fd00")
        .setFooter(
          "Server Nuker v2",
          "https://i.imgur.com/BCDIf5E.jpg"
        )
        .setAuthor("Warn Command")
        .setDescription(`Successfully warned <@${targetUser.id}>!`);
      message.channel.send(embed);
    } else {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(
          "Server Nuker v2",
          "https://i.imgur.com/BCDIf5E.jpg"
        )
        .setAuthor("Warn Command")
        .setDescription(
          "`DiscordAPI Error | Please check your console for more info!`"
        );
      message.channel.send(errorEmbed);
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: warn`);
  }
};
