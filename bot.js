const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = ';';

client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'samp.k3dm.net',
            type: 0
        }
    });
});


function commander(str, message) {
	return message.content.toLowerCase().startsWith(PREFIX + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
	if(pluck(mem.roles).includes(role)){
		return true;
	} else {
		return false;
	}
}

const mock = function(string) {
    var chars = string.toUpperCase().split('');
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toLowerCase();
    }
    return chars.join('');
};


 client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
}); 


client.on('message', async message => {
var args = message.content.split(/[ ]+/);

  if(commander("say", message)) {
	  if(message.member.hasPermission("ADMINISTRATOR") || hasRole(message.member, "Mod")) {
		  if(args.length === 1) {
			  message.channel.send('You did not define a argument');
		  } else {
			  message.channel.send(args.join(" ").substring(5));
		  }
	  } else {
		  message.channel.send('Not authorized');
	  }
  }
	if(commander("vote", message)) {
        message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.reply(message.content))
        message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.react('👎'))
        }
	if(commander("addrole", message)) {
  		if(message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
  		let member = message.mentions.members.first();
  		let role = args[2];
      if(!role) return message.reply("Specify a role!");
		  let gRole = message.guild.roles.find("name", role.toLowerCase());
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
	}


	if(commander("removerole", message) || commander("rmrole", message)) {
  		if(message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
  		let member = message.mentions.members.first();
  		let role = args[2];
  		if(!role) return message.reply("Specify a role!");
		  let gRole = message.guild.roles.find("name", role.toLowerCase());
		  if(!gRole) return message.reply("Couldn't find that role. ");
	
  		member.removeRole(gRole).catch(console.error);
  		if(member.roles.has(gRole.id)) return message.reply("They already have that role.");
  			await(member.addRole(gRole.id));
	   	
		  try{
    		  await member.send(`Congrats, you have been given the role ${gRole.name}`)
  		  }catch(e){
    		message.channel.send(`Congrats to <@${member.id}>, they have been given the role ${gRole.name}.`)
  			
  			}
  		}
	}

  if(commander("return", message)) {
        message.channel.fetchMessages({limit: 2}).then(messages => {
          const fetched = messages.last();
          if(message.author.bot) return;
          message.channel.send(mock(fetched.content), {
            file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
          });
        })
     }


});

client.on('message', message => {
  if (message.content === '🤔')
    message.react('🤔');
});


/* Reacts on author's message with any set emoji
client.on('message', message => {
  // If the user ID is "defined"
  if (message.author.id === 'AUTHOR_ID') {
    // Send reaction after "author.id" posts.
	message.react('SETEMOJI');
  }
});
*/


// This will react the author's message with all (or as many as possible) guild emojis
client.on('message', message => {
  all_emoji = client.guilds.first().emojis;
  if (message.author.id === '25') {
    // Send reaction after "author.id" posts.
	all_emoji.array().forEach((emo) => {
      message.react(emo);
    });

  }
});

client.login(process.env.BOT_TOKEN);
