exports.run = async function(client, message, args) {
    if(message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
      let member = message.mentions.members.first();
      let role = args[2];
      if(!role) return message.reply("Specify a role!");
      let gRole = message.guild.roles.find("name", role);
      if(!gRole) return message.reply("Couldn't find that role. ");


      member.addRole(gRole).catch(console.error);
        if(member.roles.has(gRole.id)) return message.reply("They already have that role.");
        await(member.addRole(gRole.id));

        try{
          await member.send(`Congrats, you have been given the role ${gRole.name}`)
        }catch(e){
          message.channel.send(`Congrats to <@${member.id}>, they have been given the role ${gRole.name}.`)

    }
  }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addrl'],
  permLevel: 0
};

exports.help = {
  name: 'addrole',
  description: 'Add role',
  usage: 'addrole [user] [role(case sensitive)]'
};
