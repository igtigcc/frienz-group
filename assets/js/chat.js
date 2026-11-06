(() => {
  const $=id=>document.getElementById(id); if(!$("chatWindow"))return;
  const F=window.Freindz;
  let contacts=F.getJSON("freindzContacts",[{id:"alex",name:"Alex"},{id:"sam",name:"Sam"},{id:"jordan",name:"Jordan"}]);
  let active=contacts[0]?.id || "";
  const key="freindzGuestChat";
  function load(){try{return JSON.parse(sessionStorage.getItem(key)||"{}");}catch{return {};}}
  function save(data){sessionStorage.setItem(key,JSON.stringify(data));}
  function renderContacts(){
    const root=$("contactList");root.innerHTML="";
    contacts.forEach(person=>{
      const btn=document.createElement("button");btn.type="button";btn.className="contact-button"+(person.id===active?" active":"");
      const avatar=document.createElement("span");avatar.className="avatar";avatar.textContent=(person.name[0]||"?").toUpperCase();
      const label=document.createElement("span");label.innerHTML=`${F.escapeHTML(person.name)}<small>Local conversation</small>`;
      btn.append(avatar,label);btn.addEventListener("click",()=>{active=person.id;render();});root.append(btn);
    });
    const person=contacts.find(p=>p.id===active);
    $("activeName").textContent=person?.name||"Choose a contact";
    $("activeAvatar").textContent=(person?.name||"?")[0].toUpperCase();
  }
  function render(){
    renderContacts();const root=$("chatWindow");root.innerHTML="";
    const messages=load()[active]||[];
    if(!messages.length){const empty=document.createElement("div");empty.className="empty-state";empty.textContent="No messages yet. Send a friendly hello!";root.append(empty);}
    messages.forEach(m=>{
      const bubble=document.createElement("div");bubble.className="message"+(m.mine?" mine":"");
      const body=document.createElement("span");body.textContent=m.text;
      const time=document.createElement("time");time.textContent=m.time;
      bubble.append(body,time);root.append(bubble);
    });
    root.scrollTop=root.scrollHeight;
    $("chatNotice").textContent="This is a local demo. Messages are stored in this tab's session and are not delivered to other people.";
    $("chatInput").disabled=!active;
  }
  $("chatForm").addEventListener("submit",e=>{
    e.preventDefault();const text=$("chatInput").value.trim();if(!text||!active)return;
    const data=load();data[active]??=[];data[active].push({text,mine:true,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})});
    save(data);$("chatInput").value="";render();
  });
  $("addContact").addEventListener("click",()=>{
    const name=prompt("Name for your local demo contact?");
    if(!name||!name.trim())return;
    const clean=name.trim().slice(0,40),id="contact-"+Date.now();
    contacts.push({id,name:clean});F.setJSON("freindzContacts",contacts);active=id;render();
  });
  render();
})();