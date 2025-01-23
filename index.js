require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// Replace with your bot token from Discord Developer Portal
const DISCORD_BOT_TOKEN = process.env.BOT_TOKEN
// LibreTranslate API URL (no API key required for public instance)
const TRANSLATE_API_URL = 'https://libretranslate.com/translate';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

// Function to translate text to Bangla
async function translateToBangla(text) {
    try {
        const response = await axios.post(TRANSLATE_API_URL, {
            q: text,
            source: 'en', // Source language
            target: 'bn', // Target language (Bangla)
            format: 'text',
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Error during translation:', error.message);
        return text; // Return original text if translation fails
    }
}

// Event: Bot ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: New member joins the server
client.on('guildMemberAdd', async (member) => {
    const originalName = member.user.username;

    console.log(`New user joined: ${originalName}`);

    // Translate the username to Bangla
    const translatedName = await translateToBangla(originalName);

    console.log(`Translated name: ${translatedName}`);

    try {
        // Update the member's nickname with the translated name
        await member.setNickname(translatedName);
        console.log(`Nickname updated for ${originalName} to ${translatedName}`);
    } catch (error) {
        console.error(`Failed to set nickname for ${originalName}:`, error.message);
    }
});

// Log in the bot
client.login(DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot logged in successfully!'))
    .catch((err) => console.error('Login failed:', err.message));
