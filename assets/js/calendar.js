(() => {
  const $ = id => document.getElementById(id);
  const F = window.Freindz;
  if (!$("calendarGrid")) return;
  let month = new Date(); month.setDate(1);
  let selected = "";
  let events = F.getJSON("freindzEvents",[]);
  const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  function draw() {
    $("monthTitle").textContent = month.toLocaleDateString(undefined,{month:"long",year:"numeric"});
    const grid=$("calendarGrid"); grid.innerHTML="";
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day=>{const el=document.createElement("div");el.className="day-name";el.textContent=day;grid.append(el);});
    const offset=new Date(month.getFullYear(),month.getMonth(),1).getDay();
    const count=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
    for(let i=0;i<offset;i++) grid.append(document.createElement("div"));
    for(let day=1;day<=count;day++){
      const key=dateKey(new Date(month.getFullYear(),month.getMonth(),day));
      const btn=document.createElement("button");btn.type="button";btn.className="day";btn.textContent=day;
      btn.setAttribute("aria-label",key);
      if(key===selected)btn.classList.add("selected");
      if(events.some(e=>e.date===key))btn.classList.add("has-event");
      btn.addEventListener("click",()=>{selected=key;$("eventDate").value=key;draw();});
      grid.append(btn);
    }
    drawEvents();
  }
  function drawEvents(){
    const list=$("eventList");list.innerHTML="";
    const shown=selected?events.filter(e=>e.date===selected):events;
    $("eventHeading").textContent=selected?`Hangouts on ${selected}`:"Upcoming hangouts";
    if(!shown.length){list.innerHTML=`<div class="empty-state">No hangouts planned here yet. Add one above ✨</div>`;return;}
    shown.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).forEach(event=>{
      const card=document.createElement("article");card.className="event-item";
      const title=document.createElement("strong");title.textContent=event.name;
      const details=document.createElement("p");details.textContent=`${event.date} · ${event.time}${event.place?" · "+event.place:""}`;
      const remove=document.createElement("button");remove.type="button";remove.textContent="Remove plan";
      remove.addEventListener("click",()=>{events=events.filter(e=>e.id!==event.id);F.setJSON("freindzEvents",events);draw();});
      card.append(title,details,remove);list.append(card);
    });
  }
  $("prevMonth").addEventListener("click",()=>{month.setMonth(month.getMonth()-1);draw();});
  $("nextMonth").addEventListener("click",()=>{month.setMonth(month.getMonth()+1);draw();});
  $("showAllEvents").addEventListener("click",()=>{selected="";draw();});
  $("eventDate").value=dateKey(new Date());
  $("eventForm").addEventListener("submit",e=>{
    e.preventDefault();
    const event={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),date:$("eventDate").value,time:$("eventTime").value,name:$("eventName").value.trim(),place:$("eventPlace").value.trim()};
    if(!event.date||!event.time||!event.name)return;
    events.push(event);F.setJSON("freindzEvents",events);selected=event.date;month=new Date(event.date+"T12:00:00");month.setDate(1);
    $("eventName").value="";$("eventPlace").value="";draw();
  });
  draw();
})();