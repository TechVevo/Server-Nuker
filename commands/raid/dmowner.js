const Commando = require("discord.js-commando")
const Discord = require("discord.js")

module.exports = class DMOwner extends Commando.Command{
    constructor(client) {
        super(client, {
            name: "dmowner",
            group: "raid",
            memberName: "dmowner",
            description: "Spam DMs the owner of the server",
            guildOnly: true
        })
    }

    async run(message, args) {
        message.delete()
        const failEmbed = new Discord.MessageEmbed()
            .setAuthor("DM Owner Command")
            .setColor("ff0000")
            .setDescription("Invalid arguments provided!\n`.dmowner <count>`")
            .setFooter(
                "Server Nuker v2.0.0 [BETA]",
                "https://i.imgur.com/BCDIf5E.jpg"
              )
        if(!args){
            message.channel.send(failEmbed)
            return
        }
        let count = args
        if(isNaN(parseFloat(count))){
            message.channel.send(failEmbed)
            return
        }
        count = Math.round(count)
        
        
    }
}