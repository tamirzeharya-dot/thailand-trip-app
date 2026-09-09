(()=>{
  const retitleZipline=()=>{
    const tile=document.querySelector('.day-tile[data-day="30.09"] strong');
    if(tile) tile.textContent='פאי · אומגה';
  };
  retitleZipline();
  const originalOpenDay=window.openDay;
  if(typeof originalOpenDay==='function'){
    window.openDay=function(id){
      originalOpenDay(id);
      if(id==='30.09'){
        const panel=document.getElementById('inlinePanel');
        const h2=panel?.querySelector('.inline-head h2');
        if(h2) h2.textContent='פאי · אומגה';
      }
    };
    document.querySelectorAll('.day-tile[data-day]').forEach(btn=>{
      btn.onclick=()=>window.openDay(btn.dataset.day);
    });
  }
})();
