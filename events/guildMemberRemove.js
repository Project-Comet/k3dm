const data = require('../bot.js')
const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = async (member) => {

  const logs = member.guild.channels.find('name', member.client.settings.get(member.guild.id, "logs_channel"));
  if(!logs) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  var memberLeft = new Discord.RichEmbed()
    .setColor('#FF470F')
    .setAuthor(`Member left`,`${member.user.displayAvatarURL}`)
    .setDescription(`${member.user} ${member.user.tag}`)
    .setFooter(`ID: ${member.id}`)
    .setTimestamp()
    return logs.send(memberLeft);

};
