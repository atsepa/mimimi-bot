const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready.js');

module.exports = {
    data: new SlashCommandBuilder().setName('mimimi').setDescription('Mimimi a string!').addStringOption(option =>
        option.setName('text')
            .setDescription('Text to mimimi')
            .setRequired(true)),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const text = interaction.options.getString('text')

        const newMessage = `${toMimimi(text)}`;
        await interaction.editReply({
            content: newMessage,
        });
    }
}

const toMimimi = (text) => text.replace(/[aeiouAEIOU]/g, 'i') 