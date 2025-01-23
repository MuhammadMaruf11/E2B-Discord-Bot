require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Replace with your bot token from Discord Developer Portal
const DISCORD_BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

// Define the mapping for individual English characters to Bangla
const charMapping = {
    'a': 'আ',
    'b': 'ব',
    'c': 'চ',
    'd': 'দ',
    'e': 'ই',
    'f': 'ফ',
    'g': 'গ',
    'h': 'হ',
    'i': 'ই',
    'j': 'য',
    'k': 'ক',
    'l': 'ল',
    'm': 'ম',
    'n': 'ন',
    'o': 'ও',
    'p': 'প',
    'q': 'ক',
    'r': 'র',
    's': 'স',
    't': 'ট',
    'u': 'উ',
    'v': 'ভ',
    'w': 'ও',
    'x': 'ক্স',
    'y': 'য',
    'z': 'জ',
    'A': 'আ',
    'B': 'ব',
    'C': 'চ',
    'D': 'দ',
    'E': 'ই',
    'F': 'ফ',
    'G': 'গ',
    'H': 'হ',
    'I': 'ই',
    'J': 'য',
    'K': 'ক',
    'L': 'ল',
    'M': 'ম',
    'N': 'ন',
    'O': 'ও',
    'P': 'প',
    'Q': 'ক',
    'R': 'র',
    'S': 'স',
    'T': 'ট',
    'U': 'উ',
    'V': 'ভ',
    'W': 'ও',
    'X': 'ক্স',
    'Y': 'য',
    'Z': 'জ'
};

// Function to convert English name to Bangla dynamically
function convertToBangla(name) {
    let banglaName = '';

    // Convert each character in the name to Bangla using the charMapping
    for (let char of name) {
        if (charMapping[char]) {
            banglaName += charMapping[char];
        } else {
            // If character doesn't have a mapping, keep it as is (e.g., for spaces or special chars)
            banglaName += char;
        }
    }

    return banglaName;
}

// Event: Bot ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: New member joins the server
client.on('guildMemberAdd', async (member) => {
    const originalName = member.user.username;

    console.log(`New user joined: ${originalName}`);

    // Convert the username to Bangla using the dynamic conversion function
    const convertedName = convertToBangla(originalName);

    console.log(`Converted name: ${convertedName}`);

    try {
        // Update the member's nickname with the converted name
        await member.setNickname(convertedName);
        console.log(`Nickname updated for ${originalName} to ${convertedName}`);
    } catch (error) {
        console.error(`Failed to set nickname for ${originalName}:`, error.message);
    }
});

// Log in the bot
client.login(DISCORD_BOT_TOKEN)
    .then(() => console.log('Bot logged in successfully!'))
    .catch((err) => console.error('Login failed:', err.message));
