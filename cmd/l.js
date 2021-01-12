const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');
const next = '▶️';
const prev = '◀️';

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi) => {
            //list.delete(message.author.id + '.items')
            //listi.delete(message.author.id + '.items')
            //list.delete('Bot.globalids')
            function compare( a, b ) {
                if ( a.globalid < b.globalid ){
                  return -1;
                }
                if ( a.globalid > b.globalid ){
                  return 1;
                }
                return 0;
            }
            if (args[1] == null){
                var pgnum = 1;
            }else{
                var pgnum = args[1];
            }
            if (listi.get(message.author.id + '.items').length <= 0){
                const lembed = new Discord.MessageEmbed()
                .setTitle("List")
                .addField("Inventory", 'Empty');
            let lmsg = await message.channel.send(lembed);
            return;
            }else{
            listi.set(message.author.id + '.items',listi.get(message.author.id + '.items'))
            listi.set(message.author.id + '.items',listi.get(message.author.id + '.items').sort(compare))
            if (pgnum > (listi.get(message.author.id + '.items').length/20) + 1){
                message.channel.send("Not that many pages");
            }else{
                list.delete(message.author.id + '.items')
                for(i=0;i<listi.get(message.author.id + '.items').length;i++){
                    var char = listi.get(message.author.id + '.items['+i.toString()+']');
                    list.push(message.author.id + '.items',i.toString() + ' | ' + char.fp + char.name)
                }
            var lembed = new Discord.MessageEmbed()
                .setTitle("List")
                .addField("Inventory", (paginate(list.get(message.author.id + '.items').reverse(),20,pgnum)))
                .setFooter('Page '+pgnum + '/' + Math.floor((list.get(message.author.id + '.items').reverse().length/20) + 1));
                let lmsg = await message.channel.send(lembed);
                await lmsg.react(prev)
                await lmsg.react(next)

                // Filters
                const backwardsFilter = (reaction, user) => reaction.emoji.name === prev && user.id === message.author.id;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === next && user.id === message.author.id;

                const backwards = lmsg.createReactionCollector(backwardsFilter, {timer: 1000});
                const forwards = lmsg.createReactionCollector(forwardsFilter, {timer: 1000});

                backwards.on('collect', r => {
                    pgnum--;
                    lembed = new Discord.MessageEmbed()
                    .setTitle("List")
                    .addField("Inventory", (paginate(list.get(message.author.id + '.items').reverse(),20,pgnum)))
                    .setFooter('Page '+pgnum + '/' + Math.floor((listi.get(message.author.id + '.items').length/20) + 1));
                    lmsg.edit(lembed);
                });
                forwards.on('collect', r => {
                    pgnum++;
                    lembed = new Discord.MessageEmbed()
                    .setTitle("List")
                    .addField("Inventory", (paginate(list.get(message.author.id + '.items').reverse(),20,pgnum)))
                    .setFooter('Page '+pgnum + '/' + Math.floor((listi.get(message.author.id + '.items').length/20) + 1));
                    lmsg.edit(lembed);
                });
            }
        }
};

module.exports.help = {
    name:'l',
}



