const sections={
 ISMB200:{Z:214000,I:2140,A:3340,tw:5.7,d:200,tf:8},
 ISMB250:{Z:340000,I:5250,A:3980,tw:6.1,d:250,tf:9.2},
 ISMB300:{Z:481000,I:8030,A:4540,tw:6.7,d:300,tf:10.6},
 ISMB350:{Z:650000,I:13600,A:5250,tw:7.4,d:350,tf:13},
 ISMB400:{Z:873000,I:21100,A:6160,tw:8.6,d:400,tf:16}
};
const supportNames={ss:"Simply Supported (Pin – Roller)",ff:"Fixed – Fixed",pf:"Pinned – Fixed",fp:"Fixed – Pinned"};

function beamSVG(type,w,L){
 const supports={
  ss:`<polygon points="100,190 135,190 117,150" fill="#54a96f"/><circle cx="117" cy="147" r="6" fill="#fff" stroke="#17345e" stroke-width="3"/><circle cx="883" cy="178" r="24" fill="#65758a"/><circle cx="883" cy="178" r="13" fill="#cbd5e1"/><rect x="850" y="202" width="66" height="8" rx="3" fill="#31547c"/>`,
  ff:`<rect x="92" y="135" width="28" height="85" rx="3" fill="#65758a"/><rect x="880" y="135" width="28" height="85" rx="3" fill="#65758a"/><path d="M88 145l-16 12m16 0l-16 12m16 0l-16 12m16 0l-16 12m16 0l-16 12M908 145l16 12m-16 0l16 12m-16 0l16 12m-16 0l16 12m-16 0l16 12" stroke="#8795a8" stroke-width="3"/>`,
  pf:`<polygon points="100,190 135,190 117,150" fill="#54a96f"/><circle cx="117" cy="147" r="6" fill="#fff" stroke="#17345e" stroke-width="3"/><rect x="880" y="135" width="28" height="85" rx="3" fill="#65758a"/><path d="M908 145l16 12m-16 0l16 12m-16 0l16 12m-16 0l16 12m-16 0l16 12" stroke="#8795a8" stroke-width="3"/>`,
  fp:`<rect x="92" y="135" width="28" height="85" rx="3" fill="#65758a"/><path d="M88 145l-16 12m16 0l-16 12m16 0l-16 12m16 0l-16 12m16 0l-16 12" stroke="#8795a8" stroke-width="3"/><polygon points="865,190 900,190 883,150" fill="#54a96f"/><circle cx="883" cy="147" r="6" fill="#fff" stroke="#17345e" stroke-width="3"/>`
 };
 let labels={
  ss:["PIN SUPPORT","ROLLER SUPPORT"],ff:["FIXED","FIXED"],pf:["PIN SUPPORT","FIXED"],fp:["FIXED","PIN SUPPORT"]
 }[type];
 let arrows="";
 for(let x=125;x<=875;x+=58) arrows+=`<line x1="${x}" y1="62" x2="${x}" y2="112" stroke="#1769e0" stroke-width="4"/><polygon points="${x-6},105 ${x+6},105 ${x},117" fill="#1769e0"/>`;
 return `<svg class="beam-svg" viewBox="0 0 1000 265">
   <text x="500" y="34" text-anchor="middle" font-size="21" font-weight="700" fill="#1769e0">UDL = ${w.toFixed(1)} kN/m</text>
   <line x1="125" y1="55" x2="875" y2="55" stroke="#1769e0" stroke-width="4"/>
   ${arrows}
   <defs><linearGradient id="steel" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#aab8c9"/><stop offset=".45" stop-color="#536579"/><stop offset="1" stop-color="#25384e"/></linearGradient></defs>
   <rect x="110" y="112" width="780" height="30" rx="4" fill="url(#steel)" stroke="#172b43" stroke-width="3"/>
   <rect x="110" y="142" width="780" height="8" fill="#8999aa"/>
   ${supports[type]}
   <line x1="145" y1="230" x2="855" y2="230" stroke="#47617e" stroke-width="2"/>
   <line x1="145" y1="222" x2="145" y2="238" stroke="#47617e" stroke-width="2"/>
   <line x1="855" y1="222" x2="855" y2="238" stroke="#47617e" stroke-width="2"/>
   <text x="500" y="253" text-anchor="middle" font-size="16" font-weight="700" fill="#203957">L = ${L.toFixed(2)} m</text>
   <text x="117" y="214" text-anchor="middle" font-size="14" font-weight="700" fill="#203957">${labels[0]}</text>
   <text x="883" y="214" text-anchor="middle" font-size="14" font-weight="700" fill="#203957">${labels[1]}</text>
 </svg>`;
}

function supportCoefficients(type){
 // These coefficients are for the preliminary UI model.
 // Replace with a validated stiffness/structural-analysis routine for production.
 if(type==="ss") return {M:1/8,V:.5,delta:5/384};
 if(type==="ff") return {M:1/12,V:.5,delta:1/384};
 if(type==="pf"||type==="fp") return {M:9/128,V:.625,delta:.0054};
}

function drawDiagram(id,type,kind,positive,negative){
 const c=document.getElementById(id),ctx=c.getContext("2d"),W=c.width,H=c.height;
 ctx.clearRect(0,0,W,H);ctx.lineWidth=2;ctx.font="12px Segoe UI, Arial";
 const x0=25,x1=W-25,y0=H/2;
 ctx.strokeStyle="#9aa8b9";ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y0);ctx.stroke();
 ctx.strokeStyle="#17345e";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y0);ctx.stroke();
 ctx.fillStyle="#17345e";ctx.beginPath();ctx.moveTo(x0,y0+8);ctx.lineTo(x0-8,y0+20);ctx.lineTo(x0+8,y0+20);ctx.fill();ctx.beginPath();ctx.moveTo(x1,y0+8);ctx.lineTo(x1-8,y0+20);ctx.lineTo(x1+8,y0+20);ctx.fill();
 ctx.strokeStyle="#1769e0";ctx.lineWidth=3;
 if(kind==="sfd"){
   ctx.beginPath();ctx.moveTo(x0,y0-55);ctx.lineTo(x1,y0+55);ctx.stroke();
   ctx.fillStyle="rgba(23,105,224,.15)";ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x0,y0-55);ctx.lineTo(x1,y0+55);ctx.lineTo(x1,y0);ctx.closePath();ctx.fill();
 } else if(kind==="bmd"){
   ctx.beginPath();
   for(let i=0;i<=80;i++){let t=i/80,x=x0+t*(x1-x0);let yy=y0-positive*Math.sin(Math.PI*t);if(i===0)ctx.moveTo(x,yy);else ctx.lineTo(x,yy)}ctx.stroke();
   ctx.fillStyle="rgba(23,105,224,.16)";ctx.beginPath();ctx.moveTo(x0,y0);for(let i=0;i<=80;i++){let t=i/80,x=x0+t*(x1-x0),yy=y0-positive*Math.sin(Math.PI*t);ctx.lineTo(x,yy)}ctx.lineTo(x1,y0);ctx.closePath();ctx.fill();
 } else {
   ctx.strokeStyle="#26965d";ctx.beginPath();
   for(let i=0;i<=80;i++){let t=i/80,x=x0+t*(x1-x0),yy=y0+negative*Math.sin(Math.PI*t);if(i===0)ctx.moveTo(x,yy);else ctx.lineTo(x,yy)}ctx.stroke();
 }
}

function calculate(){
 const sec=sections[document.getElementById("section").value];
 const fy=Number(document.getElementById("grade").value);
 const L=Number(document.getElementById("span").value);
 const w=Number(document.getElementById("udl").value);
 const type=document.getElementById("support").value;
 if(!L || L<=0 || w<0){alert("Please enter valid span and UDL.");return}
 const c=supportCoefficients(type);
 const M=w*L*L*c.M;
 const V=w*L*c.V;
 const Md=sec.Z*fy/1.1/1e6;
 const Aw=(sec.d-2*sec.tf)*sec.tw;
 const Vd=Aw*fy/(Math.sqrt(3)*1.1)/1000;
 // Preliminary serviceability illustration: service UDL = factored UDL / 1.5.
 const ws=w/1.5;
 const I=sec.I*1e4;
 const delta=c.delta*ws*Math.pow(L*1000,4)/(200000*I);
 const bendingRatio=M/Md, shearRatio=V/Vd, deflLimit=L*1000/300, deflRatio=delta/deflLimit;
 const utility=Math.max(bendingRatio,shearRatio,deflRatio);
 let cls=utility>1?"fail":utility>.85?"warn":"safe";
 let label=utility>1?"FAIL":utility>.85?"PASS — CLOSE":"SAFE";
 document.getElementById("beamVisual").innerHTML=beamSVG(type,w,L);
 document.getElementById("supportBadge").textContent=supportNames[type];
 document.getElementById("med").textContent=M.toFixed(2);
 document.getElementById("ved").textContent=V.toFixed(2);
 document.getElementById("md").textContent=Md.toFixed(2);
 document.getElementById("vd").textContent=Vd.toFixed(2);
 document.getElementById("defl").textContent=delta.toFixed(2);
 document.getElementById("utility").textContent=utility.toFixed(2);
 document.getElementById("utilityLabel").textContent=label;
 document.getElementById("utilityMessage").textContent=utility<=1?"Section passes the preliminary governing ratio.":"Section exceeds the preliminary governing ratio.";
 document.getElementById("sfdText").textContent=`VEd,max = ${V.toFixed(2)} kN`;
 document.getElementById("bmdText").textContent=`MEd,max = ${M.toFixed(2)} kN·m`;
 document.getElementById("deflectionText").textContent=`δmax = ${delta.toFixed(2)} mm  |  Limit = ${deflLimit.toFixed(1)} mm`;
 const pill=document.getElementById("statusPill"),final=document.getElementById("finalMessage"),card=document.getElementById("utilityCard");
 pill.className="status-pill "+cls;pill.textContent=label;final.className="final-message "+cls;
 final.textContent=utility<=1?`The selected ${document.getElementById("section").value} section passes this preliminary check for the entered loading and support condition.`:`The selected ${document.getElementById("section").value} section does not pass this preliminary governing check.`;
 card.style.borderColor=cls==="fail"?"#efb6b6":cls==="warn"?"#f1d98b":"#bde2c9";
 card.style.background=cls==="fail"?"#fff5f5":cls==="warn"?"#fffaf0":"#f4fbf6";
 drawDiagram("sfd",type,"sfd",55,0);
 drawDiagram("bmd",type,"bmd",Math.min(65,Math.max(25,M*1.3)),0);
 drawDiagram("deflection",type,"deflection",0,Math.min(55,Math.max(20,delta*2.5)));
}
document.getElementById("calculate").addEventListener("click",calculate);
["section","grade","span","udl","support"].forEach(id=>document.getElementById(id).addEventListener("change",calculate));
calculate();
