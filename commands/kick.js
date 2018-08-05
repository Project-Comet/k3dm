exports.run = async function(client, message, args) {

  if(!message.member.roles.some(r=>["Manager", "Lead Admin", "Admin", "Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

  // You can either mention a member, or use his ID
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.kickable)
    return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

  // slice(1) removes the first part, which here should be the user mention or ID
  // join(' ') takes all the various parts to make it a single string.
  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided";

  await member.kick(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kick someone in the nuts!',
  usage: 'kick [name]'
};
