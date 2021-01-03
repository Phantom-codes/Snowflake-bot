const config = require("./config.json");
const token = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});
const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
const manager = new GiveawaysManager(bot, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        reaction: '<:Giveaway:795287777943486464>'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
bot.giveawaysManager = manager;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  bot.user.setActivity("Prefix is s! use s!invite", {type: "PLAYING"});
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if(!cmd.startsWith(config.prefix)) return;
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

<<<<<<< Updated upstream
bot.login(process.env.DJS_TOKEN);
=======
bot.login(token.token);
>>>>>>> Stashed changes
