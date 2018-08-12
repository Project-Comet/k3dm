const data = require('../bot.js')
const Discord = require("discord.js");

module.exports = async (guild, user) => {

    if (!guild.channels.exists('name', data.defaultSettings.logs_channel)) return;
    const logs = guild.channels.find('name', data.defaultSettings.logs_channel);

    var memberUnbanned = new Discord.RichEmbed()
    .setColor('00FF00')
    .setAuthor(`Member Unbanned`,`${user.displayAvatarURL}`)
    .setDescription(`${user} ${user.tag}`)
    .setFooter(`ID: ${user.id}`)
    .setTimestamp()
    return logs.send(memberUnbanned);

};
