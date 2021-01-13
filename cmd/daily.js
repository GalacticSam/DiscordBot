const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');
const ms = require('parse-ms');

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    let timeout = 86400000;
    let amount = 400 + Math.floor(Math.random()*150);

    let daily = await economy.fetch(message.author.id + '.daily')

    if(daily!==null && timeout - (Date.now() - daily) > 0){
        let time = ms(timeout - (Date.now() - daily));

        return message.channel.send(`It hasn't been 2 hours since your last dung.\nYou can try again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
    }else{
        economy.add(message.author.id + '.balance',amount);
        economy.set(message.author.id + '.daily', Date.now())
        const dayembed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + "'s Daily", message.author.avatarURL())
            .setDescription('You got :ramen: ' + amount)
        message.channel.send(dayembed)
    }
};

module.exports.help = {
    name:'daily',
}