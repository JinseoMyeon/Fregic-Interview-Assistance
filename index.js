const fetch = require("node-fetch");
const { Client, Collection } = require("discord.js");

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
client.on("ready", () => {
    console.log(`${client.user.tag} iS uP aNd ReAdY tO gO!`);
    client.user.setActivity("여러분을 환영");
});

client.on("message", async (message) => {
    const msg = message.content
    const everyoneRole = message.guild.roles.everyone;
    const interviewer = message.guild.roles.cache.find(r => r.id === '952713650781700147');
    const verified = message.guild.roles.cache.find(r => r.id === '952764027891761222');
    
    if(msg === "!2313 서용준" || msg === "!1121 윤동하" || msg === "!1303 문동규" || msg === "!1306 박세환" || msg === "!1313 안진혁" || msg === "!1319 유재진" || msg === "!1320 윤시원" || msg === "!1324 이안" || msg === "!1327 정선우" || msg === "!1328 정윤호" || msg === "!1331 최원혁" || msg === "!1332 최준호" || msg === "!1402 김도훈" || msg === "!1507 김산해" || msg === "!1526 이유진" || msg === "!1601 강민석" || msg === "!1622 장채은" || msg === "!1624 조한결") {
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
    const interviewee = member.guild.roles.cache.find(r => r.id === '952713935881109564');
    member.roles.add(interviewee);
    member.guild.channels.cache.find(c => c.id === '952713527502725183').send("https://cdn.discordapp.com/attachments/952752940857307157/952800169991209001/95x.png");
})