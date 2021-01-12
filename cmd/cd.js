const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');
const ms = require('parse-ms');

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    let timeoutdaily = 86400000;
    let timeoutdung = 7200000;

    let daily = await economy.fetch(message.author.id + '.daily')
    let dung = await economy.fetch(message.author.id + '.dung')

    let timedaily = ms(timeoutdaily - (Date.now() - daily));
    let timedung = ms(timeoutdung - (Date.now() - dung));
    var dailycd
    var dungcd
    if(daily!==null && timeoutdaily - (Date.now() - daily)<= 0){
        dailycd ='Available Now'
    }else{
        dailycd = timedaily.hours + 'h '+timedaily.minutes+'m '+timedaily.seconds+'s'
    }
    if(dung!==null && timeoutdung - (Date.now() - dung) <= 0){
        dungcd ='Available Now'
    }else{
        dungcd = timedung.hours + 'h '+timedung.minutes+'m '+timedung.seconds+'s'
    }
    const cdembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + "'s Cooldowns", message.author.avatarURL())
        .addField('Cooldowns:','**Daily:' + dailycd +'**\n**Dungeon:'+ dungcd +'**')
    return message.channel.send(cdembed)//`You can do your daily again in ${timedaily.hours}h ${timedaily.minutes}m ${timedaily.seconds}s\nYou can do your dung again in ${timedung.hours}h ${timedung.minutes}m ${timedung.seconds}s `);
};

module.exports.help = {
    name:'cd',
}