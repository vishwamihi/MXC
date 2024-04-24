const config = require('../config')
var os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const mg = require('../lib/mg')

const  bot = config.BOTNUMBER;

cmd({
    pattern: "alive",
    react: "👋",
    alias: ["online","test","bot"],
    desc: "Check bot online or no.",
    category: "genaral",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react}) => {
try{
    if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
        const fsghh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/group?groupjid=${sender}&sender=${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsghh &&  (fsghh?.error || fsghh?.upcomingDate == 'false')) return;
        
    }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
      }
await conn.sendMsg(m.chat, { image: { url: config.LOGO }, caption: config.ALIVE }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "restart",
    react: "♻️",
    desc: "restart bot",
    category: "owner",
    use: '.restart',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react}) => {
try{
    if (!isOwner) return;
    await conn.sendMsg(m.chat , { text : mg.restartmg } , { quoted: mek } );
    process.exit(143)
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "system",
    react: "🧬",
    alias: ["status"],
    desc: "Check bot system status.",
    category: "genaral",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react}) => {
try{
    if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
        const fsghh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/group?groupjid=${sender}&sender=${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsghh &&  (fsghh?.error || fsghh?.upcomingDate == 'false')) return;
 }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
      }
    var start = new Date().getTime();
var end = new Date ().getTime();
const ping = (end - start)

if (os.hostname().length == 12) {
  hostname = mg.replithostname
} else {
  if (os.hostname().length == 36) {
    hostname = mg.herokuhostname
} else {
    if (os.hostname().length == 8) {
      hostname = mg.koyebhostname
} else {
      hostname = os.hostname()
}}}

const ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
const rtime = await runtime(process.uptime())

const txt = `${mg.systemhead}

┌───────────────────────
├ ⏰ *Uptime:-* ${rtime}
├ 📟 *Ram usage:-* ${ram}
├ ⚙️ *Platform:-* ${hostname}
├ 👨‍💻 *Owners:-* 𝙼-𝚇-𝙲™
├ 🧬 *Mode:-* ${mg.mode}
└───────────────────────`
await conn.sendMsg(m.chat, { text:txt }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "join",
    desc: "joins group by link",
    category: "owner",
    react:"🔗",
    use: '<group link.>',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner) return;    
try{  
if (!q){ 
if(m.quoted && m.quoted.msg) {
q = m.quoted.msg
}else{
const mass = await conn.sendMsg(m.chat, { text: mg.wagrouplinknotfound }, { quoted: mek });
return await conn.sendMsg(m.chat, { react: { text: "⁉️", key: mass.key } });

}
}
    if (!q.split(" ")[0] && !q.split(" ")[0].includes("whatsapp.com"))
       reply(mg.invalidwagrouplink);
    let result = q.split(" ")[0].split("https://chat.whatsapp.com/")[1];
    await conn.groupAcceptInvite(result)
        .then((res) => reply(mg.groupjoinsuccess))
        .catch((err) => reply(mg.groupjoinerror));
} catch(e) {
console.log(e);
reply('Error!!')
} 
})       
cmd({
pattern: "ping",
react: "👀",
alias: ["speed"],
desc: "Check bot\'s ping",
category: "genaral",
use: '.ping',
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
    if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
        const fsghh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/group?groupjid=${sender}&sender=${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsghh &&  (fsghh?.error || fsghh?.upcomingDate == 'false')) return;
}else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
      }
var inital = new Date().getTime();

const { key } = await conn.sendMsg(m.chat, {text: mg.testingping});

var final = new Date().getTime();
await sleep(1000)

const pg = await conn.sendMsg(m.chat, {text: '*Ping:' + (final - inital) + ' ms*', edit: key});
return await conn.sendMsg(m.chat, { react: { text: '✔️', key: pg.key } });
} catch(e) {
console.log(e);
reply('Error!!')     
} 
})

cmd({
pattern: "del",
react: "❌",
alias: [","],
desc: "delete message",
category: "group",
use: '.del',
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner ||  !isAdmins) return;
try{
if (!m.quoted) return reply(mg.notextfordel);
const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
        await conn.sendMsg(m.chat, { delete: key })
} catch(e) {
console.log(e);
reply('Error!!')
} 
})
cmd({
    pattern: "left", 
    react: "🚷",        
    alias: ["leave"],
    desc: "(null).",
    category: "group",
    filename: __filename,
    use: '<.>',
},

async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner) return;
if (!m.isGroup) {
reply(mg.onlygroup)   
}
try {                
const gleave = m.chat
await conn.groupLeave(gleave)         
} catch(e) {
console.log(e);
reply('Error!!')
} 
}
)

cmd({
    pattern: "promote",
    react: "⚜️",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner ||  !isAdmins )return;
         try {     if (!m.isGroup) return reply(mg.onlygroup);
    if (!isBotAdmins) return reply(mg.needbotadmins);

        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? citel.quoted.sender : q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return reply(mg.nouserforpromote);
        await conn.groupParticipantsUpdate(m.chat, [users], "promote");
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "addsudo",
    react: "🎗️",
    desc: "Activate a bot for the user",
    category: "devoloper",
    filename: __filename,
    use: '.addsudo',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
      try{
          if(!isGroup){ 
            if(config.DOWNLOADSAPI !== ''){
                if(!m?.quoted?.sender) return;
                const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
                if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${m.quoted.sender}&type=true`); 
                reply(mg.sudoadded)
            }else{
            reply(mg.devoffsetting)}
        }
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "activate",
    react: "🛜",
    desc: "Activate a bot for the group",
    category: "owner",
    filename: __filename,
    use: '.activate',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
      try{
          if(isGroup &&( isOwner || isItzcp)){ 
            if(config.DOWNLOADSAPI !== ''){
                const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
                if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${from}&type=true`); 
                reply(mg.activatbotingroup)
            }else{
            reply(mg.devoffsetting)}
        }
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "resetdl",
    react: "↩️",
    desc: "reset available downloads",
    category: "owner",
    filename: __filename,
    use: '.resetdl',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
      try{
          if( isOwner || isItzcp){ 
            if(config.DOWNLOADSAPI !== ''){
               
                const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
                if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/downloads/reset`); 
            await reply(mg.databasereset)
            process.exit(143)
            }else{
            reply(mg.devoffsetting)}
        } 
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "apply",
    react: "🔰",
    desc: "apply a date limit for user in group",
    category: "owner",
    filename: __filename,
    use: '.apply',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
      try{
          if(isGroup &&( isOwner || isItzcp)){ 
            if(config.DOWNLOADSAPI !== ''){
               
                if(!m?.quoted?.sender)  return;
                const fsghh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}`); 
                if(fsghh &&  (fsghh?.error || fsghh?.data?.type == 'false')) return;
                const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
                if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/groups/?groupjid=${m.quoted.sender}&sender=${m.quoted.sender}&datelimit=${q}`); 
            await reply(mg.datelimit)
            await conn.sendMessage(m.chat, {
                text:"@"+m.quoted.sender.split("@")[0]+ " can use this bot until "+fsh.data[0].date,
                mentions: m.quoted.sender,
            }, {
                quoted: mek,
            });
            }else{
            await reply(mg.devoffsetting)}
        } else  if(!isGroup &&( isOwner || isItzcp)){ 
            if(config.DOWNLOADSAPI !== ''){
               
                if(!m?.quoted?.sender)  return;
                const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
                if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/groups/?groupjid=${m.quoted.sender}&sender=${m.quoted.sender}&datelimit=${q}`); 
            await reply(mg.datelimit)
            await conn.sendMessage(m.chat, {
                text:"@"+m.quoted.sender.split("@")[0]+ " can use this bot until "+fsh.data[0].date,
                mentions: m.quoted.sender,
            }, {
                quoted: mek,
            });
            }else{
            await reply(mg.devoffsetting)}
        }
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "delsudo",
    react: "🛑",
    desc: "Deactivate a bot for the user",
    category: "devoloper",
    filename: __filename,
    use: '.delsudo',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
      try{
          if(!isGroup){ 
            if(config.DOWNLOADSAPI !== ''){
                if(!m?.quoted?.sender) return;
                const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
                if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${m.quoted.sender}&type=false`); 
                reply(mg.sudoremoved)
            }else{
            reply(mg.devoffsetting)}
        }
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "deactivate",
    react: "🔀",
    desc: "Dectivate a bot for the group",
    category: "owner",
    filename: __filename,
    use: '.deactivate',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
      try{
        if(isGroup &&( isOwner || isItzcp)){ 
          if(config.DOWNLOADSAPI !== ''){
              const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
              if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
                const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${from}&type=false`); 
                reply(mg.deactivatbotingroup)
            }else{
            reply(mg.devoffsetting)}
        }
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "demote",
    react: "⛔",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
      async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner ||  !isAdmins )return;
         try {     if (!m.isGroup) return reply(mg.onlygroup);
            if (!isBotAdmins) return reply(mg.needbotadmins);

        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? citel.quoted.sender : q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return reply(mg.nouserfordemote);
        await conn.groupParticipantsUpdate(m.chat, [users], "demote");
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
pattern: "kick",
react: "🚫",
alias: [".."],
desc: "Kicks replied/quoted user from group.",
category: "group",
filename: __filename,
use: '<quote|reply|number>',
},           
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner ||  !isAdmins)return;
try {
    if (!m.isGroup) return reply(mg.onlygroup);
    if (!isBotAdmins) return reply(mg.needbotadmins);


const user = m.quoted.sender;
if (!user) return reply(mg.nouserforkick);
await conn.groupParticipantsUpdate(m.chat, [user], "remove");
reply(mg.userremoved);
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "hidetag",
    react: "📢",
    alias: ["htag"],
    desc: "Tags everyperson of group without mentioning their numbers",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner  ||  !isAdmins)return;
try { 
if (!m.isGroup) return reply(mg.onlygroup);

if (!isBotAdmins) return reply(mg.needbotadmins);
    conn.sendMsg(m.chat, {
        text: q ? text : "",
        mentions: participants.map((a) => a.id),
    }, {
        quoted: mek 
    });
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({
    pattern: "add",
    react: "🔆",
    desc: "Add that person in group",
    fromMe: true,
    category: "group",
    filename: __filename,
    use: '<number>',
},
 async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner  ||  !isAdmins)return;
try {

if (!m.isGroup) return reply(mg.onlygroup);
if (!isBotAdmins) return reply(mg.needbotadmins);
    if (!q) return reply(mg.nouserforadd);

    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await conn.groupParticipantsUpdate(m.chat, [users], "add");
} catch (e) {
reply('*Error !!*')
l(e)
}
})
cmd({

    pattern: "mute",	
    alias: ["lock"],
    react: "🔒",
    desc: "mute group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
if (!isOwner || !isAdmins) return;


if (!m.isGroup) return reply(mg.onlygroup);
if (!isBotAdmins) return reply(mg.needbotadmins);     
            await conn.groupSettingUpdate(m.chat, "announcement")
           const mass = await conn.sendMsg(m.chat, { text: '*Group chat muted* 🔒' }, { quoted: mek });
            return await conn.sendMsg(m.chat, { react: { text: '🔒', key: mass.key } });
} catch(e) {
console.log(e);
reply('*Error !!*')    
} 
})

//........................................
cmd({

    pattern: "unmute",	
    alias: ["unlock"],
    react: "🔊",
    desc: "mute group.",
    category: "group",
    filename: __filename,
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isOwner || !isAdmins) return;  


    if (!m.isGroup) return reply(mg.onlygroup);
    if (!isBotAdmins) return reply(mg.needbotadmins);     
  
            await conn.groupSettingUpdate(m.chat, "not_announcement")
           const mass = await conn.sendMsg(m.chat, { text: '*Group chat unmuted* 🔊' }, { quoted: mek });
            return await conn.sendMsg(m.chat, { react: { text: '🔊', key: mass.key } });
} catch(e) {
console.log(e);
reply('*Error !!*')     
} 
})


cmd({
    pattern: "menu",
    react: "📑",
    alias: ["panel","list","commands"],
    desc: "Get bot's command list.",
    category: "genaral",
    use: '.menu',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
   
    try {
        if(isGroup){
            const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}`); 
            if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
        const fsghh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/group?groupjid=${sender}&sender=${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsghh &&  (fsghh?.error || fsghh?.upcomingDate == 'false')) return;
}else if(!isGroup){
            const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}`); 
            if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
          }
        let categories = {};
        for (let cmd of commands) {
            if (!cmd.dontAddCommandList && cmd.pattern) { // Add command only if pattern is defined
                if (!(cmd.category in categories)) {
                    categories[cmd.category] = {};
                }
                if (!(cmd.pattern in categories[cmd.category])) {
                    categories[cmd.category][cmd.pattern] = [];
                }
                categories[cmd.category][cmd.pattern].push(...(cmd.alias || []));
            }
        }

let menu = `${mg.menuhead}

*╭──────────●●►*
 *│* *「  MAIN COMMANDS 」*
 *│*   ───────
 *|★* *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴏᴠɪᴇ:-* "${config.PREFIX}mv"
 *|*      *Ex:-* "${config.PREFIX}mv pathan"
 *|*
 *|★* *ᴅᴏᴡɴʟᴏᴀᴅ ᴛᴠ ꜱʜᴏᴡ:-* "${config.PREFIX}mv2"
 *|*      *Ex:-* "${config.PREFIX}mv2 money heist"
*╰───────────●●►*\n`;
        for (let category in categories) {
            menu += `*╭───────────●●►* \n *│* *「 ${category.toUpperCase()} COMMANDS 」*\n  *│*   ───────\n`;
            for (let pattern in categories[category]) {
                menu += ` *|* *"${config.PREFIX}${pattern}"*\n`;
                for (let alias of categories[category][pattern]) {
                   menu += ` *|*   *| ${config.PREFIX}${alias}*\n`;
               }
               ' *|*\n'
            }
            
                menu += `*╰───────────●●►*\n`;
        }
menu += `
${mg.footer}\n`;

        await conn.sendMsg(from, { image: { url: mg.menulogo }, caption: menu }, { quoted: mek  });
    } catch (e) {
        reply('*Error !!*');
        l(e);
    }
});
/*cmd({
    pattern: "menu1",
    react: "〽️",
    alias: ["panel1"],
    desc: "Check bot menu.",
    category: "genaral",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react}) => {
try{
const text = `╭──────────●●►
*│「  𝙼𝚊𝚒𝚗 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 」*
│   ───────
*│ ".ᴍᴠ"*
*│ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴏᴠɪᴇꜱ*
*│*
*│".ᴍᴠ2"*
*│ᴅᴏᴡɴʟᴏᴀᴅ ᴛᴠ ꜱᴇʀɪᴇꜱ*
│   ───────
*│*
*│".ʀᴇꜱᴛᴀʀᴛ"*
*│*
*│".ᴊɪᴅ"*
*│*
╰───────────●●►
╭───────────●●►
*│「 𝙶𝚎𝚗𝚊𝚛𝚊𝚕 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 」*
│   ───────
*│ ".ᴀʟɪᴠᴇ"*
*│*
*│ ".ꜱyꜱᴛᴇᴍ"*
*│*
*│ ".ᴩɪɴɢ"*
*│*
*│ ".ᴍᴇɴᴜ"*
*│*
*│ ".ɪᴍᴅʙ"*
*│*
*│ ".ɢᴅʀɪᴠᴇ"*
*│*
╰───────────●●►
╭───────────●●►
*│「 𝙾𝚠𝚗𝚎𝚛 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 」*
│   ───────
*│ ".ʀᴇꜱᴛᴀʀᴛ"*
*│*
*│ ".ᴊᴏɪɴ"*
*│*
*│ ".ᴀᴄᴛɪᴠᴀᴛᴇ"*
*│*
*│ ".ʀᴇꜱᴇᴛᴅʟ"*
*│*
*│ ".ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ"*
*│*
╰───────────●●►
╭───────────●●►
*│「 𝙶𝚛𝚘𝚞𝚙 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 」*
│   ───────
*│ ".ᴅᴇʟ"*
*│*
*│ ".ʟᴇꜰᴛ"*
*│*
*│ ".ᴩʀᴏᴍᴏᴛᴇ"*
*│*
*│ ".ᴅᴇᴍᴏᴛᴇ"*
*│*
*│ ".ᴋɪᴄᴋ"*
*│*
*│ ".ʜɪᴅᴇᴛᴀɢ"*
*│*
*│ ".ᴀᴅᴅ"*
*│*
*│ ".ᴍᴜᴛᴇ"*
*│*
*│ ".ᴜɴᴍᴜᴛᴇ* 
╰───────────●●►
╭───────────●●►
*│「 𝙳𝚎𝚟𝚎𝚛𝚕𝚘𝚙𝚎𝚛 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 」*
│   ───────
*│ ".ᴀᴅᴅꜱᴜᴅᴏ"*
*│*
*│ ".ᴅᴇʟꜱᴜᴅᴏ"*
*│*
*│ ".ᴀᴩᴩʟʏ"*
*│*
╰───────────●●►
╭───────────●●►
*│「 𝙼𝚘𝚟𝚒𝚎 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 」*
│   ───────
*│ ".ᴍᴏᴠɪᴇ"*
*│   | .ᴍᴠ*
*│*
*│ ".ᴛᴠꜱʜᴏᴡ"*
*│   | .ᴍᴠ2*
*│*
*│ ".ᴇᴩɪꜱᴏᴅᴇ"*
*│   | .ᴇᴩɪ*
*│*
╰───────────●●►

> *𝙼𝙰𝚂𝚃𝙴𝚁-𝚇-𝙲𝚈𝙱𝙴𝚁 | 𝚆𝙰-𝙱𝙾𝚃™*`
await conn.sendMsg(m.chat, { image: { url:  mg.menulogo }, caption: text }, { quoted: mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})*/
