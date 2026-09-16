(()=>{
const KEY='thailand_saved_places_v1';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
const write=a=>localStorage.setItem(KEY,JSON.stringify(a));
let coords=null;
function renderList(){
 const list=$('#savedPlacesList'),items=read();
 if(!list)return;
 list.innerHTML=items.length?items.map((p,i)=>`<article class="saved-place"><div><b>📍 ${esc(p.name)}</b><small>${esc(p.date)}</small><p>${esc(p.note||'ללא הערה')}</p></div><div class="saved-actions"><a href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}" target="_blank" rel="noopener">מפות</a><button data-delete="${i}" type="button">מחק</button></div></article>`).join(''):'<p class="empty-places">עדיין לא שמרת מקומות. אפשר לשמור מסעדה, חוף, מלון או מקום שהגעת אליו במקרה.</p>';
 list.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{const a=read();a.splice(+b.dataset.delete,1);write(a);renderList()});
}
function locate(){
 const status=$('#placeLocationStatus');
 if(!navigator.geolocation){status.textContent='המכשיר אינו מאפשר קבלת מיקום.';return}
 status.textContent='מאתר את המיקום שלך...';
 navigator.geolocation.getCurrentPosition(pos=>{coords={lat:pos.coords.latitude,lng:pos.coords.longitude};status.textContent=`המיקום נקלט: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;$('#saveCurrentPlace').disabled=false},()=>{status.textContent='לא התקבלה הרשאת מיקום. אפשר לאשר מיקום בדפדפן ולנסות שוב.'},{enableHighAccuracy:true,timeout:12000,maximumAge:30000});
}
function open(){
 const p=$('#inlinePanel');
 p.innerHTML=`<div class="inline-head"><div><small>יומן מקומות אישי</small><h2>📍 המקומות ששמרתי</h2><p>שמור מקום שהגעת אליו במקרה כדי שתוכל לחזור אליו אחר כך.</p></div><button id="closeSavedPlaces" class="close-red" type="button">סגור</button></div>
 <section class="info-card save-place-card"><h3>שמירת המקום הנוכחי</h3><label>שם המקום<input id="placeName" type="text" placeholder="למשל: בר קטן שהכרתי בפאי"></label><label>הערה<input id="placeNote" type="text" placeholder="עם מי הייתי, מה אהבתי או מה להזמין"></label><button id="locatePlace" class="place-primary" type="button">📡 קבל את המיקום שלי</button><p id="placeLocationStatus" class="place-status">המיקום נשמר רק במכשיר שלך.</p><button id="saveCurrentPlace" class="place-save" type="button" disabled>שמור מקום</button></section>
 <section class="info-card"><h3>המקומות השמורים</h3><div id="savedPlacesList"></div></section>`;
 p.classList.add('show');p.scrollIntoView({behavior:'smooth',block:'start'});
 $('#closeSavedPlaces').onclick=()=>{p.classList.remove('show');p.innerHTML=''};
 $('#locatePlace').onclick=locate;
 $('#saveCurrentPlace').onclick=()=>{const name=$('#placeName').value.trim();if(!name){$('#placeLocationStatus').textContent='צריך לתת למקום שם.';return}if(!coords){locate();return}const now=new Date();const a=read();a.unshift({name,note:$('#placeNote').value.trim(),lat:coords.lat,lng:coords.lng,date:now.toLocaleString('he-IL')});write(a);coords=null;$('#placeName').value='';$('#placeNote').value='';$('#saveCurrentPlace').disabled=true;$('#placeLocationStatus').textContent='המקום נשמר בהצלחה במכשיר.';renderList()};
 renderList();
}
window.openSavedPlaces=open;
const fab=$('#savePlaceFab');if(fab)fab.onclick=open;
})();
