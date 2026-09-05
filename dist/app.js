const copy = {
  en: {
    navServices:"Services", navWork:"Selected work", navProcess:"Workflow", navAbout:"About", requestCase:"Request a Case",
    eyebrow:"DIGITAL DENTAL DESIGN · CAD/CAM",
    heroTitle:"Your Cases. My Expertise. Digital Precision.",
    heroLead:"B-Dental Design provides professional digital dental design services for dental laboratories, clinics and dental professionals.",
    heroDetail:"With more than 12 years of CAD/CAM experience, we specialize in Clear Aligners, Restorative Design, Full Dentures and Digital Dental Design.",
    heroSignature:"Precision. Experience. Reliable Digital Workflow.", exploreServices:"Explore Our Services",
    yearsExperience:"Years of CAD/CAM experience", bilingual:"Bilingual service", productionReady:"Production-ready deliverables", preciseWorkflow:"Precise workflow", experienceLabel:"Experience",
    servicesLabel:"SERVICES", servicesTitle:"Digital expertise for every stage of the dental workflow.", servicesIntro:"A focused digital design service for laboratories, clinics and professionals who need consistent quality, efficient communication and production-ready files.",
    s1Title:"Clear Aligners", s1Text:"Digital setups, model preparation and aligner-ready designs developed around your clinical prescription and production workflow.",
    s2Title:"Restorative Design", s2Text:"Precise digital restorative design focused on anatomy, fit, function and reliable downstream production.",
    s3Title:"Full Dentures", s3Text:"Digital full-denture workflows prepared with careful attention to form, function, occlusion and manufacturing needs.",
    s4Title:"Digital Dental Design", s4Text:"Flexible CAD/CAM support for dental laboratories and clinics, including model preparation and case-specific digital design.",
    workLabel:"SELECTED WORK", workTitle:"Real workflows. Real production cases.", workIntro:"A selection of recent B-Dental Design work shared directly from the studio.", v1:"Clear aligner workflow", v2:"Digital preparation", v3:"Model preparation", moreWork:"More cases, workflows and design process on social media.",
    processLabel:"WORKFLOW", processTitle:"Clear communication. Reliable delivery.", processIntro:"A straightforward remote workflow designed to keep your cases moving without unnecessary complexity.", p1Title:"Send the case", p1Text:"Share the scan, prescription and case requirements through the agreed channel.", p2Title:"Digital design", p2Text:"The case is designed with attention to anatomy, fit, function and manufacturing requirements.", p3Title:"Review & delivery", p3Text:"Review the design and receive the final files prepared for your production workflow.",
    aboutLabel:"ABOUT B-DENTAL", aboutTitle:"More than 12 years of experience translated into a dependable digital workflow.", aboutText:"B-Dental Design combines CAD/CAM expertise, dental-industry experience and practical production knowledge to support laboratories, clinics and dental professionals with consistent digital design services.", remoteService:"Remote service for international clients",
    ctaEyebrow:"START YOUR NEXT CASE", ctaTitle:"Need reliable digital design support?", ctaText:"Send the case details and we’ll confirm the requirements for your workflow.", contactWhatsApp:"Request a Case on WhatsApp"
  },
  es: {
    navServices:"Servicios", navWork:"Trabajos", navProcess:"Proceso", navAbout:"Acerca de", requestCase:"Solicitar un caso",
    eyebrow:"DISEÑO DENTAL DIGITAL · CAD/CAM",
    heroTitle:"Tus casos. Mi experiencia. Precisión digital.",
    heroLead:"B-Dental Design ofrece servicios profesionales de diseño dental digital para laboratorios, clínicas y profesionales de la odontología.",
    heroDetail:"Con más de 12 años de experiencia en CAD/CAM, nos especializamos en alineadores transparentes, diseño restaurativo, prótesis dentales completas y diseño dental digital.",
    heroSignature:"Precisión. Experiencia. Un flujo de trabajo digital confiable.", exploreServices:"Explorar servicios",
    yearsExperience:"Años de experiencia en CAD/CAM", bilingual:"Servicio bilingüe", productionReady:"Archivos listos para producción", preciseWorkflow:"Flujo preciso", experienceLabel:"Experiencia",
    servicesLabel:"SERVICIOS", servicesTitle:"Experiencia digital para cada etapa del flujo dental.", servicesIntro:"Un servicio de diseño digital enfocado en laboratorios, clínicas y profesionales que necesitan calidad constante, comunicación eficiente y archivos listos para producción.",
    s1Title:"Alineadores transparentes", s1Text:"Setups digitales, preparación de modelos y diseños para alineadores desarrollados según la prescripción clínica y el flujo de producción.",
    s2Title:"Diseño restaurativo", s2Text:"Diseño restaurativo digital preciso, enfocado en anatomía, ajuste, función y una producción posterior confiable.",
    s3Title:"Prótesis dentales completas", s3Text:"Flujos digitales para prótesis completas preparados con atención a forma, función, oclusión y necesidades de fabricación.",
    s4Title:"Diseño dental digital", s4Text:"Soporte CAD/CAM flexible para laboratorios y clínicas, incluyendo preparación de modelos y diseño digital según las necesidades del caso.",
    workLabel:"TRABAJOS SELECCIONADOS", workTitle:"Flujos reales. Casos reales de producción.", workIntro:"Una selección de trabajos recientes de B-Dental Design compartidos directamente desde el estudio.", v1:"Flujo de alineadores", v2:"Preparación digital", v3:"Preparación de modelos", moreWork:"Más casos, procesos y diseño en nuestras redes sociales.",
    processLabel:"PROCESO", processTitle:"Comunicación clara. Entrega confiable.", processIntro:"Un flujo remoto sencillo, diseñado para mantener sus casos avanzando sin complejidad innecesaria.", p1Title:"Enviar el caso", p1Text:"Comparta el escaneo, la prescripción y los requisitos del caso por el canal acordado.", p2Title:"Diseño digital", p2Text:"El caso se diseña cuidando anatomía, ajuste, función y requisitos de fabricación.", p3Title:"Revisión y entrega", p3Text:"Revise el diseño y reciba los archivos finales preparados para su flujo de producción.",
    aboutLabel:"ACERCA DE B-DENTAL", aboutTitle:"Más de 12 años de experiencia convertidos en un flujo digital confiable.", aboutText:"B-Dental Design combina experiencia CAD/CAM, conocimiento de la industria dental y criterio práctico de producción para apoyar a laboratorios, clínicas y profesionales con servicios consistentes de diseño digital.", remoteService:"Servicio remoto para clientes internacionales",
    ctaEyebrow:"INICIE SU PRÓXIMO CASO", ctaTitle:"¿Necesita soporte confiable de diseño digital?", ctaText:"Envíe los detalles del caso y confirmaremos los requisitos para su flujo de trabajo.", contactWhatsApp:"Solicitar un caso por WhatsApp"
  }
};

let lang = "en";
const toggle = document.querySelector(".lang-toggle");
function render(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = copy[lang][el.dataset.i18n];
    if (value) el.textContent = value;
  });
  toggle.querySelectorAll("span").forEach((el,i)=>el.classList.toggle("active",(lang==="en"?i===0:i===1)));
  toggle.setAttribute("aria-label",lang==="en"?"Cambiar a español":"Switch to English");
  document.title = lang==="en" ? "B-Dental Design | Digital Dental Design" : "B-Dental Design | Diseño Dental Digital";
}
toggle.addEventListener("click",()=>{lang=lang==="en"?"es":"en";render()});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
