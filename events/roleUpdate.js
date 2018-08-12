const data = require('../bot.js')
const Discord = require("discord.js");

module.exports = async (oldRole, newRole) => {

    if (!newRole.guild.channels.exists('name', data.defaultSettings.logs_channel)) return;
    const logs = newRole.guild.channels.find('name', data.defaultSettings.logs_channel);

    var roleUpdated = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name}`, newRole.guild.iconURL)
    .setColor('00AE86')
    .setTitle('Role Updated')
    .setDescription(`New Name: *${newRole.name}* Old Name: *${oldRole.name}*`)
    .setFooter(`ID: ${newRole.id}`)
    .setTimestamp()
    return logs.send(roleUpdated);

};
