const Discord = require("discord.js");
const chalk = require('chalk');
const client = new Discord.Client();

exports.execute = (client, message, args, prefix) => {
  message.delete().catch(O_o=>{});

  var replys = [
    "As I see it, yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don’t count on it",
    "It is certain",
    "It is decidedly so",
    "Most likely",
    "My reply is no",
    "My sources say no",
    "Outlook good",
    "Outlook not so good",
    "Reply hazy try again",
    "Signs point to yes",
    "Very doubtful",
    "Without a doubt",
    "Yes",
    "Yes, definitely",
    "You may rely on it"
  ];

  let question = args.slice(1).join(' ');

  if (question.length < 1) return message.reply('You must ask for something!');
  
  let reponse = (replys[Math.floor(Math.random() * replys.length)]);
  var embed = new Discord.RichEmbed()
    .setDescription(":8ball: 8ball")
    .addField("Question", question)
    .addField("Answer", reponse)
    .setColor("RANDOM")
  message.channel.send(embed);
      
  console.log(`${(chalk.green(`${message.author.username}`))}` +' sur '+ (chalk.magenta(`${message.guild.name}`)) + ' salon ' + (chalk.magenta(`${message.channel.name}`))+' : ' + ' A ouvert la fonction [' + (chalk.cyan(` 8BALL `))+ ']\n--------------------------------------')

};

exports.info = {
    name: "magic8ball",
    usage: "magic8ball <Your Question>",
    description: "A magic ball that answers all your questions !",
    alias: "8ball",
    permission: "default",
    type: "fun"
};