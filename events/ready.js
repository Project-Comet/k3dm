const config = require('../config.json')
const func = require('../bot.js')

module.exports = client => { // eslint-disable-line no-unused-vars
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    setInterval(func.statistics, 60000)
      client.user.setStatus(config.status)
      client.user.setPresence({
          game: {
              name: 'samp.k3dm.net',
              type: 0
          }
      });

      


};
