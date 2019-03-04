const Discord = require('discord.js');
const chalk = require('chalk');

exports.execute = (client, message, args, prefix) => {
  message.delete().catch(O_o=>{}); 
  
    var generalCommands = "";
    var funCommands = "";
    var modoCommands = "";
    var adminCommands = "";

    client.commands.forEach(command => {
        switch(command.info.type){
            case "general":
                generalCommands += command.info.name + "\n";
                break;

            case "fun":
                funCommands += command.info.name + "\n";
                break;
            
            case "modo":
                modoCommands += command.info.name + "\n";
                break;
            case "admin":
                adminCommands += command.info.name + "\n";
                break;

     
        }
    });

    var embed = new Discord.RichEmbed()
        .setColor(9955331)
        .addField("General Commands", ` \`\`\`css\n${generalCommands}\n\`\`\` ` + "\n",true)
        .addField("Fun Commands", ` \`\`\`css\n${funCommands}\n\`\`\` ` + "\n",true)
        .addField("Modo Commands", ` \`\`\`css\n${modoCommands}\n\`\`\` ` + "\n",true)
        .addField("Admin Commands", ` \`\`\`css\n${adminCommands}\n\`\`\` ` + "\n",true)
        .setFooter("Bot By TomGeek :D");

    message.channel.send(embed);
  
  	    console.log(`${(chalk.green(`${message.author.username}`))}` +' sur '+ (chalk.magenta(`${message.guild.name}`)) + ' salon ' + (chalk.magenta(`${message.channel.name}`))+' : ' + ' A ouvert la fonction [' + (chalk.cyan(` COMMANDS `))+ ']\n--------------------------------------')     

};

exports.info = {
    name: "commands",
    usage: "commands",
    description: "You display all commands",
    alias: "cmd",
    permission: "default",
    type: "general"
};