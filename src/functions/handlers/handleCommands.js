const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs')

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'))

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                // commandArray.push(command, command.data.toJSON())
                commandArray.push(command.data.toJSON());
                console.log('command:', command.data.name, 'has been passed through the handler')
            }
        }

        const clientId = '1236159041777041458';
        // const guildId = '232217843293356032'; // server ABEJORROS
        const guildId = '1238913412302504008'; // server test

        const rest = new REST({ version: '9' }).setToken(process.env.token);

        try {
            console.log('Stared refreshing application (/) commands');
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: client.commandArray }
            );
            console.log('Successfully reloaded application (/) commands')
        } catch (error) {
            console.error(error);
        }
    }
}