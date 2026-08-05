const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent]
});

client.on('messageCreate', message => {
    if(message.author.bot) return ;
    message.reply({
        content: "Hi from Bot"
    })
})

client.on('interactionCreate', interaction =>{
    interaction.reply({
        content:"Pong!!"
    })
})
// pass the token that we copied from the bot 
client.login('MTUzNDU1NTg4MzcyNjU2OTY3Mw.GMAM2A.mJ92eZJDwsiUAc-mYgvMI9YcxvPLbaWMg--l4c')