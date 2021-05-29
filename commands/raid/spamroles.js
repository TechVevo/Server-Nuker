const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class SpamRoles extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'spamroles',
            description: 'Spams a lot of roles',
            memberName: 'spamroles',
            group: 'raid',
            guildOnly: true,
            argsType: 'multiple',
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
        
        let count = Math.round(args[0])

        //To prevent excessive API abuse
        if(count > 20){
            count = 20
        }

        //Rainbow Colors :wink:
        let colors = ['#EE82EE', '#4B0082', '#0183fa', '#01d801', '#f7e501', '#fe8801', '#ff0000']
        let colorCount = 0;

        //Role creation loop
        for(let i=1; i<=count; i++){
            setTimeout(() => {
                message.guild.roles.create({
                    data:{
                        name: '💣SERVER NUKER💣',
                        color: colors[colorCount]
                    }
                }).catch(console.error)
                colorCount++
                if(colorCount===7){
                    colorCount=0
                }
            }, 1000)
        }

        const moment = require('moment')
        const time = moment().format("HH:mm:ss a")
        console.log(`${time} | Command Ran: spamroles`)
    }
}