const anilist = require('anilist-node');
const Anilist = new anilist();
const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('../db.js');

var raritynum;
var type;
var tcolor;
var tsymb;
var simg;

function TypeCalc(data){
    raritynum = Math.floor(Math.random() * 1000)
    type = 'Alpha';
    tcolor='e6e6e6';
    tsymb='α';
    if (raritynum <= 350){
        type='Alpha';
        tcolor='e6e6e6';
        tsymb='α';
    }else if (raritynum>=351 && raritynum <=550){
        type = 'Beta';
        tcolor='a1ffaa';
        tsymb='β';
    }else if(raritynum>=551 && raritynum<= 775){
        type = 'Gamma';
        tcolor='1cddff';
        tsymb='γ';
    }else if(raritynum>=776 && raritynum<=875){
        type='Delta';
        tcolor='c90014';
        tsymb='δ';
    }else if(raritynum>=876 && raritynum <= 950 ){
        type='Epsilon';
        tcolor='9030ff';
        tsymb='ε';
    }else if(raritynum>=951 && raritynum <= 990){
        type='Zeta';
        tcolor='ff7df0';
        tsymb='ζ';
    }else if(raritynum>=991 && raritynum<=1000){
        type='Eta';
        tcolor='ffe629';
        tsymb='η';
    }
    return type,tcolor,tsymb;
}

module.exports.run = async (bot,message,args,SpawnedName,char,list,listi,economy) => {
        const [rows] = await db.selectChar();
        var id = Math.floor(Math.random()*rows.length)
        var data = rows[id]
        var imgs = data.Images.split(",")
        var imgid = Math.floor(Math.random()*imgs.length);
        var img = imgs[imgid];
        var fp = ''
        if(economy.get(message.author.id + '.balance')>=500){
            TypeCalc(data);
            if(await data.Total == 0){
                fp = '🌟'
            }else if(await data[type] == 0){
                fp = '⭐'
            }else{
                fp = ''
            }
            if(list.get('Bot.globalids') == null){
                char = {
                    name: data.Name,
                    id: data.ID,
                    fp: fp,
                    globalid: 0,
                    series:data.Series,
                    image: img,
                    imgid: imgid,
                    type: type,
                    typecolor: tcolor,
                    typesymb: tsymb,
                }
                list.push('Bot.globalids',0)
            }else{
                char = {
                    name: data.Name,
                    id: data.ID,
                    fp: fp,
                    globalid: list.get('Bot.globalids').length,
                    series:data.Series,
                    image: img,
                    imgid: imgid,
                    type: type,
                    typecolor: tcolor,
                    typesymb: tsymb,
                }
                list.push('Bot.globalids', list.get('Bot.globalids').length)
            }
        const brembed = new Discord.MessageEmbed()
                .setTitle(fp +'['+ tsymb +']' +char.name)
                .setImage(char.image)
                .setColor(char.typecolor)
                .setDescription(char.series)
                .setThumbnail(char.simg)
                .setFooter('🖼️ Image: #' + char.imgid.toString() + " of "+(imgs.length - 1).toString())
                message.channel.send('<@' + message.author.id + '>', {embed: brembed});
                db.addType(await type,id);
                db.addTotal(id);
                listi.push((message.author.id + '.items'), char)
                list.push((message.author.id + '.items'),listi.get(message.author.id + '.items').length - 1 + ' | ' + fp +'['+ tsymb+'] ' + char.name);
                economy.add(message.author.id + '.balance',-500)
    }else{
        message.channel.send('<@' + message.author.id + "> You don't have enough ramen")
    }
}
module.exports.help = {
    name:'br',
}