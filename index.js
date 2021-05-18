const Commando = require('discord.js-commando')

const path = require('path')

require('dotenv-flow').config()
const token = process.env.TOKEN
const prefix = process.env.PREFIX
const ownerId = process.env.OWNERID

const client = new Commando.CommandoClient({
    owner: ownerId,
    commandPrefix: prefix
})

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`)

    client.registry
    .registerGroups([
        ['misc', 'Misc Commands'],
        ['moderation', 'Moderation Commands'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'))
})

client.login(token)