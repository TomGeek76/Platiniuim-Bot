const Discord = require('discord.js');
const client = new Discord.Client();
const cfg = require('./config.js');
const token = cfg.config.BOT_TOKEN;
const prefix = cfg.config.PREFIX;
const chalk = require('chalk');
const fs = require('fs');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const sql = require("sqlite");
sql.open('./storages/db.sqlite');

///////////////////////////////////////////////////////////////////////////////

client.config = {
  TOKEN: cfg.config.BOT_TOKEN,
  OWNER_ID: cfg.config.OWNER_ID,
  PREFIX: cfg.config.PREFIX
};

exports.config = () => {
  return client.config;
}

client.commands = [];

var commands_categories = [
  "general",
  "fun",
  "modo",
  "admin",
  "owner"
];

commands_categories.forEach(categories => {
  const commandFiles = fs.readdirSync(`./commands/${categories}/`);
  for (const file of commandFiles) {
    const cmd = require(`./commands/${categories}/${file}`);
    client.commands.push(cmd);
  }
});

///////////////////////////////////////////////////////////////////////////////

function checkBots(guild) {
  let botCount = 0;
  guild.members.forEach(member => {
    if(member.user.bot) botCount++;
  });
  return botCount; // Return amount of bots
}

function checkMembers(guild) {
  let memberCount = 0;
  guild.members.forEach(member => {
    if(!member.user.bot) memberCount++; 
  });
  return memberCount;
}

///////////////////////////////////////////////////////////////////////////////

client.on("ready", async () => {
  
  var memberCount = client.users.size;
  var servercount = client.guilds.size;
   
  var servers = client.guilds.array().map(g => g.name).join(',');
 
 console.log("--------------------------------------");
 console.log('--> ' + (chalk.yellow('Bot By TomGeek')) +' \n--> ' + (chalk.green('Connecter avec succès  ')) + ' \n--> ' + (chalk.magenta('Name Bot:              '))+ `[ ${client.user.tag} ]` + ' \n--> ' + (chalk.magenta('Commands:              '))+ `[ ${client.commands.length} ]` + ' \n--> '+(chalk.magenta('Le préfix actuel:      ')) +  `[ ${prefix} ]`  + '\n--> '+ (chalk.magenta('Nombre d\'utilisateurs: ')) + `[ ${client.users.size} ]` + '\n--> '+ (chalk.magenta('Nombre salon:          ')) + `[ ${client.channels.size} ]` + '\n--> '+ (chalk.magenta('Nombre de serveurs:    ')) + `[ ${client.guilds.size} ]`);
 console.log("--------------------------------------");
 console.log('--> ' + (chalk.green('Prèt !')));
 console.log('______________________________________');
 client.user.setActivity(`plt!help | ${memberCount} Utilisateurs`);

 let data_prefix = await sql.get(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'prefix'`);
 let data_points = await sql.get(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores'`);
 
 if(!data_prefix['count(*)']){
  sql.run(`CREATE TABLE prefix (id TEXT PRIMARY KEY, guildid TEXT, prefix TEXT)`);
 }

 if(!data_points['count(*)']){
  sql.run(`CREATE TABLE scores (id TEXT PRIMARY KEY, guildid TEXT, user TEXT, credits INTEGER, level INTEGER)`);
 }   
});

///////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async (member) => {

    const guild = member.guild;
    var memberCount = client.users.size;

    client.user.setActivity(`plt!help | ${memberCount} Utilisateurs`);

    const canvas = Canvas.createCanvas(300, 301);
    const ctx = canvas.getContext('2d');
  
    const background = await Canvas.loadImage('./plt.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.font = '20px sans-serif';
    
    ctx.fillStyle = '#ffffff';

    ctx.textAlign = 'center';
    
    ctx.fillText(member.displayName, 150, 290);
  
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
  
  
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'plt-welcome-image.png');
    
    const channelmembers = member.guild.channels.get("549590676384251920");
    const channelbots = member.guild.channels.get("549590676904607745");

    channelmembers.setName(`►═✦Membres : ${checkMembers(guild)}`);
    channelbots.setName(`►═✦Bots    : ${checkBots(guild)}`);

    setTimeout(function(){ 
        member.guild.channels.get("543920662138454022").send({
          "embed": {
            "image": {
              "url": "https://cdn.discordapp.com/attachments/543920662138454022/551857582281588757/Multi_Color_Bar.gif",
            }
          }
        });
    }, 1100);

    setTimeout(function(){ 
      member.guild.channels.get("543920662138454022").send(`Salut <@${member.id}>, bienvenue sur notre serveur ! Grâce à toi nous sommes ${checkMembers(guild)} !
N’hésite surtout pas à aller faire un tour dans le channel <#543920939121770506> !`, attachment);
    }, 1100);

});

client.on("guildMemberRemove", async (member) => {

  const guild = member.guild;
  var memberCount = client.users.size;

  client.user.setActivity(`plt!help | ${memberCount} Utilisateurs`);

  const channelmembers = member.guild.channels.get("549590676384251920");
  const channelbots = member.guild.channels.get("549590676904607745");

  channelmembers.setName(`►═✦Membres : ${checkMembers(guild)}`);
  channelbots.setName(`►═✦Bots    : ${checkBots(guild)}`);
});t

///////////////////////////////////////////////////////////////////////////////

client.on ("message", msg => {
	if (msg.author.client || msg.channel.type != 'text')
      return;
});

client.on ("message", async (msg) => {
    let data = await sql.get(`SELECT * FROM prefix WHERE guildid="${msg.guild.id}"`);
    
    let prefix = data.prefix;

    if(!msg.content.startsWith(prefix)) return;
    var args = msg.content.substring(prefix.length).split(" ");
    var cmdName = args[0].toLowerCase();

    client.commands.forEach(command => {
        if(cmdName === command.info.name || command.info.alias.includes(cmdName)){

            if(command.info.permission == "owner"
                    && msg.author.id != client.config.OWNER_ID){
                msg.channel.send("Order reserved for the **owner** of the bot");
            }else{
                command.execute(client, msg, args, prefix);
            }
          
        }
      
    });

  
});

///////////////////////////////////////////////////////////////////////////////

client.login(client.config.TOKEN);
