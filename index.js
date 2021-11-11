const discord = require("discord.js", "discord-rpc");
const client = new discord.Client()


let prefixs = "!";
const {
    token,
    ServerID,
    Vanity,
    PrioRole
} = require("./config.json")





  setInterval(function() {
    client.guilds.cache.get(ServerID).members.fetch().then((members) => {
    members.forEach(async user => {
      user.presence.activities.forEach(async activity => {
        // console.log(activity)

        if (activity.type === 'CUSTOM_STATUS' && activity.state.includes(Vanity) && !user.roles.cache.has(PrioRole)) {
          await user.roles.add(PrioRole).catch(() => {})

          console.log(`(ROLE ADDED (CUSTOM STATUS INCLUDES ${Vanity})) ${user.user.tag} => ${activity}: ${activity.state}`)

        } else if (activity.type === 'CUSTOM_STATUS' && !activity.state.includes(Vanity) && user.roles.cache.has(PrioRole)) {
          await user.roles.remove(PrioRole).catch(() => {})

          console.log(`(ROLE REMOVED (NO CUSTOM STATUS CHANGED)) ${user.user.tag} => ${activity}: ${activity.state}`)

        } else if (activity.type !=  'Custom Status' && user.roles.cache.has(PrioRole)) {
          await user.roles.remove(PrioRole).catch((error) => {})

          console.log(`(ROLE REMOVED (NO CUSTOM STATUS DETECTED)) ${user.user.tag} => ${activity}: ${activity.state}`)


        } else if (activity.type === 'CUSTOM_STATUS' && !activity.state.includes("") && user.roles.cache.has(PrioRole)) {
          await user.roles.remove(PrioRole).catch((error) => {})
      }                                   
    })
  })
    })
        }, 1200 * 1000)



client.login(token)

