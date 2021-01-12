const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

module.exports.run = async (bot,message,args) => {
    const [rows] = await db.selectChar()
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
                    const imgs = await rows[id].Images.split(",")
                    var iembed = new Discord.MessageEmbed()
                    .setTitle(rows[id].ID + " - " + rows[id].Name)
                    .addField("```\nα: "+ rows[id].Alpha + '\n' + 'β: '+ rows[id].Beta + '\n' + 'γ: '+ rows[id].Gamma + '\n' + 'δ: '+ rows[id].Delta + '\n' + 'ε: '+ rows[id].Epsilon + '\n' + 'ζ: '+ rows[id].Zeta + '\n' + 'η: '+ rows[id].Eta + "\n```")
                    .setImage(imgs[0])
                    message.channel.send(iembed)
                }else{
                    message.channel.send('Missing args')
                    return;
                }
                if (id<0){
                    message.channel.send("Couldn't find the character in the Database")
                    return;
                }
            }
};

module.exports.help = {
    name:'i',
}