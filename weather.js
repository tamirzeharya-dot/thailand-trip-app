(()=>{
const V=window.TRIP_V3;
if(!V)return;
const places={
 '25.09':{name:'נתב״ג',lat:32.0114,lon:34.8867,tz:'Asia/Jerusalem'},
 '26.09':{name:'קופנגן',lat:9.6760,lon:100.0660,tz:'Asia/Bangkok'},
 '27.09':{name:'קוסמוי',lat:9.5584,lon:100.0560,tz:'Asia/Bangkok'},
 '28.09':{name:'צ׳יאנג מאי',lat:18.7900,lon:98.9895,tz:'Asia/Bangkok'},
 '29.09':{name:'פאי',lat:19.3580,lon:98.4407,tz:'Asia/Bangkok'},
 '30.09':{name:'פאי',lat:19.3580,lon:98.4407,tz:'Asia/Bangkok'},
 '01.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '02.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '03.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '04.10':{name:'קנצ׳נבורי',lat:14.0228,lon:99.5328,tz:'Asia/Bangkok'},
 '05.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '06.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '07.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '08.10':{name:'בנגקוק',lat:13.7257,lon:100.5258,tz:'Asia/Bangkok'},
 '09.10':{name:'בנגקוק',lat:13.6900,lon:100.7501,tz:'Asia/Bangkok'}
};
const cache=new Map();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const codeText=code=>({0:'בהיר',1:'בהיר בעיקר',2:'מעונן חלקית',3:'מעונן',45:'ערפל',48:'ערפל קפוא',51:'טפטוף קל',53:'טפטוף',55:'טפטוף חזק',56:'טפטוף קופא קל',57:'טפטוף קופא',61:'גשם קל',63:'גשם',65:'גשם חזק',66:'גשם קופא קל',67:'גשם קופא',71:'שלג קל',73:'שלג',75:'שלג חזק',77:'גרגירי שלג',80:'ממטרים קלים',81:'ממטרים',82:'ממטרים חזקים',85:'ממטרי שלג קלים',86:'ממטרי שלג חזקים',95:'סופות רעמים',96:'סופת רעמים וברד קל',99:'סופת רעמים וברד'}[code]||'משתנה');
const codeIcon=code=>code===0?'☀️':code<=2?'🌤️':code===3?'☁️':code<60?'🌫️':code<70?'🌧️':code<80?'🌨️':code<90?'🌦️':'⛈️';
function isoDate(id){const [d,m]=id.split('.');return `2026-${m}-${d}`;}
function apiUrl(place){const params=new URLSearchParams({latitude:place.lat,longitude:place.lon,daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max',timezone:place.tz,forecast_days:'16'});return `https://api.open-meteo.com/v1/forecast?${params}`;}
async function forecast(place,date){const key=`${place.lat},${place.lon},${place.tz}`;let data=cache.get(key);if(!data){const response=await fetch(apiUrl(place));if(!response.ok)throw new Error('weather');data=await response.json();cache.set(key,data)}const i=data.daily?.time?.indexOf(date)??-1;if(i<0)return null;return {code:data.daily.weather_code[i],max:Math.round(data.daily.temperature_2m_max[i]),min:Math.round(data.daily.temperature_2m_min[i]),rainChance:Math.round(data.daily.precipitation_probability_max[i]??0),rain:Number(data.daily.precipitation_sum[i]??0).toFixed(1),wind:Math.round(data.daily.wind_speed_10m_max[i]??0)};}
function weatherDays(id){const days=V.days.filter(day=>places[day.id]);const index=days.findIndex(day=>day.id===id);return index<0?[]:days.slice(index,index+4);}
function shell(id){const panel=document.getElementById('inlinePanel');if(!panel)return null;const days=weatherDays(id);if(!days.length)return null;const section=document.createElement('section');section.className='info-card weather-card';section.dataset.weatherFor=id;section.innerHTML=`<div class="weather-title"><div><h3>🌦️ מזג האוויר</h3><p>היום שבחרת והימים הבאים לפי המסלול</p></div><span class="weather-updated">מתעדכן...</span></div><div class="weather-grid"><div class="weather-loading">טוען תחזית עדכנית...</div></div><div class="weather-sources"><b>מקור:</b> <a href="https://open-meteo.com/en/docs" target="_blank" rel="noopener">Open-Meteo</a><span>·</span><a href="https://www.tmd.go.th/en/forecast/sevenday" target="_blank" rel="noopener">השירות המטאורולוגי התאילנדי</a><small>תחזית משתנה. לפני הפלגה, טיסה או פעילות חוץ יש לבדוק שוב באותו בוקר.</small></div>`;const firstRoute=panel.querySelector('.info-card');if(firstRoute)firstRoute.insertAdjacentElement('afterend',section);else panel.appendChild(section);return {section,days};}
async function loadWeather(id){const built=shell(id);if(!built)return;const {section,days}=built;try{const rows=await Promise.all(days.map(async day=>({day,place:places[day.id],value:await forecast(places[day.id],isoDate(day.id))})));const grid=section.querySelector('.weather-grid');grid.innerHTML=rows.map(({day,place,value})=>value?`<article class="weather-day"><div class="weather-day-head"><span>${codeIcon(value.code)}</span><div><b>${esc(day.date)} · ${esc(place.name)}</b><small>${esc(codeText(value.code))}</small></div></div><strong>${value.max}° <em>${value.min}°</em></strong><div class="weather-metrics"><span>💧 סיכוי ${value.rainChance}%</span><span>🌧️ ${value.rain} מ״מ</span><span>💨 עד ${value.wind} קמ״ש</span></div></article>`:`<article class="weather-day unavailable"><b>${esc(day.date)} · ${esc(place.name)}</b><small>התחזית עדיין מחוץ לטווח הזמין.</small></article>`).join('');section.querySelector('.weather-updated').textContent='עודכן עכשיו';}catch(_){section.querySelector('.weather-grid').innerHTML='<div class="weather-error">לא ניתן לטעון כרגע את התחזית. אפשר לפתוח את המקורות שלמטה לבדיקה ישירה.</div>';section.querySelector('.weather-updated').textContent='לא זמין';}}
const previous=window.openDay;
if(typeof previous==='function'){
 window.openDay=function(id){previous(id);setTimeout(()=>loadWeather(id),0)};
 document.querySelectorAll('.day-tile[data-day]').forEach(button=>button.onclick=()=>window.openDay(button.dataset.day));
}
})();
