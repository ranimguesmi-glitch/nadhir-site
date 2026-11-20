// ---- Team (edit names/roles here) ----
var T=[["Eya Azzouzi","Media Manager","eya"],["Emna Khmiri","Team Member","emna"],["Essil Balti","HR Manager","essil"],["Dalia Riahi","Chair","dalia"],["Aziz Ellouze","Team Member","aziz"],["Sonia Chawad","Team Member","sonia"],["Meriam Remadi","Sponsorship Manager","meriam"],["Houssein El Yatim","Project Manager","houssein"]];
var P={eya:"images/eya.jpg",emna:"images/emna.jpg",essil:"images/essil.jpg",dalia:"images/dalia.jpg",aziz:"images/aziz.jpg",sonia:"images/sonia.jpg",meriam:"images/meriam.jpg",houssein:"images/houssein.jpg"};
document.getElementById("arch").innerHTML=T.map(function(t){return '<div class="m"><img class="av" src="'+P[t[2]]+'" alt="'+t[0]+'"><b>'+t[0]+'</b><span>'+t[1]+'</span></div>'}).join("");

// ---- Demo ----
var S={
NORMAL:{c:"#2e8b62",l:"Normal",n:"Nobody is notified.",t:"Last signal: 3 s ago",d:[["Oil temp","62","°C",.5,"0.91","OK"],["Winding temp","71","°C",.55,"0.88","OK"],["Pressure","1.2","bar",.4,"0.93","OK"]],lamp:[0,0,1],siren:0},
WATCH:{c:"#c9a227",l:"Watch",n:"Electrician notified by SMS.",t:"Last signal: 2 s ago",d:[["Oil temp","84","°C",.78,"0.82","OK"],["Winding temp","79","°C",.65,"0.8","OK"],["Pressure","1.3","bar",.43,"0.9","OK"]],lamp:[0,1,0],siren:0},
INTERVENE:{c:"#c0392b",l:"Intervene now",n:"Electrician + guard notified together. No reply in 5 min: voice call, then maintenance manager, then plant manager.",t:"Last signal: 1 s ago",d:[["Oil temp","98","°C",.95,"0.9","OK"],["Winding temp",null,"",0,"0.21","REJECTED"],["Pressure","1.7","bar",.8,"0.74","UNCERTAIN"]],lamp:[1,0,0],siren:1},
OFFLINE:{c:"#6b7480",l:"System offline",n:"Electrician notified: the box has stopped sending signals.",t:"Last signal: 12 min ago",d:[["Oil temp","—","",0,"—","—"],["Winding temp","—","",0,"—","—"],["Pressure","—","",0,"—","—"]],lamp:[0,0,0],siren:0}};
var K=Object.keys(S),cur="NORMAL";
var sw=document.getElementById("sw");
sw.innerHTML=K.map(function(k){return '<button data-k="'+k+'">'+S[k].l.toUpperCase()+'</button>'}).join("");
sw.onclick=function(e){if(e.target.dataset.k){cur=e.target.dataset.k;draw()}};
function draw(){var s=S[cur];
[].forEach.call(sw.children,function(b){b.className=b.dataset.k===cur?"on":""});
var b=document.getElementById("banner");b.style.background=s.c;
b.innerHTML='<span>'+s.l+'</span><small>'+s.t+'</small>';
document.getElementById("cards").innerHTML=s.d.map(function(d){
var bad=d[5]==="REJECTED";
return '<div class="dc"><small>'+d[0]+'</small>'+(bad?'<div class="v bad">check needed</div>':'<div class="v">'+d[1]+' <span style="font:500 13px Manrope">'+d[2]+'</span></div>')+'<div class="bar"><i style="width:'+d[3]*100+'%"></i></div><div class="st">Confidence '+d[4]+' · '+d[5]+'</div></div>'}).join("");
var cols=["#e0483a","#D99A32","#3fb27f"],nm=["Red","Orange","Green"];
document.getElementById("row").innerHTML=s.lamp.map(function(on,i){return '<div class="chip"><span class="led" style="'+(on?'background:'+cols[i]+';box-shadow:0 0 10px '+cols[i]:'')+'"></span>Lamp '+nm[i]+': '+(on?"on":"off")+'</div>'}).join("")+'<div class="chip"><span class="led" style="'+(s.siren?'background:#e0483a;box-shadow:0 0 10px #e0483a':'')+'"></span>Siren: '+(s.siren?"detected":"not detected")+'</div>';
document.getElementById("notify").textContent="Who is notified: "+s.n}
draw();

// ---- Contact form -> mailto ----
document.getElementById("f").onsubmit=function(e){e.preventDefault();var f=e.target;
location.href="mailto:ieee.sb@ensi-uma.tn?subject="+encodeURIComponent("Nadhir demo request - "+f.n.value)+"&body="+encodeURIComponent(f.m.value+"\n\n"+f.n.value+" / "+f.c.value+" / "+f.e.value)};