const Discord = require("discord.js");
const chalk = require('chalk');
const client = new Discord.Client();

exports.execute = (client, message, args, prefix) => {
  message.delete().catch(O_o=>{});
  
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("You do not have permission **KICK** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour **KICK**');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      if (!message.guild.member(user).kickable) return message.reply('Je ne peux pas **KICK** ce membre.');
      message.guild.member(user).kick();
  
      var embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Kick')
      .addField('Utilisateurs:', `${user.username}`)
      .addField('Raisons:', `${reason || 'Without reasons'}\n--------------------`)
      .setFooter(`Kické Par: ${message.author.username}`)
      .setTimestamp() 
      .setThumbnail(`${message.guild.iconURL}`)
      message.channel.send(embed);
      
console.log(`${(chalk.green(`${message.author.username}`))}` +' sur '+ (chalk.magenta(`${message.guild.name}`)) + ' salon ' + (chalk.magenta(`${message.channel.name}`))+' : ' + ' A ouvert la fonction [' + (chalk.cyan(` KICK `))+ ']\n--------------------------------------')

};

exports.info = {
    name: "kick",
    usage: "kick <@USER_MENTION> <reason>",
    description: "Kick a member",
    alias: "",
    permission: "default",
    type: "modo"
};