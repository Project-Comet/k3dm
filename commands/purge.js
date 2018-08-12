const data = require('../bot.js')
const Discord = require("discord.js");

exports.run = async function(client, message, args) {
  if(message.member.hasPermission("ADMINISTRATOR")) {

    const deleteCount = parseInt(args.join(' '));
    message.channel.fetchMessages({
      limit: deleteCount
    }).then(messages => message.channel.bulkDelete(messages));

    if (!message.guild.channels.exists('name', data.defaultSettings.logs_channel)) return;

    let purgeEmbed = new Discord.RichEmbed()
   .setTitle("Bulk Delete")
   .setColor("FF0000")
   .setDescription(`${deleteCount} messages deleted in ${message.channel}`)
   .setTimestamp()

   let purgeChannel = message.guild.channels.find(`name`, data.defaultSettings.logs_channel);

   purgeChannel.send(purgeEmbed);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'purge',
  description: 'purges a desired number of messages, up to 100',
  usage: 'purge [number]'
};
