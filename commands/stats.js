const config = require('../config.json');
const packages = require('../package.json');
const memUsage = process.memoryUsage()
const bot = require('../bot.js')
exports.run = async function(client, message, args) {
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  message.channel.send(`= Bot Statistics =\n❯ Memory        :: ${(memUsage.rss / 1048576).toFixed()}mb\n❯ Uptime        :: ${hours} hrs, ${minutes} mins & ${seconds.toFixed()} secs\n❯ Total Users   :: ${client.users.size}\n❯ Total Servers :: ${client.guilds.size}\n❯ Discord.js    :: ${packages.dependencies.discordjs}\n❯ Node          :: ${process.version} `, {code:'asciidoc'});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Shows statistics about the bot',
  usage: 'stats'
};
