const Discord = require("discord.js");
const chalk = require('chalk');
const client = new Discord.Client();

exports.execute = (client, message, args, prefix) => {
  message.delete().catch(O_o=>{});

  let user = message.mentions.users.first();

  if(!user) return message.channel.send("<gifle <@USER_MENTION>");
  
  var embed = new Discord.RichEmbed()
    .setDescription(`**${message.author.username}** à giflé **${user.username}**`)
    .setImage("https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif")
    .setColor("RANDOM")
  message.channel.send(embed);
      
};

exports.info = {
    name: "gifle",
    usage: "gifle <@USER_MENTION>",
    description: "Giflé quelqu'un",
    alias: "",
    permission: "default",
    type: "fun"
};