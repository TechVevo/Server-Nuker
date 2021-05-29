const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class PurgeCommand extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'purge',
            memberName: 'purge',
            description: 'Purges a bunch of messages',
            group: 'moderation',
            guildOnly: true,
            argsType: 'multiple',
            clientPermissions: ['MANAGE_MESSAGES'],
            throttling:{
                usages: 1,
                duration: 3
            }
        })
    }

    async run(message, args){
        const {channel} = message

        const noNumEmbed = new Discord.MessageEmbed()
            .setAuthor('Spam Roles Command')
            .setFooter('Server Nuker v2.0.0 [BETA]', 'https://i.imgur.com/BCDIf5E.jpg')
            .setDescription('Error! Enter a valid number for the count\n`.spamroles <count> | .spamroles 3`')
            .setColor('#ff0000')
        if(!args[0] || typeof(parseFloat(args[0])) !== 'number'){
            message.channel.send(noNumEmbed)
            return
        }
        
        let count = Math.round(args[0])

        var delCount = (count+1).toString() //The '+1' is to include the user sent message in bulkDelete() itself

        let toBeDeleted;

        let completed = false;

        while(delCount > 100){
            await channel.messages.fetch({limit: 100}).then(m => {
                toBeDeleted = m.filter(msg => !msg.pinned)
            })

            channel.bulkDelete(toBeDeleted)

            delCount = delCount - 100
        }

        await channel.messages.fetch({limit: delCount}).then(m => {
            toBeDeleted = m.filter(msg => !msg.pinned)
        })

        channel.bulkDelete(toBeDeleted)

        if(count <= 1){
            message.channel.send(`Purged ${count} message`).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 6500)
            })
        } else {
            message.channel.send(`Purged ${count} messages`).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 6500)
            })
        }
    }
}