const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');
const next = '▶️';
const prev = '◀️';

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    var id = 0;
    for(i = 0;i<args.length;i++){
        if (i == 0 || i == 1){

        }else{
            args[1] = args[1] + ' ' + args[i]
            args.splice(i);
        }
    }
    if (args.length>=2){ 
        if (isNumeric(args[1])){
            id = parseInt(args[1]);
            const [rowsS] = await db.selectSeries();
            const [rowsC] = await db.selectChar();
            var scharsid = rowsS[id].Characters.split(',');
            var schars = [];
            for(i = 0 ;i < scharsid.length - 1; i++) {
                schars.push("`" + scharsid[i] +"` | " + rowsC[scharsid[i]].Name)
            }
            const scembed = new Discord.MessageEmbed()
                    .setTitle(rowsS[args[1]].ID.toString() + ' - ' + rowsS[args[1]].Series)
                    .addField('Characters', schars)
                    .setThumbnail(rowsS[id].SeriesImg)
        message.channel.send(scembed);
        }else{
            const [rowsS] = await db.selectSeries();
            const [rowsC] = await db.selectChar();
            id = rowsS.findIndex(data => data.Series.toLowerCase().includes(args[1].toLowerCase()))
            if (id<0){
                message.channel.send("Couldn't find the series in the Database")
                return;
            }
            var scharsid = rowsS[id].Characters.split(',');
            var schars = [];
            
            for(i = 0 ;i < scharsid.length; i++) {
                schars.push("`" + scharsid[i] +"` | " + rowsC[scharsid[i]].Name)
            }
            const scembed = new Discord.MessageEmbed()
                    .setTitle(rowsS[id].ID.toString() + ' - ' + rowsS[id].Series)
                    .addField('Characters', schars)
                    .setThumbnail(rowsS[id].SeriesImg)
            message.channel.send(scembed);
        }
    }else{
        message.channel.send('Missing args');
    }
};

module.exports.help = {
    name:'sc',
}