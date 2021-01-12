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
            const [rows] = await db.selectChar()
            var imgid = 0;
            if (args[1]!=null){
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
                    }else{
                        id = rows.findIndex(data => data.Name.toLowerCase().includes(args[1].toLowerCase()))
                    }
                }else{
                    message.channel.send('Missing args')
                    return;
                }
                if (id<0){
                    message.channel.send("Couldn't find the character in the Database")
                    return;
                }
                const imgs = await rows[id].Images.split(",")
                var ciembed = new Discord.MessageEmbed()
                    .setTitle(rows[id].ID + " - " + rows[id].Name)
                    .setImage(imgs[imgid])
                    .setFooter('🖼️ Image: #' + imgid.toString() + " of "+ (imgs.length - 1).toString())
                let lmsg = await message.channel.send(ciembed);
                await lmsg.react(prev)
                await lmsg.react(next)
                // Filters
                const backwardsFilter = (reaction, user) => reaction.emoji.name === prev && user.id === message.author.id;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === next && user.id === message.author.id;

                const backwards = lmsg.createReactionCollector(backwardsFilter, {timer: 1000});
                const forwards = lmsg.createReactionCollector(forwardsFilter, {timer: 1000});

                backwards.on('collect', r => {
                    if(imgid>0){
                        imgid--;
                    }
                    ciembed = new Discord.MessageEmbed()
                    .setTitle(rows[id].ID + " - " + rows[id].Name)
                    .setImage(imgs[imgid])
                    .setFooter('🖼️ Image: #' + imgid.toString() + " of "+ (imgs.length - 1).toString())
                    lmsg.edit(ciembed);
                });
                forwards.on('collect', r => {
                    if (imgid<imgs.length){
                        imgid++;
                    }
                    ciembed = new Discord.MessageEmbed()
                    .setTitle(rows[id].ID + " - " + rows[id].Name)
                    .setImage(imgs[imgid])
                    .setFooter('🖼️ Image: #' + imgid.toString() + " of "+ (imgs.length - 1).toString())
                    lmsg.edit(ciembed);
                });
            }
};

module.exports.help = {
    name:'ci',
}