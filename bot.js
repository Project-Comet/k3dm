const Discord = require("discord.js");
const client = new Discord.Client();
// const autoresponder = require("./modules/autoResponder.js");
const config = require("./config.json");
const fs = require("fs");
const moment = require('moment');
require('./utils/eventLoader')(client);



client.elevation = message => {
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', config.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', config.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === config.ownerid) permlvl = 4;
  return permlvl;
};

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    if (props.help.name === '') {
      return;
    }
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



const autoResponder = {
  "spongebob": {
            file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
          },
  "oof": {
            file: "https://cdn.discordapp.com/attachments/473899818847305738/473899836333359134/oof.png"
          },
  "devin": "daddy?",
  "spock": {
    file: "https://cdn.discordapp.com/attachments/275732552797519873/475936918027239425/Z.png"
  }
};


exports.EmbedColors = [
    "0xFF0000", //red
    "0x00FF00", //green
    "0xFFFF00", //yellow
    "0xA52A2A", //brown
    "0xFFA500", //orange
    "0x0000FF", //blue
    "0xD353EF" //pink
];


exports.checkBots = function (guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
  }


exports.checkMembers = function (guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++;
    });
    return memberCount;
  }




client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  // client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  // client.user.setActivity(`Serving ${client.guilds.size} servers`);
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

exports.mock = function(string) {
    var chars = string.toUpperCase().split('');
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toLowerCase();
    }
    return chars.join('');
};


client.on('message', async message => {
  var args = message.content.split(/[ ]+/);

  if (message.content === '🤔')
   return message.react('🤔');

// ===================================================================

  if (message.author.bot) return;
     if(hasRole(message.member, ":thinking:")) {
       return message.react('🤔');
     }

// ===================================================================

  if(autoResponder[message.content]) {
       message.channel.send(autoResponder[message.content]);
     }

// ===================================================================

// if(commander("ping", message))  {
//     const m = await message.channel.send("Ping?");
//     m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
//    }

// ===================================================================

/* Reacts on author's message with any set emoji
client.on('message', message => {
  // If the user ID is "defined"
  if (message.author.id === 'AUTHOR_ID') {
    // Send reaction after "author.id" posts.
	message.react('SETEMOJI');
  }
});
*/

// client.on('message', message => {
//   all_emoji = client.guilds.first().emojis;
//   if (message.author.id === '25') {
//     // Send reaction after "author.id" posts.
// 	all_emoji.array().forEach((emo) => {
//       message.react(emo);
//     });
//
//   }
// });

// ===================================================================

  if (message.content === 'prefix???')
  message.channel.send(`Current bot prefix is ${config.prefix}`);

// ===================================================================

});


client.on('messageDelete', async (message) => {
  const logs = message.guild.channels.find('name', 'logs');
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('logs', 'text');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
  }
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  }
  logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
});





// This will react the author's message with all (or as many as possible) guild emojis


exports.statistics = function () {
	const memoryUsage = process.memoryUsage()
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
	console.log('ram.rss', (memoryUsage.rss / 1048576).toFixed())
	console.log('ram.heapUsed', (memoryUsage.heapUsed / 1048576).toFixed())
	console.log('total.guilds', client.guilds.size)
	console.log('total.users', client.users.size)
	console.log('current.vcs', client.voiceConnections.size)
	console.log(`current.uptime ${hours}h, ${minutes}m & ${seconds.toFixed()}s`)
}

// client.login(token);
client.login(process.env.BOT_TOKEN);
