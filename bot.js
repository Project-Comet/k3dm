const Discord = require("discord.js");

const client = new Discord.Client();
const filterLevels = ['Off', 'No Role', 'Everyone'];
const verificationLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];
const config = require("./config.json");
const fs = require("fs");





client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'samp.k3dm.net',
            type: 0
        }
    });
});


const autoResponder = {
  "spongebob": {
            file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
          },
  "oof": {
            file: "https://cdn.discordapp.com/attachments/473899818847305738/473899836333359134/oof.png"
          },
  "devin": "daddy?"
};


client.on("message", (message) => {
  if(autoResponder[message.content]) {
    message.channel.send(autoResponder[message.content]);
  }
});


const questionRegex = /\?/g



var EmbedColors = [
    "0xFF0000", //red
    "0x00FF00", //green
    "0xFFFF00", //yellow
    "0xA52A2A", //brown
    "0xFFA500", //orange
    "0x0000FF" //blue
];


function checkBots(guild) {
    let botCount = 0; 
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount; 
  }

function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; 
    });
    return memberCount;
  }


client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

function commander(str, message) {
	return message.content.toLowerCase().startsWith(config.prefix + str);
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


client.on('message', async message => {
var args = message.content.split(/[ ]+/);


  if (message.author.bot) return;
    if(hasRole(message.member, ":thinking:")) {
      return message.react('🤔');
    }

  if(commander("say", message)) {
	  if(message.member.hasPermission("ADMINISTRATOR") || hasRole(message.member, "Mod")) {
		  if(args.length === 1) {
			  message.channel.send('You did not define a argument');
		  } else {
        message.delete();
			  message.channel.send(args.join(" ").substring(5));
		  }
	  } else {
		  message.channel.send('Not authorized');
	  }
  }
	if(commander("vote", message)) {
        message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.reply('👍'))
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

  if(commander("mock", message)) {
        message.channel.fetchMessages({limit: 2}).then(messages => {
          const fetched = messages.last();
          if(message.author.bot) return;
          message.channel.send(mock(fetched.content), {
            file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
          });
        })
     }

  if(commander("members", message)) {
        message.channel.send(`This discord server has ${checkMembers(message.guild)} members and ${checkBots(message.guild)} bots.`);
        }


  if(commander("ping", message))  {
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(commander("kick", message)) {
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

  }
  
  if(commander("ban", message)) {
    if(!message.member.roles.some(r=>["Manager"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(commander("purge", message)) {
    if(!message.member.roles.some(r=>["Manager"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let deleteCount = args[1];
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

if(commander("serverinfo", message)) {
	console.log(message);
  if(!message.member.roles.some(r=>["Manager", "Lead Admin", "Admin", "Moderator", "Member"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");  {

    if(!message.guild.members.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);
      const embed = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name} - Server Information`, message.guild.iconURL)
      .setColor(0x00AE86)
      // Displays the guild icon on the right side, commented it out cause I don't like it.
      //.setThumbnail(message.guild.iconURL)
      .addField('❯ Name', message.guild.name, true)
      .addField('❯ ID', message.guild.id, true)
      .addField('❯ Region', message.guild.region.toUpperCase(), true)
      .addField('❯ Creation Date', message.guild.createdAt.toDateString(), true)
      .addField('❯ Explicit Filter', filterLevels[message.guild.explicitContentFilter], true)
      .addField('❯ Verification Level', verificationLevels[message.guild.verificationLevel], true)
      .addField('❯ Owner', message.guild.owner.user.tag, true)
      .addField('❯ Members', message.guild.memberCount, true)
      .addField('❯ Roles', message.guild.roles.size, true)
      .addField('❯ Channels', message.guild.channels.size, true)
      .setFooter(`Generated by ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
      .setTimestamp()
      message.channel.send({embed});
}
}

if(commander("memberinfo", message)) {
  if(!hasRole(message.member, "Member"))
    return message.reply("Not authorized! Become a Member!"); {

      let memberInfo = message.mentions.members.first();

     if(!memberInfo){
            var userinf = new Discord.RichEmbed()
                .setAuthor(`❯ Name: ${message.author.username}`)
                .setThumbnail(message.author.avatarURL)
                .setDescription("Member's information")
                .setColor(EmbedColors[Math.floor(Math.random() * EmbedColors.length)])
                .addField("❯ Full Username:", `${message.author.username}#${message.author.discriminator}`)
                .addField("❯ ID:", message.author.id)
                .addField("❯ Created At:", message.author.createdAt)

                message.channel.send({userinf});

          }else{

            var userinfoo = new Discord.RichEmbed()
                .setAuthor(`❯ Name: ${memberInfo.displayName}`)
                .setThumbnail(memberInfo.user.avatarURL)
                .setDescription("Member's information")
                .setColor(EmbedColors[Math.floor(Math.random() * EmbedColors.length)])
                .addField("❯ Full Username:", `${memberInfo.user.username}#${memberInfo.user.discriminator}`)
                .addField("❯ ID:", memberInfo.id)
                .addField("❯ Created At:", memberInfo.user.createdAt)

                message.channel.send({userinfoo});
          }
}
}

  if(commander("prefix", message)) {
    if(message.member.hasPermission("ADMINISTRATOR")) {
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
    config.prefix = newPrefix;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  message.channel.send(`Prefix changed to ${config.prefix}`);
}
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