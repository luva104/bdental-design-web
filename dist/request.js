const TYPES=['Crown','Bridge','Veneers','Inlay / Onlay','Implant Crown','Implant Bridge','Full Arch','All-on-4 / All-on-6','Denture','Surgical Guide','Aligner Design','Smile Design','Other'];
const form=document.querySelector('#orderForm');
const steps=[...document.querySelectorAll('.step')];
const dots=[...document.querySelectorAll('.step-dot')];
const typeBox=document.querySelector('#caseTypes');
const typeError=document.querySelector('#typeError');
const filesInput=document.querySelector('#caseFiles');
const fileList=document.querySelector('#fileList');
const conditionalFields=document.querySelector('#conditionalFields');
const reviewBox=document.querySelector('#reviewBox');
const generatedCaseId=document.querySelector('#generatedCaseId');
const reviewCaseId=document.querySelector('#reviewCaseId');
const prevBtn=document.querySelector('#prevBtn');
const nextBtn=document.querySelector('#nextBtn');
const submitBtn=document.querySelector('#submitBtn');
let step=0;

function makeCaseId(){
  const d=new Date();
  const yy=String(d.getFullYear()).slice(-2),mm=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');
  const seq=String(Math.floor(Math.random()*900)+100);
  return `BD-${yy}${mm}${dd}-${seq}`;
}
const caseId=makeCaseId();
generatedCaseId.textContent=caseId;reviewCaseId.textContent=caseId;

TYPES.forEach(t=>typeBox.insertAdjacentHTML('beforeend',`<label class="case-choice"><input type="checkbox" name="caseType" value="${t}"><span>${t}</span></label>`));

function selectedTypes(){return [...form.querySelectorAll('[name="caseType"]:checked')].map(x=>x.value)}
function val(name){const el=form.elements[name];return el?String(el.value||'').trim():''}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function renderConditional(){
  const types=selectedTypes();
  const implant=types.some(t=>/implant|all-on/i.test(t));
  const esthetic=types.some(t=>/veneer|smile design|crown|bridge/i.test(t));
  let html='';
  if(implant){html+=`<div class="conditional"><h3>Implant Specifications</h3><div class="grid two">
    <label><span>Implant System</span><input name="implantSystem" placeholder="Select / enter implant system"></label>
    <label><span>Implant Platform</span><input name="implantPlatform" placeholder="Enter platform"></label>
    <label><span>Restoration</span><select name="retention"><option value="">Select</option><option>Screw-retained</option><option>Cement-retained</option></select></label>
    <label><span>Ti-Base / Abutment</span><input name="abutment" placeholder="Enter information"></label>
    <label><span>Implant Position</span><input name="implantPosition"></label>
    <label><span>Emergence Profile</span><input name="emergence" placeholder="Any specific requirements?"></label>
  </div></div>`}
  if(esthetic){html+=`<div class="conditional"><h3>Esthetic Specifications</h3><div class="grid two">
    <label><span>Tooth Length / Shape</span><input name="toothShape" placeholder="Describe your preferences"></label>
    <label><span>Preparation</span><input name="prep" placeholder="Prep / no-prep or relevant details"></label>
    <label><span>Smile Reference</span><input name="smileRef" placeholder="Reference description"></label>
    <label><span>Midline</span><input name="midline"></label>
    <label class="wide"><span>Special Esthetic Instructions</span><textarea name="estheticInstructions" rows="3"></textarea></label>
  </div></div>`}
  conditionalFields.innerHTML=html || '<p class="submit-note">No additional conditional specifications are required for the selected design type.</p>';
}

form.addEventListener('change',e=>{if(e.target.name==='caseType')renderConditional()});

function validateStep(i){
  let ok=true;
  steps[i].querySelectorAll('[required]').forEach(el=>{
    const valid=el.type==='checkbox'?el.checked:el.checkValidity();
    el.classList.toggle('invalid',!valid);if(!valid)ok=false;
  });
  if(i===1&&selectedTypes().length===0){typeError.textContent='Please select at least one case type.';ok=false}else typeError.textContent='';
  return ok;
}

function showStep(i){
  step=i;steps.forEach((s,n)=>s.classList.toggle('active',n===i));
  dots.forEach((d,n)=>{d.classList.toggle('active',n===i);d.classList.toggle('done',n<i)});
  prevBtn.style.visibility=i===0?'hidden':'visible';
  nextBtn.style.display=i===steps.length-1?'none':'inline-flex';
  submitBtn.style.display=i===steps.length-1?'inline-flex':'none';
  if(i===2)renderConditional();
  if(i===5)buildReview();
  window.scrollTo({top:0,behavior:'smooth'});
}

nextBtn.addEventListener('click',()=>{if(validateStep(step))showStep(step+1)});
prevBtn.addEventListener('click',()=>showStep(Math.max(0,step-1)));
dots.forEach(d=>d.addEventListener('click',()=>{const target=Number(d.dataset.go);if(target<=step||validateStep(step))showStep(target)}));

filesInput.addEventListener('change',()=>{
  const files=[...filesInput.files];
  fileList.innerHTML=files.length?files.map(f=>`<div class="file-item"><span>${esc(f.name)}</span><span>${(f.size/1024/1024).toFixed(2)} MB</span></div>`).join(''):'<div class="submit-note">No files selected.</div>';
});

function section(title,rows){
  return `<section class="review-section"><h3>${title}</h3><dl>${rows.filter(r=>r[1]).map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl></section>`;
}
function buildReview(){
  const files=[...filesInput.files].map(f=>f.name).join(', ')||'No files selected';
  reviewCaseId.textContent=caseId;
  reviewBox.innerHTML=
    section('Client',[['Name',val('doctor')],['Clinic / Lab',val('clinic')],['Email',val('email')],['Phone / WhatsApp',val('phone')],['Country',val('country')],['Client Case ID',val('clientCaseId')]])+
    section('Case',[['B-Dental Case ID',caseId],['Design',selectedTypes().join(', ')],['Arch',val('arch')],['Teeth',val('teeth')],['Restoration',val('restoration')]])+
    section('Specifications',[['Material',val('material')],['Shade',val('shade')],['Pontic',val('pontic')],['Margins',val('margins')],['Occlusion',val('occlusion')],['Implant System',val('implantSystem')],['Implant Platform',val('implantPlatform')],['Retention',val('retention')],['Ti-Base / Abutment',val('abutment')],['Implant Position',val('implantPosition')],['Emergence Profile',val('emergence')],['Tooth Length / Shape',val('toothShape')],['Preparation',val('prep')],['Smile Reference',val('smileRef')],['Midline',val('midline')],['Esthetic Instructions',val('estheticInstructions')]])+
    section('Files',[['Selected files',files]])+
    section('Deadline & Instructions',[['Requested Date',val('deadline')],['Priority',val('priority')],['Instructions',val('instructions')]]);
}

form.addEventListener('submit',e=>{
  e.preventDefault();if(!validateStep(5))return;
  const files=[...filesInput.files].map(f=>f.name).join(', ')||'None selected';
  const lines=[
    '*B-Dental Design — Design Request*',
    `Case ID: ${caseId}`,
    `Client Case ID: ${val('clientCaseId')}`,
    '',
    `Doctor / Designer: ${val('doctor')}`,
    `Clinic / Laboratory: ${val('clinic')}`,
    `Email: ${val('email')}`,
    val('phone')?`Phone / WhatsApp: ${val('phone')}`:'',
    `Country: ${val('country')}`,
    '',
    `Design: ${selectedTypes().join(', ')}`,
    `Arch: ${val('arch')}`,
    `Teeth: ${val('teeth')}`,
    val('restoration')?`Restoration: ${val('restoration')}`:'',
    val('material')?`Material: ${val('material')}`:'',
    val('shade')?`Shade: ${val('shade')}`:'',
    val('implantSystem')?`Implant System: ${val('implantSystem')}`:'',
    val('implantPlatform')?`Implant Platform: ${val('implantPlatform')}`:'',
    val('retention')?`Restoration Retention: ${val('retention')}`:'',
    val('abutment')?`Ti-Base / Abutment: ${val('abutment')}`:'',
    val('emergence')?`Emergence Profile: ${val('emergence')}`:'',
    '',
    `Requested Date: ${val('deadline')}`,
    `Priority: ${val('priority')}`,
    `Instructions: ${val('instructions')}`,
    '',
    `Selected files to attach: ${files}`,
    '',
    'Please confirm receipt of this design request.'
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/50672000298?text=${encodeURIComponent(lines)}`,'_blank','noopener');
});

showStep(0);
