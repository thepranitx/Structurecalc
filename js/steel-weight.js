const defaults={shs:{D:100,t:6},rhs:{D:200,B:100,t:6}};
const type=document.getElementById("sectionType"),fields=document.getElementById("fields"),visual=document.getElementById("visual"),validation=document.getElementById("validation");

function render(){
  const t=type.value, d=defaults[t];
  document.getElementById("sectionName").textContent=t.toUpperCase();
  document.getElementById("previewName").textContent=t.toUpperCase();
  if(t==="shs"){
    fields.innerHTML=field("D","Overall depth (D)",d.D)+field("t","Wall thickness (t)",d.t);
  }else{
    fields.innerHTML=field("D","Overall depth (D)",d.D)+field("B","Overall width (B)",d.B)+field("t","Wall thickness (t)",d.t);
  }
  draw(t); calculate();
  fields.querySelectorAll("input").forEach(x=>x.addEventListener("input",calculate));
}
function field(id,name,val){return `<div><label class="field-label">${name}<input id="${id}" type="number" min="0" step="0.01" value="${val}"></label></div>`}
function n(id){return Number(document.getElementById(id)?.value||0)}
function calculate(){
  const t=type.value,D=n("D"),B=t==="shs"?D:n("B"),th=n("t"),rho=n("density");
  validation.textContent="";
  if(D<=0||B<=0||th<=0||rho<=0){validation.textContent="Enter positive values."; return;}
  if(2*th>=Math.min(D,B)){validation.textContent="Thickness must be less than half of the smaller outside dimension.";return;}
  const a=D*B-(D-2*th)*(B-2*th), w=a*rho/1000000;
  document.getElementById("area").textContent=a.toFixed(2)+" mm²";
  document.getElementById("weight").textContent=w.toFixed(2);
  document.getElementById("densityResult").textContent=rho.toFixed(0)+" kg/m³";
  document.getElementById("formula").textContent=`${a.toFixed(2)} × ${rho.toFixed(5)} / 1,000,000 = ${w.toFixed(2)} kg/m`;
  document.getElementById("explanation").textContent=`Outside area = ${D.toFixed(2)} × ${B.toFixed(2)} = ${(D*B).toFixed(2)} mm². Hollow area = ${(D-2*th).toFixed(2)} × ${(B-2*th).toFixed(2)} = ${((D-2*th)*(B-2*th)).toFixed(2)} mm².`;
}
function draw(t){
  if(t==="shs") visual.innerHTML=`<svg viewBox="0 0 400 270"><rect x="90" y="35" width="220" height="200" rx="2" fill="#dbe7ff" stroke="#3567e8" stroke-width="6"/><rect x="112" y="57" width="176" height="156" fill="#f7f9fc" stroke="#8da8e9" stroke-width="4"/><text x="200" y="255" text-anchor="middle" font-size="13" fill="#657287">SHS</text></svg>`;
  else visual.innerHTML=`<svg viewBox="0 0 400 270"><rect x="70" y="65" width="260" height="140" rx="2" fill="#dbe7ff" stroke="#3567e8" stroke-width="6"/><rect x="92" y="87" width="216" height="96" fill="#f7f9fc" stroke="#8da8e9" stroke-width="4"/><text x="200" y="245" text-anchor="middle" font-size="13" fill="#657287">RHS</text></svg>`;
}
document.getElementById("calculate").onclick=calculate;
document.getElementById("reset").onclick=render;
document.getElementById("density").addEventListener("input",calculate);
type.addEventListener("change",render);
render();
