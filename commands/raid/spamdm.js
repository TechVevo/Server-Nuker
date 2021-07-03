const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SpamDMCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spamdm",
      memberName: "spamdm",
      group: "misc",
      description: "Spam DMs a member",
      guildOnly: true,
      argsType: "multiple",
    });
  }

  async run(message, args) {
    message.delete();
    const failEmbed = new Discord.MessageEmbed()
      .setAuthor("Spam DM Command")
      .setColor("#ff0000")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      )
      .setDescription(
        "Invalid arguments provided!\n`.spamdm <count> <@user/user ID>`"
      );

    if (!args[0] || !args[1]) {
      message.channel.send(failEmbed);
      return;
    }
    var count = args[1];
    var isNum = parseFloat(count);

    if (typeof isNum != "number") {
      message.channel.send(failEmbed);
      return;
    }
    count = Math.round(count);

    if (count > 40) {
      count = 40;
    }

    let target = message.mentions.users.first();
    let uid;

    if (!target) {
      uid = args[1];
      if (uid.length != 18) {
        message.channel.send("Enter a valid UID!");
        return;
      }
    } else {
      uid = target.id;
    }
    let targetUser;
    try {
      targetUser = await message.guild.members.fetch(uid);
    } catch {
      message.channel.send("User not found in the server!");
      return;
    }

    let error = false;
    await targetUser.send("Get Nuked Bitch!").catch(err => {
      console.error(err, "\n\nUser's DMs are closed | Please use .spamping <@User or User ID> <count> instead!")
      error = true
    })

    if(error === true) return;

    for(let i=1 ; i<=count ; i++){
      setTimeout(() => {
        targetUser.send("ENJOY UR DMs LOL")
      }, 250)
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: spamdm`);
  }
};
