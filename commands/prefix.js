const config = require('../config.json')
const fs = require("fs");

exports.run = async function(client, message, args) {
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  config.prefix = newPrefix;

  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  return message.channel.send(`Prefix changed to ${config.prefix}`);



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'prefix',
  description: "Sets the bot's prefix",
  usage: 'prefix'
};
