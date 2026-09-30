(()=>{
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const defaultTasks=[
 {date:'16.09',place:'מודיעין',title:'תור חיסוני מטיילים בשעה 17:00',status:'open',detail:'להגיע עם פנקסי החיסונים ולבדוק הפטיטיס A, טיפוס הבטן וטטנוס/שעלת.'},
 {date:'לפני הטיסה',place:'מסמכים',title:'דרכון ומסמכי חיסונים נשמרו',status:'done',detail:'הדרכון, פנקסי החיסונים והצילומים נמצאים במסמכים החשובים.'},
 {date:'24.09',place:'לפני הכניסה לתאילנד',title:'מילוי TDAC',status:'open',detail:'לפתוח את האתר הרשמי, למלא פרטי דרכון, טיסה ולינה, לשלוח ולשמור צילום מסך או PDF של האישור.',actions:[['פתיחת TDAC הרשמי','https://tdac.immigration.go.th']]},
 {date:'25.09',place:'נתב״ג',title:'טיסת Etihad לתאילנד',status:'done',detail:'הטיסה הבינלאומית סגורה. לוודא בשדה שתג הכבודה ממשיך עד בנגקוק.'},
 {date:'26.09',place:'קוסמוי ← קופנגן',title:'מעבורת הלוך בשעה 15:00',status:'done',detail:'הכרטיס מאושר ומשולם. להגיע לרציף בזמן עם השובר.'},
 {date:'26.09',place:'האד רין, קופנגן',title:'Little Paradise',status:'done',detail:'המלון לליל ה-Full Moon סגור.'},
 {date:'27.09',place:'קופנגן ← קוסמוי',title:'מעבורת חזרה בשעה 16:00',status:'done',detail:'PAID ומאושר. הזמנה 12GO32904233. להגיע ל-Haad Rin Pier בשעה 15:15.'},
 {date:'27.09',place:'קוסמוי',title:'Samui Pier Beach Front Resort',status:'done',detail:'הזמנה 22453 מאושרת ללילה אחד, 27-28.9.'},
 {date:'27.09',place:'Samui Pier Beach Front Resort',title:'מונית לשדה בבוקר',status:'done',detail:'המונית הוזמנה דרך המלון ל-28.9 בשעה 06:20 בעלות 400 באט.'},
 {date:'28.09',place:'קוסמוי ← צ׳יאנג מאי',title:'טיסה PG241 בשעה 08:55',status:'done',detail:'הצ׳ק-אין הושלם והטיסה יצאה. מושב 10F, אזור עלייה 2.'},
 {date:'28.09',place:'צ׳יאנג מאי',title:'Rawee Arun Hotel',status:'done',detail:'המלון בצ׳יאנג מאי סגור.'},
 {date:'28.09',place:'פאי',title:'Reverie Siam Resort לשני לילות',status:'done',detail:'המלון מאושר מ-29.9 בשעה 14:00 עד 1.10 בשעה 12:00, שני לילות באותו חדר מסוג Deluxe Balcony עם ארוחת בוקר. הזמנה 22211, אישור 2553892116.',actions:[['ניווט למלון','https://www.google.com/maps/search/?api=1&query=Reverie+Siam+Resort+Pai']]},
 {date:'29.09',place:'Rawee Arun Hotel',title:'איסוף כל המזוודות אחרי הפילים',status:'open',detail:'המזוודות נשמרות במלון רק בזמן פעילות הפילים. בחזרה לאסוף את כולן ולקחת אותן לפאי. אם המיניוואן דורש תוספת כבודה, משלמים בדלפק או לנהג.',actions:[['ניווט למלון','https://www.google.com/maps/search/?api=1&query=Arun+Rawee+Chiang+Mai']]},
 {date:'29.09',place:'צ׳יאנג מאי',title:'אישור עדכני מ-Elephant Nature Park',status:'open',detail:'הפעילות מוזמנת ואיסוף 07:30-08:00 וחזרה סביב 14:30 כבר אושרו. מייל נוסף נשלח ב-28.9 כדי לוודא שהפעילות מתקיימת כרגיל במזג האוויר הנוכחי.'},
 {date:'29.09',place:'חזרה מהפילים',title:'להזמין Grab ל-Arcade 2',status:'open',detail:'כשמתקרבים למלון לפתוח Grab, לקבוע איסוף מ-Arun Rawee ויעד Chiang Mai Arcade 2. לצאת מהמלון עד 15:15.',actions:[['פתיחת Grab','https://www.grab.com/th/en/download/'],['מסלול ל-Arcade 2','https://www.google.com/maps/dir/?api=1&origin=Arun+Rawee+Chiang+Mai&destination=Chiang+Mai+Arcade+Bus+Terminal+2']]},
 {date:'29.09',place:'Chiang Mai Arcade 2 ← Pai',title:'המיניוואן לפאי יצא ב-15:30',status:'done',detail:'יציאה בפועל מצ׳יאנג מאי ארקייד 2 בשעה 15:30. הגעה משוערת לפאי סביב 19:50, בהתאם לתנועה ולעצירות.',actions:[['המסלול לפאי','https://www.google.com/maps/dir/?api=1&origin=Chiang+Mai+Arcade+Bus+Terminal+2&destination=Pai+Bus+Station']]},
 {date:'29.09',place:'Reverie Siam Resort',title:'החלטה לגבי הארכת פאי',status:'done',detail:'הוחלט להשאיר כרגע את ההזמנות ללא שינוי. לאחר ההגעה לפאי אפשר לבחון מחדש, בלי לשנות מראש את הטיסה או את מלון Pullman Bangkok.'},
 {date:'30.09',place:'פאי',title:'אישור פעילות Pai Zipline',status:'open',detail:'נשלח מייל ב-28.9 לבדיקת פעילות Package A בשעה 10:00, זמינות, ביטול עקב מזג אוויר והסעה מ-Reverie Siam Resort. להמתין לתשובה לפני תשלום.',actions:[['אתר Pai Zipline','https://paizipline.com/product/package-a/'],['ניווט ל-Pai Zipline','https://www.google.com/maps/search/?api=1&query=Pai+Zipline+Thailand']]},
 {date:'20.09',place:'פאי ← צ׳יאנג מאי, נסיעה ב-1.10',title:'להזמין מראש ואן חזרה לצ׳יאנג מאי',status:'open',detail:'לסגור עד 22.9 ולא להמתין ליום הנסיעה. לפתוח 12Go, לבחור Pai to Chiang Mai בתאריך 1.10 ושעה קרובה ל-09:00. לוודא הגעה לפני הטיסה, כבודה ונקודת הורדה, לשלם ולשמור שובר.',actions:[['הזמנה ב-12Go','https://12go.asia/en/travel/pai/chiang-mai'],['תחנת האוטובוסים בפאי','https://www.google.com/maps/search/?api=1&query=Pai+Bus+Station']]},
 {date:'לפני 03.10',place:'בנגקוק',title:'לינה ל-3 עד 8 באוקטובר',status:'open',detail:'המסלולים שובצו אך הלינה לתאריכים אלה עדיין פתוחה. לבחור מלון עם ביטול נוח ובקרבת BTS או MRT ולשמור את השובר.',actions:[['מלונות ליד BTS בבנגקוק','https://www.google.com/maps/search/?api=1&query=hotels+near+BTS+Bangkok'],['פתיחת Booking','https://www.booking.com/searchresults.html?ss=Bangkok%2C+Thailand']]},
 {date:'לפני הטיסה',place:'נתב״ג, טרמינל 3 שלוחה D או טרמינל 1 ליד שער 37',title:'לאסוף כרטיס PassportCard',status:'open',detail:'האיסוף זמין 24/7 ורק לתמיר בהצגת תעודה מזהה. לאחר האיסוף להוסיף את הכרטיס לארנק הדיגיטלי ולשמור באנשי הקשר את מוקד PassportCard: WhatsApp ‏050-6708544, שיחה מחו״ל ‏+972-9-8920930.',actions:[['נקודות איסוף PassportCard','https://link.passportcard.co.il/Card'],['WhatsApp PassportCard','https://wa.me/972506708544'],['חיוג למוקד מחו״ל','tel:+97298920930']]}
];
const TASKS_STATE_KEY='thailand-trip-tasks-v1';
const CUSTOM_TASKS_KEY='thailand-trip-custom-tasks-v1';
const POI_STATE_KEY='thailand-trip-poi-state-v1';
defaultTasks.forEach((task,index)=>task.id='trip-task-'+index);
function loadTaskState(){
 try{return JSON.parse(localStorage.getItem(TASKS_STATE_KEY)||'{}')||{}}
 catch(_){return {}}
}
let taskState=loadTaskState();
function loadCustomTasks(){
 try{return JSON.parse(localStorage.getItem(CUSTOM_TASKS_KEY)||'[]')||[]}
 catch(_){return []}
}
let customTasks=loadCustomTasks();
function saveTaskState(){localStorage.setItem(TASKS_STATE_KEY,JSON.stringify(taskState))}
function saveCustomTasks(){localStorage.setItem(CUSTOM_TASKS_KEY,JSON.stringify(customTasks))}
function allTaskSources(){return [...defaultTasks,...customTasks]}
function tasks(){return allTaskSources().filter(task=>!taskState[task.id]?.deleted).map(task=>({...task,...taskState[task.id],status:taskState[task.id]?.status||task.status}))}
const poi={'26.09':[['🎉','פול מון פארטי','Haad Rin Nok Koh Phangan']], '27.09':[['🏖️','חוף האד רין','Haad Rin Koh Phangan'],['🌴','בנגראק ביץ׳','Bangrak Beach Koh Samui']], '28.09':[['🌙','נייט בזאר','Chiang Mai Night Bazaar']], '29.09':[['🐘','Elephant Nature Park','Elephant Nature Park Chiang Mai'],['🌙','שוק הלילה פאי','Pai Walking Street']]};
function loadPoiState(){try{return JSON.parse(localStorage.getItem(POI_STATE_KEY)||'{}')||{}}catch(_){return {}}}
function savePoiState(state){localStorage.setItem(POI_STATE_KEY,JSON.stringify(state))}
function dayPois(day){const state=loadPoiState(),base=(poi[day]||[]).map((x,i)=>({id:'poi-'+day+'-'+i,icon:x[0],name:x[1],query:x[2],...(state['poi-'+day+'-'+i]||{})})).filter(x=>!x.deleted),custom=(state.custom||[]).filter(x=>x.day===day&&!x.deleted);return [...base,...custom]}
function maps(q){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)}
function taskActions(task){return '<div class="task-actions">'+(task.status==='open'?'<button class="task-done" data-task-id="'+task.id+'" type="button">✓ בוצע</button>':'')+'<button class="task-edit" data-task-id="'+task.id+'" type="button">✏️ עריכה</button><button class="task-delete" data-task-id="'+task.id+'" type="button">🗑️ מחיקה</button></div>'}
function taskActionLinks(task){return task.actions?.length?'<div class="task-links">'+task.actions.map(([label,url])=>'<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(label)+'</a>').join('')+'</div>':''}
function taskMarkup(task,showDate=false){return '<div class="trip-alert" data-task-card="'+task.id+'"><b>'+(task.status==='done'?'🟢 ':'🔴 ')+(showDate?esc(task.date)+' · ':'')+esc(task.title)+'</b><small>'+esc(task.place)+'</small>'+(task.reminder?'<small class="task-reminder">⏰ '+esc(task.reminder)+'</small>':'')+'<p>'+esc(task.detail)+'</p>'+taskActionLinks(task)+taskActions(task)+'</div>'}
function taskCard(day){const a=tasks().filter(x=>x.date===day);return '<section class="info-card"><div class="section-title-row"><h3>📋 משימות</h3><button class="add-btn" data-add-task-day="'+esc(day)+'" type="button">+ הוספה</button></div>'+(a.length?a.map(x=>taskMarkup(x)).join(''):'<p>🟢 אין כרגע משימה ליום הזה.</p>')+'</section>'}
function poiCard(day){const a=dayPois(day);return '<section class="info-card"><div class="section-title-row"><h3>📍 נקודות עניין קרובות</h3><button class="add-btn" data-add-poi="'+esc(day)+'" type="button">+ הוספה</button></div>'+(a.length?'<div class="poi-list">'+a.map(x=>'<div class="poi-edit-row"><a href="'+maps(x.query)+'" target="_blank" rel="noopener"><span>'+esc(x.icon)+'</span><b>'+esc(x.name)+'</b><small>פתח במפות Google</small></a><button data-edit-poi="'+esc(x.id)+'" data-poi-day="'+esc(day)+'" type="button">עריכה</button><button data-delete-poi="'+esc(x.id)+'" data-poi-day="'+esc(day)+'" type="button">מחק</button></div>').join('')+'</div>':'<p>אין נקודות עניין ליום הזה.</p>')+'</section>'}
function enhance(){const p=$('#inlinePanel');if(!p||!p.classList.contains('show'))return;const day=document.querySelector('.day-tile.active')?.dataset.day||window.__currentTripDay;if(!day)return;if(!p.querySelector('.trip-alerts-added')){const wrap=document.createElement('div');wrap.className='trip-alerts-added';wrap.innerHTML=taskCard(day)+poiCard(day);const flex=[...p.querySelectorAll('.info-card')].find(x=>x.textContent.includes('זמן חופשי'));if(flex)p.insertBefore(wrap,flex);else p.appendChild(wrap)}p.onclick=handleTaskAction}
const old=window.openDay;if(typeof old==='function'){window.openDay=function(id){window.__currentTripDay=id;document.querySelectorAll('.day-tile').forEach(x=>x.classList.toggle('active',x.dataset.day===id));old(id);setTimeout(enhance,0)};document.querySelectorAll('.day-tile[data-day]').forEach(b=>b.onclick=()=>window.openDay(b.dataset.day))}
function handleTaskAction(event){
 const addPoi=event.target.closest('[data-add-poi]');if(addPoi){editPoi(null,addPoi.dataset.addPoi);return;}
 const editPoiButton=event.target.closest('[data-edit-poi]');if(editPoiButton){editPoi(editPoiButton.dataset.editPoi,editPoiButton.dataset.poiDay);return;}
 const deletePoiButton=event.target.closest('[data-delete-poi]');if(deletePoiButton){deletePoi(deletePoiButton.dataset.deletePoi,deletePoiButton.dataset.poiDay);return;}
 const addButton=event.target.closest('[data-add-task-day]');if(addButton){addTask(addButton.dataset.addTaskDay);return;}
 const button=event.target.closest('[data-task-id]');if(!button)return;
 const task=tasks().find(item=>item.id===button.dataset.taskId);if(!task)return;
 if(button.classList.contains('task-done')){
  if(!confirm('האם לאשר שהמשימה בוצעה ולהעביר אותה לרשימת „בוצעו”?'))return;
  taskState[task.id]={...(taskState[task.id]||{}),status:'done'};saveTaskState();window.openAlerts();
 }
 if(button.classList.contains('task-delete')){
  if(!confirm('למחוק את המשימה „'+task.title+'”?'))return;
  taskState[task.id]={...(taskState[task.id]||{}),deleted:true};saveTaskState();window.openAlerts();
 }
 if(button.classList.contains('task-edit')){
  const title=prompt('שם המשימה',task.title);if(title===null||!title.trim())return;
  const date=prompt('תאריך או מועד',task.date||'ללא תאריך');if(date===null)return;
  const place=prompt('מקום',task.place||'');if(place===null)return;
  const detail=prompt('פרטים',task.detail||'');if(detail===null)return;
  taskState[task.id]={...(taskState[task.id]||{}),title:title.trim(),date:date.trim()||'ללא תאריך',place:place.trim(),detail:detail.trim()};saveTaskState();window.openAlerts();
 }
}
function editPoi(id,day){const state=loadPoiState(),current=id?dayPois(day).find(x=>x.id===id):null;const name=prompt('שם נקודת העניין',current?.name||'');if(name===null||!name.trim())return;const icon=prompt('אייקון',current?.icon||'📍');if(icon===null)return;const query=prompt('שם או כתובת לניווט',current?.query||name.trim());if(query===null)return;if(id?.startsWith('custom-poi-')){const item=(state.custom||[]).find(x=>x.id===id);if(item)Object.assign(item,{name:name.trim(),icon:icon.trim()||'📍',query:query.trim()||name.trim()})}else if(id){state[id]={...(state[id]||{}),name:name.trim(),icon:icon.trim()||'📍',query:query.trim()||name.trim()}}else{state.custom=state.custom||[];state.custom.push({id:'custom-poi-'+Date.now(),day,name:name.trim(),icon:icon.trim()||'📍',query:query.trim()||name.trim()})}savePoiState(state);window.openDay(day)}
function deletePoi(id,day){if(!confirm('למחוק את נקודת העניין?'))return;const state=loadPoiState();if(id.startsWith('custom-poi-')){const item=(state.custom||[]).find(x=>x.id===id);if(item)item.deleted=true}else state[id]={...(state[id]||{}),deleted:true};savePoiState(state);window.openDay(day)}
function addTask(defaultDate='ללא תאריך'){
 const title=prompt('שם המשימה החדשה');if(title===null||!title.trim())return;
 const date=prompt('תאריך או מועד',defaultDate);if(date===null)return;
 const place=prompt('מקום','');if(place===null)return;
 const detail=prompt('פרטים','');if(detail===null)return;
 customTasks.push({id:'custom-task-'+Date.now(),title:title.trim(),date:date.trim()||'ללא תאריך',place:place.trim(),detail:detail.trim(),status:'open'});saveCustomTasks();window.openAlerts();
}
window.openAlerts=function(){const p=$('#inlinePanel'),all=tasks(),open=all.filter(x=>x.status==='open'),done=all.filter(x=>x.status==='done');p.innerHTML='<div class="inline-head"><div><small>'+done.length+' בוצעו · '+open.length+' פתוחות</small><h2>📋 מרכז משימות</h2></div><button id="closeAlerts" class="close-red" type="button">סגור</button></div><section class="info-card task-create-card"><button id="addTaskBtn" class="add-btn" type="button">+ הוסף משימה חדשה</button></section><section class="info-card"><h3>🟠 פתוחות והמשך הטיול</h3>'+(open.length?open.map(x=>taskMarkup(x,true)).join(''):'<p class="tasks-empty">אין משימות פתוחות.</p>')+'</section><section class="info-card"><h3>🟢 בוצעו ומה שכבר היה</h3>'+(done.length?done.map(x=>taskMarkup(x,true)).join(''):'<p class="tasks-empty">עדיין אין משימות שבוצעו.</p>')+'</section>';p.classList.add('show');p.onclick=handleTaskAction;$('#addTaskBtn').onclick=()=>addTask();$('#closeAlerts').onclick=()=>{p.classList.remove('show');p.innerHTML=''};p.scrollIntoView({behavior:'smooth',block:'start'})}
})();

/* Trip app update: current operational reminders and completed trip tasks. */
(()=>{
 const doneIds=[0,2,12,13,14,17,18];
 const doneDetails={
  0:["תור חיסוני מטיילים בשעה 17:00","החיסונים בוצעו ב-16.9."],
  2:["מילוי TDAC","הטופס הוגש והאישור נשמר במסמכי ההכנות."],
  12:["איסוף כל המזוודות אחרי הפילים","המשימה הושלמה ב-29.9; כל המזוודות נאספו לפני הנסיעה לפאי."],
  13:["אישור עדכני מ-Elephant Nature Park","הפארק אישר פעילות ואיסוף; הביקור בוצע ב-29.9."],
  14:["להזמין Grab ל-Arcade 2","הנסיעה ל-Arcade 2 בוצעה ב-29.9."],
  17:["Pai Zipline · בוצע","הפעילות בוצעה ב-30.9; איסוף מ-Reverie Siam בשעה 10:45. ההסעה הלוך וחזור כלולה לפי ההתכתבות. אין שובר PDF."],
  18:["כרטיס Prem Pracha · פאי לצ׳יאנג מאי מאושר","הזמנה 62KBURBC, 1.10 בשעה 13:00, הגעה משוערת 16:55, מושב 3E. להגיע ב-12:30; עד 15 ק״ג כבודה."]
 };
 doneIds.forEach(i=>{const t=defaultTasks[i];if(!t)return;const v=doneDetails[i];t.title=v[0];t.detail=v[1];t.status='done';const id=t.id;taskState[id]={...(taskState[id]||{}),status:'done'};});
 saveTaskState();
 defaultTasks.push(
  {id:'trip-task-current-01-checkout',date:'01.10',place:'Reverie Siam Resort, פאי',title:'צ׳ק-אאוט מהמלון',status:'open',reminder:'עד 12:00',detail:'לצאת עם המזוודה ולהגיע ל-Pai Walking Street עד 12:30 לכרטיס Prem Pracha.',actions:[['שובר Reverie Siam','https://mail.google.com/mail/u/?authuser=tamir.zeharya%40gmail.com#all/1a08156e1ec85b42']]},
  {id:'trip-task-current-02-van',date:'01.10',place:'Pai Walking Street',title:'צ׳ק-אין למיניוואן Prem Pracha',status:'open',reminder:'12:30 · יציאה 13:00',detail:'הצג כרטיס להזמנה 62KBURBC. מיניוואן קו 2-A14, מושב 3E, לכיוון Chiang Mai Arcade 2. מגבלת כבודה 15 ק״ג.',actions:[['פתח את כרטיס הנסיעה','https://drive.google.com/file/d/11tjombOkTJ1OWEegfxyvNXkTaz4iiJ2C/view'],['מיקום Pai Walking Street','https://www.google.com/maps/search/?api=1&query=Pai+Walking+Street+Bus+Station']]},
  {id:'trip-task-current-03-grab',date:'01.10',place:'Chiang Mai Arcade 2 → CNX',title:'להזמין מונית/Grab לשדה',status:'open',reminder:'אחרי 16:55 · יעד הגעה עד 18:50',detail:'אין רכב מוזמן מראש. מהתחנה להזמין Grab או מונית ל-Chiang Mai International Airport לקראת טיסת PG220.',actions:[['מסלול לשדה CNX','https://www.google.com/maps/dir/?api=1&origin=Chiang+Mai+Arcade+2&destination=Chiang+Mai+International+Airport']]},
  {id:'trip-task-current-04-pg220',date:'01.10',place:'Chiang Mai Airport (CNX)',title:'צ׳ק-אין ל-Bangkok Airways PG220',status:'open',reminder:'להגיע עד 18:50 · המראה 20:50',detail:'כרטיס ההזמנה המקורי עדיין מציג 20:00. שעת ההמראה עודכנה על ידי חברת התעופה ל-20:50; בדוק מסכים לשער ודלפק.',actions:[['פתח את כרטיס PG220','https://drive.google.com/file/d/1JihNVU2SmhMChpAFUo5lR4fXt7V2uyZ_/view']]},
  {id:'trip-task-current-05-pullman',date:'01.10',place:'Suvarnabhumi Airport → Pullman Bangkok Hotel G',title:'לאסוף מזוודה ולהגיע למלון',status:'open',reminder:'לאחר הנחיתה · הגעה משוערת למלון 23:00',detail:'לקחת מונית רשמית או Grab ל-188 Silom Road. המלון אישר לשמור את החדר להגעה מאוחרת; הקבלה פעילה 24 שעות.',actions:[['פתח שובר Pullman','https://drive.google.com/file/d/1-akqfhsk3hwsj8MAy3pRPt2zhOYTj0fY/view'],['ניווט ל-Pullman Bangkok Hotel G','https://www.google.com/maps/search/?api=1&query=Pullman+Bangkok+Hotel+G+188+Silom+Road']]},
  {id:'trip-task-current-06-chabad',date:'01.10',place:'Bangkok · Chabad House',title:'להירשם לסעודת שבת/חג בבית חב״ד',status:'open',reminder:'היום · לפני יום שישי 2.10',detail:'בעמוד הרשמי מופיעה הרשמה לשבת/חג. הדלקת נרות ביום שישי 2.10 בשעה 17:49. אין אישור הרשמה שמור כרגע.',actions:[['הרשמה רשמית לשבת/חג','https://chabadthailand.co.il/shabbat/'],['פרטי בית חב״ד בנגקוק','https://chabadthailand.co.il/houses/bangkok/'],['טלפון / WhatsApp בית חב״ד','tel:+6626292770'],['דוא״ל בית חב״ד','mailto:bkk@chabadthailand.com']]},
  {id:'trip-task-current-07-checkout',date:'03.10',place:'Pullman Bangkok Hotel G',title:'צ׳ק-אאוט עד 12:00',status:'open',reminder:'12:00',detail:'ההזמנה הנוכחית מסתיימת ב-3.10. שובר הלינה הבא או יעד הלינה הבא עדיין לא צורף לאפליקציה.',actions:[['פתח שובר Pullman','https://drive.google.com/file/d/1-akqfhsk3hwsj8MAy3pRPt2zhOYTj0fY/view']]},
  {id:'trip-task-current-08-next-stay',date:'03.10',place:'Bangkok',title:'לסגור לינה והעברה להמשך הטיול',status:'open',reminder:'לפני הצ׳ק-אאוט',detail:'לילות 3–8.10 נשארו ללא שובר משויך בתוכנית הנוכחית. אחרי בחירת Bangkok או Koh Tao, להוסיף כל כרטיס ושובר ללג המתאים.',actions:[['מלונות בבנגקוק','https://www.booking.com/searchresults.html?ss=Bangkok%2C+Thailand'],['בדיקת נסיעות Bangkok → Koh Tao','https://12go.asia/en/travel/bangkok/koh-tao']]}
 );
})();

(()=>{defaultTasks.push({id:'trip-task-current-30-pai-complete',date:'30.09',place:'Pai',title:'יום פאי הושלם: זיפליין, מפל, גשר, קניון ו-Two Huts',status:'done',detail:'Pai Zipline הושלם. בהמשך בוצע מסלול נהג פרטי: Pambok Waterfall → Bamboo Bridge → Pai Canyon → Two Huts. הנהג לכל היום, בתוספת תשלום.'});})();
