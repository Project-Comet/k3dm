const roasts = require('../assets/roast.json');

exports.run = async function(client, message, args) {
  let member = message.mentions.members.first();

  return message.channel.send(`${member}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'roast',
  description: 'roast a user',
  usage: 'roast [user]'
};
