const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class SpamEveryoneCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'spameveryone',
            memberName: 'spameveryone',
            aliases: ['spamall'],
            group: 'raid',
            description: '@everyone many times',
            args:[{
                key: 'count',
                prompt: 'How many times do you want to spam? [Min: 1 | Max: 50]',
                type: 'integer',
                error: 'Enter a valid value between 1 and 50',
                min: 1,
                max: 50
            }],
            guildOnly: true
        })
    }

    async run(message, {count}){
        message.delete()
        let i = 1
        while(i <= count){
            message.channel.send('||@everyone||\nLOSERS! GET RAIDED LOL')
            i += 1
        }

        const moment = require('moment')
        const time = moment().format("HH:mm:ss a")
        console.log(`${time} | Command Ran: spameveryone`)
    }
}