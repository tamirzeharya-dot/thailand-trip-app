(()=>{
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const alerts=[
 ['26.09','קופנגן (Koh Phangan)','פול מון פארטי (Full Moon Party)','לוודא סמוך לאירוע את תנאי הכניסה, המחיר והמיקום הרשמי.'],
 ['26.09','קוסמוי (Koh Samui)','רציף המעבורת','🟠 הרציף המדויק בקוסמוי עדיין דורש אימות.'],
 ['27.09','קופנגן (Koh Phangan)','מעבורת לקוסמוי','🟠 לוודא סטטוס תשלום. במסמך הופיע pending/unpaid.'],
 ['29.09','צ׳יאנג מאי (Chiang Mai)','Elephant Nature Park','יתרת תשלום 1,750 באט טרם שולמה.'],
 ['30.09','פאי (Pai)','פאי זיפליין (Pai Zipline)','🟠 לוודא/לסגור הסעה מ-Reverie Siam לפעילות.'],
 ['01.10','פאי (Pai)','מיניוואן לצ׳יאנג מאי','🔴 הנסיעה המועדפת 09:00 טרם הוזמנה.'],
 ['03-08.10','תאילנד','לינה והמשך המסלול','🔴 הימים 3-8.10 עדיין פתוחים בכוונה ודורשים החלטה.']
];
const poi={
 '26.09':[['🎉','פול מון פארטי (Full Moon Party)','Haad Rin Nok Koh Phangan'],['🏖️','חוף האד רין נוק (Haad Rin Nok)','Haad Rin Nok Koh Phangan'],['🍽️','מסעדות וברים בהאד רין (Haad Rin)','restaurants bars Haad Rin Koh Phangan']],
 '27.09':[['🏖️','חוף האד רין (Haad Rin)','Haad Rin Koh Phangan'],['🍽️','אוכל וברים בהאד רין (Haad Rin)','restaurants bars Haad Rin Koh Phangan'],['🌴','בנגראק ביץ׳ (Bangrak Beach)','Bangrak Beach Koh Samui']],
 '28.09':[['🌙','נייט בזאר (Night Bazaar)','Chiang Mai Night Bazaar'],['🏳️‍🌈','אזור חיי הלילה הגאים בנייט בזאר','gay nightlife Night Bazaar Chiang Mai'],['💃','6ixcret Show','6ixcret Show Chiang Mai']],
 '29.09':[['🐘','אלפנט נייצ׳ר פארק (Elephant Nature Park)','Elephant Nature Park Chiang Mai'],['🌙','שוק הלילה פאי (Pai Walking Street)','Pai Walking Street'],['🍸','ברים ומוזיקה חיה בפאי (Pai)','bars live music Pai Thailand']],
 '30.09':[['🧗','פאי זיפליין (Pai Zipline)','Pai Zipline Thailand'],['🌙','שוק הלילה פאי (Pai Walking Street)','Pai Walking Street'],['☕','בתי קפה קרובים בפאי (Pai)','cafes Pai Thailand']],
 '01.10':[['🏙️','סילום (Silom)','Silom Bangkok'],['🏳️‍🌈','סילום סוי 4 (Silom Soi 4)','Silom Soi 4 Bangkok'],['💃','האוס אוף הילס (House Of Heals)','House Of Heals Bangkok']],
 '02.10':[['🏳️‍🌈','סילום סוי 4 (Silom Soi 4)','Silom Soi 4 Bangkok'],['🎵','סילום סוי 2 (Silom Soi 2)','Silom Soi 2 Bangkok'],['💃','האוס אוף הילס (House Of Heals)','House Of Heals Bangkok'],['🍽️','מסעדות ליד Pullman Bangkok Hotel G','restaurants near Pullman Bangkok Hotel G']],
 '03-08.10':[['📍','נקודות עניין קרובות אליי','tourist attractions Thailand'],['🍽️','מסעדות קרובות אליי','restaurants Thailand'],['🏳️‍🌈','חיי לילה גאים','gay nightlife Thailand']]
};
function maps(q){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)}
function alertCard(day){const a=alerts.filter(x=>x[0]===day);if(!a.length)return '<section class="info-card"><h3>🔔 תזכורות פתוחות</h3><p>🟢 אין כרגע משימה פתוחה ליום הזה.</p></section>';return `<section class="info-card"><h3>🔔 תזכורות פתוחות</h3>${a.map(x=>`<div class="trip-alert"><b>${esc(x[2])}</b><small>${esc(x[1])}</small><p>${esc(x[3])}</p></div>`).join('')}</section>`}
function poiCard(day){const a=poi[day]||[];if(!a.length)return '';return `<section class="info-card"><h3>📍 נקודות עניין קרובות</h3><p>המלצות אופציונליות ליד היעד. לחץ לפתיחה במפות Google.</p><div class="poi-list">${a.map(x=>`<a href="${maps(x[2])}" target="_blank" rel="noopener"><span>${x[0]}</span><b>${esc(x[1])}</b><small>פתח במפות Google</small></a>`).join('')}</div></section>`}
function enhance(){const p=$('#inlinePanel');if(!p||!p.classList.contains('show'))return;const day=document.querySelector('.day-tile.active')?.dataset.day||window.__currentTripDay;if(!day)return;if(!p.querySelector('.trip-alerts-added')){const wrap=document.createElement('div');wrap.className='trip-alerts-added';wrap.innerHTML=alertCard(day)+poiCard(day);const flex=[...p.querySelectorAll('.info-card')].find(x=>x.textContent.includes('זמן חופשי'));if(flex)p.insertBefore(wrap,flex);else p.appendChild(wrap);}}
const old=window.openDay;if(typeof old==='function'){window.openDay=function(id){window.__currentTripDay=id;document.querySelectorAll('.day-tile').forEach(x=>x.classList.toggle('active',x.dataset.day===id));old(id);setTimeout(enhance,0)};document.querySelectorAll('.day-tile[data-day]').forEach(b=>b.onclick=()=>window.openDay(b.dataset.day));}
window.openAlerts=function(){const p=$('#inlinePanel');p.innerHTML=`<div class="inline-head"><div><small>לפי היום הרלוונטי</small><h2>🔔 מרכז התראות</h2></div><button id="closeAlerts" class="close-red" type="button">סגור</button></div><section class="info-card">${alerts.map(x=>`<div class="trip-alert"><b>${esc(x[0])} · ${esc(x[2])}</b><small>${esc(x[1])}</small><p>${esc(x[3])}</p></div>`).join('')}</section>`;p.classList.add('show');$('#closeAlerts').onclick=()=>{p.classList.remove('show');p.innerHTML=''};p.scrollIntoView({behavior:'smooth',block:'start'});}
})();