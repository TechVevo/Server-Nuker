const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class SpamRoles extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'spamroles',
            description: 'Spams a lot of roles',
            memberName: 'spamroles',
            group: 'raid',
            guildOnly: true
        })
    }

    async run(message){
        message.delete()
    }
}