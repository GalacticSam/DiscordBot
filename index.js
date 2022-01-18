const Discord = require('discord.js');
const Bot = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
const mydb = require('./db.js');
const spawn = require('scripts/spawnScript.js/');
var SpawnChance = 0;
var SpawnedName;

const { token,prefix,owner } = require('./config.json');

async function getRows(){
    const [rows] = await mydb.selectChar();
    return rows
};

Bot.commands = new Discord.Collection;
fs.readdir('./cmd/', (err, files) =>{
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === 'js');
    if(jsfiles.length<=0){
        console.log("no commands to load");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f,i) => {
       let props = require(`./cmd/${f}`);
       console.log(`${i+1}: ${f} loaded`)
       Bot.commands.set(props.help.name, props);
    });
})

var economy = new db.table('economy');
var list = new db.table('list');
var listi = new db.table('listi');

var raritynum;
var type;
var tcolor;
var tsymb;
var char = {
    name: "",
    series: "",
    id: "",
    fp: "",
    globalid: "",
    imgid: "",
    type: "",
    typecolor: "",
    typesymb: "",
    image: "",
};

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function TypeCalc(){
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

Bot.login(token);

Bot.on('ready', () => {
    console.log('this bot is online');
    console.log(Bot.commands);
})

Bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type==="dm") return;
    const [rows] = await mydb.selectChar();
    if (Math.floor(Math.random() * 1000) <= 1000){
        console.log('Spawned 1');
            spawnChar();
            SpawnChance=0;
    } else {
    SpawnChance++;
    }
    if (message.content.startsWith(prefix)){
    let args = message.content.substring(prefix.length).split(" ");

    let cmd = Bot.commands.get(args[0]);
    if(cmd) cmd.run(Bot,message,args,SpawnedName,char,list,listi,economy,getRows(),owner,rows);
    }
});