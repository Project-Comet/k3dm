const jokes = require('../assets/jokes.json')

exports.run = async function(client, message, args) {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  message.channel.send(randomJoke);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'joke',
  description: 'Returns a random joke',
  usage: 'joke'
};
