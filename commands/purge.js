exports.run = async function(client, message, args) {
  if(!message.member.roles.some(r=>["Manager"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

    const deleteCount = parseInt(args.join(' '));
    message.channel.fetchMessages({
      limit: deleteCount
    }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'purge',
  description: 'purges a desired number of messages, up to 100',
  usage: 'purge [number]'
};
