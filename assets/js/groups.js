(() => {
  const $=id=>document.getElementById(id);if(!$("groupForm"))return;
  const F=window.Freindz;
  const starter=[{id:"demo-1",game:"Minecraft",platform:"Cross-platform",players:"2",details:"Casual survival world — friendly players welcome."},{id:"demo-2",game:"Rocket League",platform:"Xbox",players:"1",details:"Chill matches, mic optional."}];
  let posts=F.getJSON("freindzGroupPosts",starter);
  function render(){
    const root=$("groupPosts");root.innerHTML="";$("postCount").textContent=`${posts.length} ${posts.length===1?"post":"posts"}`;
    if(!posts.length){root.innerHTML='<div class="empty-state">No posts yet. Be the first to start a session!</div>';return;}
    posts.forEach(post=>{
      const card=document.createElement("article");card.className="group-card";
      const title=document.createElement("h3");title.textContent="🎮 "+post.game;
      const meta=document.createElement("div");meta.className="group-meta";meta.textContent=`${post.platform} · Looking for ${post.players} player(s)`;
      const details=document.createElement("p");details.textContent=post.details;
      const interested=document.createElement("button");interested.className="button button-soft";interested.type="button";interested.textContent="I'm interested";
      interested.addEventListener("click",()=>alert("This is a local demo board. Real invites and shared posts need a server and user accounts."));
      card.append(title,meta,details,interested);root.append(card);
    });
  }
  $("groupForm").addEventListener("submit",e=>{
    e.preventDefault();posts.unshift({id:String(Date.now()),game:$("gameName").value.trim(),platform:$("gamePlatform").value,players:$("gamePlayers").value,details:$("gameDetails").value.trim()});
    F.setJSON("freindzGroupPosts",posts);$("groupForm").reset();render();
  });
  render();
})();