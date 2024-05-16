const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
const BOTNAME = 'MASTER-X-CYBER|-WA-BOT™';
const FOOTERNAME = '> *Mᴀꜱᴛᴇʀ-X-Cyʙᴇʀ™*';
module.exports = {
MONGODB_URI :process.env.MONGODB_URI === undefined ? 'mongodb+srv://sachintharashan26:9hVStJbuE3uxwRtZ@cluster0.o0ec025.mongodb.net/' : process.env.MONGODB_URI,
SESSION_ID: process.env.SESSION_ID === undefined ? 'itzcp_pair-EvNXnT6Y#HfC_ZSWT04DxxrV_gzUsSr_XPVwSfQO6QwGZ9AnMGy4' : process.env.SESSION_ID,
BOTNAME : BOTNAME,
FOOTERNAME: FOOTERNAME,
WHATSAPP_DEFAULT_SIZE : 1.7,
ANTI_DELETE : process.env.ANTI_DELETE === undefined ? 'true' : process.env.ANTI_DELETE,
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === undefined ? 'false' : process.env.ALWAYS_ONLINE,
MAX_SIZE: process.env.MAX_SIZE === undefined ? '1536': process.env.MAX_SIZE,/*add this in megabytes*/
VERSION: '1.0.1',
ALIVE: `*Hey I Am Alive Now 👋*\n\n*||  How Can Help You?*\n*|| Developer:- MasterX team*\n*|| ᴛyᴩᴇ ".ᴍᴇɴᴜ" ɢᴇᴛ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ*\n\n${FOOTERNAME}`,
LOGO: `https://telegra.ph/file/ec424e85850cbe9409517.jpg`,
DEVNUMBER: '94725881990',
DEVBOT: '94725881990',
CHANNEL: '',
OWNERNUMBER : process.env.OWNERNUMBER === undefined ? '94725881990' : process.env.OWNERNUMBER,
IMAGE_ENHANCE: '', //https://vihangayt.me/tools/enhance?url=
DOWNLOADSAPI: 'https://sachibot-downloads.up.railway.app/',
BOTNUMBER: process.env.BOTNUMBER === undefined ? '94725881990' : process.env.BOTNUMBER,
PREFIX: process.env.PREFIX === undefined ? '.' : process.env.PREFIX,
Itzcp: '94768830907',
Itzcp2: '94765665354',
Itzcp3: '94703221433', 
Itzcp4: '',
Itzcp5:'',
DEVAPIKEY : 'SACHIBOT',
imagenotfound: 'https://telegra.ph/file/da68173c0b453dbd325c7.jpg',
imagesearch: 'https://telegra.ph/file/7bb0c4ae1f5e0c2e523c4.jpg',
imageconnect:'https://telegra.ph/file/e7ef07838846a37731205.jpg',
menulogo: 'https://telegra.ph/file/62b06292fa948db404658.jpg',
};
