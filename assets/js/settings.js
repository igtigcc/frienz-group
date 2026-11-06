(() => {
  const $=id=>document.getElementById(id);if(!$("musicToggle"))return;
  const F=window.Freindz;
  const vars={colorBg:"--bg",colorCard:"--card",colorText:"--text",colorPrimary:"--primary",colorSecondary:"--secondary",colorBorder:"--border"};
  const defaults={colorBg:"#fff4f8",colorCard:"#ffffff",colorText:"#392a3d",colorPrimary:"#e95b91",colorSecondary:"#ffe1ec",colorBorder:"#f1d9e4"};
  function apply(values){Object.entries(vars).forEach(([id,v])=>{if(values[id]&&/^#[0-9a-f]{6}$/i.test(values[id])){document.documentElement.style.setProperty(v,values[id]);$(id).value=values[id];}});}
  apply(F.getJSON("freindzCustomColors",{}));
  Object.keys(vars).forEach(id=>$(id).addEventListener("input",()=>{
    const values={};Object.keys(vars).forEach(k=>values[k]=$(k).value);apply(values);F.setJSON("freindzCustomColors",values);
  }));
  $("resetColors").addEventListener("click",()=>{localStorage.removeItem("freindzCustomColors");apply(defaults);});
  document.querySelectorAll(".theme-choice").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.theme===(localStorage.getItem("freindzTheme")||"light"));
    btn.addEventListener("click",()=>{
      document.body.classList.remove("dark","rainbow");
      if(btn.dataset.theme!=="light")document.body.classList.add(btn.dataset.theme);
      document.querySelectorAll(".theme-choice").forEach(b=>b.classList.toggle("active",b===btn));
      localStorage.setItem("freindzTheme",btn.dataset.theme);
    });
  });
  let audio=null,master=null,timer=null,playing=false,index=0;
  const melodies={chill:[261.63,329.63,392,329.63,293.66,349.23,440,349.23],happy:[392,440,523.25,440,392,523.25,587.33,523.25],lofi:[220,261.63,329.63,293.66,196,246.94,293.66,261.63]};
  function note(){
    if(!audio||!master)return;const melody=melodies[$("musicSelect").value];if(!melody)return;
    const osc=audio.createOscillator(),gain=audio.createGain();osc.type=$("musicSelect").value==="lofi"?"triangle":"sine";
    osc.frequency.value=melody[index++%melody.length];gain.gain.setValueAtTime(.0001,audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.09,audio.currentTime+.05);gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.58);
    osc.connect(gain);gain.connect(master);osc.start();osc.stop(audio.currentTime+.62);
  }
  function stop(){clearInterval(timer);playing=false;$("musicToggle").textContent="Play music";}
  async function toggle(){
    if(playing){stop();return;}
    if($("musicSelect").value==="none")$("musicSelect").value="chill";
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio){alert("Your browser does not support Web Audio.");return;}
    audio??=new Audio();await audio.resume();master??=audio.createGain();
    master.connect(audio.destination);master.gain.value=Number($("volume").value)/100;
    playing=true;$("musicToggle").textContent="Stop music";note();timer=setInterval(note,650);
  }
  $("musicToggle").addEventListener("click",toggle);
  $("volume").addEventListener("input",()=>{$("volumeValue").textContent=$("volume").value+"%";if(master)master.gain.value=Number($("volume").value)/100;});
  $("musicSelect").addEventListener("change",()=>{if(playing){stop();toggle();}});
})();