(()=>{
const prepAdd=['מטען נייד','שני מטענים','לקנות SIM מקומי בתאילנד - לבדוק 7-Eleven או דוכן מפעיל בנמל התעופה סוברנבומי (Suvarnabhumi Airport)'];
const safety=[
 ['🚕','מוניות','להעדיף Grab או מונית רשמית. במונית רגילה לבקש Meter. לא להסכים למחיר מנופח מראש.'],
 ['🛺','טוק טוק','לסגור מחיר ויעד לפני שעולים. להיזהר מהצעות זולות במיוחד שמובילות לחנויות או סוכנויות.'],
 ['👛','שווקים ומקומות צפופים','טלפון וארנק בכיס קדמי או תיק סגור לפנים. לא להשאיר טלפון על שולחן קרוב לרחוב.'],
 ['💳','כסף וכרטיסים','לא למסור כרטיס אשראי מחוץ לטווח הראייה. בכספומט לבדוק שאין התקן חשוד ולכסות את הקוד.'],
 ['🏨','הזמנות','לא להעביר כסף לעמוד מלון לא מוכר. לאמת הזמנה או שינוי תשלום מול המלון/הספק הרשמי.'],
 ['🏍️','קטנועים','לצלם את הקטנוע מכל הצדדים לפני קבלה. קסדה חובה. לא למסור דרכון כפיקדון אם אפשר להימנע.'],
 ['🍹','ברים ומסיבות','לא להשאיר משקה ללא השגחה. בפול מון לשמור טלפון, כסף ומסמכים בתיק סגור ולהימנע מכניסה לים כששתית.'],
 ['🚨','עזרה','משטרת התיירים: 1155, זמין 24/7 ומספק גם סיוע תרגום.']
];
const apps=[
 ['🚕','Grab','מוניות, נסיעות ומשלוחי אוכל. מומלץ להתקין ולרשום חשבון כבר בישראל.','https://www.grab.com/th/en/'],
 ['🚌','ViaBus','מידע וניווט בתחבורה ציבורית ואוטובוסים בבנגקוק.','https://www.google.com/search?q=ViaBus+Thailand+app'],
 ['🚆','BTS SkyTrain / MRT','לניווט ברכבות העירוניות בבנגקוק. Google Maps שימושי מאוד לתכנון המסלול.','https://www.google.com/maps'],
 ['🚐','12Go','כרטיסי ואנים, אוטובוסים, רכבות ומעבורות. כבר רלוונטי להזמנות שלך.','https://12go.asia/'],
 ['🗺️','Google Maps','ניווט, תחבורה ציבורית, מסעדות ונקודות עניין. להוריד מפות אופליין לפני הטיסה.','https://www.google.com/maps'],
 ['🌐','Google Translate','להוריד תאית ואנגלית לשימוש אופליין.','https://translate.google.com/'],
 ['👮','Thailand Tourist Police','סיוע לתיירים, מידע ותרגום. במקרה דחוף: 1155.','https://www.touristpolice.go.th/main']
];
function prepRows(){return prepAdd.map((t,i)=>`<label class="prep-row travel-fixed"><input type="checkbox" data-travel-prep="${i}"><span>${t}</span></label>`).join('')}
function safetyHtml(){return `<section class="info-card"><h3>⚠️ ממה להיזהר בתאילנד</h3>${safety.map(x=>`<div class="trip-alert"><b>${x[0]} ${x[1]}</b><p>${x[2]}</p></div>`).join('')}</section><section class="info-card"><h3>📱 אפליקציות שימושיות</h3><p>מומלץ להתקין ולפתוח חשבון עוד בישראל כשאפשר.</p><div class="poi-list">${apps.map(x=>`<a href="${x[3]}" target="_blank" rel="noopener"><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></a>`).join('')}</div></section>`}
function enhancePrep(){const p=document.getElementById('inlinePanel');if(!p?.classList.contains('show')||window.__currentTripDay!=='prep')return;const card=p.querySelector('.info-card');if(!card||card.querySelector('.travel-fixed'))return;card.insertAdjacentHTML('beforeend',prepRows());const done=JSON.parse(localStorage.getItem('travel_fixed_done')||'{}');card.querySelectorAll('[data-travel-prep]').forEach(x=>{x.checked=!!done[x.dataset.travelPrep];x.onchange=()=>{const d=JSON.parse(localStorage.getItem('travel_fixed_done')||'{}');d[x.dataset.travelPrep]=x.checked;localStorage.setItem('travel_fixed_done',JSON.stringify(d));}});}
const oldOpen=window.openDay;if(typeof oldOpen==='function'){window.openDay=function(id){oldOpen(id);window.__currentTripDay=id;setTimeout(enhancePrep,10)};document.querySelectorAll('.day-tile[data-day]').forEach(b=>b.onclick=()=>window.openDay(b.dataset.day));}
window.openSafety=function(){const p=document.getElementById('inlinePanel');p.innerHTML=`<div class="inline-head"><div><small>מידע שימושי לנסיעה</small><h2>🛡️ בטיחות ואפליקציות</h2></div><button id="closeSafety" class="close-red" type="button">סגור</button></div>${safetyHtml()}`;p.classList.add('show');document.getElementById('closeSafety').onclick=()=>{p.classList.remove('show');p.innerHTML=''};p.scrollIntoView({behavior:'smooth',block:'start'});}
})();