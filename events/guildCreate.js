const Discord = require("discord.js");
const client = new Discord.Client();
const data = require('../bot.js')

module.exports = async (guild) => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
// client.user.setActivity(`Serving ${client.guilds.size} servers`);
  guild.client.settings.set(guild.id, data.defaultSettings);
};
