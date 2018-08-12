const data = require('../bot.js')
const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = async (message, newMsg) => {

  if (!message.guild.channels.exists('name', data.defaultSettings.logs_channel)) return;
  const logs = message.guild.channels.find('name', data.defaultSettings.logs_channel);
  if (message.content === newMsg.content) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  const editedMessage = new Discord.RichEmbed()
     .setTitle("Message Edited")
     .setDescription(`Message sent by ${message.author} edited in ${message.channel}\n\n`)
     .addField("Old Message:", "`" + message.content + "`")
     .addField("New Message:", "`" + newMsg.content + "`")
     .setColor(color)
     .setFooter(`ID: ${message.id}`)
     .setTimestamp()
 logs.send(editedMessage);

};
