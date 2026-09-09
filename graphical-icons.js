(()=>{
  const svg=(body)=>`<svg class="day-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const icons={
    prep:svg('<rect x="7" y="4" width="10" height="16" rx="2"/><path d="M9 4V2h6v2M9 9h6M12 9v7M9 20v2M15 20v2"/>'),
    '25.09':svg('<path d="M3 11l18-7-7 18-3-8-8-3z"/><path d="M11 14l4-4"/>'),
    '26.09':svg('<path d="M12 3v5M6.5 5.5l3 3M17.5 5.5l-3 3M5 12h14M7 12l1.5 8h7L17 12"/><path d="M9 16h6"/>'),
    '27.09':svg('<path d="M4 14h16l-2 4H6l-2-4z"/><path d="M7 14V8h10v6M9 8V5h6v3M3 20c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/>'),
    '28.09':svg('<path d="M12 3l3 4H9l3-4zM7 10h10M6 14h12M5 18h14M8 7v11M16 7v11"/>'),
    '29.09':svg('<path d="M7 16c-2.5 0-4-1.8-4-4.2C3 8.5 5.6 6 9 6h5c3.7 0 7 2.6 7 6.2 0 2.1-1.3 3.8-3.5 3.8"/><path d="M7 11v9M17 11v9M10 12h4M4.5 9.5C2.5 8.5 2 6.5 3 5M15 6c1-2 3-2 4-1.2 1 .8.8 2.5-.5 3.2"/>'),
    '30.09':svg('<path d="M4 5h16M6 5l5 6M18 5l-5 6M11 11h2l2 3-3 6-3-6 2-3z"/><circle cx="6" cy="5" r="1.5"/><circle cx="18" cy="5" r="1.5"/>'),
    '01.10':svg('<path d="M4 21V8l6-4v17M10 21V11l5-3v13M15 21V5l5 3v13M7 10h1M7 14h1M12 13h1M12 17h1M17 10h1M17 14h1"/>'),
    '02.10':svg('<circle cx="12" cy="5" r="2"/><path d="M12 7l-2 5 3 2 2-4M10 12l-3 4M13 14l-1 6M15 10l3 2"/>'),
    '03-08.10':svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h3M14 14h3M7 18h3"/>'),
    '09.10':svg('<path d="M3 11l18-7-7 18-3-8-8-3z"/><path d="M11 14l4-4"/>'),
    general:svg('<path d="M5 7h14M5 12h14M5 17h14"/>')
  };
  function apply(){
    document.querySelectorAll('.day-tile[data-day]').forEach(tile=>{
      const target=tile.querySelector('.tiny-icon');
      const icon=icons[tile.dataset.day];
      if(target&&icon) target.innerHTML=icon;
    });
    const general=document.querySelector('#generalLinksCard .tiny-icon');
    if(general) general.innerHTML=icons.general;
  }
  apply();
})();
