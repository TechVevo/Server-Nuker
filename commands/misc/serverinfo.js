const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class ServerInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      group: "misc",
      memberName: "serverinfo",
      description: "Sends some basic info of the server",
      guildOnly: true,
    });
  }

  async run(message) {
    if (!message.guild.available) return;
    message.delete();
    const { guild } = message;

    let roleCount;
    await guild.roles.fetch().then((roles) => {
      roleCount = roles.cache.size - 1;
    });

    const embed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor("Server Info Command")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(`Server info for ${guild.name}:`)
      .addFields(
        {
          name: "Server Name:",
          value: guild.name,
        },
        {
          name: "Server Region:",
          value: guild.region,
        },
        {
          name: "Server Owner:",
          value: `<@${guild.ownerID}>`,
        },
        {
          name: "AFK Channel:",
          value: `<#${guild.afkChannelID}>`,
        },
        {
          name: "AFK Timeout:",
          value: guild.afkTimeout,
        },
        {
          name: "Created At:",
          value: guild.createdAt,
        },
        {
          name: "Member Count:",
          value: guild.memberCount,
        },
        {
          name: "No of Boosts:",
          value: guild.premiumSubscriptionCount,
        },
        {
          name: "Total No. of Roles:",
          value: roleCount,
        },
        {
          name: "Highest Role:",
          value: `<@&${guild.roles.highest.id}>`,
        }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }));
    message.channel.send(embed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: serverinfo`);
  }
};
