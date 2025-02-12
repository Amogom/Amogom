// Definimos el radio de desenfoque inicial
let blurRadius = 10;
let indiceActual = 0;
let puntos = 0;
let pistasUsadas = 0;

// Cambiamos el título del juego
document.title = "Juego de Adivinanzas Mágicas";
const titulo = document.createElement('h1');
titulo.textContent = "Juego de Adivinanzas Mágicas";
titulo.style.textAlign = "center";
document.body.prepend(titulo);

// Aplicamos un fondo bonito
document.body.style.background = "url('https://source.unsplash.com/1600x900/?magic,stars') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";
document.body.style.color = "white";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.textShadow = "2px 2px 5px black";

// Obtenemos el elemento del canvas y su contexto para dibujar en él
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pistaTexto = document.createElement('p');
pistaTexto.id = 'pistaTexto';
document.body.appendChild(pistaTexto);

// Creamos un array con las imágenes, nombres y pistas de los personajes
let imagenes = [
    { src: '../imagenes/CastilloDisneyLandParis.png', nombre: 'castillodisneylandparis', pistas: ["Es un famoso parque temático", "Ubicado en Europa"] },
    { src: '../imagenes/NoviaCadaver.png', nombre: 'noviacadaver', pistas: ["Película de Tim Burton", "Una historia de amor y muerte"] },
    { src: '../imagenes/EduardoManosTijeras.png', nombre: 'eduardomanostijeras', pistas: ["Un personaje con manos peculiares", "Película protagonizada por Johnny Depp"] },
    { src: '../imagenes/HauntedMansion.png', nombre: 'hauntedmansion', pistas: ["Inspirada en una atracción de Disney", "Casa embrujada famosa"] },
    { src: '../imagenes/HotelTransilvania.png', nombre: 'hoteltransilvania', pistas: ["Un hotel para monstruos", "El dueño es Drácula"] },
    { src: '../imagenes/Las3Brujas.png', nombre: 'las3brujas', pistas: ["Tres hermanas mágicas", "Película clásica de Halloween"] },
    { src: '../imagenes/MosterHouse.png', nombre: 'monsterhouse', pistas: ["Una casa con vida propia", "Película animada de terror"] }
];

imagenes = imagenes.sort(() => Math.random() - 0.5);

const img = new Image();
function cargarImagen() {
    if (indiceActual >= imagenes.length) {
        document.body.innerHTML = '<h1>¡Juego Terminado!</h1><p>Puntaje final: ' + puntos + '</p>';
        return;
    }
    pistasUsadas = 0;
    blurRadius = 10;
    pistaTexto.textContent = "";
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
        pistaTexto.textContent = imagenes[indiceActual].pistas[pistasUsadas - 1] || "No hay más pistas disponibles";
        aplicarDesenfoque();
    }
});

document.getElementById('verificar').addEventListener('click', () => {
    const respuestaUsuario = document.getElementById('respuesta').value.trim().toLowerCase();
    if (respuestaUsuario === imagenes[indiceActual].nombre) {
        let puntosObtenidos = 10 - pistasUsadas * 2;
        puntosObtenidos = puntosObtenidos < 5 ? 5 : puntosObtenidos; // La puntuación mínima es 5
        puntos += puntosObtenidos;
        alert(`¡Correcto! Puntos obtenidos: ${puntosObtenidos}`);
        indiceActual++;
        cargarImagen();
    } else {
        alert('Incorrecto. Intenta de nuevo.');
    }
});

cargarImagen();
