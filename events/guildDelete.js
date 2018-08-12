const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = async (guild) => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id}) Owned by: ${guild.owner} ${guild.owner.user.tag} UID: ${guild.ownerID}`);
// client.user.setActivity(`Serving ${client.guilds.size} servers`);
  guild.client.settings.delete(guild.id);
};
