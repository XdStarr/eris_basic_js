const fs = require("fs");

const ora = require("ora");

const color = parseInt(process.env.COLOR);

module.exports = async (client) => {
    //Events Handler
    const Events = ora("Loading Events").start()

    const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
    if (eventFiles.length === 0) { Events.fail('No files found in Events Folder') }
    for (const file of eventFiles) {
        const event = require(`./Events/${file}`);
        //Events.text = `Event ${file} has been loaded!`;
        if (event.once) {
            client.once(event.name, (...args) => event.callback(...args, client, Color));
        } else {
            client.on(event.name, (...args) => event.callback(...args, client, Color));
        }
    }
    if (eventFiles.length !== 0) Events.succeed('Finished loading all events!');

    //CMDS Handler
    const Cmds = ora("Loading Commands").start()

    const commandFolders = fs.readdirSync('./CMDS');
    if (commandFolders.length === 0) { Cmds.fail('No folders/files found in Commands Folder') }
    for (const folder of commandFolders) {

        const commandFiles = fs.readdirSync(`./CMDS/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./CMDS/${folder}/${file}`);
            const name = command.name;

            const properties = { name, folder, private: command.private || false, command }
            client.commands.set(name, properties);

            Cmds.text = `${file} loaded from ${folder}!`;
        }
    }
    if (commandFolders.length !== 0) Cmds.succeed('Finished loading all commands!');
}