const { Client, Collection, Constants } = require("eris");

const env = require("dotenv").config();

const client = new Client(process.env.TOKEN, {
    intents: [
        "guildMessages",
        "guildPresences",
        "guildMembers",
        "guilds"
    ],
    allowedMentions: { repliedUser: true },
    getAllUsers: true,
    autoreconnect: true,
    maxShards: "auto"
});

client.commands = new Collection();
client.cooldowns = new Collection();

require('./FileHandler')(client);

client.connect();