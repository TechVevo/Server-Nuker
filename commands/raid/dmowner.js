const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class DMOwner extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "dmowner",
      group: "raid",
      memberName: "dmowner",
      description: "Spam DMs the owner of the server",
      guildOnly: true,
    });
  }

  async run(message, args) {
    message.delete();
    const failEmbed = new Discord.MessageEmbed()
      .setAuthor("DM Owner Command")
      .setColor("ff0000")
      .setDescription("Invalid arguments provided!\n`.dmowner <count>`")
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      );
    if (!args) {
      message.channel.send(failEmbed);
      return;
    }
    let count = args;
    if (isNaN(parseFloat(count))) {
      message.channel.send(failEmbed);
      return;
    }
    count = Math.round(count) - 1;

    const owner = await message.guild.owner;
    let error = false;

    await owner.send("Get Nuked Bitch!\nLike DMs? Enjoy!").catch((err) => {
      console.error(
        err,
        "\n\nUnable to DM the owner | Try using '.spamowner' instead!"
      );
      error = true;
    });

    if(error) return;

    for(let i=1; i<=count; i++){
      setTimeout(() => {
        owner.send("Like DMs? Enjoy!")
      }, 750)
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: dmowner`);
  }
};
