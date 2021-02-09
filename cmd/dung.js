const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');
const ms = require('parse-ms');

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    let timeout = 7200000;
    let amount = 300 + Math.floor(Math.random()*250);

    let dung = await economy.fetch(message.author.id + '.dung')

    if(dung!==null && timeout - (Date.now() - dung) > 0){
        let time = ms(timeout - (Date.now() - dung));

        return message.channel.send(`It hasn't been 2 hours since your last dung.\nYou can try again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
    }else{
        economy.add(message.author.id + '.balance',amount);
        economy.set(message.author.id + '.dung', Date.now())
        const dungembed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + "'s Dung", message.author.avatarURL())
            .setDescription('You got :ramen: ' + amount)
        message.channel.send(dungembed)
    }
};

module.exports.help = {
    name:'dung',
}