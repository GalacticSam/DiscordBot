const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi) => {
    for(i = 0;i<args.length;i++){
        if (i == 0 || i == 1){

        }else{
            args[1] = args[1] + ' ' + args[i]
            args.splice(i);
        }
    }
    if (SpawnedName == null){
        message.channel.send("Nothing to claim");
    }else if (args[1] == null){
        message.channel.send("Please input name")
    }else if (args[1].toLowerCase() == SpawnedName.toLowerCase()){
        message.reply("Claimed "+'['+char.typesymb+'] ' + SpawnedName);
        await db.addType(char.type,char.id);
        db.addTotal(char.id);
        listi.push((message.author.id + '.items'), char)
        list.push((message.author.id + '.items'),listi.get(message.author.id + '.items').length + ' | ' +'['+char.typesymb +'] ' +SpawnedName);
    }else{
        message.channel.send("Wrong name")
    }
};

module.exports.help = {
    name:'claim',
}