const Discord = require("discord.js");
const cfg = require('../../config.js');
const client = new Discord.Client();
const owner = cfg.config.OWNER_ID;
const prefix = cfg.config.PREFIX;
const chalk = require('chalk');

exports.execute = (client, message, args, prefix) => {

if(message.author.id !== owner ) 
if(!message.author.id !== owner ) return message.channel.sendMessage("You don't have the permission !!");
  message.delete().catch(O_o=>{});
  
    if(args.length < 2){
        message.channel.send("no game specified");
        return;
    }

    var gameName = ``;
    for(var i = 1; i < args.length; i++){
        gameName += args[i] + " ";
    } message.channel.send(`New games : ${gameName}`)
    client.user.setActivity(gameName)
        .then(user => console.log("--> New games : " + gameName))
        .catch(console.error);
  
      console.log(`${(chalk.green(`${message.author.username}`))}` +' sur '+ (chalk.magenta(`${message.guild.name}`)) + ' salon ' + (chalk.magenta(`${message.channel.name}`))+' : ' + ' A ouvert la fonction [' + (chalk.cyan(` SET-GAME `))+ ']\n--------------------------------------')     

};

exports.info = {
    name: "setgame",
    alias: "setbotgame",
    description: "Set bot games",
    permission: "owner",
    type: "owner"
};