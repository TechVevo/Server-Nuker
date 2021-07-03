const Commando = require("discord.js-commando");
const Discord = require("discord.js");
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "add",
      group: "misc",
      memberName: "add",
      description: "Adds two numbers",
      argsType: "multiple",
      guildOnly: true,
    });
  }

  async run(message, args) {
    let sum = 0;
    let argString = "";
    for (const arg of args) {
      sum += parseFloat(arg);
      argString = argString.concat(arg, " ");
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor("Add Command")
      .setColor("#000001")
      .setDescription(`Sum of ${argString}= ${sum}`)
      .setFooter(
        "Server Nuker v2",
        "https://i.imgur.com/BCDIf5E.jpg"
      );
    message.channel.send(embed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: add`);
  }
};
