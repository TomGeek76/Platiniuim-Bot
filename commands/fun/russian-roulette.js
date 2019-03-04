const Discord = require('discord.js');

exports.execute = async (client, message, args, prefix) => {
  
    message.delete().catch(O_o=>{});

    const answer = [
        `:sweat_smile:        :gun:        ${message.author.username} **YOU ESCAPED UNHARMED!**`,
        `:sweat_smile:        :gun:        ${message.author.username} **YOU ESCAPED UNHARMED!**`,
        `:sweat_smile:        :gun:        ${message.author.username} **YOU ESCAPED UNHARMED!**`,
        `:sweat_smile:        :gun:        ${message.author.username} **YOU ESCAPED UNHARMED!**`,
        `:sweat_smile:        :gun:        ${message.author.username} **YOU ESCAPED UNHARMED!**`,
        `:dizzy_face:        :boom:        :gun:     ${message.author.username} YOU ARE DEAD !!`,
        `:dizzy_face:        :boom:        :gun:     ${message.author.username} YOU ARE DEAD !!`,
        `:dizzy_face:        :boom:        :gun:     ${message.author.username} YOU ARE DEAD !!`,
        `:dizzy_face:        :boom:        :gun:     ${message.author.username} YOU ARE DEAD !!`,
        `:dizzy_face:        :boom:        :gun:     ${message.author.username} YOU ARE DEAD !!`
    ];

    var embed1 = new Discord.RichEmbed()
        .setColor('#33cc00')
        .setDescription(':smile:        :gun:        **3**');
    
    var embed2 = new Discord.RichEmbed()
        .setColor('#ffb700')
        .setDescription(':smile:        :gun:        **2**');
    
    var embed3 = new Discord.RichEmbed()
        .setColor('#cc0000')
        .setDescription(':smile:        :gun:        **1**');
    
    var embed4 = new Discord.RichEmbed()
        .setColor('')
        .setDescription(answer[Math.floor(Math.random() * answer.length)]);

    try{
        let russianMsg = await message.channel.send(embed1);

        setTimeout(function(){ 
            russianMsg.edit(embed2);
        }, 1000);

        setTimeout(function(){ 
            russianMsg.edit(embed3);
        }, 1000);

        setTimeout(function(){ 
            russianMsg.edit(embed4);
        }, 1000);

    }catch (e) {
        client.log.error(e);
    }

};

exports.info = {
    name: "russianroulette",
    usage: "russianroulette",
    description: "Russian roulette is a potentially lethal game of chance that involves putting a bullet in a revolver's barrel, turning it randomly, then pointing the revolver at its head before triggering the trigger.",
    alias: "",
    permission: "default",
    type: "fun"
};