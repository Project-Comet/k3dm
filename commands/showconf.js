const data = require('../bot.js')
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');

exports.run = async function(client, message, args) {


    const guildConf = message.client.settings.get(message.guild.id) || data.defaultSettings;

    // const adminRole = message.guild.roles.find("name", guildConf.admin_role);
    // if(!adminRole) return message.reply("Administrator Role Not Found");

    // if(!message.member.roles.has(adminRole.id))
    if(!message.member.hasPermission("ADMINISTRATOR"))  return message.reply("You're not an admin, sorry!")
    let configKeys = "";
    Object.keys(guildConf).forEach(key => {
      configKeys += `${key}  :  ${guildConf[key]}\n`;
    });
    message.channel.send(`The following are the server's current configuration: \`\`\`${configKeys}\`\`\``);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'showconf',
  description: 'Server configuration',
  usage: 'showconf'
};
