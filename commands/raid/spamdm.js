const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SpamDMCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spamdm",
    });
  }
};
