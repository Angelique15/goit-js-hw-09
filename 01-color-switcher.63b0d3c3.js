const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.body;let d;t.addEventListener("click",(()=>{t.disabled=!0,d=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;a.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(()=>{clearInterval(d),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.63b0d3c3.js.map
