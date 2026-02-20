let escala = 1;
let moviendo = false;
let inicioX = 0, inicioY = 0;
let posX = 0, posY = 0;

const overlay = document.getElementById("overlay");
const img = document.getElementById("imagenGrande");

function abrirImagen(ruta){
  img.src = ruta;
  escala = 1;
  posX = 0; posY = 0;
  aplicarTransform();
  overlay.style.display = "flex";
}

function cerrarImagen(){
  overlay.style.display = "none";
}

/* ZOOM con rueda */
img.addEventListener("wheel", function(e){
  e.preventDefault();
  escala += (e.deltaY < 0) ? 0.1 : -0.1;
  if(escala < 1) escala = 1;
  if(escala > 5) escala = 5;
  aplicarTransform();
});

/* ARRASTRAR con mouse */
img.addEventListener("mousedown", (e)=>{
  moviendo = true;
  inicioX = e.clientX - posX;
  inicioY = e.clientY - posY;
  img.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e)=>{
  if(!moviendo) return;
  posX = e.clientX - inicioX;
  posY = e.clientY - inicioY;
  aplicarTransform();
});

window.addEventListener("mouseup", ()=>{
  moviendo = false;
  img.style.cursor = "grab";
});

function aplicarTransform(){
  img.style.transform = `translate(${posX}px, ${posY}px) scale(${escala})`;
}

/* cerrar con ESC */
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") cerrarImagen();
});