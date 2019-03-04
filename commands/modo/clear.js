const Discord = require('discord.js');

exports.execute = async (client, message, args, prefix) => {
    message.delete();

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission **MANAGE_MESSAGES** !!");

    let clearargs = args.slice(1).join(' ');

    const deleteCount = parseInt(clearargs, 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply("Veuillez indiquer un nombre entre 2 et 100 pour le nombre de messages à supprimer.");

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched).then(() => {
        message.channel.send(`🗑 J'ai supprimé **${fetched.array().length}** messages à la demande de ${message.author.username}.`).then(msg => msg.delete(2500));
    }).catch(error => message.reply(`Impossible de supprimer des messages à cause de : ${error}`));
      
    console.log(`• ${message.author.username} executed the command : "clear"`)
}

exports.info = {
    name: "clear",
    usage: "clear <nombre entre 2 et 100>",
    description: "Delete messages",
    alias: "purge",
    permission: "default",
    type: "modo"
}; 