const Discord = require("discord.js");
const client = new Discord.Client();
// const autoresponder = require("./modules/autoResponder.js");
const config = require("./config.json");
const fs = require("fs");
const moment = require('moment');
require('./utils/eventLoader')(client);

// ===================================================================
// ===================================================================
const Enmap = require('enmap');
const Provider = require('enmap-sqlite');

client.settings = new Enmap({provider: new Provider({name: "settings", persistent: true})});


const defaultSettings = {
  prefix: `${config.prefix}`,
  admin_role: "Administrator",
  mod_role: "Moderator",
  logs_channel: "logs",
  welcome_channel: "welcome",
  welcome_message: "Say hello to {{user}}, everyone!"
}

exports.defaultSettings = defaultSettings;



// ===================================================================
// ===================================================================
client.elevation = message => {
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', defaultSettings.mod_role);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', defaultSettings.admin_role);
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
            file: ""
          },
  "oof": {
            file: "https://cdn.discordapp.com/attachments/473899818847305738/473899836333359134/oof.png"
          },
  "devin": "daddy?",
  "spock": {
    file: "https://cdn.discordapp.com/attachments/275732552797519873/475936918027239425/Z.png"
  },
  "mock": {
    file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
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
  client.settings.set(guild.id, defaultSettings);
});


// client.on("guildDelete", guild => {
//   console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
//   // client.user.setActivity(`Serving ${client.guilds.size} servers`);
//   client.settings.delete(guild.id);
// });

// client.on('guildMemberRemove', member => {
//
//     if (!member.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//
//     const logger = member.guild.channels.find('name', defaultSettings.logs_channel)
//
//     var memberLeft = new Discord.RichEmbed()
//       .setColor('FF0000')
//       .setAuthor(`Member left`,`${member.user.displayAvatarURL}`)
//       .setDescription(`${member.user} ${member.user.tag}`)
//       .setFooter(`ID: ${member.id}`)
//       .setTimestamp()
//       return logger.send(memberLeft);
// });


// client.on("guildMemberAdd", member => {
//   //
//   // if (!member.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//   //
//   // const logger = member.guild.channels.find('name', defaultSettings.logs_channel)
//   //
//   // var memberJoined = new Discord.RichEmbed()
//   // .setColor('00FF00')
//   // .setAuthor(`Member joined`,`${member.user.displayAvatarURL}`)
//   // .setDescription(`${member.user} ${member.user.tag}`)
//   // .setFooter(`ID: ${member.id}`)
//   // .setTimestamp()
//   // return logger.send(memberJoined);
//
//   if(defaultSettings.welcome_enabled !== "true") return;

  // let welcome_message = client.settings.get(member.guild.id, "welcome_message");
  //
  // welcome_message = welcome_message.replace("{{user}}", `${member.user}`)
  //
  // member.guild.channels
  //   .find("name", client.settings.get(member.guild.id, "welcome_channel"))
  //   .send(welcome_message)
  //   .catch(console.error);
// });

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



client.on("ready", async () => {
  client.guilds.forEach(guild => {
    if(!client.settings.has(guild.id)) {
       client.settings.set(guild.id, defaultSettings);
    }
  });
});


client.on("message", async (message) => {
  if(!message.guild || message.author.bot) return;

  const guildConf = client.settings.get(message.guild.id) || defaultSettings;

  if(message.content.indexOf(guildConf.prefix) !== 0) return;

  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(guildConf.prefix.length).toLowerCase();

  // if(command === "setconf") {
  //   // const adminRole = message.guild.roles.find("name", guildConf.adminRole);
  //   // if(!adminRole) return message.reply("Administrator Role Not Found");
  //
  //   // if(!message.member.roles.has(adminRole.id))
  //   if(!message.member.hasPermission("ADMINISTRATOR"))  return message.reply("You're not an admin, sorry!")
  //
  //   const [key, ...value] = args;
  //   // Example:
  //   // key: "prefix"
  //   // value: ["+"]
  //
  //   if(!client.settings.has(message.guild.id, key))  return message.reply("This key is not in the configuration.");
  //
  //   client.settings.set(message.guild.id, value.join(" "), key);
  //
  //   message.channel.send(`Guild configuration item ${key} has been changed to:\n\`${value.join(" ")}\``);
  // }

  // if(command === "showconf") {
  //   let configKeys = "";
  //   Object.keys(guildConf).forEach(key => {
  //     configKeys += `${key}  :  ${guildConf[key]}\n`;
  //   });
  //   message.channel.send(`The following are the server's current configuration: \`\`\`${configKeys}\`\`\``);
  // }
});


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


// This will react the author's message with all (or as many as possible) guild emojis
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
  message.channel.send(`Current bot global prefix is ${config.prefix}`);

// ===================================================================

});

// client.on('guildBanAdd', (message, guild, user) => {
//
//     if (!message.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//     const logs = message.guild.channels.find('name', defaultSettings.logs_channel);
//     logs.send(`**User banned -> \`${user.tag}\`**`, guild)
// })
//
// client.on('guildBanRemove', (message, guild, user) => {
//
//     if (!message.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//     const logs = message.guild.channels.find('name', defaultSettings.logs_channel);
//     logs.send(`**User unbanned -> \`${user.tag}\`**`, guild)
// })
//
// client.on('roleCreate', (message, role) => {
//     if (!message.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//     const logs = message.guild.channels.find('name', defaultSettings.logs_channel);
//     logs.send("**New role created**", role.guild)
// })
//
// client.on('roleDelete', (message, role) => {
//     logs.send("**Role deleted -> `" + role.name + "`**", role.guild)
// })
//
//
// client.on('roleUpdate', (message, old, nw) => {
//
//   if (!message.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//   const logs = message.guild.channels.find('name', defaultSettings.logs_channel);
//     let txt
//     if (old.name !== nw.name) {
//         txt = `**${old.name} | Role name updated to -> \`${nw.name}\`**`
//     } else return
//     logs.send(txt, nw.guild)
// })
//
// client.on('guildMemberUpdate', (message, old, nw) => {
//     if (!message.guild.channels.exists('name', defaultSettings.logs_channel)) return;
//     const logs = message.guild.channels.find('name', defaultSettings.logs_channel);
//     let txt
//     if (old.roles.size !== nw.roles.size) {
//         if (old.roles.size > nw.roles.size) {
//
//             let dif = old.roles.filter(r => !nw.roles.has(r.id)).first()
//             txt = `**${nw.user.tag} | Role taken -> \`${dif.name}\`**`
//         } else if (old.roles.size < nw.roles.size) {
//
//             let dif = nw.roles.filter(r => !old.roles.has(r.id)).first()
//             txt = `**${nw.user.tag} | Role given -> \`${dif.name}\`**`
//         }
//     } else if (old.nickname !== nw.nickname) {
//         txt = `**${nw.user.tag} | Changed their nickname to -> \`${nw.nickname}\`**`
//     } else return
//     logs.send(txt, nw.guild)
// })


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

client.login(config.token);
// client.login(process.env.BOT_TOKEN);
