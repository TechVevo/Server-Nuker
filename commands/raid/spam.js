const Discord = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class SpamTextEveryone extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spam",
      group: "raid",
      memberName: "spam",
      description: "Spams a text",
      argsType: "multiple",
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  async run(message, args) {
    await message.delete();
    if (!args[0]) {
      message.reply(
        "Invalid Format! Please follow this format:\n`spam <count> <text>`"
      );
      return;
    }
    let count = args.shift();
    if(isNaN(parseFloat(count))){
      message.channel.send("Invalid count")
      return
  }
    let content = "LOL! Your PP: 8==D";
    if (args[0]) {
      content = args.join(" ");
    }
    let i = 1;
    while (i <= count) {
      message.channel.send(content);
      i += 1;
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: spam`);
  }
};
