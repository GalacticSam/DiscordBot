const Discord = require('discord.js');
const { type } = require('quick.db');
const Bot = new Discord.Client();
const db = require('../db.js');

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

module.exports.run = async (Bot,message,args,SpawnedName,char,list,listi,economy,getRows,owner) => {
        var type;
        var tcolor;
        var tsymb;
    if(message.author.id==owner){
        [rows] = await db.selectChar();
        if (args[1]!=null){
            var id = 0;
            for(i = 0;i<args.length;i++){
                if (i == 0 || i == 1 || i == 2){

                }else{
                    args[2] = args[2] + ' ' + args[i]
                    args.splice(i);
                }
            }
            if (args.length>=3){ 
                if (isNumeric(args[2])){
                    id = parseInt(args[2]);
                }else{
                    id = rows.findIndex(data => data.Name.toLowerCase().includes(args[2].toLowerCase()))
                }
            }else{
                message.channel.send('Missing args')
                return;
            }
            await selectSpawnChar(id,args[1],list)
            SpawnedName = char.name;
            var initials = char.name.split(' ')
            for(i = 0; i < initials.length; i++) {
                var initialsTxt;
                if (i == 0){
                    initialsTxt = initials[i].charAt(0) + '.';
                } else {
                    initialsTxt = initialsTxt + " " + initials[i].charAt(0) + ".";
                }
            };
            const spawn = new Discord.MessageEmbed()
            .setTitle('Test Spawn')
            .setImage(char.image)
            .setDescription(initialsTxt)
            .setColor(tcolor);
            message.channel.send(spawn);
    }}
    
    function pickType(spawntype){
        if (spawntype == 'alpha'){
            type='Alpha';
            tcolor='e6e6e6';
            tsymb='α';
        }else if (spawntype == 'beta'){
            type = 'Beta';
            tcolor='a1ffaa';
            tsymb='β';
        }else if(spawntype == 'gamma'){
            type = 'Gamma';
            tcolor='1cddff';
            tsymb='γ';
        }else if(spawntype == 'delta'){
            type='Delta';
            tcolor='c90014';
            tsymb='δ';
        }else if(spawntype == 'epsilon'){
            type='Epsilon';
            tcolor='9030ff';
            tsymb='ε';
        }else if(spawntype == 'zeta'){
            type='Zeta';
            tcolor='ff7df0';
            tsymb='ζ';
        }else if(spawntype == 'eta'){
            type='Eta';
            tcolor='ffe629';
            tsymb='η';
        }else{
            message.channel.send('Type not found')
            return;
        }
        return type,tcolor,tsymb;
    }
    async function selectSpawnChar(id,typein,list){
        var data = rows[id]
        var imgs = data.Images.split(",")
        var imgid = Math.floor(Math.random()*imgs.length);
        var img = imgs[imgid];
            pickType(typein.toLowerCase())
            char = {
                name: data.Name,
                id: data.ID,
                series:data.Series,
                globalid: list.get('Bot.globalids').length,
                image: img,
                imgid: imgid,
                type: type,
                typecolor: tcolor,
                typesymb: tsymb,
            }
            return char;
}
};

module.exports.help = {
    name:'spawn',
}