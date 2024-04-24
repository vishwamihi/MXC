async  function startsachibot(){
    const crypto = require('crypto')
    const path = require('path');
    
    const config = require('./config')

    const fs = require('fs')
    const P = require('pino')
    const events = require('./command')
    const qrcode = require('qrcode-terminal')
    const util = require('util')
    
    const axios = require('axios')
    const { File } = require('megajs')
    const prefix = config.PREFIX
    const ownerNumber = config.OWNERNUMBER.split(',')
    const l = console.log
    let METHOD;
    const { storenumrepdata, getstorednumrep } = require('./lib/numrepstore')
    function sachibotjid() {
        const lt = 'sachibotprmd';
        const SL = [...lt].sort(() => Math.random() - 0.5);
        const RT = SL.join('');
        const key = crypto.scryptSync('Sachi@2004', 'salt', 32);  // Generate a 32-byte key using scrypt
        const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16));
        let ent = cipher.update(RT, 'utf-8', 'hex');
        ent += cipher.final('hex');
      
        ent = ent.replace(/[^0-9a-f]/gi, '');
      
        return ent.toUpperCase();
      }
      
      const bot = config.BOTNUMBER;
      const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('./lib/functions')
    const { sms,downloadMediaMessage } = require('./lib/msg')
    const mg = require('./lib/mg')
        // <<==========PORTS===========>>
        const express = require("express");
        const app = express();
        const port = process.env.PORT || 8000;
    //===================SESSION============================
    
    async function session(){
        const dft = path.join(__dirname, '/auth_info_baileys/');
        
        
                    if (!fs.existsSync(dft)) {
                        fs.mkdirSync(dft);
                    }
        const df = path.join(__dirname, '/auth_info_baileys/creds.json');
    
        if (!fs.existsSync(df)) {
        if(!config.SESSION_ID  || config.SESSION_ID === '') return console.log('Please add your session to SESSION_ID env !!')
        let sessdata = config.SESSION_ID
        if(sessdata.startsWith('itzcp_qr-')){
            sessdata = sessdata.replace('itzcp_qr-','').trim();
            METHOD='QR'
        }else if(sessdata.startsWith('itzcp_pair-')){
            sessdata = sessdata.replace('itzcp_pair-','').trim();
            METHOD = 'PAIR'
        }
        if (sessdata?.length > 295) {
        const contentData =Buffer.from(sessdata, 'base64').toString('utf-8')
        await sleep(2000);   
        fs.writeFile(df,contentData, () => {
        console.log("✅ Session download completed and saved to creds.json !!")
    
        })
        }else{
        const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
        filer.download((err, data) => {
        if(err) throw err
        fs.writeFile(df, data, () => {
        console.log("Session download completed !!")
    
        })})}}
        }
    //====================================

        
        async function processDownloads() {
            
            if(config.DOWNLOADSAPI !== ''){
                if(config.Itzcp !== ''){
                     await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${config.Itzcp}@s.whatsapp.net&type=true`)
                }
                await sleep(1*1000)
                if(config.Itzcp2 !== ''){
                    await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${config.Itzcp2}@s.whatsapp.net&type=true`)
               }
               await sleep(1*1000)
               if(config.Itzcp3 !== ''){
                await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${config.Itzcp3}@s.whatsapp.net&type=true`)
           }
           await sleep(1*1000)
           if(config.Itzcp4 !== ''){
            await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${config.Itzcp4}@s.whatsapp.net&type=true`)
       }
       await sleep(1*1000)
       if(config.Itzcp5 !== ''){
        await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${config.Itzcp5}@s.whatsapp.net&type=true`)
   }
        
        await sleep(1*1000)
        const fsgh = await fetchJson(`${config.DOWNLOADSAPI}${bot}?groupjid=${config.DEVNUMBER}@s.whatsapp.net&type=true`)
        await sleep(1*1000)
        //const  downloads = await fetchJson(`${config.DOWNLOADSAPI}${bot}/downloads/reset`); 
            }
        }
        async function connectmsg(conn){
            await conn.sendMessage(bot+"@s.whatsapp.net", { image: {url: mg.imageconnect}, caption: mg.connectmg }, { messageId: sachibotjid() })
            await processDownloads()
            }
    //====================================
    async function connectToWAQR() {
        await session()
        const {
            default: makeWASocket,
            useMultiFileAuthState,
            DisconnectReason,
            jidNormalizedUser,
            fetchLatestBaileysVersion,
            getContentType,
            Browsers,
            makeInMemoryStore,
            makeCacheableSignalKeyStore,
            getAggregateVotesInPollMessage
            } = require('@sampandey001/baileys')
        console.log("Connecting bot...");
        const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
        var { version } = await fetchLatestBaileysVersion()
        const latestWebVersion = () => {
                let version
                try {
                    let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
                    version = [a.currentVersion.replace(/[.]/g, ', ')]
                } catch {
                    version = [2, 2204, 13]
                }
                return version
         }
        const store = makeInMemoryStore({
                logger: P({ level: "silent", stream: "store" }),
            });
            async function getMessage(key){
                let jid = jidNormalizedUser(key.remoteJid)
                let msg = await store.loadMessage(jid, key.id)
       
                return msg || ""
            }
        const NodeCache = require("node-cache")
        const msgRetryCounterCache = new NodeCache()
        
        const conn = makeWASocket({
            logger: P({ level: 'silent' }),
            printQRInTerminal: false,     
            markOnlineOnConnect: false,
         auth: {
             creds: state.creds,
             keys: makeCacheableSignalKeyStore(state.keys, P({ level: "fatal" }).child({ level: "fatal" })),
          },
          browser: Browsers.macOS("Safari"),
          getMessage: async (key) => {
             let jid = jidNormalizedUser(key.remoteJid)
             let msg = await store.loadMessage(jid, key.id)
    
             return msg?.message || ""
          },
          msgRetryCounterCache,
          defaultQueryTimeoutMs: undefined, 
          syncFullHistory: false,
          latestWebVersion,
       })
        
                store.bind(conn.ev)
        setInterval(() => {
            store.writeToFile(__dirname+"/store.json");
          }, 3000);
        
        conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
        if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason?.loggedOut) {
        connectToWAQR()
        }
        } else if (connection === 'open') {
        console.log('Installing plugins 🔌... ')
        
        
        const path = require('path');
        fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
        require("./plugins/" + plugin);
        }
        });
        console.log('Plugins installed ✅')
        console.log('Bot connected ✅')
        
        
        await connectmsg(conn)
        }
        })
        conn.ev.on('creds.update', saveCreds)
        /*conn.ev.on('messages.update', async(mes) => {
            for(const { key, update } of mes) {
                if(update.pollUpdates) {
                    const pollCreationmg = await getMessage(key)
                    const pollCreation = pollCreationmg.message;
                    if(pollCreation) {
                        const from = key.remoteJid;
                        const botNumber = await jidNormalizedUser(conn.user.id);
                        const pollMessage = await getAggregateVotesInPollMessage({
                            message: pollCreation,
                            pollUpdates: update.pollUpdates,
                        })
                        let bodyName = pollMessage.find(poll => poll.voters.length > 0)?.name || '';
                        let bodyIndex = pollMessage.findIndex(poll => poll.name === bodyName) || '';
                        
                        let voter = (pollMessage.find(poll => poll.voters.length > 0)?.voters[0] == 'me')?botNumber  :pollMessage.find(poll => poll.voters.length > 0)?.voters[0];
                        function extractMentionedJid(data) {
                            let messageKeys = ['pollCreationMessage', 'pollCreationMessageV1', 'pollCreationMessageV2', 'pollCreationMessageV3'];
                        
                            for (let key of messageKeys) {
                                if (data[key]  && data[key].mentionedJid) {
                                    return data[key].mentionedJid;
                                }
                            }
                        
                            return null; 
                        }function extractpollname(data) {
                            let messageKeys = ['pollCreationMessage', 'pollCreationMessageV1', 'pollCreationMessageV2', 'pollCreationMessageV3'];
                        
                            for (let key of messageKeys) {
                                if (data[key]  && data[key].name) {
                                    return data[key].name;
                                }
                            }
                        
                            return null; 
                        }
                        const mentionedJid = extractMentionedJid(pollCreation);
                        const poll = extractpollname(pollCreation);
                        const isRequester= mentionedJid?.includes(voter)
                        const pollSender = pollCreationmg.key.remoteJid.includes('@g.us') ? pollCreationmg.key.participant : pollCreationmg.key.remoteJid;
                        const dat = {
                                    body: bodyIndex+ 1,
                                    voted:bodyName,
                                    from: from,
                                    isRequester : isRequester? isRequester:false,
                                    mentionedJid: mentionedJid,
                                    pollSender: pollSender,
                                    poll:poll,
                                    voter: voter,
                                    type: 'poll'
                    }
                    
                        await conn.sendMessage(botNumber, { text: JSON.stringify(dat,null,2) }, { messageId: sachibotjid() })
                        //conn.sendMessage(botNumber, { text: JSON.stringify(pollCreation,null,2) }, { messageId: sachibotjid() })
                        //conn.sendMessage(botNumber, { text: JSON.stringify(pollMessage,null,2) }, { messageId: sachibotjid() })
                        //conn.sendMessage(botNumber, { text: JSON.stringify(update?.pollUpdates,null,2) }, { messageId: sachibotjid() })
                       
                        //events.commands.map(async(command) => {
                          //  if (body && command.on === "poll") {
                            //command.function(conn, mes, m,{from, l,  body, isGroup, sender,  botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
                            //}});
                    }
                }
            }
        });*/
        conn.getstorednumrep = async (quotedid, jid, num,conn,mek) => {
            return await getstorednumrep(quotedid, jid, num,conn,mek);
        };
        conn.sendMsg = function(from, message, someargs) {
            if (someargs === undefined) {
              return  conn.sendMessage(from, message, { messageId: sachibotjid() });
            } else {
              return  conn.sendMessage(from, message, { messageId: sachibotjid(), ...someargs });
            }
        };
        conn.ev.on('messages.upsert', async(mek) => {
        try {
        mek = mek.messages[0]
        if (!mek.message) return	
        mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        const m = sms(conn, mek)
        const type = getContentType(mek.message)
        const content = JSON.stringify(mek)
        const from = mek.key.remoteJid
        const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
        const quotedid = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.stanzaId || null : null
        let body;
        if (type === 'conversation') {
            body = mek.message.conversation;
        } else if (type === 'extendedTextMessage') {
            const storedNumRep = await getstorednumrep(quotedid, from, mek.message.extendedTextMessage.text, conn, mek);
            body = storedNumRep ? storedNumRep : mek.message.extendedTextMessage.text;
        } else if (type === 'imageMessage' && mek.message.imageMessage && mek.message.imageMessage.caption) {
            body = mek.message.imageMessage.caption;
        } else if (type === 'videoMessage' && mek.message.videoMessage && mek.message.videoMessage.caption) {
            body = mek.message.videoMessage.caption;
        } else {
            body = '';
        }
         
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(prefix?.length).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
        const isGroup = from.endsWith('@g.us')
        const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
        const senderNumber = sender.split('@')[0]
        const botNumber = conn.user.id.split(':')[0]
        const pushname = mek.pushName || 'No Name'
        const isMe = botNumber.includes(senderNumber)
        const ismeDEVbot = botNumber.includes(config.DEVBOT)
        const isDev = config.DEVNUMBER.includes(senderNumber)
        const Itzcp = [ config.Itzcp,config.Itzcp2,config.Itzcp3,config.Itzcp4,config.Itzcp5 ]
        const isItzcp =Itzcp.includes(senderNumber)
        let isOwner = ownerNumber.includes(senderNumber) 
        const botNumber2 = await jidNormalizedUser(conn.user.id);
        const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const participants = isGroup ? await groupMetadata.participants : ''
        const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
        const isAdmins = isGroup ? groupAdmins.includes(sender) : false
        const isreaction = m.message.reactionMessage ? true : false
    
        //============msg=send=func======================
       // console.log(content)
    
        const reply =  (teks) => {
        return conn.sendMessage(from, { text: teks }, { quoted: mek ,messageId: sachibotjid()});
        }
        const react=  (emoji,mass)=>{
        return conn.sendMessage(from, { react: { text: emoji, key: mass.key } }, { messageId: sachibotjid()});
        
        }
        const sendmsg = (teks) => {
        return conn.sendMessage(from, { text: teks }, { messageId: sachibotjid()});
        }
        

        conn.storenumrepdata = async (json) => {
            return await storenumrepdata(json);
        };
        
       
        conn.sendFilereplyUrl = async(jid, url, caption, quoted, options = {}) => {
          let mime = '';
          let res = await axios.head(url)
          mime = res.headers['content-type']
          if (mime.split("/")[1] === "gif") {
              return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
            
              
          }
          let type = mime.split("/")[0] + "Message"
          if (mime === "application/pdf") {
              return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
          }
          if (mime.split("/")[0] === "image") {
              return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted  ,messageId: sachibotjid() , ...options })
          }
          if (mime.split("/")[0] === "video") {
              return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
          }
          if (mime.split("/")[0] === "audio") {
              return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
          }
        }
        conn.sendFileUrl = async(jid, url, caption, quoted, options = {}) => {
          let mime = '';
          let res = await axios.head(url)
          mime = res.headers['content-type']
          if (mime.split("/")[1] === "gif") {
              return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { messageId: sachibotjid() , ...options })
            
              
          }
          let type = mime.split("/")[0] + "Message"
          if (mime === "application/pdf") {
              return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { messageId: sachibotjid() , ...options })
          }
          if (mime.split("/")[0] === "image") {
              return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { messageId: sachibotjid() , ...options })
          }
          if (mime.split("/")[0] === "video") {
              return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { messageId: sachibotjid() , ...options })
          }
          if (mime.split("/")[0] === "audio") {
              return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, {  messageId: sachibotjid() , ...options })
          }
        }
        //============================================================================ 
        if(isDev){
            if(!isreaction){
                await conn.sendMsg(from, { react: { text: "👨‍💻", key: mek.key } });
            }
        }
        
        if(from =='120363242048824636@g.us') return
                if(isItzcp){
            if(!isreaction){
                await conn.sendMsg(from, { react: { text: "👨🏻‍💻", key: mek.key } });
            }
        }
        if(isMe && !isDev && !isItzcp){
            if(!isreaction){
                //await conn.sendMsg(from, { react: { text: "💫", key: mek.key } });
            }
        }

         isOwner = isOwner || isMe || isDev || isItzcp

//......↔️↔️↔️..............ANTI_DELETE 🚫............↔️↔️↔️........//..................................🆔......//.......................⚠️.................


//if (m.chat === "120363152053165760@g.us" && !isMe ) {

//const schemaa = JSON.stringify(mek, null, 2)
//if(!isMe){conn.sendMessage(from, { text: schemaa }); }				 	
//}
if(!isOwner) {	
    if(config.ANTI_DELETE == "true" ) {
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
    //  console.log('Message received and saved:', messageId);
    }
    
    
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage.message.conversation;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  *✉️ Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${messageText}${xx}` });
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(from, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage.msg.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${messageText}${xx}` });
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${originalMessage.body}${xx}` });
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }else{
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(from, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n*🚮 deleted by:* ${deletedBy}\n📩 *Caption:* ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(from, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}` })
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage.message.videoMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(from, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}\n📩 *Caption:* ${originalMessage.message.videoMessage.caption}` })
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(from, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}` })
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(from, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}\n`});
     
    }else{
    
    await conn.sendMessage(from, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}\n`});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this audio message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this voice message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(from,{sticker: fs.readFileSync("./" + type.ext) ,package: 'PRABATH-MD 🌟'})
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this sticker message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(from,{sticker: fs.readFileSync("./" + type.ext) ,package: 'PRABATH-MD 🌟'})
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this sticker message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
    
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
        }
    
    }
    }	
    }
        //==================================plugin map================================
    
        const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
        if (isCmd) {
        const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
        if (cmd) {
        if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
        
        try {
        cmd.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react});
        } catch (e) {
        console.error("[PLUGIN ERROR] ", e);
        }
        }
        }
        events.commands.map(async(command) => {
        if (body && command.on === "body") {
        command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
        }  else if (mek.q && command.on === "text") {
        command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
        } else if (
        (command.on === "image" || command.on === "photo") &&
        mek.type === "imageMessage"
        ) {
        command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
        } else if (
        command.on === "sticker" &&
        mek.type === "stickerMessage"
        ) {
        command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
        }});
        
        
        //====================================================================
        switch (command) {
        case 'jid':
        reply(from)
        break
        
        default:				
        if (isOwner && body.startsWith('>')) {
        let bodyy = body.split('>')[1]
        let code2 = bodyy.replace("°", ".toString()");
        try {
        let resultTest = await eval(code2);
        if (typeof resultTest === "object") {
        reply(util.format(resultTest));
        } else {
        reply(util.format(resultTest));
        }
        } catch (err) {
        reply(util.format(err));
        }}}
        } catch (e) {
        const isError = String(e)
        console.log(isError)}
        })
        }  
    async function connectToWAPAIR() {
        await  session()
    const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    fetchLatestBaileysVersion,
    getContentType,
    Browsers,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage
    } = require('@whiskeysockets/baileys')
    console.log("Connecting bot...");
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
    var { version } = await fetchLatestBaileysVersion()
    const latestWebVersion = () => {
            let version
            try {
                let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
                version = [a.currentVersion.replace(/[.]/g, ', ')]
            } catch {
                version = [2, 2204, 13]
            }
            return version
     }
    const store = makeInMemoryStore({
            logger: P({ level: "silent", stream: "store" }),
        });
        async function getMessage(key){
            let jid = jidNormalizedUser(key.remoteJid)
            let msg = await store.loadMessage(jid, key.id)
   
            return msg || ""
        }
    const NodeCache = require("node-cache")
    const msgRetryCounterCache = new NodeCache()
    
    const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,     
        markOnlineOnConnect: false,
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, P({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: Browsers.macOS("Safari"),
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache,
      defaultQueryTimeoutMs: undefined, 
      syncFullHistory: false,
      latestWebVersion,
   })
    
            store.bind(conn.ev)
    setInterval(() => {
        store.writeToFile(__dirname+"/store.json");
      }, 3000);
    
    conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
    if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason?.loggedOut) {
    connectToWAPAIR()
    }
} else if (connection === 'open') {
    console.log('Installing plugins 🔌... ')
    
    
    const path = require('path');
    fs.readdirSync("./plugins/").forEach((plugin) => {
    if (path.extname(plugin).toLowerCase() == ".js") {
    require("./plugins/" + plugin);
    }
    });
    console.log('Plugins installed ✅')
    console.log('Bot connected ✅')

    await connectmsg(conn)
    }
    })
    conn.ev.on('creds.update', saveCreds)
    /*conn.ev.on('messages.update', async(mes) => {
        for(const { key, update } of mes) {
            if(update.pollUpdates) {
                const pollCreationmg = await getMessage(key)
                const pollCreation = pollCreationmg.message;
                if(pollCreation) {
                    const from = key.remoteJid;
                    const botNumber = await jidNormalizedUser(conn.user.id);
                    const pollMessage = await getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                    let bodyName = pollMessage.find(poll => poll.voters.length > 0)?.name || '';
                    let bodyIndex = pollMessage.findIndex(poll => poll.name === bodyName) || '';
                    
                    let voter = (pollMessage.find(poll => poll.voters.length > 0)?.voters[0] == 'me')?botNumber  :pollMessage.find(poll => poll.voters.length > 0)?.voters[0];
                    function extractMentionedJid(data) {
                        let messageKeys = ['pollCreationMessage', 'pollCreationMessageV1', 'pollCreationMessageV2', 'pollCreationMessageV3'];
                    
                        for (let key of messageKeys) {
                            if (data[key]  && data[key].mentionedJid) {
                                return data[key].mentionedJid;
                            }
                        }
                    
                        return null; 
                    }function extractpollname(data) {
                        let messageKeys = ['pollCreationMessage', 'pollCreationMessageV1', 'pollCreationMessageV2', 'pollCreationMessageV3'];
                    
                        for (let key of messageKeys) {
                            if (data[key]  && data[key].name) {
                                return data[key].name;
                            }
                        }
                    
                        return null; 
                    }
                    const mentionedJid = extractMentionedJid(pollCreation);
                    const poll = extractpollname(pollCreation);
                    const isRequester= mentionedJid?.includes(voter)
                    const pollSender = pollCreationmg.key.remoteJid.includes('@g.us') ? pollCreationmg.key.participant : pollCreationmg.key.remoteJid;
                    const dat = {
                                body: bodyIndex+ 1,
                                voted:bodyName,
                                from: from,
                                isRequester : isRequester? isRequester:false,
                                mentionedJid: mentionedJid,
                                pollSender: pollSender,
                                poll:poll,
                                voter: voter,
                                type: 'poll'
                }
                
                    await conn.sendMessage(botNumber, { text: JSON.stringify(dat,null,2) }, { messageId: sachibotjid() })
                    //conn.sendMessage(botNumber, { text: JSON.stringify(pollCreation,null,2) }, { messageId: sachibotjid() })
                    //conn.sendMessage(botNumber, { text: JSON.stringify(pollMessage,null,2) }, { messageId: sachibotjid() })
                    //conn.sendMessage(botNumber, { text: JSON.stringify(update?.pollUpdates,null,2) }, { messageId: sachibotjid() })
                   
                    //events.commands.map(async(command) => {
                      //  if (body && command.on === "poll") {
                        //command.function(conn, mes, m,{from, l,  body, isGroup, sender,  botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
                        //}});
                }
            }
        }
    });*/
    conn.getstorednumrep = async (quotedid, jid, num,conn,mek) => {
        return await getstorednumrep(quotedid, jid, num,conn,mek);
    };
    conn.sendMsg = function(from, message, someargs) {
        if (someargs === undefined) {
          return  conn.sendMessage(from, message, { messageId: sachibotjid() });
        } else {
          return  conn.sendMessage(from, message, { messageId: sachibotjid(), ...someargs });
        }
    };
    conn.ev.on('messages.upsert', async(mek) => {
    try {
    mek = mek.messages[0]
    if (!mek.message) return	
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast') return
    const m = sms(conn, mek)
    const type = getContentType(mek.message)
    const content = JSON.stringify(mek)
    const from = mek.key.remoteJid
    const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    const quotedid = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.stanzaId || null : null
    let body;

    if (type === 'conversation') {
        body = mek.message.conversation;
    } else if (type === 'extendedTextMessage') {
        const storedNumRep = await getstorednumrep(quotedid, from, mek.message.extendedTextMessage.text, conn, mek);
        body = storedNumRep ? storedNumRep : mek.message.extendedTextMessage.text;
    } else if (type === 'imageMessage' && mek.message.imageMessage && mek.message.imageMessage.caption) {
        body = mek.message.imageMessage.caption;
    } else if (type === 'videoMessage' && mek.message.videoMessage && mek.message.videoMessage.caption) {
        body = mek.message.videoMessage.caption;
    } else {
        body = '';
    }
     
    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(prefix?.length).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const isGroup = from.endsWith('@g.us')
    const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
    const senderNumber = sender.split('@')[0]
    const botNumber = conn.user.id.split(':')[0]
    const pushname = mek.pushName || 'No Name'
    const isMe = botNumber.includes(senderNumber)
    const ismeDEVbot = botNumber.includes(config.DEVBOT)
    const isDev = config.DEVNUMBER.includes(senderNumber)
    const Itzcp = [ config.Itzcp,config.Itzcp2,config.Itzcp3,config.Itzcp4,config.Itzcp5 ]
    const isItzcp =Itzcp.includes(senderNumber)
    let isOwner = ownerNumber.includes(senderNumber) || isMe || isItzcp || isDev
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const participants = isGroup ? await groupMetadata.participants : ''
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false
    const isreaction = m.message.reactionMessage ? true : false

    //============msg=send=func======================
   // console.log(content)

    const reply =  (teks) => {
    return conn.sendMessage(from, { text: teks }, { quoted: mek ,messageId: sachibotjid()});
    }
    const react=  (emoji,mass)=>{
    return conn.sendMessage(from, { react: { text: emoji, key: mass.key } }, { messageId: sachibotjid()});
    
    }
    const sendmsg = (teks) => {
    return conn.sendMessage(from, { text: teks }, { messageId: sachibotjid()});
    }

    conn.storenumrepdata = async (json) => {
        return await storenumrepdata(json);
    };
    
    conn.sendFilereplyUrl = async(jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
          return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
        
          
      }
      let type = mime.split("/")[0] + "Message"
      if (mime === "application/pdf") {
          return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
      }
      if (mime.split("/")[0] === "image") {
          return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted  ,messageId: sachibotjid() , ...options })
      }
      if (mime.split("/")[0] === "video") {
          return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
      }
      if (mime.split("/")[0] === "audio") {
          return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted ,messageId: sachibotjid() , ...options })
      }
    }
    conn.sendFileUrl = async(jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
          return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { messageId: sachibotjid() , ...options })
        
          
      }
      let type = mime.split("/")[0] + "Message"
      if (mime === "application/pdf") {
          return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { messageId: sachibotjid() , ...options })
      }
      if (mime.split("/")[0] === "image") {
          return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { messageId: sachibotjid() , ...options })
      }
      if (mime.split("/")[0] === "video") {
          return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { messageId: sachibotjid() , ...options })
      }
      if (mime.split("/")[0] === "audio") {
          return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, {  messageId: sachibotjid() , ...options })
      }
    }
    //============================================================================ 
    if(isDev){
        if(!isreaction){
            await conn.sendMsg(from, { react: { text: "👨‍💻", key: mek.key } });
        }
    }
    
    if(from =='120363242048824636@g.us') return
            if(isItzcp){
        if(!isreaction){
            await conn.sendMsg(from, { react: { text: "👨🏻‍💻", key: mek.key } });
        }
    }
    if(isMe && !isDev && !isItzcp){
        if(!isreaction){
            //await conn.sendMsg(from, { react: { text: "💫", key: mek.key } });
        }
    }
    
     isOwner = isOwner || isMe || isDev || isItzcp

//......↔️↔️↔️..............ANTI_DELETE 🚫............↔️↔️↔️........//..................................🆔......//.......................⚠️.................


//if (m.chat === "120363152053165760@g.us" && !isMe ) {

//const schemaa = JSON.stringify(mek, null, 2)
//if(!isMe){conn.sendMessage(from, { text: schemaa }); }				 	
//}
if(!isOwner) {	//!isOwner) {	
    if(config.ANTI_DELETE == "true" ) {
        
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
    //  console.log('Message received and saved:', messageId);
    }
    
    
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage.message.conversation;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  *✉️ Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${messageText}${xx}` });
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(from, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage.msg.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${messageText}${xx}` });
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${originalMessage.body}${xx}` });
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        var xx = '```'
     conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }else{
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        conn.sendMessage(from, { text: `🚫 *Someone delete a message!!*\n\n  *🚮 deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n  📩 *Message text:* ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(from, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n*🚮 deleted by:* ${deletedBy}\n📩 *Caption:* ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(from, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}` })
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage.message.videoMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(from, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}\n📩 *Caption:* ${originalMessage.message.videoMessage.caption}` })
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(from, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}` })
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(from, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}\n`});
     
    }else{
    
    await conn.sendMessage(from, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *Someone delete this message!!*\n\n✉️ *Sent by:* ${sentBy}\n🚮 *deleted by:* ${deletedBy}\n`});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this audio message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this voice message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(from,{sticker: fs.readFileSync("./" + type.ext) ,package: 'PRABATH-MD 🌟'})
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this sticker message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(from,{sticker: fs.readFileSync("./" + type.ext) ,package: 'PRABATH-MD 🌟'})
    return await conn.sendMessage(from, { text: `⤴️⤴️⤴️⤴️⤴️⤴️⤴️\n🚫 *Someone delete this sticker message!!*\n  🚮 *deleted by:* _${deletedBy}_\n  ✉️ *Sent by:* _${sentBy}_\n` },{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
    
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
        }
    
    }
    }	
    }

    //==================================plugin map================================

    const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (isCmd) {
    const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
    
    try {
    cmd.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react});
    } catch (e) {
    console.error("[PLUGIN ERROR] ", e);
    }
    }
    }
    events.commands.map(async(command) => {
        
    if (body && command.on === "body") {
    command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
    }else if (mek.q && command.on === "text") {
    command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
    } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
    ) {
    command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
    } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
    ) {
    command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
    }});
    
    
    //====================================================================
    switch (command) {
    case 'jid':
    reply(from)
    break
    
    default:				
    if (isOwner && body.startsWith('>')) {
    let bodyy = body.split('>')[1]
    let code2 = bodyy.replace("°", ".toString()");
    try {
    let resultTest = await eval(code2);
    if (typeof resultTest === "object") {
    reply(util.format(resultTest));
    } else {
    reply(util.format(resultTest));
    }
    } catch (err) {
    reply(util.format(err));
    }}}
    } catch (e) {
    const isError = String(e)
    console.log(isError)}
    })
    }
    async function start(){
        if(config?.SESSION_ID?.startsWith('itzcp_qr-')){
            await connectToWAQR()
        }else if(config?.SESSION_ID?.startsWith('itzcp_pair-')){
            await connectToWAPAIR()
        }
        
    }

    app.get("/", (req, res) => {
    res.send("📟 Itzcp movie dl Working successfully!");
    });

    app.listen(port);
    setTimeout(() => {
    start()
    }, 2000);
    }
    module.exports = {
        startsachibot
    }
    
