exports.execute = async (client, message, args, prefix) => {
  
    message.delete().catch(O_o=>{});
      
      try {
        
        let responseMessage = await message.channel.send({
          embed: {
            description: 'PINGing...'
          }
        });
        
        await responseMessage.edit({
          embed: {
            color: Math.floor(Math.random() * 16777214) + 1,
            fields: [
              {
                name: 'Response time',
                value: `\`\`\`js\n${responseMessage.createdTimestamp - message.createdTimestamp} Ms\`\`\``,
                inline: true
              },
              {
                name: 'Web socket ping',
                value: `\`\`\`js\n${Math.round(client.ping)} Ms\`\`\``,
                inline: true
              }
            ]
          }
        });
      }
      catch (e) {
        client.log.error(e);
      }
    };
    
    exports.info = {
        name: "ping",
        usage: "ping",
        description: "Savoir les latences du bot",
        alias: "",
        permission: "default",
        type: "general"
    };