const fetch = require("node-fetch");
const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// 전역변수
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./handler/config.json");

function delay(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

// 프로젝트 준비
require("./handler")(client);

client.login(client.config.token);
client.on("ready", async () => {
    console.log(`${client.user.tag} iS uP aNd ReAdY tO gO!`);
    client.user.setActivity("여러분의 답변을 검토");
});

client.on("message", async (message) => {
    const msg = message.content
    const everyoneRole = message.guild.roles.everyone; // @everyone 역할
    const interviewer = message.guild.roles.cache.find(r => r.id === '952713650781700147'); // 면접자 역할
    const verified = message.guild.roles.cache.find(r => r.id === '952764027891761222'); // 인증됨 역할
    
    if(msg === "!1234 ㅇㅇㅇ") {
        if (message.member.roles.cache.some(r => r.id === '952764027891761222')) { message.reply("https://cdn.discordapp.com/attachments/952752940857307157/952809276164948038/105x.png"); return; }
        else {
            message.member.setNickname(message.content.replace("!",""));
            message.member.roles.add(verified)
            message.guild.channels.create(message.content.replace("!",""), {
                parent: "952735002028834886",
                permissionOverwrites: [
                    {
                        type: 'member',
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        type: 'role',
                        id: interviewer.id,
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        type: 'role',
                        id: everyoneRole.id,
                        deny: ["VIEW_CHANNEL"],
                    }
                ],
            })
        }
        
        message.reply("https://cdn.discordapp.com/attachments/952752940857307157/952794650593337354/75x.png");
    }
});

client.on('guildMemberAdd', (member) => {
    const interviewee = member.guild.roles.cache.find(r => r.id === '952713935881109564'); // 면접대상자 
    member.roles.add(interviewee);
    member.guild.channels.cache.find(c => c.id === '952713527502725183').send("https://cdn.discordapp.com/attachments/952752940857307157/952800169991209001/95x.png");
})
