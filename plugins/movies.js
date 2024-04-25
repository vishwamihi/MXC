const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, sleep, fetchJson} = require('../lib/functions')
const mg = require('../lib/mg')
const cine = require('../lib/cine');
const sinsub = require('../lib/sinsub');
const  bot = config.BOTNUMBER;
const fg = require('api-dylux');
const axios =require('axios')
const getFileNameFromUrl = (url) => {
  const urlParts = url.split('/');
  const fileNameWithExtension = decodeURIComponent(urlParts[urlParts.length - 1]);
  const lastDotIndex = fileNameWithExtension.lastIndexOf('.');
  const fileNameWithoutExtension = fileNameWithExtension.slice(0, lastDotIndex);
  return fileNameWithoutExtension;
};

const getFileInfo = async (url, options) => {
  try {
      options = options || {};
      const res = await axios({
          method: 'head', // Use 'head' method to retrieve only headers
          url,
          headers: {
              'DNT': 1,
              'Upgrade-Insecure-Request': 1
          },
          ...options
      });
      const convertBytesToGB = (bytes) => {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2); // Convert bytes to GB
    };
    
    // Example usage:
    const fileSizeInBytes = parseInt(res.headers['content-length']);
    const fileSize = convertBytesToGB(fileSizeInBytes) + ' GB'; // Extract file size from content-length header
      const fileName = getFileNameFromUrl(url); // Extract file name from URL
      return { fileSize, fileName };
  } catch (e) {
      console.error(e);
      return null;
  }
};
let downloadingMovie = null;
const { storenumrepdata } = require('../lib/numrepstore')
function formatNumber(num) {
    return String(num).padStart(mg.stringpadstartlimit, '0');
}
function checkSizeAndReply(size) {
    const maxSizeInGB = config.MAX_SIZE / 1024;
    if (size) {
        const unitToGB = {
            "GB": 1,
            "MB": 1 / 1024,
            "KB": 1 / (1024 * 1024),
            "TB": 1024
        };

        let sizeMatch = size.match(/([\d.]+)\s*(GB|MB|KB|TB)/i);
        if (sizeMatch) {
            const numericValue = parseFloat(sizeMatch[1]);
            const unit = sizeMatch[2].toUpperCase();
            const sizeInGB = numericValue * unitToGB[unit];

            if (sizeInGB <= maxSizeInGB && sizeInGB < config.WHATSAPP_DEFAULT_SIZE) {
                return `True`;
            } else {
                if (sizeInGB > 1.5) {
                    return `You can only download files smaller than 1.5GB on WhatsApp. (USING BOT)`;
                } else {
                    return `Maximum allowed size is ${maxSizeInGB} GB. Please choose a smaller option.`;
                }
            }
        } else {
            const numericValue = parseFloat(size);
            if (numericValue >= 0 && numericValue <= 10) {
                const sizeInGB = numericValue * unitToGB['GB'];
                if (sizeInGB <= maxSizeInGB && sizeInGB < config.WHATSAPP_DEFAULT_SIZE) {
                    return `True`;
                } else {
                    return `Maximum allowed size is ${maxSizeInGB} GB. Please choose a smaller option.`;
                }
            } else if (numericValue > 10 && numericValue <= 1024) {
                const sizeInGB = numericValue * unitToGB['MB'];
                if (sizeInGB <= maxSizeInGB && sizeInGB < config.WHATSAPP_DEFAULT_SIZE) {
                    return `True`;
                } else {
                    return `Maximum allowed size is ${maxSizeInGB} GB. Please choose a smaller option.`;
                }
            } else {
                return `Size format not recognized: ${size}`;
            }
        }
    } else {
        return `Request expired!! Please create new request for that movie`;
    }
}
async function nosearchdetails(conn,chat,mek,q,reply){
    let message = `*${q} Results Not Found* 🤷‍♂️`;
                  
    return  await reply(message)
}

const parseInput = async (text, chats) => {
    let input;
    let me;
    let emailRegex = /[\w.-]+@[^\s]+/g;
    let chat = text.match(emailRegex) || []; 
    let words = text.split(/\s+/).filter(word => !word.match(emailRegex));
    if (words.length === 0) {
      input = false;
    } else {
      input = words.join(" ");
    }
    if (chat.length === 0) { 
      chat.push(chats);
      me = false;
    } else {
      me = chats;
    }
    return {
      input,
      chat,
      me
    };
  };

async function sea(conn,chat,mek,q,reply,type,remotejids){
    try{
          let respon = await fetchJson(`${sinsub.api}${sinsub.sinsubsearch}${encodeURIComponent(q)}&${sinsub.apikey}${config.DEVAPIKEY}`);
          data = respon?.movied;
          const response = await fetchJson(`${cine.api}${cine.cinesearch}${encodeURIComponent(q)}&${sinsub.apikey}${config.DEVAPIKEY}`);
          let heading;
          if(type === 'TVShow'){
            heading = `*×-×-𝚃𝚅 𝚂𝙷𝙾𝚆 𝚂𝙴𝙰𝚁𝙲𝙷 𝚂𝚈𝚂𝚃𝙴𝙼-×-×*`+
            `\n`+
            `\n`
           
          } else if(type === 'Movie'){
        
            heading = `*×-×-×𝙼𝙾𝚅𝙸𝙴 𝚂𝙴𝙰𝚁𝙲𝙷 𝚂𝚈𝚂𝚃𝙴𝙼×-×-×*`+
            `\n`+
            `\n`
              
              }
         let formattedText = `${heading}`
          let moviesData;
          let dataAfterSachibot ;
          let numrep = []
          let comd;
          if(type === 'TVShow'){
            comd = 'tv'
          }else if(type === 'Movie'){
            comd = 'mv'
          }
          if (data?.length > 0) {
              moviesData = data.filter(movie => movie.type.replace(' ','').toLowerCase().trim() === type.replace(' ','').toLowerCase().trim() );
              if(moviesData.length > 0){
                formattedText += `> 「 Sinhalasub.lk 」`+
                `\n`+
                `\n`+
                `*╭──────────●●►*` +
                `\n`
                moviesData.forEach((movie,index) => {
                  formattedText += ` *|* ${formatNumber(index + 1)} *|❮* ${movie.title}`+
                  `\n`
                  numrep.push(`.${comd} ${movie.link} ${remotejids}`)
                  })
                }else{
                  formattedText += `> 「 Sinhalasub.lk 」`+
                  `\n`+
                  `\n`+
                  `*╭──────────●●►*`+
                  `\n`+
                  `*|* No ${type}s found for this on Sinhalasub.lk`+
                  `\n`
                  }
                }else{
                  formattedText += `> 「 Sinhalasub.lk 」`+
                  `\n`+
                  `\n`+
                  `*╭──────────●●►*`+
                  `\n`+
                  `*|* No ${type}s found for this on Sinhalasub.lk`+
                  `\n`
                  }
      
                  formattedText += `*╰───────────●●►*`+
                  `\n`+
                  `\n`
          if (response?.data?.data?.data?.length > 0) {
              const startIndex = moviesData.length + 1;
              dataAfterSachibot = response.data.data.data.filter(movie =>movie.type.replace(' ','').toLowerCase().trim() === type.replace(' ','').toLowerCase().trim());
              if(dataAfterSachibot && dataAfterSachibot.length > 0) {
                formattedText += `> 「 Cinesubz.co 」`+
                `\n`+
                `\n`+
                `*╭──────────●●►*`+
                `\n`
                dataAfterSachibot.forEach((movie,index) => {
                  formattedText += ` *|* ${formatNumber(startIndex +index )} *|❮* ${movie.title}`+
                  `\n`
                  numrep.push(`.${comd} ${movie.link} ${remotejids}`)
                               })
                            }else{
                  formattedText += `> 「 Cinesubz.co 」`+
                  `\n`+
                  `\n`+
                  `*╭──────────●●►*`+
                  `\n`+
                  `*|* No ${type}s found for this on cinesubz.co`+
                  `\n`
                            }
                          }else{
                            formattedText += `> 「 Cinesubz.co 」`+
                            `\n`+
                            `\n`+
                            `*╭──────────●●►*`+
                            `\n`+
                            `*|* No ${type}s found for this on cinesubz.co`+
                            `\n`     
                             }
      formattedText += `*╰───────────●●►*`+
      `\n`+
      `\n`
          formattedText += `${config.FOOTERNAME}`
          if ((moviesData && moviesData.length > 0) || (dataAfterSachibot && dataAfterSachibot.length > 0)) {
    
             const where = mek?.key?.remoteJid
             const mydata = await getBuffer(config.imagesearch);
             
               const mass = await conn.sendMessage(where, { image: mydata, caption: formattedText }, { quoted: mek });
               const jsonmsg = {
                key : mass.key,
                numrep,
                method : 'nondecimal'
               }
               
               await storenumrepdata(jsonmsg)
               await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
            
             await sleep(1*1000)
            } else {
              const where = mek?.key?.remoteJid
              await nosearchdetails(conn, where, mek, type, reply);
          }
        }catch(e){
          console.log(e)
        }
      
      }

      async function movi(conn,chat,mek,q,reply,remotejids) {
        if (q.startsWith(cine.site)){
        
            const cineresponse = await fetchJson(`${cine.api}${cine.cinemovie}${q}&${sinsub.apikey}${config.DEVAPIKEY}`);
            
            if(cineresponse?.result?.data){
             const dataAfterSachibot = cineresponse.result.data; 
          
              const title = dataAfterSachibot?.mainDetails?.maintitle
        
              const date = dataAfterSachibot?.mainDetails?.dateCreated;
              const country = dataAfterSachibot?.mainDetails?.country;
              const runtime = dataAfterSachibot?.mainDetails?.runtime;
              const director = dataAfterSachibot?.moviedata?.director;
              let cot = `*×-×-×𝙼𝙾𝚅𝙸𝙴 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁×-×-×*`+
              `\n`+
              `\n`+
              `*╭───「 ᴍᴏᴠɪᴇ-ɪɴꜰᴏ 」───●●►*`+`\n`+
              ` *|* *⭕ : ${title}*`+`\n`+
              ` *|* *📆 𝚁𝚎𝚕𝚎𝚊𝚜𝚎 𝙳𝚊𝚝𝚎 : ${date}*`+`\n`+
              ` *|* *🌎 𝙲𝚘𝚞𝚗𝚝𝚛𝚢 : ${country}*`+`\n`+
              ` *|* *🖇️ 𝙼𝚘𝚟𝚒𝚎 :* ${q}`+`\n`+
              ` *|* *⏰ 𝚁𝚞𝚗 𝚃𝚒𝚖𝚎 : ${runtime}*`+`\n`+
              ` *|* *🎥 𝙳𝚒𝚛𝚎𝚌𝚝𝚘𝚛 : ${director}*`+`\n`+
              `*╰───────────●●►*`+
              `\n`+
              `\n`+
              `*Please select the quality you wants to download by replying these numbers.*`+
              `\n`+
              `\n`+
              `*${formatNumber(1)} |❮* Informations`+`\n`+
              `*${formatNumber(2)} |❮* Images`+
              `\n`+
              `\n`;
             let numrep = []
             numrep.push(`.mvinfo ${q} ${remotejids}`) 
        numrep.push(`.mvimages ${q} ${remotejids}`) 
          const img = dataAfterSachibot?.mainDetails?.imageUrl ? config.IMAGE_ENHANCE+dataAfterSachibot?.mainDetails?.imageUrl : mg.imagenotfound;
          const downloads = dataAfterSachibot?.dllinks.directDownloadLinks
          downloads.forEach((download, index) => {
          cot += `*${formatNumber(index + 3)} |❮* ${download.quality} (${download.size})`+
          `\n`; 
          numrep.push(`.dlmovie ${download.link} ${remotejids}`)
          });
          cot += `\n`+
          `${config.FOOTERNAME}`; 
        const where = mek?.key?.remoteJid
        const mydata = await getBuffer(img);
        
          const mass = await conn.sendMessage(where, { image: mydata, caption: cot }, { quoted: mek });
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }
           await storenumrepdata(jsonmsg)
           await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
        
        await sleep(1*1000)
        return true;
        } else {
          const where = mek?.key?.remoteJid
            await  nosearchdetails(conn,where,mek,'Movie',reply)
          }
          
        } else if (q.startsWith(sinsub.site)){
          const response = await fetchJson(`${sinsub.api}${sinsub.sinsubmovie}${q}&${sinsub.apikey}${config.DEVAPIKEY}`)
            const parsedResult = response.movied;
            
                
            if(parsedResult){
            const title = parsedResult.title;
            const runtime = parsedResult.runtime;
            const date = parsedResult.date;
            const imageUrls = parsedResult.imageUrls;
            const selectedimg =imageUrls[0]? config.IMAGE_ENHANCE+imageUrls[0]: mg.imagenotfound;
            const country = parsedResult.country;
            let director = parsedResult.cast.find(actor => actor.character === 'Director')? parsedResult.cast.find(actor => actor.character === 'Director').actorName : 'No Information';
            let downloads =[]                        
            if(parsedResult.links){                   
              downloads = parsedResult.links?.download;                                      
            }else if(parsedResult.dl){                   
              downloads = parsedResult.dl
            }
            let cot = `*×-×-×𝙼𝙾𝚅𝙸𝙴 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁×-×-×*`+
            `\n`+
            `\n`+
            `*╭───「 ᴍᴏᴠɪᴇ-ɪɴꜰᴏ 」───●●►*`+`\n`+
            ` *|* *⭕ : ${title}*`+`\n`+
            ` *|* *📆 𝚁𝚎𝚕𝚎𝚊𝚜𝚎 𝙳𝚊𝚝𝚎 : ${date}*`+`\n`+
            ` *|* *🌎 𝙲𝚘𝚞𝚗𝚝𝚛𝚢 : ${country}*`+`\n`+
            ` *|* *🖇️ 𝙼𝚘𝚟𝚒𝚎 :* ${q}`+`\n`+
            ` *|* *⏰ 𝚁𝚞𝚗 𝚃𝚒𝚖𝚎 : ${runtime}*`+`\n`+
            ` *|* *🎥 𝙳𝚒𝚛𝚎𝚌𝚝𝚘𝚛 : ${director}*`+`\n`+
            `*╰───────────●●►*`+`\n`+
            `\n`+
            `\n`+
            `*Please select the quality you wants to download by replying these numbers.*`+
            `\n`+
            `\n`+
            `*${formatNumber(1)} |❮* Informations`+`\n`+
            `*${formatNumber(2)} |❮* Images`+
            `\n`+
            `\n`;
      
        let numrep=[]
        numrep.push(`.mvinfo ${q} ${remotejids}`) 
        numrep.push(`.mvimages ${q} ${remotejids}`) 
        if (downloads && downloads?.length > 0) {         
            downloads.forEach((download, index) => {         
              if (download && download.link) {      
              cot += `*${formatNumber(index + 3)} |❮* ${download.quality} (${download.size})`+
              `\n`;    
              numrep.push(`.dlmovie ${download.link} ${remotejids}`)          
              }         
            });         
          
          }
          cot += `\n`+
          `${config.FOOTERNAME}`; 
         const where = mek?.key?.remoteJid
         const mydata = await getBuffer(selectedimg);
        
           const mass = await conn.sendMessage(where, { image: mydata, caption: cot }, { quoted: mek });
           const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }
           await storenumrepdata(jsonmsg)
           await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
        
         await sleep(1*1000)
         return true;
            }else {
              const where = mek?.key?.remoteJid
                await  nosearchdetails(conn,where,mek,'Movie',reply)
              }
        
        }
    }
    function convertToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}
    async function sendinfo(conn,chat,mek,type,reply,q){
      if (q.startsWith(cine.site)){
      if(type ==='tvshow'){
          const response = await fetchJson(`${cine.api}${cine.cinetvshow}${q}`);
        
      const showInfo = response.result.data.mainDetails;
      const cast= response.result.data.moviedata;
      const actorNames = cast.castDetails.cast.map(actor => actor.actor.name).join(", ");
      const output = `☘️ *Tιтle :${showInfo.maintitle}*`+`\n`+
      `\n`+
      `📕 *Gᴇɴʀᴇs ➠ ${showInfo.genres.join(", ")}*`+`\n`+
      `📖 *Sᴜʙᴛɪᴛʟᴇ ➠ Sinhala*`+`\n`+
      `🎥 *Dɪʀᴇᴄᴛᴏʀ ➠ ${cast.castDetails.creator.name}*`+`\n`+
      `💃 *Cᴀꜱᴛ ➠ ${actorNames}*`+`\n`+
      `\n`+
      `${config.FOOTERNAME}`;
      const img = showInfo?.imageUrl  ? showInfo.imageUrl : mg.imagenotfound;
      const where = mek?.key?.remoteJid
      if(chat?.length === 1 && chat[0] === where){
        const mass = await conn.sendMessage(where , { image: {url : img}, caption: output }, { quoted: mek });
        await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
        
      }else{
        await Promise.all(chat.map(async (c) => {
          const mass = await conn.sendMessage(c , { image: {url : img}, caption: output });
           await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
          
      }));
      }
      
      }else if(type === 'movie'){
          const response = await fetchJson(`${cine.api}${cine.cinemovie}${q}`);
      
              const movie = response.result.data;
      const castList = movie.moviedata.cast.map(actor => `${actor.name}`).join(", ");
      const output = `☘️ *Tιтle :${movie.mainDetails.maintitle}*`+`\n`+
      `\n`+
      `🌎 *Cᴏᴜɴᴛʀʏ ➠ ${movie.mainDetails.country}*`+`\n`+
      `📆 *Rᴇʟᴇᴀꜱᴇ ➠ ${movie.mainDetails.dateCreated}*`+`\n`+
      `📕 *Gᴇɴʀᴇs ➠ ${movie.mainDetails.genres.join(", ")}*`+`\n`+
      `📖 *Sᴜʙᴛɪᴛʟᴇ ➠ Sinhala*`+`\n`+
      `⏰ *Rᴜɴᴛɪᴍᴇ ➠ ${convertToHoursAndMinutes(parseInt(movie.mainDetails.runtime))}*`+`\n`+
      `\n`+
      `💃 *Cᴀꜱᴛ ➠ ${castList}*`+`\n`+
      `\n`+
      `${config.FOOTERNAME}`;
      
      const img = movie?.mainDetails?.imageUrl ? movie.mainDetails.imageUrl : mg.imagenotfound;
      const where = mek?.key?.remoteJid
      if(chat?.length === 1 && chat[0] === where){
        const mass = await conn.sendMessage(where , { image: {url : img}, caption: output }, { quoted: mek });
        await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
        
      }else{
        await Promise.all(chat.map(async (c) => {
          const mass = await conn.sendMessage(c , { image: {url : img}, caption: output });
           await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
          
      }));
      }
           }
      
      }else if (q.startsWith(sinsub.site)){
          if(type ==='tvshow'){
            let response = await fetchJson(`${sinsub.api}${sinsub.sinsubtvshow}${q}?${sinsub.apikey}${config.DEVAPIKEY}`);
            response = response.movied;
              
                        const showInfo = response;
                        const actorNames = showInfo.cast.map(actor => actor.actorName).join(", ");
      const output = `☘️ *Tιтle :${showInfo.title}*`+`\n`+
      `\n`+
      `🎥 *Dɪʀᴇᴄᴛᴏʀ ➠ ${showInfo.cast[0].actorName}*`+`\n`+
      `📖 *Sᴜʙᴛɪᴛʟᴇ ➠ Sinhala*`+`\n`+
      `💃 *Cᴀꜱᴛ ➠ ${actorNames}*`+`\n`+
      `\n`+
      `${config.FOOTERNAME}`;
      const img =  showInfo?.imageURLs[0] ? config.IMAGE_ENHANCE+showInfo.imageURLs[0].replace('/w300/','/original/') : mg.imagenotfound;
      
      const where = mek?.key?.remoteJid
      if(chat?.length === 1 && chat[0] === where){
        const mass = await conn.sendMessage(where , { image: {url : img}, caption: output }, { quoted: mek });
        await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
        
      }else{
        await Promise.all(chat.map(async (c) => {
          const mass = await conn.sendMessage(c , { image: {url : img}, caption: output });
           await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
          
      }));
      }
          }else if(type === 'movie'){
            let response = await fetchJson(`${sinsub.api}${sinsub.sinsubmovie}${q}?${sinsub.apikey}${config.DEVAPIKEY}`);
               response = response.movied;
      
                  const movieInfo = response //.movied;
                  const castList = movieInfo.cast.map(actor => `${actor.actorName}`).join(", ");
                  
          const imageUrls = movieInfo.imageUrls;
      const output = `☘️ *Tιтle :${movieInfo.title}*`+`\n`+
      `\n`+
      `🌎 *Cᴏᴜɴᴛʀʏ ➠ ${movieInfo.country}*`+`\n`+
      `📆 *Rᴇʟᴇᴀꜱᴇ ➠ ${movieInfo.date}*`+`\n`+
      `📖 *Sᴜʙᴛɪᴛʟᴇ ➠ Sinhala*`+`\n`+
      `📕 *Gᴇɴʀᴇs ➠ ${movieInfo.genres.join(", ")}*`+`\n`+
      `⏰ *Rᴜɴᴛɪᴍᴇ ➠ ${convertToHoursAndMinutes(parseInt(movieInfo.runtime))}*`+`\n`+
      `🎥 *Dɪʀᴇᴄᴛᴏʀ ➠ ${movieInfo.cast[0].actorName}*`+`\n`+
      `\n`+
      `💃 *Cᴀꜱᴛ ➠ ${castList}*`+`\n`+
      `\n`+      
      `${config.FOOTERNAME}`;
      const img = imageUrls[0] ? config.IMAGE_ENHANCE+imageUrls[0]: mg.imagenotfound;
      
      const where = mek?.key?.remoteJid
      if(chat?.length === 1 && chat[0] === where){
        const mass = await conn.sendMessage(where , { image: {url : img}, caption: output }, { quoted: mek });
        await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
        
      }else{
        await Promise.all(chat.map(async (c) => {
          const mass = await conn.sendMessage(c , { image: {url : img}, caption: output });
           await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
          
      }));
      }
               }
          }
          
      
      }
    async function tvsh(conn, chat, mek, q, reply,remotejids) {
      let numrep =[]
      if(q.startsWith(cine.site)){
          const response = await fetchJson(`${cine.api}${cine.cinetvshow}${q}&${sinsub.apikey}${config.DEVAPIKEY}`);
    
          if(response?.result?.data){
            const dataAfterSachibot = response.result.data; 
             
          const mainDetails = dataAfterSachibot?.mainDetails;
          const episodesDetails = dataAfterSachibot?.episodesDetails;
          const img = mainDetails?.imageUrl ? config.IMAGE_ENHANCE+mainDetails?.imageUrl: mg.imagenotfound;
            const title = mainDetails?.maintitle
            const seasonscount =  episodesDetails?.length
            const seasons = episodesDetails.map((season, index) => {
              const seasonNumber = formatNumber(index + 1); 
              const seasonNumber2 = formatNumber(index + 2); 
              numrep.push(`${index+2}.1 .allepies ${q} ${remotejids}`)
              const episodes = season.episodes.map(episode => {
                  const episodeNumberParts = episode.number.split(' - ')
                  const formattedNumber =  formatNumber(parseInt(episodeNumberParts[0].trim())+1)+'.'+formatNumber(parseInt(parseInt(episodeNumberParts[1].trim())+1))
                  numrep.push(`${parseInt(episodeNumberParts[0].trim())+1 +'.'+parseInt(parseInt(episodeNumberParts[1].trim())+1)} .ep ${episode.url} ${remotejids}`)
                  return `*${formattedNumber} |❮* ${episode.title}`;
              }).join("\n");
              return `> *──「 Season ${seasonNumber} 」──*`+`\n`+
              `*${seasonNumber2}.01 |❮* All Episodes`+`\n`+
              `${episodes}`+`\n`;
          }).join("\n");
          
          const output = `*×-×-×𝚃𝚅 𝚂𝙷𝙾𝚆 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁×-×-×*`+`\n`+
          `\n`+
    `*╭───「 ᴛᴠ ꜱʜᴏᴡ ɪɴꜰᴏ 」───●●►*`+`\n`+
    ` *|* *⭕ :* ${title}` + `\n`+
    ` *|* *📌 𝚂𝚎𝚊𝚜𝚘𝚗𝚜 :* ${seasonscount}` + `\n`+
    ` *|* *🖇️ 𝚃𝚟𝚂𝚑𝚘𝚠 :* ${q}` + `\n`+
    `*╰───────────●●►*` + `\n`+
       `\n`+   
    `*Please select the episodes you want to download by replying these numbers*`+`\n`+
    `\n`+
    `*01.01 |❮* Informations`+`\n`+
    `*01.02 |❮* Images`+`\n`+
    `\n`+   
    `${seasons}`+  
    `\n`+   
    `${config.FOOTERNAME}`;
          numrep.push(`1.1 .mvinfo ${q} ${remotejids}`)
          numrep.push(`1.2 .mvimages ${q} ${remotejids}`)
          const where = mek?.key?.remoteJid
          const mydata = await getBuffer(img);
         
            const mass = await conn.sendMessage(where, { image: mydata, caption: output }, { quoted: mek });
            const jsonmsg = {
             key : mass.key,
             numrep,
             method : 'decimal'
            }
            await storenumrepdata(jsonmsg)
            await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
         
          await sleep(1*1000)
          return true;
          
          
          }else {
            await  nosearchdetails(conn,chat,mek,'TV Show',reply) 
            return true;  
          }
      } else if (q.startsWith(sinsub.site)){
        
        const response = await fetchJson(`${sinsub.api}${sinsub.sinsubtvshow}${q}&${sinsub.apikey}${config.DEVAPIKEY}`);
          const data = response.movied;
      if(data){
          function formatEpisode(episode) {
              const episodeNumberParts = episode.number.split(' - ');
              const formattedNumber =  formatNumber(parseInt(episodeNumberParts[0].trim())+1)+'.'+formatNumber(parseInt(parseInt(episodeNumberParts[1].trim())+1))
              
                  numrep.push(`${parseInt(episodeNumberParts[0].trim())+1 +'.'+parseInt(parseInt(episodeNumberParts[1].trim())+1)} .ep ${episode.link} ${remotejids}`)
                  return `*${formattedNumber} |❮* ${episode.title}`;
          }
          
          function formatSeason(season, index) {
              const episodes = season.episodes.map(formatEpisode).join('\n');
              const seasonNumber = formatNumber(index + 1); 
              const seasonNumber2 = formatNumber(index + 2); 
              numrep.push(`${index+2}.1 .allepies ${q} ${remotejids}`)
              return `> *──「 Season ${seasonNumber} 」──*`+`\n`+
              `*${seasonNumber2}.01 |❮* All Episodes`+`\n`+
              `${episodes}`+`\n`;
          }
          
          function formatData(data) {
              const seasons = data.seasons.map(formatSeason).join('\n');
              const title = data.title
              const seasonscount = data.seasonsCount
              numrep.push(`1.1 .mvinfo ${q} ${remotejids}`)
              numrep.push(`1.2 .mvimages ${q} ${remotejids}`)
              return `*×-×-×𝚃𝚅 𝚂𝙷𝙾𝚆 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁×-×-×*`+`\n`+
              `\n`+
        `*╭───「 ᴛᴠ ꜱʜᴏᴡ ɪɴꜰᴏ 」───●●►*`+`\n`+
        ` *|* *⭕ :* ${title}` + `\n`+
        ` *|* *📌 𝚂𝚎𝚊𝚜𝚘𝚗𝚜 :* ${seasonscount}` + `\n`+
        ` *|* *🖇️ 𝚃𝚟𝚂𝚑𝚘𝚠 :* ${q}` + `\n`+
        `*╰───────────●●►*` + `\n`+
           `\n`+   
        `*Please select the episodes you want to download by replying these numbers*`+`\n`+
        `\n`+
        `*01.01 |❮* Informations`+`\n`+
        `*01.02 |❮* Images`+`\n`+
        `\n`+   
        `${seasons}`+
        `\n`+    
        `${config.FOOTERNAME}`;
        
          }
          
          const cot = formatData(data);
          
          const selectedimg = data.imageURLs[0] ? config.IMAGE_ENHANCE+data.imageURLs[0].replace('/w300/','/original/'): mg.imagenotfound;
          
          const where = mek?.key?.remoteJid
          const mydata = await getBuffer(selectedimg);
         
            const mass = await conn.sendMessage(where, { image: mydata, caption: cot }, { quoted: mek });
            const jsonmsg = {
             key : mass.key,
             numrep,
             method : 'decimal'
            }
            await storenumrepdata(jsonmsg)
            await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
         
          await sleep(1*1000)
          return true;
      
      } else{
          await  nosearchdetails(conn,chat,mek,'TV Show',reply)
          return true;
      }
      }
        
      
      }


    const moviesend = async (reply,title, caption, url, conn, mek, chats) => {
        const where = mek?.key?.remoteJid
      
      if (downloadingMovie !== null) {
        const v = '`'
      const tete = `──────────────────────────`+`\n`+
      `${v}Another movie is downloading, and try again after it's uploaded${v}❗❗`+`\n`+
      `film link you request:- `+
      `${url}`+
      `\n`+
      `\n`+
      `currently downloading👇`+
      `\n`+
      `\n`+
      `*"${downloadingMovie.title}"*`+`\n`+
      `${downloadingMovie.url}`+`\n`+
      `──────────────────────────`+`\n`+
      `${config.FOOTERNAME}`
          reply(tete);
          return true;
        }
        let se = {}
        downloadingMovie = { title, url };
        if(config.DOWNLOADSAPI !== ''){
      se = await fetchJson(`${config.DOWNLOADSAPI}${bot}/downloads?jidlist=${chats.join(', ')}&url=${url}&title=${title}&caption=${caption}&${sinsub.apikey}${config.DEVAPIKEY}`);  
        } 
        if (url !== undefined &&url!== null) {
      
        if(!url.startsWith('https://mega.nz/file/')){
     
       try{
        const mydata = await getBuffer(url);
        const { default: fileType } = await import('file-type');
        const type = await fileType.fromBuffer(mydata);
        const  mime=  type ? type.mime : 'video/mp4';
        const mimeType = require('mime-types');
      let ext = mimeType.extension(mime) ;
      
      if(chats?.length === 1 && chats[0] === where){
        const mass = await conn.sendMessage(where, { document: mydata, mimetype: mime, fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~'+title + '.'+ext, caption: caption }, { quoted: mek });
        await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
        if(config.DOWNLOADSAPI !== ''){
         const indexNumber =  se.index
         const sen = await fetchJson(`${config.DOWNLOADSAPI}${bot}/download?index=${indexNumber}&jid=${where}&done=true&target=true&${sinsub.apikey}${config.DEVAPIKEY}`);   

      }
      }else{
        await Promise.all(chats.map(async (chat) => {
          const mass = await conn.sendMessage(chat, { document: mydata, mimetype: mime, fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~'+title + '.'+ext, caption: caption });
           await conn.sendMessage(chat, { react: { text: "📽️", key: mass.key } });
           if(config.DOWNLOADSAPI !== ''){
            const indexNumber =  se.index
            const sen = await fetchJson(`${config.DOWNLOADSAPI}${bot}/download?index=${indexNumber}&jid=${chat}&done=true&target=true&${sinsub.apikey}${config.DEVAPIKEY}`);   
      }
      }));
      }
      }catch(e){
        reply("*Sorrry!! I can't download this movie fom this website, because there is fetch error*\n\nMovie Url : "+url)
        if(config.DOWNLOADSAPI !== ''){
          const indexNumber =  se.index
          await Promise.all(chats.map(async (chat) => {
            const sen = await fetchJson(`${config.DOWNLOADSAPI}${bot}/download?index=${indexNumber}&jid=${chat}&done=true&target=true&${sinsub.apikey}${config.DEVAPIKEY}`);   
        }))
            }
       }
        }else if(url.startsWith('https://mega.nz/file/')){
          try{
      var file = await File.fromURL(url)
      var mdata = await file.downloadBuffer() 
      const type = await fileType.fromBuffer(mdata);
      const  mime=  type ? type.mime : 'video/mp4';
        const mimeType = require('mime-types');
      let ext = mimeType.extension(mime) ;
      
      if(chats?.length === 1 && chats[0] === where){
        const mass = await conn.sendMessage(where, { document: mdata, mimetype: mime, fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~'+title + '.'+ext, caption: caption }, { quoted: mek });
        await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
        if(config.DOWNLOADSAPI !== ''){
         const indexNumber =  se.index
         const sen = await fetchJson(`${config.DOWNLOADSAPI}${bot}/download?index=${indexNumber}&jid=${where}&done=true&target=true&${sinsub.apikey}${config.DEVAPIKEY}`);   

      }
      }else{
          await Promise.all(chats.map(async (chat) => {
            const mass = await conn.sendMessage(chat, { document: mdata, mimetype: mime, fileName: '|ᴍᴀꜱᴛᴇʀ-x-ᴄyʙᴇʀ|~'+title + '.'+ ext, caption: caption });
              await conn.sendMessage(chat, { react: { text: "📽️", key: mass.key } });
             if(config.DOWNLOADSAPI !== ''){
              const indexNumber =  se.index
              const sen = await fetchJson(`${config.DOWNLOADSAPI}${bot}/download?index=${indexNumber}&jid=${chat}&done=true&target=true&${sinsub.apikey}${config.DEVAPIKEY}`);   
        }
        }))
      }
      }catch(e){
        reply("*Sorrry!! I can't download this movie fom this website, because there is fetch error*\n\nMovie Url : "+url)
        if(config.DOWNLOADSAPI !== ''){
          const indexNumber =  se.index
          await Promise.all(chats.map(async (chat) => {
            const sen = await fetchJson(`${config.DOWNLOADSAPI}${bot}/download?index=${indexNumber}&jid=${chat}&done=true&target=true&${sinsub.apikey}${config.DEVAPIKEY}`);   
        }))
            }
       }
        }
        }
        downloadingMovie = null;
        await sleep(30*1000)
        return true;
      };

      async function episo(conn,chat,mek,q,reply,remotejids) {
        let numrep= []
        if(q.startsWith(cine.site)){
        const response = await fetchJson(`${cine.api}${cine.cineepisode}${q}&${sinsub.apikey}${config.DEVAPIKEY}`);
    
           if(response?.result?.data){
           const dataAfterSachibot = response?.result?.data; 
            const title = dataAfterSachibot?.mainDetails?.title
            const regex = /(\d+)x(\d+)/;
            const match = q.match(regex);
            let seasonnum='';
            let epinum='';
    
            if (match && match.length >= 3) {
                seasonnum = match[1];
                epinum = match[2];
               
            }
    let cot = `*╭───「 ᴇᴩɪꜱᴏᴅᴇ ɪɴꜰᴏ 」───●●►*`+`\n`+
    `*|* *⭕ :* ${title}`+`\n`+
    `*|* *📌 𝚂𝚎𝚊𝚜𝚘𝚗 :* ${seasonnum}`+`\n`+
    `*|* *📽️ 𝙴𝚙𝚒𝚜𝚘𝚍𝚎 :* ${epinum}`+`\n`+
    `*|* *🖇️ 𝙻𝚒𝚗𝚔 :* ${q}`+`\n`+
    `*╰───────────●●►*`+`\n`+
    `▫️ *With Sinhala Subtitles*`+`\n`+
    `\n`+
    `*Please select the quality you wants to download by replying these numbers.*`+`\n`+
    `\n`;
      
     const imageUrls = dataAfterSachibot?.imageUrls;
      //reply(JSON.stringify(response,null,2))
      const img = imageUrls[0]? config.IMAGE_ENHANCE+imageUrls[0].replace('\n','').trim() : mg.imagenotfound;
      const downloads = dataAfterSachibot?.dllinks?.directDownloadLinks
      downloads.forEach((download, index) => {
        cot += `*${formatNumber(index + 1)} |❮* ${download.quality} (${download.size})\n`;
        numrep.push(`.dlmovie ${download.link} ${remotejids}`)
      });
      cot += `\n`+
  `${config.FOOTERNAME}`;
      
      const where = mek?.key?.remoteJid
      const mydata = await getBuffer(img);
     
        const mass = await conn.sendMessage(where, { image: mydata, caption: cot }, { quoted: mek });
        const jsonmsg = {
         key : mass.key,
         numrep,
         method : 'nondecimal'
        }
        await storenumrepdata(jsonmsg)
        await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
     
      await sleep(1*1000)
      return true;
      
        }else {
        await  nosearchdetails(conn,chat,mek,'Episode',reply)  
        return true;  
       }
    }else if(q.startsWith(sinsub.site)){
      const response = await fetchJson(`${sinsub.api}${sinsub.sinsubepisode}${q}&${sinsub.apikey}${config.DEVAPIKEY}`);
        const episodes = response.movied;
        const response2 = await fetchJson(`${sinsub.api}${sinsub.sinsuballdl}${q}&${sinsub.apikey}${config.DEVAPIKEY}`);
        const data2 = response2.movied
        if(episodes && data2){
            const data = episodes.find(episode => episode.episodeLink === q);
            const img = data.imageUrls[0]? config.IMAGE_ENHANCE+data.imageUrls[0]: mg.imagenotfound;
            let title = data.episodeTitle
           
      let seasonnum= data.seasonNumber
      let epinum =data.episodeNumber
      let cot = `*╭───「 ᴇᴩɪꜱᴏᴅᴇ ɪɴꜰᴏ 」───●●►*`+`\n`+
      `*|* *⭕ :* ${title}`+`\n`+
      `*|* *📌 𝚂𝚎𝚊𝚜𝚘𝚗 :* ${seasonnum}`+`\n`+
      `*|* *📽️ 𝙴𝚙𝚒𝚜𝚘𝚍𝚎 :* ${epinum}`+`\n`+
      `*|* *🖇️ 𝙻𝚒𝚗𝚔 :* ${q}`+`\n`+
      `*╰───────────●●►*`+`\n`+
      `▫️ *With Sinhala Subtitles*`+`\n`+
      `\n`+
      `*Please select the quality you wants to download by replying these numbers.*`+`\n`+
      `\n`;
    const downloads = data2.download;
    if (downloads && downloads?.length > 0) {
      downloads.forEach((download, index) => {
    if (download && download.link) {
        cot += `*${formatNumber(index + 1)} |❮* ${download.quality} (${download.size})\n`;
        numrep.push(`.dlmovie ${download.link} ${remotejids}`)
    }
      });
    }
    cot += `\n`+
    `${config.FOOTERNAME}`;
    
     const where = mek?.key?.remoteJid
     const mydata = await getBuffer(img);
    
       const mass = await conn.sendMessage(where, { image: mydata, caption: cot }, { quoted: mek });
       const jsonmsg = {
        key : mass.key,
        numrep,
        method : 'nondecimal'
       }
       await storenumrepdata(jsonmsg)
       await conn.sendMessage(where, { react: { text: "📜", key: mass.key } });
    
     await sleep(1*1000)
     return true; 
        }else{
            await  nosearchdetails(conn,chat,mek,'Episode',reply) 
            return true;   
        }
    
    }
    }
cmd({
    pattern: "movie",
    alias: ["mv","film"],
    react: '🎥',
    desc: "Get a movie",
    category: "movie",
    use: '.movie <query>',
    filename: __filename
  },
  async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

    try {
        const type = 'Movie'
        let chat=[]
        let p;

        if(isGroup){
          const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
          if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
        chat.push(m.chat);
          p = q;

        }else if(!isGroup){
          const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
          if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
              const data = await parseInput(q,m.chat);
              p = data.input;
              chat = data.chat;
        }
        if(p){
            const remotejids = q.replace(p,'').trim()
            if(p.startsWith(`${cine.site}${cine.movie}`)||p.startsWith(`${sinsub.site}${sinsub.movie}`)){
            await movi(conn,chat,mek,p,reply,remotejids)
            
            }else if(p.startsWith(`${cine.site}${cine.tvshow}`)||p.startsWith(`${sinsub.site}${sinsub.tvshow}`)){
            //await tvsh(conn,chat,mek,q,reply,remotejids)
            await reply('Please use tvshow cmd for that')
            }else if(p.startsWith(`${cine.site}${cine.episode}`)||p.startsWith(`${sinsub.site}${sinsub.episode}`)){
            //await episo(conn,chat,mek,q,reply,remotejids)
            await reply('Please use episode cmd for that')
            }else{
            await sea(conn,chat,mek,p,reply,type,remotejids)
            
            }
          }else if(!p){
          reply('Please enter search query!!')
          }else{
          reply('Ohh Sorry!! Got an error while fetching query!')
          }

    } catch (e) {
        console.log(e);  
    }
});

cmd({
  pattern: "tvshow",
  alias: ["mv2","tv"],
  react: '📺',
  desc: "Get a tv seiris",
  category: "movie",
  use: '.movie <query>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

  try {
      const type = 'TVShow' //Tv Show
      let chat=[]
      let p;

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
          if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
chat.push(m.chat);
        p = q;

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
      }
      if(p){
        const remotejids = q.replace(p,'').trim()
          if(p.startsWith(`${cine.site}${cine.movie}`)||p.startsWith(`${sinsub.site}${sinsub.movie}`)){
          //await movi(conn,m.chat,mek,q,reply,remotejids)
          await reply('Please use movie cmd for that')
          }else if(p.startsWith(`${cine.site}${cine.tvshow}`)||p.startsWith(`${sinsub.site}${sinsub.tvshow}`)){
          await tvsh(conn,chat,mek,p,reply,remotejids)
          
          }else if(p.startsWith(`${cine.site}${cine.episode}`)||p.startsWith(`${sinsub.site}${sinsub.episode}`)){
          //await episo(conn,m.chat,mek,q,reply,remotejids)
      await reply('Please use episode cmd for that')
          }else{
          await sea(conn,chat,mek,p,reply,type,remotejids)
          
          }
        }else if(!p){
        reply('Please enter search query!!')
        }else{
        reply('Ohh Sorry!! Got an error while fetching query!')
        }

  } catch (e) {
      console.error(e);  
      }
    });

cmd({
    pattern: "dlmovie",
    alias: ["dl"],
    react: '🎥',
    desc: "download a movie",
    category: "movie",
    use: '.dlmovie <query>',
    filename: __filename
  },
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

    try {
        let chat=[]
        let p;
        let me;

        if(isGroup){
          const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
          if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
        chat.push(m.chat);
          p = q;
          me= false

        }else if(!isGroup){
          const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
          if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
              const data = await parseInput(q,m.chat);
              p = data.input;
              chat = data.chat;
              me = data.me
        }
        if(p){
            let title;
            let url;
          let parts = p.split('|')
          p = parts[0]
          title = parts[1]? parts[1] : null
          let size;

  if(p.startsWith(`${cine.site}`)){
    let response
    if(p.startsWith(`${cine.site}${cine.movie}`)){
       response = await fetchJson(`${cine.api}${cine.cinemovie}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
    }else if(p.startsWith(`${cine.site}${cine.episode}`)){
      response = await fetchJson(`${cine.api}${cine.cineepisode}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
   }
    const dl_data = await fetchJson(`${cine.api}${cine.cinedllink}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
      if(response?.result?.data?.mainDetails?.maintitle){
        if(title === null){
          title = response?.result?.data?.mainDetails?.maintitle

        }
         
      } else if(response?.result?.data?.mainDetails?.title){
        if(title === null){
          title = response?.result?.data?.mainDetails?.title
        }
    }
      if(dl_data?.result?.data?.dllink){
          url= dl_data?.result?.data?.dllink
  }
}else if(p.startsWith(`${sinsub.site}`)){
let response
if(p.startsWith(`${sinsub.site}${sinsub.movie}`)){
   response = await fetchJson(`${sinsub.api}${sinsub.sinsubmovie}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
}else if(p.startsWith(`${sinsub.site}${sinsub.episode}`)){
  response = await fetchJson(`${sinsub.api}${sinsub.sinsubepisode}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
}
const dl_data = await fetchJson(`${sinsub.api}${sinsub.sinsubdllink}${p}&${sinsub.apikey}${config.DEVAPIKEY}`);
  if(response?.movied?.title){
    if(title === null){
      title = response?.movied?.title
    }
  }else if(Array.isArray(response?.movied)){
    const linkItem = response.movied.find(item => item.episodeLink === link);
    if(title === null){
      title = linkItem.episodeTitle + '[' + linkItem.episode+']'
    }
}
  if(dl_data?.movied?.link){
      url= dl_data?.movied?.link
}
}


const fileinfo  = await getFileInfo(url)
const fileSize = fileinfo.fileSize
const fileName = fileinfo.fileName
if(title === undefined || title === null){
  title = fileName
}
size = fileSize
const caption= `${title} ${mg.jointitleandqualitydl}
size : ${size}

${mg.footer}`



  const sse = checkSizeAndReply(size);
  if(sse && sse===`True`){
    await moviesend(reply,title, caption, url, conn, mek, chat)

    }else if(sse && sse!==`True`){

return await reply(`${title} ${mg.jointitleandqualitydl}

*${sse}*

${mg.downloadusinglink}

Link: ${url}

${mg.footer}`);

}else{
return await reply('Got an error while checking size')
}

        }
    } catch (e) {
        console.log(e);  
    }
});

cmd({
  pattern: "episode",
  alias: ["epi", "ep"],
  react: '🎞️',
  desc: "Get a tv seiris",
  category: "movie",
  use: '.movie <query>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

  try {
      //const type = 'Tv Show' //Tv Show
      let chat=[]
      let p;
     

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
         chat.push(m.chat);
        p = q;
        

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
            
      }
      if(p){
        const remotejids = q.replace(p,'').trim()
          if(p.startsWith(`${cine.site}${cine.movie}`)||p.startsWith(`${sinsub.site}${sinsub.movie}`)){
          //await movi(conn,m.chat,mek,q,reply,remotejids)
          await reply('Please use movie cmd for that')
          }else if(p.startsWith(`${cine.site}${cine.tvshow}`)||p.startsWith(`${sinsub.site}${sinsub.tvshow}`)){
          //await tvsh(conn,m.chat,mek,q,reply,remotejids)
          await reply('Please use tvshow cmd for that')
          }else if(p.startsWith(`${cine.site}${cine.episode}`)||p.startsWith(`${sinsub.site}${sinsub.episode}`)){
          await episo(conn,chat,mek,p,reply,remotejids)
          
      //await reply('Please use episode cmd for that')
          }else{
        await reply('Please use  only sinhalasubs and cinesubz links!!')
          //await sea(conn,m.chat,mek,q,reply,type,remotejids)
          }
        }else if(!p){
        reply('Please enter episode url!!')
        }else{
        reply('Ohh Sorry!! Got an error while fetching query!')
        }

  } catch (e) {
      console.error(e);  
      }
    }); 

cmd({
  alias: ["mvimages"],
  react: '🎥',
  desc: "get a movie images",
  category: "movie",
  use: '.mvimages <link>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

  try {
    let where = from
      let chat=[]
      let p;
      let me;

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
      chat.push(m.chat);
        p = q;
        me= false

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
            me = data.me
      }
      if(p){
        if(p.startsWith(`${cine.site}`)){
          let images;
          if(p.startsWith(`${cine.site}${cine.movie}`)){
          const response = await fetchJson(`${cine.api}${cine.cinemovie}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
          images = response?.result?.data?.mainDetails?.imageUrl
          }else if(p.startsWith(`${cine.site}${cine.tvshow}`)){
            const response = await fetchJson(`${cine.api}${cine.cinetvshow}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
            images = response?.result?.data?.imageUrls
            }
          images.forEach(async image => {
            if(chat?.length === 1 && chat[0] === where){
              const mass = await conn.sendMessage(where , { image: {url : image}, caption: `${config.FOOTERNAME}` }, { quoted: mek });
              await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
              
            }else{
              await Promise.all(chat.map(async (c) => {
                const mass = await conn.sendMessage(c , { image: {url : image}, caption: `${config.FOOTERNAME}` });
                 await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
                 
            }));
            }
          });
        }else if(p.startsWith(`${sinsub.site}`)){
          let images
          if(p.startsWith(`${sinsub.site}${sinsub.movie}`)){
            const response = await fetchJson(`${sinsub.api}${sinsub.sinsubmovie}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
           images = response?.movied?.imageUrls
            }else if(p.startsWith(`${sinsub.site}${sinsub.tvshow}`)){
              const response = await fetchJson(`${sinsub.api}${sinsub.sinsubtvshow}${p}?${sinsub.apikey}${config.DEVAPIKEY}`);
           images = response?.movied?.imageURLs
              }
          
          images.forEach(async image => {
            if(chat?.length === 1 && chat[0] === where){
              const mass = await conn.sendMessage(where , { image: {url : image.replace('/w300/','/original/')}, caption: `${config.FOOTERNAME}` }, { quoted: mek });
              await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
              
            }else{
              await Promise.all(chat.map(async (c) => {
                const mass = await conn.sendMessage(c , { image: {url : image}, caption: `${config.FOOTERNAME}` });
                 await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
                
            }));
            }
          });
      }
      }
    } catch (e) {
        console.log(e);  
    }
});
cmd({
  alias: ["mvinfo"],
  react: '🎥',
  desc: "get a movie info",
  category: "movie",
  use: '.mvinfo <link>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

  try {
    let where = from
      let chat=[]
      let p;
      let me;

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
      chat.push(m.chat);
        p = q;
        me= false

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
            me = data.me
      }
      if(p){
        if(p.startsWith(`${cine.site}`)){
          if(p.startsWith(`${cine.site}${cine.movie}`)){
           await sendinfo(conn,chat,mek,'movie',reply,q)
          }else if(p.startsWith(`${cine.site}${cine.tvshow}`)){
            await sendinfo(conn,chat,mek,'tvshow',reply,q)
            }
            
          
        }else if(p.startsWith(`${sinsub.site}`)){
          if(p.startsWith(`${sinsub.site}${sinsub.movie}`)){
            await sendinfo(conn,chat,mek,'movie',reply,q)
            }else if(p.startsWith(`${sinsub.site}${sinsub.tvshow}`)){
              await sendinfo(conn,chat,mek,'tvshow',reply,q)
              }
           
          
      }
      }
    } catch (e) {
        console.log(e);  
    }
});


cmd({
  alias: ["imdb"],
  react: '🎥',
  desc: "get a movie imdb info",
  category: "movie",
  use: '.imdb <link>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {

  try {
    let where = from
      let chat=[]
      let p;
      let me;

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
      chat.push(m.chat);
        p = q;
        me= false

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
            me = data.me
      }
      if(p){
        const remotejids = q.replace(p,'').trim()
        if(p.startsWith('id=')){
          p = p.replace('id=','').trim();
          const data = await fetchJson(`https://omdbapi.com/?apikey=742b2d09&i=${p}`);
          
          const title = data.Title;
          const year = data.Year;
          const date = data.Released;
          const rate = data.Ratings[0].Value;
          const runtime = data.Runtime;
          const lang = data.Language;
          const director = data.Director;
          const genres = data.Genre;
          const country = data.Country;
          const desc = data.Plot;
          const cast = data.Actors;
          const image = data.Poster.replace('@._V1_SX300','@._V1_FMjpg_UY2902_');
          let cot =`☘️ *Tιтle : ${title} ${year}*`+`\n`+
          `\n`+
          `📆 *Rᴇʟᴇᴀꜱᴇ ➠ ${date}*`+`\n`+
          `🌟 *Rᴀᴛɪɴɢ ➠ ${rate}*`+`\n`+
          `⏰ *Rᴜɴᴛɪᴍᴇ ➠ ${runtime}*`+`\n`+
          `🍁 *Lᴀɴɢᴜᴀɢᴇꜱ ➠ ${lang}*`+`\n`+
          `🎥 *Dɪʀᴇᴄᴛᴏʀ ➠ ${director}*`+`\n`+
          `📕 *Gᴇɴʀᴇs ➠ ${genres}*`+`\n`+
          `🌎 *Cᴏᴜɴᴛʀʏ ➠ ${country}*`+`\n`+
          `💃 *Cᴀꜱᴛ ➠ ${cast}*`+`\n`+
          `\n`+
          `📖 *${desc}*`+`\n`+
          `\n`+
          `> *Mᴀꜱᴛᴇʀ-X-Cyʙᴇʀ™*`
          if(chat?.length === 1 && chat[0] === where){
            const mass = await conn.sendMessage(where , { image: {url : image}, caption: cot }, { quoted: mek });
            await conn.sendMessage(where, { react: { text: "📽️", key: mass.key } });
            
          }else{
            await Promise.all(chat.map(async (c) => {
              const mass = await conn.sendMessage(c , { image: {url : image}, caption: cot });
               await conn.sendMessage(c, { react: { text: "📽️", key: mass.key } });
               
          }));
          }

        }else{
          const data = await fetchJson(`https://omdbapi.com/?apikey=742b2d09&s=${p}&plot=full`);
          let numrep = []
          let cot = `*IMDB MOVIE*`+`\n`+
          `\n`+
          `Your search : ${p}`+`\n`+
          `please reply the number you want..`+`\n`+
          `===================`+`\n`
          const movies = data.Search.slice(0, 10);
          movies.forEach((movie,index)=>{
            cot+= `${formatNumber(index+1)} *${movie.Title} - ${movie.Year}* (${movie.Type})\n`
            numrep.push(`.imdb id=${movie.imdbID} ${remotejids}`)
          })
          const mass = await conn.sendMessage(from, { text:  cot }, { quoted: mek });
          const jsonmsg = {
           key : mass.key,
           numrep,
           method : 'nondecimal'
          }
          await storenumrepdata(jsonmsg)
          await conn.sendMessage(from, { react: { text: "📜", key: mass.key } });

      }
      }
    } catch (e) {
        console.log(e);  
    }
});

cmd({
  pattern: "gdrive",
  alias: ["googledrive'"],
  react: '📑',
  desc: "Download googledrive files.",
  category: "movie",
  use: '.gdrive <googledrive link>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {
  try {
    let where = from
      let chat=[]
      let p;
      let me;

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
      chat.push(m.chat);
        p = q;
        me= false

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
            me = data.me
      }
      if(p){
        let res = await fg.GDriveDl(p)
        if (res.fileSizeB/1024 >= config.MAX_SIZE) return await conn.sendMessage(from , { text: '❌ *This file has exceeded the download limit.*' }, { quoted: mek } )
        await reply(`*📃 File name:*  ${res.fileName}`+`\n`+
        `*💈 File Size:* ${res.fileSize}`+`\n`+
        `*🕹️ File type:* ${res.mimetype}`)		
     if(chat?.length === 1 && chat[0] === where){
            const mass = await conn.sendMessage(where, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })

            await conn.sendMessage(where, { react: { text: "📑", key: mass.key } });
            
          }else{
            await Promise.all(chat.map(async (c) => {
              const mass = await conn.sendMessage(c, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype })

               await conn.sendMessage(c, { react: { text: "📑", key: mass.key } });
               
          }));
          }
      }
    } catch (e) {
        console.log(e);  
    }
});

cmd({
  alias: ["allepies"],
  react: '📑',
  desc: "Download all episodes.",
  category: "movie",
  use: '.allepies <episode link>',
  filename: __filename
},
async (conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react }) => {
  try {
    let where = from
      let chat=[]
      let p;
      let me;

      if(isGroup){
        const fsh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${from}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fsh &&  (fsh?.error || fsh?.data?.type == 'false')) return;
         
      chat.push(m.chat);
        p = q;
        me= false

      }else if(!isGroup){
        const fshh = await fetchJson(`${config.DOWNLOADSAPI}${bot}/${sender}?${sinsub.apikey}${config.DEVAPIKEY}`); 
        if(fshh &&  (fshh?.error || fshh?.data?.type == 'false')) return;
            const data = await parseInput(q,m.chat);
            p = data.input;
            chat = data.chat;
            me = data.me
      }
      if(p){
        await reply("This feature will shortly be added.!!")
      }
  } catch (e) {
    console.log(e);  
}
});
