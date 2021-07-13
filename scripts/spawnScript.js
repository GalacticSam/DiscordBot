const index = require('../index.js');

module.exports.run = async => {
    async function randChar(){
        const [rows] = await mydb.selectChar();
            TypeCalc();
            var id = Math.floor(Math.random()*rows.length)
            var data = rows[id]
            var imgs = data.Images.split(",")
            var imgid = Math.floor(Math.random()*imgs.length);
            var img = imgs[imgid];
                TypeCalc();
                if(await data.Total == 0){
                    fp = '🌟'
                }else if(await data[type] == 0){
                    fp = '⭐'
                }else{
                    fp = ''
                }
                char = {
                    name: data.Name,
                    id: data.ID,
                    fp: fp,
                    series:data.Series,
                    globalid: list.get('Bot.globalids').length,
                    image: img,
                    imgid: imgid,
                    type: type,
                    typecolor: tcolor,
                    typesymb: tsymb,
                }
            list.push('Bot.globalids', list.get('Bot.globalids').length)
    }

    async function spawnChar(){
            console.log('Spawned 2');
            char = await randChar()
                index.SpawnedName = char.name;
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
    }
}