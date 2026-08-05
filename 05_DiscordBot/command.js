const { REST, Routes } = require('discord.js');

// 1. Put your actual Client ID and Token inside these quotes
const CLIENT_ID = '1534555883726569673'; 
const TOKEN = 'MTUzNDU1NTg4MzcyNjU2OTY3Mw.GMAM2A.mJ92eZJDwsiUAc-mYgvMI9YcxvPLbaWMg--l4c';    

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

// 2. We wrap the await call inside an async function so it doesn't crash
async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('There was an error:', error);
  }
}

// 3. Run the function
registerCommands();