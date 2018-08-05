const checkBots = require('../bot.js')
const check = require('../bot.js')

exports.run = async function(client, message, args) {
    message.channel.send(`This discord server has ${check.checkMembers(message.guild)} members and ${check.checkBots(message.guild)} bots.`);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};
