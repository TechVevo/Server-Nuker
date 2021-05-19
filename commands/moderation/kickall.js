const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class KickAllCommand extends Commando.Command{
    constructor(client){
        super(client, {
            name: 'kickall',
            memberName: 'kickall',
            group: 'moderation',
            description: 'Kicks all kickable members',
            clientPermissions: ['KICK_MEMBERS'],
            throttling:{
                usages: 1,
                duration:60
            }
        })
    }

    async run(message){
        message.delete()
        console.info(`ENSURE THAT IN https://discord.com/developers/applications/${this.client.user.id}/bot, PRIVILEGED GATEWAY INTENTS > SERVRE MEMBERS INTENT IS "ON"`)
        const {guild} = message
        let firstmsg;
        await message.channel.send('Kicking all kickable members...').then(result => firstmsg=result)
        
        await guild.members.fetch().then(members => {
            members.forEach(m => {
                if(m.kickable){
                    m.kick(':)')
                }
            })
        })

        firstmsg.edit('Done!')
    }
}