const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬'
];

function delay(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

exports.run = async function(client, message, args) {
  const flip = await message.channel.send('\\\\°□°)\\\\  ┬─┬');
  		for (const frame of frames) {
  			await delay(200);
  			await flip.edit(frame);
  		}
  return message;


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tableflip',
  description: 'tableflip',
  usage: 'tableflip'
};
