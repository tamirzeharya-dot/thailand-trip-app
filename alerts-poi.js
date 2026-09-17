(()=>{
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const defaultTasks=[
 {date:'16.09',place:'מודיעין',title:'תור חיסוני מטיילים בשעה 17:00',status:'open',detail:'להגיע עם פנקסי החיסונים ולבדוק הפטיטיס A, טיפוס הבטן וטטנוס/שעלת.'},
 {date:'לפני הטיסה',place:'מסמכים',title:'דרכון ומסמכי חיסונים נשמרו',status:'done',detail:'הדרכון, פנקסי החיסונים והצילומים נמצאים במסמכים החשובים.'},
 {date:'24.09',place:'לפני הכניסה לתאילנד',title:'מילוי TDAC',status:'open',detail:'למלא את הטופס הרשמי ולשמור צילום מסך או PDF של האישור.'},
 {date:'25.09',place:'נתב״ג',title:'טיסת Etihad לתאילנד',status:'done',detail:'הטיסה הבינלאומית סגורה. לוודא בשדה שתג הכבודה ממשיך עד בנגקוק.'},
 {date:'26.09',place:'קוסמוי ← קופנגן',title:'מעבורת הלוך בשעה 15:00',status:'done',detail:'הכרטיס מאושר ומשולם. להגיע לרציף בזמן עם השובר.'},
 {date:'26.09',place:'האד רין, קופנגן',title:'Little Paradise',status:'done',detail:'המלון לליל ה-Full Moon סגור.'},
 {date:'27.09',place:'קופנגן ← קוסמוי',title:'מעבורת חזרה בשעה 16:00',status:'done',detail:'PAID ומאושר. הזמנה 12GO32904233. להגיע ל-Haad Rin Pier בשעה 15:15.'},
 {date:'27.09',place:'קוסמוי',title:'Samui Pier Beach Front Resort',status:'done',detail:'הזמנה 22453 מאושרת ללילה אחד, 27-28.9.'},
 {date:'27.09',place:'Samui Pier Beach Front Resort',title:'לוודא מונית לשדה לבוקר',status:'open',detail:'לבקש מהקבלה לאשר מונית ל-28.9 בשעה 06:45.'},
 {date:'28.09',place:'קוסמוי ← צ׳יאנג מאי',title:'טיסה PG241 בשעה 08:55',status:'done',detail:'הטיסה סגורה. יציאה מהמלון במונית בשעה 06:45.'},
 {date:'28.09',place:'צ׳יאנג מאי',title:'Rawee Arun Hotel',status:'done',detail:'המלון בצ׳יאנג מאי סגור.'},
 {date:'28.09',place:'פאי',title:'להזמין מלון ללילה שמתחיל ב-29.9',status:'open',detail:'אפשר לסגור יום קודם לפי הזמינות. לא הוגדר עדיין מלון סופי.'},
 {date:'29.09',place:'Rawee Arun Hotel',title:'לתאם שמירת המזוודה',status:'open',detail:'לבקש בקבלה בבוקר לשמור את המזוודה הגדולה ולקחת לפאי תיק קטן.'},
 {date:'29.09',place:'צ׳יאנג מאי',title:'Elephant Nature Park',status:'done',detail:'הפעילות סגורה. איסוף 07:30-08:00 וחזרה סביב 14:30 אושרו במייל.'},
 {date:'29.09',place:'חזרה מהפילים',title:'להזמין Grab ל-Arcade 2',status:'open',detail:'להזמין Grab כשמתקרבים למלון ולצאת לתחנה עד 15:15.'},
 {date:'29.09',place:'Chiang Mai Arcade 2 ← Pai',title:'מיניוואן לפאי בשעה 16:30',status:'done',detail:'הכרטיס מאושר. להגיע לתחנה עד 15:45. הגעה משוערת לפאי 20:50.'},
 {date:'01.10',place:'פאי ← צ׳יאנג מאי',title:'נסיעה חזרה לצ׳יאנג מאי',status:'open',detail:'עדיין לא הוזמנה. שעה מועדפת 09:00.'},
 {date:'03-08.10',place:'תאילנד',title:'לינה והמשך המסלול',status:'open',detail:'הימים נשארו פתוחים בכוונה וייסגרו בהתאם להתקדמות.'}
];
const TASKS_STATE_KEY='thailand-trip-tasks-v1';
defaultTasks.forEach((task,index)=>task.id='trip-task-'+index);
function loadTaskState(){
 try{return JSON.parse(localStorage.getItem(TASKS_STATE_KEY)||'{}')||{}}
 catch(_){return {}}
}
let taskState=loadTaskState();
function saveTaskState(){localStorage.setItem(TASKS_STATE_KEY,JSON.stringify(taskState))}
function tasks(){return defaultTasks.filter(task=>!taskState[task.id]?.deleted).map(task=>({...task,status:taskState[task.id]?.status||task.status}))}
const poi={'26.09':[['🎉','פול מון פארטי','Haad Rin Nok Koh Phangan']], '27.09':[['🏖️','חוף האד רין','Haad Rin Koh Phangan'],['🌴','בנגראק ביץ׳','Bangrak Beach Koh Samui']], '28.09':[['🌙','נייט בזאר','Chiang Mai Night Bazaar']], '29.09':[['🐘','Elephant Nature Park','Elephant Nature Park Chiang Mai'],['🌙','שוק הלילה פאי','Pai Walking Street']]};
function maps(q){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)}
function taskActions(task){return '<div class="task-actions">'+(task.status==='open'?'<button class="task-done" data-task-id="'+task.id+'" type="button">✓ בוצע</button>':'')+'<button class="task-delete" data-task-id="'+task.id+'" type="button">🗑️ מחיקה</button></div>'}
function taskMarkup(task,showDate=false){return '<div class="trip-alert" data-task-card="'+task.id+'"><b>'+(task.status==='done'?'🟢 ':'🔴 ')+(showDate?esc(task.date)+' · ':'')+esc(task.title)+'</b><small>'+esc(task.place)+'</small><p>'+esc(task.detail)+'</p>'+taskActions(task)+'</div>'}
function taskCard(day){const a=tasks().filter(x=>x.date===day);if(!a.length)return '<section class="info-card"><h3>📋 משימות</h3><p>🟢 אין כרגע משימה ליום הזה.</p></section>';return '<section class="info-card"><h3>📋 משימות</h3>'+a.map(x=>taskMarkup(x)).join('')+'</section>'}
function poiCard(day){const a=poi[day]||[];if(!a.length)return '';return '<section class="info-card"><h3>📍 נקודות עניין קרובות</h3><div class="poi-list">'+a.map(x=>'<a href="'+maps(x[2])+'" target="_blank" rel="noopener"><span>'+x[0]+'</span><b>'+esc(x[1])+'</b><small>פתח במפות Google</small></a>').join('')+'</div></section>'}
function enhance(){const p=$('#inlinePanel');if(!p||!p.classList.contains('show'))return;const day=document.querySelector('.day-tile.active')?.dataset.day||window.__currentTripDay;if(!day)return;if(!p.querySelector('.trip-alerts-added')){const wrap=document.createElement('div');wrap.className='trip-alerts-added';wrap.innerHTML=taskCard(day)+poiCard(day);const flex=[...p.querySelectorAll('.info-card')].find(x=>x.textContent.includes('זמן חופשי'));if(flex)p.insertBefore(wrap,flex);else p.appendChild(wrap)}p.onclick=handleTaskAction}
const old=window.openDay;if(typeof old==='function'){window.openDay=function(id){window.__currentTripDay=id;document.querySelectorAll('.day-tile').forEach(x=>x.classList.toggle('active',x.dataset.day===id));old(id);setTimeout(enhance,0)};document.querySelectorAll('.day-tile[data-day]').forEach(b=>b.onclick=()=>window.openDay(b.dataset.day))}
function handleTaskAction(event){
 const button=event.target.closest('[data-task-id]');if(!button)return;
 const task=defaultTasks.find(item=>item.id===button.dataset.taskId);if(!task)return;
 if(button.classList.contains('task-done')){
  if(!confirm('האם לאשר שהמשימה בוצעה ולהעביר אותה לרשימת „בוצעו”?'))return;
  taskState[task.id]={...(taskState[task.id]||{}),status:'done'};saveTaskState();window.openAlerts();
 }
 if(button.classList.contains('task-delete')){
  if(!confirm('למחוק את המשימה „'+task.title+'”?'))return;
  taskState[task.id]={...(taskState[task.id]||{}),deleted:true};saveTaskState();window.openAlerts();
 }
}
window.openAlerts=function(){const p=$('#inlinePanel'),all=tasks(),open=all.filter(x=>x.status==='open'),done=all.filter(x=>x.status==='done');p.innerHTML='<div class="inline-head"><div><small>'+done.length+' בוצעו · '+open.length+' פתוחות</small><h2>📋 מרכז משימות</h2></div><button id="closeAlerts" class="close-red" type="button">סגור</button></div><section class="info-card"><h3>🔴 משימות פתוחות</h3>'+(open.length?open.map(x=>taskMarkup(x,true)).join(''):'<p class="tasks-empty">אין משימות פתוחות.</p>')+'</section><section class="info-card"><h3>🟢 בוצעו</h3>'+(done.length?done.map(x=>taskMarkup(x,true)).join(''):'<p class="tasks-empty">עדיין אין משימות שבוצעו.</p>')+'</section>';p.classList.add('show');p.onclick=handleTaskAction;$('#closeAlerts').onclick=()=>{p.classList.remove('show');p.innerHTML=''};p.scrollIntoView({behavior:'smooth',block:'start'})}
})();
