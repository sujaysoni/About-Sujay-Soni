
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function open_(pw,raw){const d=b64(raw),k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:d.slice(0,16),iterations:600000,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['decrypt']);
return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:d.slice(16,28)},key,d.slice(28)))}

(async()=>{const raw=require('fs').readFileSync('output/site/payload.txt','utf8');const h=await open_('aboutsujay',raw);console.log('OK',h.includes('<span class="mark">Soni'),!h.includes('asking_as'));try{await open_('x',raw)}catch(e){console.log('wrong rejected')}})()