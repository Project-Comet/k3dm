exports.run = async function(client, message, args) {
  const m = await message.channel.send("Ping?");
  m.edit(`🏓 Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Latency',
  usage: 'ping'
};
