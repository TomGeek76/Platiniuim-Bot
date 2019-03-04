const Discord = require('discord.js');
const chalk = require('chalk');

exports.execute = (client, message, args, prefix) => {
  message.delete().catch(O_o=>{}); 

  let commands = args[1];

    if(!commands || args.length > 2){
        message.channel.send({
            "embed": {
                "title": "Help",
                "description": `\`\`\`css\nListe des commandes, tapez [ ${prefix}commands ].\`\`\`\`\`\`css\nAide commande, tapez [ ${prefix}help <command_name> ].            \`\`\``,
                "color": 16766976,
                "footer": {
                  "text": `Serveur Prefix: ${prefix} | Language : Soon | Total Commands: ${client.commands.length}`
                }
              }
        });
    }

    if(commands){

        let commandsname = "";

        client.commands.forEach(command => {
            switch(command.info.name){
                case args[1]:
                    commandsname = command.info.name;
                    break;
            }
        });

        if(commandsname === ""){
            message.channel.send({
                "embed": {
                    "title": "Help",
                    "description": `\`\`\`css\nListe des commandes, tapez [ ${prefix}commands ] [ ${prefix}commands ].\`\`\`\`\`\`css\nAide commande, tapez [ ${prefix}help <command_name> ].            \`\`\``,
                    "color": 16766976,
                    "footer": {
                      "text": `Serveur Prefix: ${prefix} | Language : Soon | Total Commands: ${client.commands.length}`
                    }
                  }
            });
        } else {

            let commands_alias = "";
            let commands_permission = "";
            let commands_description = "";
            let commands_type = "";
            let commands_usage = "";

            client.commands.forEach(command => {
                switch(command.info.name){
                    case args[1]:
                        commands_alias = command.info.alias;
                        commands_permission = command.info.permission;
                        commands_type = command.info.type;
                        commands_usage = command.info.usage;
                        commands_description = command.info.description;
                        break;
                }
            });

            if(commands_alias === ""){
                commands_alias = "Aucun";
            }

            var embed = new Discord.RichEmbed()
                .addField("Command", "``" + commandsname + "``", true)
                .addField("Aliases", "``" + commands_alias + "``", true)
                .addField("Module", "``" + commands_type + "``", true)
                .addField("Description", commands_description)
                .addField("Usage", `\`\`\`${prefix}${commands_usage}\`\`\``)
                .setColor("RANDOM");

            message.channel.send({embed});
        }

    }

};

exports.info = {
    name: "help",
    usage: "help",
    description: "Helping you :)",
    alias: "",
    permission: "default",
    type: "general"
};