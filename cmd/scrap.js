const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');
const yes = '✅';
const no = '❌';

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
    if(isNumeric(args[1])){
        id = args[1]
        var value;
        switch(listi.get(message.author.id + '.items')[id].type){
            case 'Alpha':
                value = 5;
            break;
            case 'Beta':
                value = 10;
            break;
            case 'Gamma':
                value = 20;
            break;
            case 'Delta':
                value = 35;
            break;
            case 'Epsilon':
                value = 50;
            break;
            case 'Zeta':
                value = 75;
            break;
            case 'Eta':
                value = 100;
            break;
        }
        var sembed = new Discord.MessageEmbed()
            .setTitle("Are you sure you want to scrap [" + listi.get(message.author.id + '.items')[id].typesymb + '] ' + listi.get(message.author.id + '.items')[id].name + "?")
            .setDescription("You'll get :ramen: " + value + " for this")
        let smsg = await message.channel.send(sembed);
        await smsg.react(yes)
        await smsg.react(no)       
        
         // Filters
         const yesFilter = (reaction, user) => reaction.emoji.name === yes && user.id === message.author.id;
         const noFilter = (reaction, user) => reaction.emoji.name === no && user.id === message.author.id;

         const agree = smsg.createReactionCollector(yesFilter, {timer: 1000});
         const disagree = smsg.createReactionCollector(noFilter, {timer: 1000});

         agree.on('collect', r => {
            sembed = new Discord.MessageEmbed()
                .setTitle("Scrapped [" + listi.get(message.author.id + '.items')[id].typesymb + '] ' + listi.get(message.author.id + '.items')[id].name)
                .setDescription('You got :ramen: '+ value);
            smsg.edit(sembed);
            listi.set(message.author.id + '.items',listi.get(message.author.id + '.items').splice(0,parseInt(id)).concat(listi.get(message.author.id + '.items').splice(parseInt(id)+1,listi.get(message.author.id + '.items').length)))
            economy.add(message.author.id + '.balance',value);
         });
         disagree.on('collect', r => {
             sembed = new Discord.MessageEmbed()
             .setTitle("Operation cancelled")
             smsg.edit(sembed);
         });

    }
};

module.exports.help = {
    name:'scrap',
}