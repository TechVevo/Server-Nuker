const Discord = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class SpamTextEveryone extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'spam',
            group: 'raid',
            memberName: 'spam',
            description: 'Spams a text',
            argsType: 'multiple',
        })
    }

    async run(message, args){
        await message.delete()
        if(!args[0]){
            message.reply('Invalid Format! Please follow this format:\n`spam <count> <text>`')
            return
        }
        let count = args.shift()
        let content = 'LOL! Your PP: 8==D'
        if(args[0]){
            content = args.join(' ')
        }
        let i = 1;
        while(i<=count){
            message.channel.send(content)
            i += 1
        }
    }
}