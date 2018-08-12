const data = require('../bot.js')
const Discord = require("discord.js");

module.exports = async (role) => {

    if (!role.guild.channels.exists('name', data.defaultSettings.logs_channel)) return;
    const logs = role.guild.channels.find('name', data.defaultSettings.logs_channel);

    var roleDeleted = new Discord.RichEmbed()
    .setAuthor(`${role.guild.name}`, role.guild.iconURL)
    .setColor('00AE86')
    .setDescription(`Role Deleted: ${role.name}`)
    .setFooter(`ID: ${role.id}`)
    .setTimestamp()
    return logs.send(roleDeleted);

};
