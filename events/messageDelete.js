const data = require('../bot.js')
const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = async (message) => {

  if (!message.guild.channels.exists('name', data.defaultSettings.logs_channel)) return;

  const logs = message.guild.channels.find('name', data.defaultSettings.logs_channel);

  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor
  } else {
    user = message.author
  }

  const color = colors[Math.floor(Math.random() * colors.length)];

  const deletedMessage = new Discord.RichEmbed()
     .setTitle("Message Deleted")
     .setDescription(`Message sent by ${message.author} deleted in ${message.channel}\n\n`)
     .addField("Message:", "`" + message.content + "`")
     .addField("Deleted by:", user)
     .setColor(color)
     .setFooter(`ID: ${message.id}`)
     .setTimestamp()
 logs.send(deletedMessage);
};
