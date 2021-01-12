const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    if(args.length==1){
        var charid = listi.get(message.author.id + '.items').length -1;
    }else if(args.length>=2 && args[1] <= listi.get(message.author.id + '.items').length - 1 && args[1] >= 0){
        var charid = args[1];
    }
    const vembed = new Discord.MessageEmbed()
        .setTitle(listi.get(message.author.id + '.items')[charid].fp + "["+listi.get(message.author.id + '.items')[charid].typesymb+'] '+ listi.get(message.author.id + '.items')[charid].name)
        .setColor(listi.get(message.author.id + '.items')[charid].typecolor)
        .setImage(listi.get(message.author.id + '.items')[charid].image)
    message.channel.send(vembed);
    console.log(listi.get(message.author.id + '.items')[charid].globalid)
};

module.exports.help = {
    name:'v',
}