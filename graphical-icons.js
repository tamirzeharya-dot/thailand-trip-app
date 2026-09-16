(()=>{
const base='https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/';
const icons={
 prep:['1f9f3','mint'],'25.09':['2708','sky'],'26.09':['1f3dd','aqua'],'27.09':['26f4','blue'],
 '28.09':['1f6d5','gold'],'29.09':['1f418','orange'],'30.09':['1f9d7','leaf'],'01.10':['1f690','violet'],
 '02.10':['1f3d9','rose'],'03-08.10':['1f9ed','teal'],'09.10':['1f6ec','navy'],general:['1f9f0','green']
};
function iconHtml(code){return `<img class="color-tile-icon" src="${base}${code}.svg" alt="" loading="lazy">`}
function apply(){
 document.querySelectorAll('.day-tile[data-day]').forEach(tile=>{
  const target=tile.querySelector('.tiny-icon'),item=icons[tile.dataset.day];
  if(target&&item){target.className=`tiny-icon icon-tone-${item[1]}`;target.innerHTML=iconHtml(item[0])}
 });
 const general=document.querySelector('#generalLinksCard .tiny-icon'),item=icons.general;
 if(general){general.className=`tiny-icon icon-tone-${item[1]}`;general.innerHTML=iconHtml(item[0])}
}
apply();
})();