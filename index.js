const { Client, Intents } = require('discord.js');
const discord = require("discord.js", "discord-rpc");
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS //also enable in discord developer portal
    ] 
})



const {
    token,
    ServerID,
    RoleID,
    channelID,
    Vanity
} = require("./config.json")


client.on('presenceUpdate', (oldMember, newMember) => {
        newMember.activities.forEach(async activity => {
            if (activity.state === null) return;

            const member = await client.guilds.cache.get(ServerID).members.fetch(newMember.userId)
            const role = await client.guilds.cache.get(ServerID).roles.fetch(RoleID)

            if (activity.type === 'CUSTOM' && activity.state.includes(Vanity) && !member.roles.cache.has(RoleID)) {
                const embed = new discord.MessageEmbed()
                    .setColor("#3f75e0")
                    .setAuthor({name: "CrounicRP",})
                    .setDescription(`${newMember.user.username} has added the vanity (.gg/crounic) to their account, their role has been added.`)

                    .setFooter({text: "Crounic RP • discord.gg/Crounic"})

                member.roles.add(role)

                client.channels.cache.get(channelID).send({embeds: [embed]});
            }

            if (activity.type === 'CUSTOM' && member.roles.cache.has(RoleID) && !activity.state.includes(Vanity)) {
                member.roles.remove(role)

                const embed = new discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .setAuthor({name: "CrounicRP",})
                    .setDescription(`${newMember.user.username} has removed the vanity (.gg/crounic) from their account, their role has been removed.`)

                    .setFooter({text: "Crounic RP • discord.gg/Crounic"})
                client.channels.cache.get(channelID).send({embeds: [embed]});
            }
        })
    }
);

client.on("ready", () => {
    console.log("Bot is ready - Tronix")
})

client.login(token)
