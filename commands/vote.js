exports.run = async function(client, message, args) {
  message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.react('👍'))
  message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.react('👎'))


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'vote',
  description: 'Voting command',
  usage: 'vote'
};
