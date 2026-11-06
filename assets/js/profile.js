(() => {
  const $=id=>document.getElementById(id);if(!$("profileForm"))return;
  const F=window.Freindz,fields=["profileName","profileAge","profileArea","profileHobbies","profileBio"];
  let photo="";
  const saved=F.getJSON("freindzProfile",{});
  fields.forEach(id=>{if(saved[id]!==undefined)$(id).value=saved[id];});
  if(saved.photo){photo=saved.photo;$("photoPreview").src=photo;$("photoPreview").hidden=false;$("photoPlaceholder").hidden=true;}
  $("photoInput").addEventListener("change",()=>{
    const file=$("photoInput").files[0];if(!file)return;
    if(!file.type.startsWith("image/")){alert("Please choose an image.");return;}
    if(file.size>2*1024*1024){alert("Please choose an image smaller than 2 MB.");return;}
    const reader=new FileReader();reader.onload=()=>{photo=reader.result;$("photoPreview").src=photo;$("photoPreview").hidden=false;$("photoPlaceholder").hidden=true;};reader.readAsDataURL(file);
  });
  $("profileForm").addEventListener("submit",e=>{
    e.preventDefault();const age=$("profileAge").value;
    if(age&&(Number(age)<13||Number(age)>120)){alert("Enter an age from 13 to 120, or leave it blank.");return;}
    const data={};fields.forEach(id=>data[id]=$(id).value.trim());data.photo=photo;
    try{F.setJSON("freindzProfile",data);$("profileStatus").textContent="Your profile is saved in this browser.";}
    catch{$("profileStatus").textContent="Could not save. Try a smaller photo.";}
  });
})();