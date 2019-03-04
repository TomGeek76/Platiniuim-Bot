const Discord = require("discord.js");
const fs = require("fs");
const sql = require("sqlite");
sql.open('./storages/db.sqlite');

exports.execute = async (client, message, args, prefix) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission **ADMINISTRATOR** !!");

  let prefixtags = args.slice(1).join(' ');

  let data = await sql.get(`SELECT * FROM prefix WHERE guildid="${message.guild.id}"`);

  if(data){
    sql.run(`UPDATE prefix SET prefix="${prefixtags}" WHERE guildid="${message.guild.id}"`);
  }

  var embed = new Discord.RichEmbed()
    .setDescription(`:loudspeaker: Prefix Set To : ${prefixtags}`)
    .setColor('#00BFFF')

  message.channel.send({embed});

}

exports.info = {
    name: "prefix",
    usage: "prefix <new prefix>",
    description: "Change the prefix in your server.",
    alias: "",
    permission: "default",
    type: "admin"
}; 