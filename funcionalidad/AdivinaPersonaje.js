// Definimos el radio de desenfoque inicial
let blurRadius = 10;
let indiceActual = 0;
let puntos = 0;
let pistasUsadas = 0;

// Obtenemos el elemento del canvas y su contexto para dibujar en él
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Creamos un array con las imágenes y nombres de los personajes
const imagenes = [
    { src: '../imagenes/CastilloDisneyLandParis.png', nombre: 'castillodisneylandparis' },
    { src: '../imagenes/NoviaCadaver.png', nombre: 'noviacadaver' },
    { src: '../imagenes/EduardoManosTijeras.png', nombre: 'eduardomanostijeras' },
    { src: '../imagenes/HauntedMansion.png', nombre: 'hauntedmansion' },
    { src: '../imagenes/HotelTransilvania.png', nombre: 'hoteltransilvania' },
    { src: '../imagenes/Las3Brujas.png', nombre: 'las3brujas' },
    { src: '../imagenes/MosterHouse.png', nombre: 'monsterhouse' }
];

const img = new Image();
function cargarImagen() {
    if (indiceActual >= imagenes.length) {
        alert(`Juego terminado. Puntaje final: ${puntos}`);
        return;
    }
    pistasUsadas = 0;
    blurRadius = 10;
    img.src = imagenes[indiceActual].src;
}

img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    aplicarDesenfoque();
};

function aplicarDesenfoque() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.style.filter = `blur(${blurRadius}px)`;
}

document.getElementById('pista').addEventListener('click', () => {
    if (blurRadius > 0) {
        blurRadius -= 2;
        pistasUsadas++;
        aplicarDesenfoque();
    }
});

document.getElementById('verificar').addEventListener('click', () => {
    const respuestaUsuario = document.getElementById('respuesta').value.trim().toLowerCase();
    if (respuestaUsuario === imagenes[indiceActual].nombre) {
        let puntosObtenidos = 10 - pistasUsadas * 2;
        puntosObtenidos = puntosObtenidos < 0 ? 0 : puntosObtenidos;
        puntos += puntosObtenidos;
        alert(`¡Correcto! Puntos obtenidos: ${puntosObtenidos}`);
        indiceActual++;
        cargarImagen();
    } else {
        alert('Incorrecto. Intenta de nuevo.');
    }
});

cargarImagen();
