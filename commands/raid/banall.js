const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class KickAllCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "banall",
      memberName: "banall",
      group: "raid",
      description: "Bans all bannable members",
      clientPermissions: ["BAN_MEMBERS"],
      throttling: {
        usages: 1,
        duration: 60,
      },
      guildOnly: true,
    });
  }

  async run(message) {
    message.delete();
    console.info(
      `ENSURE THAT IN https://discord.com/developers/applications/${this.client.user.id}/bot, PRIVILEGED GATEWAY INTENTS > SERVRE MEMBERS INTENT IS "ON"`
    );
    const { guild } = message;
    let firstmsg;
    await message.channel
      .send("Banning all bannable members...")
      .then((result) => (firstmsg = result));

    //Server Members Intent required under the Privileged Gateway Intents division
    await guild.members.fetch().then((members) => {
      members.forEach((m) => {
        if (m.bannable) {
          setTimeout(() => {
            m.ban({ reason: "LOL" });
          }, 750)
        }
      });
    });

    firstmsg.edit("Done!");

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Command Ran: banall`);
  }
};
