const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    const wembed = new Discord.MessageEmbed()
                .setTitle("Wallet")
                .setDescription(':ramen: '+ economy.get(message.author.id + '.balance'));
            message.channel.send(wembed);
};

module.exports.help = {
    name:'w',
}