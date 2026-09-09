const V=window.TRIP_V3;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const detail=$('#detailPanel'), detailBody=$('#detailBody');
const now=new Date();
const start=new Date(V.meta.start);
const diff=start-now;

function formatCountdown(ms){
 if(ms<=0)return 'הטיול התחיל';
 const d=Math.floor(ms/86400000),h=Math.floor(ms%86400000/3600000),m=Math.floor(ms%3600000/60000),s=Math.floor(ms%60000/1000);
 return `${String(d).padStart(2,'0')} ימים  ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function tick(){
 const ms=start-new Date();
 const c=$('#countdownClock'); if(c)c.textContent=formatCountdown(ms);
 const date=$('#countdownDate'); if(date)date.textContent='25.09.2026';
}
tick(); setInterval(tick,1000);

function currentDayId(){
 const n=new Date(), y=n.getFullYear(),m=String(n.getMonth()+1).padStart(2,'0'),d=String(n.getDate()).padStart(2,'0');
 if(n<start)return 'prep';
 if(y===2026&&m==='09'&&+d>=25&&+d<=30)return `${d}.${m}`;
 if(y===2026&&m==='10'&&+d===1)return '01.10';
 if(y===2026&&m==='10'&&+d===2)return '02.10';
 if(y===2026&&m==='10'&&+d>=3&&+d<=8)return '03-08.10';
 if(y===2026&&m==='10'&&+d===9)return '09.10';
 return 'prep';
}

function dayIcon(day){return `<img src="${esc(day.icon)}" alt="" loading="lazy">`;}
function renderDays(){
 const grid=$('#journeyGrid');
 grid.innerHTML=V.days.map(day=>`<button class="journey-card ${day.id===currentDayId()?'today-card':''}" data-day="${esc(day.id)}">${dayIcon(day)}<span>${esc(day.date)}</span><strong>${esc(day.title)}</strong><small>${esc(day.stay)}</small></button>`).join('');
 $$('.journey-card').forEach(b=>b.onclick=()=>openDay(b.dataset.day));
}

function linkButtons(items=[]){return items.length?`<div class="action-grid">${items.map(([t,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</div>`:'';}
function movementCard(s){
 const nav=linkButtons(s.nav||[]);
 return `<article class="move-card"><div class="move-title"><strong>${esc(s.from)}</strong><span class="to-word">אל</span><strong>${esc(s.to)}</strong></div><div class="times"><div><small>יציאה</small><b>${esc(s.depart)}</b></div><div><small>הגעה</small><b>${esc(s.arrive)}${s.duration?` <span class="duration">(${esc(s.duration)})</span>`:''}</b></div></div><div class="move-meta"><p><b>אמצעי:</b> ${esc(s.mode)}</p><p><b>🧳 מזוודה:</b> ${esc(s.luggage)}</p>${s.verify?`<p class="verify">🟠 <b>דורש אימות מידע או נתונים:</b> ${esc(s.verify)}</p>`:''}</div>${nav}</article>`;
}
function chabadCard(c){if(!c)return'';return `<section class="info-card"><h3>✡️ בית חב״ד קרוב</h3><strong>${esc(c.name)}</strong>${linkButtons([['📍 נווט לבית חב״ד',c.maps],['🌐 אתר בית חב״ד',c.site],...(c.phone?[['📞 התקשר',c.phone]]:[])])}</section>`;}
function docsCard(day){
 const docs=day.docs||[];
 return `<section class="info-card"><h3>🎫 המסמכים של היום</h3>${docs.length?linkButtons(docs):'<p>אין כרגע מסמך ייעודי ליום הזה.</p>'}${day.folder?linkButtons([['📂 פתח את תיקיית היום',day.folder]]):''}</section>`;
}
function flexCard(day){return `<section class="info-card flex-card"><h3>🕊️ מרווח חופשי לשינויים</h3><p>${esc(day.flex||'להשאיר זמן חופשי להחלטה במקום.')}</p><label>הערה שלי ליום הזה<textarea data-flex="${esc(day.id)}" placeholder="אפשר לכתוב כאן רעיון או שינוי...">${esc(localStorage.getItem('flex_'+day.id)||'')}</textarea></label></section>`;}
function prepList(){
 const base=['דרכון בתוקף','5 צילומי דרכון מודפסים','עותק דיגיטלי של הדרכון בטלפון ובענן','PassportCard והכרטיס הפיזי','TDAC בתוך 3 ימים לפני ההגעה','בדיקת כרטיס אשראי נוסף','בדיקת מזוודה וטרקר Google Find Hub','רישיון נהיגה בינלאומי','בדיקת eSIM / SIM','בדיקת רחפן, סוללות, כרטיס זיכרון ואישורים'];
 const extra=JSON.parse(localStorage.getItem('prep_extra')||'[]');
 const done=JSON.parse(localStorage.getItem('prep_done')||'{}');
 return [...base,...extra].map((t,i)=>`<label class="prep-row"><input type="checkbox" data-prep="${i}" ${done[i]?'checked':''}><span>${esc(t)}</span>${i>=base.length?`<button class="remove-prep" data-remove="${i-base.length}" type="button">מחק</button>`:''}</label>`).join('');
}
function bindPrep(){
 $$('.prep-row input').forEach(x=>x.onchange=()=>{const d=JSON.parse(localStorage.getItem('prep_done')||'{}');d[x.dataset.prep]=x.checked;localStorage.setItem('prep_done',JSON.stringify(d));});
 $$('.remove-prep').forEach(b=>b.onclick=e=>{e.preventDefault();const a=JSON.parse(localStorage.getItem('prep_extra')||'[]');a.splice(+b.dataset.remove,1);localStorage.setItem('prep_extra',JSON.stringify(a));openDay('prep');});
 const add=$('#addPrepBtn'); if(add)add.onclick=()=>{const t=prompt('מה להוסיף להכנות?');if(!t?.trim())return;const a=JSON.parse(localStorage.getItem('prep_extra')||'[]');a.push(t.trim());localStorage.setItem('prep_extra',JSON.stringify(a));openDay('prep');};
}
function openDay(id){
 const day=V.days.find(x=>x.id===id); if(!day)return;
 let html=`<div class="detail-head"><div>${dayIcon(day)}<div><small>${esc(day.date)}</small><h2>${esc(day.title)}</h2><p class="stay-line">⏱️ זמן שהות: ${esc(day.stay)}</p></div></div><button id="closeDetail" class="close-red" type="button">סגור</button></div>`;
 if(id==='prep')html+=`<section class="info-card"><div class="section-title-row"><h3>✅ הכנות לטיול</h3><button id="addPrepBtn" class="add-btn" type="button">+ הוספה</button></div><div id="prepList">${prepList()}</div></section>`;
 if(day.segments?.length)html+=`<section class="info-card"><h3>🚦 תנועה ביום הזה</h3>${day.segments.map(movementCard).join('')}</section>`;
 html+=docsCard(day);
 if(day.links?.length)html+=`<section class="info-card"><h3>🔗 קישורים ויצירת קשר</h3>${linkButtons(day.links)}</section>`;
 html+=chabadCard(day)+flexCard(day);
 detailBody.innerHTML=html;
 detail.classList.add('show'); document.body.classList.add('detail-open');
 $('#closeDetail').onclick=closeDetail; bindPrep();
 $$('textarea[data-flex]').forEach(t=>t.oninput=()=>localStorage.setItem('flex_'+t.dataset.flex,t.value));
 detail.scrollTop=0;
}
function closeDetail(){detail.classList.remove('show');document.body.classList.remove('detail-open');}
$('#detailBackdrop').onclick=closeDetail;

function openMapHub(){
 detailBody.innerHTML=`<div class="detail-head"><div><div class="map-icon">🗺️</div><div><small>מפת הטיול</small><h2>כל הנקודות שכבר סגרנו</h2><p class="stay-line">לחץ על נקודה כדי לפתוח אותה ב-Google Maps</p></div></div><button id="closeDetail" class="close-red" type="button">סגור</button></div><section class="info-card"><div class="map-list">${V.mapPoints.map(([n,u],i)=>`<a href="${esc(u)}" target="_blank" rel="noopener"><span>${i+1}</span><b>${esc(n)}</b><em>נווט</em></a>`).join('')}</div></section><section class="info-card map-note"><h3>Google My Maps</h3><p>כרגע זו מפת טיול מרוכזת עם כל הנקודות ופתיחה ישירה ב-Google Maps. כדי לקבל מפה אחת אמיתית עם כל הסמנים בתוך Google My Maps ניצור קובץ מפה ייעודי ונייבא אותו לאחר אימות הקואורדינטות של כל הנקודות.</p></section>`;
 detail.classList.add('show');document.body.classList.add('detail-open');$('#closeDetail').onclick=closeDetail; detail.scrollTop=0;
}
$('#mapBanner').onclick=openMapHub;
$('#mapTool').onclick=openMapHub;
$('#chabadTool').onclick=()=>{detailBody.innerHTML=`<div class="detail-head"><div><div class="map-icon">✡️</div><div><small>בתי חב״ד בתאילנד</small><h2>כל היעדים שלי</h2></div></div><button id="closeDetail" class="close-red" type="button">סגור</button></div>${V.days.filter(d=>d.chabad).map(d=>chabadCard(d.chabad)).join('')}`;detail.classList.add('show');document.body.classList.add('detail-open');$('#closeDetail').onclick=closeDetail;};
$('#docsTool').onclick=()=>{const d=V.days;detailBody.innerHTML=`<div class="detail-head"><div><div class="map-icon">🎫</div><div><small>מסמכים לפי יום</small><h2>לא צריך לחפש יותר</h2></div></div><button id="closeDetail" class="close-red" type="button">סגור</button></div><div class="docs-by-day">${d.map(x=>`<section class="info-card"><h3>${esc(x.date)} · ${esc(x.title)}</h3>${x.docs?.length?linkButtons(x.docs):'<p>אין מסמך ייעודי.</p>'}${x.folder?linkButtons([['📂 תיקיית היום',x.folder]]):''}</section>`).join('')}</div>`;detail.classList.add('show');document.body.classList.add('detail-open');$('#closeDetail').onclick=closeDetail;};
$('#trackerTool').onclick=()=>window.open('https://www.google.com/android/find/','_blank','noopener');
$('#usefulTool').onclick=()=>window.open('https://chabadthailand.co.il/','_blank','noopener');
renderDays();
