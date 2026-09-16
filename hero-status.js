(()=>{
const $=s=>document.querySelector(s);
const events=[
 {at:'2026-09-25T15:05:00+03:00',title:'טיסה מתל אביב לאבו דאבי',meta:'Etihad | המראה 15:05'},
 {at:'2026-09-25T21:10:00+04:00',title:'טיסה מאבו דאבי לבנגקוק',meta:'Etihad | המראה 21:10'},
 {at:'2026-09-26T10:10:00+07:00',title:'טיסה מבנגקוק לקוסמוי',meta:'Bangkok Airways PG127 | המראה 10:10'},
 {at:'2026-09-26T15:00:00+07:00',title:'מעבורת לקופנגן',meta:'Haad Rin Queen | יציאה 15:00'},
 {at:'2026-09-27T16:00:00+07:00',title:'מעבורת מקופנגן לקוסמוי',meta:'Haad Rin Pier | התייצבות עד 15:30'},
 {at:'2026-09-28T08:55:00+07:00',title:'טיסה מקוסמוי לצ׳יאנג מאי',meta:'Bangkok Airways PG241 | המראה 08:55'},
 {at:'2026-09-29T07:30:00+07:00',title:'איסוף לחוות הפילים',meta:'Rawee Arun Hotel | בין 07:30 ל-08:00'},
 {at:'2026-09-29T16:30:00+07:00',title:'מיניוואן מצ׳יאנג מאי לפאי',meta:'Chiang Mai Arcade 2 | יציאה 16:30'},
 {at:'2026-10-09T11:10:00+07:00',title:'טיסת החזרה לישראל',meta:'יש לבדוק את פרטי הטיסה בשובר'}
].map(x=>({...x,time:new Date(x.at)}));
const thaiClock=new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Bangkok',hour:'2-digit',minute:'2-digit',hour12:false});
function formatLeft(ms){if(ms<=0)return'';const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000);if(d>0)return`בעוד ${d} ימים ו-${h} שעות`;if(h>0)return`בעוד ${h} שעות ו-${m} דקות`;return`בעוד ${Math.max(1,m)} דקות`}
function update(){const now=new Date(),clock=$('#thailandClock');if(clock)clock.textContent=`תאילנד ${thaiClock.format(now)}`;const e=events.find(x=>x.time>now);if(!e){$('#statusPhase').textContent='המסע הושלם';$('#statusTitle').textContent='ברוך השב הביתה';$('#statusMeta').textContent='המקומות והתיעוד ששמרת נשארו באפליקציה במכשיר זה';$('#statusCountdown').textContent='Thailand 2026';return}$('#statusPhase').textContent=now<events[0].time?'השלב הבא':'האירוע הקרוב';$('#statusTitle').textContent=e.title;$('#statusMeta').textContent=e.meta;$('#statusCountdown').textContent=formatLeft(e.time-now)}
function openSOS(){const p=$('#inlinePanel');p.innerHTML=`<div class="inline-head"><div><small>חיוג מהיר בתאילנד</small><h2>🆘 מוקדי חירום</h2></div><button id="closeSOS" class="close-red" type="button">סגור</button></div><section class="info-card"><div class="emergency-grid"><a class="emergency-call emergency-police" href="tel:191"><span>👮</span><b>משטרה</b><strong>191</strong></a><a class="emergency-call emergency-fire" href="tel:199"><span>🚒</span><b>כיבוי והצלה</b><strong>199</strong></a><a class="emergency-call emergency-medical" href="tel:1669"><span>🚑</span><b>רפואה דחופה</b><strong>1669</strong></a><a class="emergency-call emergency-tourist" href="tel:1155"><span>🛡️</span><b>משטרת תיירים</b><strong>1155</strong></a></div><p class="emergency-note">לחיצה מחייגת מיד. משטרת התיירים מסייעת גם באנגלית. במקרה שאין קליטה סלולרית, בקש מצוות המלון או מאדם מקומי להזעיק עזרה.</p></section>`;p.classList.add('show');$('#closeSOS').onclick=()=>{p.classList.remove('show');p.innerHTML=''};p.scrollIntoView({behavior:'smooth',block:'start'})}
const sos=$('#sosFab');if(sos)sos.onclick=openSOS;window.openSOS=openSOS;update();setInterval(update,30000);
})();