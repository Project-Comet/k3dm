const data = require('../bot.js')
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');

exports.run = async function(client, message, args) {

    // const adminRole = message.guild.roles.find("name", guildConf.admin_role);
    // if(!adminRole) return message.reply("Administrator Role Not Found");

    // if(!message.member.roles.has(adminRole.id))
    if(!message.member.hasPermission("ADMINISTRATOR"))  return message.reply("You're not an admin, sorry!")

    const [key, ...value] = args;
    // Example:
    // key: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)


    if(!message.client.settings.has(message.guild.id, key))  return message.reply("This key is not in the configuration.");

    message.client.settings.set(message.guild.id, value.join(" "), key);

    message.channel.send(`Guild configuration item ${key} has been changed to:\n\`${value.join(" ")}\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'set',
  description: 'Server configuration',
  usage: 'set'
};
