// const Commando = require("discord.js-commando")
// const Discord = require("discord.js")

// module.exports = class <ClassName> extends Commando.Command{
//     constructor(client) {
//         super(client, {
//             name: "",
//             group: "",
//             memberName: "",
//             description: "",
//             guildOnly: true
//         })
//     }
// }

const Commando = require("discord.js-commando");
const path = require("path");
require("dotenv-flow").config();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const client = new Commando.CommandoClient({
  commandPrefix: prefix,
});
const versionCheck = require("./versioncheck");

let versionError = false;

//Pauses so the EXE doesnt close immediately when an error
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

versionCheck().then(async (data) => {
  if (data) {
    console.log(
      "New Update Available! Please check https://github.com/TechVevo/Server-Nuker/releases to get the latest update!"
    );
  } else {
    console.info(
      "\n>>> Version check complete | You are using the latest version\n"
    );

    //Uses only Commando to run commands | Please check https://discord.js.org/#/docs/commando/
    client.on("ready", () => {
      console.log(`${client.user.tag} is ready!`);

      //Changing RPC
      let rpcdata = ["Nuke Bot v2", "By: Tech Vevo [YT]"];
      let rpctype = ["PLAYING", "PLAYING"];
      var i = 0;
      setInterval(() => {
        client.user.setPresence({
          activity: {
            name: rpcdata[i],
            type: rpctype[i],
          },
        });
        i += 1;
        if (i === 2) {
          i = 0;
        }
      }, 8000);

      client.registry
        .registerDefaultTypes()
        .registerGroups([
          ["misc", "Misc Commands"],
          ["moderation", "Moderation Commands"],
          ["raid", "Raid Commands"],
        ])
        .registerCommandsIn(path.join(__dirname, "commands"));
    });

    client.login(token).catch(async (err) => {
      console.error(
        "Invalid token was provided | Please check your .env file and enter a valid token"
      );
      await sleep(10000); //In milliseconds
    });
  }
});
