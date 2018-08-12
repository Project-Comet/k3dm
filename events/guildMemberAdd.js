const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = member => {

  const logs = member.guild.channels.find('name', member.client.settings.get(member.guild.id, "logs_channel"));
  if(!logs) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  var memberJoined = new Discord.RichEmbed()
  .setColor('#23D160')
  .setAuthor(`Member joined`,`${member.user.displayAvatarURL}`)
  .setDescription(`${member.user} ${member.user.tag}`)
  .setFooter(`ID: ${member.id}`)
  .setTimestamp()
  logs.send(memberJoined);


  const welcomeChannel = member.guild.channels.find('name', member.client.settings.get(member.guild.id, "welcome_channel"));
    if(!welcomeChannel) return;

    let welcome_message = member.client.settings.get(member.guild.id, "welcome_message");

    welcome_message = welcome_message.replace("{{user}}", `${member.user}`)


    welcomeChannel.send(welcome_message)
    .catch(console.error);

};
