const fs = require('fs-extra');
let msg = [];
function isDecimal(number) {
    return !Number.isInteger(number);
  }

const storenumrepdata = async (json) => {
    if (!msg[json?.key?.remoteJid]) {
        msg[json?.key?.remoteJid] = [];
    }
    msg[json?.key?.remoteJid][json.key?.id] = json;
    return msg[json?.key?.remoteJid][json.key?.id];
};

const getstorednumrep = async (quotedid, jid, num,conn,mek) => {
    
    if (!msg[jid]) return false;
    if (!msg[jid][quotedid]) return false;
     if (msg[jid][quotedid]?.key?.fromMe === false) return false;
  
    const storedMsg = msg[jid][quotedid];
    const numrep = storedMsg.numrep;
    const method = storedMsg?.method
            
    const from = storedMsg?.key?.remoteJid
    if(method === 'nondecimal' || method === undefined || method === null){
    if (!isNaN(num) &&  parseInt(num) > 0 && parseInt(num) <= numrep.length) {
       
        return numrep[parseInt(num) - 1];
    } else {
        await conn.sendMsg(from,{text : 'Please enter a valid number!!'}, {quoted:mek})
        return null; 
    }
}else if(method === 'decimal'){
 if(isDecimal(parseFloat(num))){
 let nummers = num.split('.')
 num = parseInt(nummers[0])+'.'+parseInt(nummers[1])
    function getValue(decimal) {
        let result = null; 
      
        numrep.forEach(item => { 
          if (item.startsWith(decimal)) {
            const args = item.trim().split(/ +/).slice(1); 
            result = args.join(' '); 
          }
        });
      
        return result; 
      }
      const found = getValue(num)
    if (found !== null) {
        return found;
    } else {
        await conn.sendMsg(from,{text : 'Please enter a valid number!!'}, {quoted:mek})
        return null; 
    }
 }
}
};

module.exports = { storenumrepdata, getstorednumrep };
