// Definimos el radio de desenfoque inicial
let blurRadius = 10;

// Obtenemos el elemento del canvas y su contexto para dibujar en él
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Creamos un array con las imágenes y nombres de los personajes
const imagenes = [
    { src: '../imagenes/CastilloDisneyLandParis.png', nombre: 'CastilloDisneyLandParis' },
    { src: '../imagenes/NoviaCadaver.png', nombre: 'NoviaCadaver' },
    { src: '../imagenes/EduardoManosTijeras.png', nombre: 'EduardoManosTijeras' },
    { src: '../imagenes/HauntedMansion.png', nombre: 'HauntedMansion' },
    { src: '../imagenes/HotelTransilvania.png', nombre: 'HotelTransilvania' },
    { src: '../imagenes/Las3Brujas.png', nombre: 'Las3Brujas' },
    { src: '../imagenes/MosterHouse.png', nombre: 'MosterHouse' }
];

// Seleccionamos un personaje al azar del array de imágenes
const personajeSeleccionado = imagenes[Math.floor(Math.random() * imagenes.length)];

// Creamos un objeto Image para cargar la imagen del personaje seleccionado
const img = new Image();
img.src = personajeSeleccionado.src; // Establecemos la ruta de la imagen

// Cuando la imagen se haya cargado, aplicamos el desenfoque
img.onload = () => {
    // Ajustamos el tamaño del canvas según la imagen
    canvas.width = img.width;
    canvas.height = img.height;
    aplicarDesenfoque();
};

// Función para aplicar el desenfoque en el canvas
function aplicarDesenfoque() {
    // Limpiamos cualquier dibujo previo en el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibujamos la imagen en el canvas, ajustada al tamaño del canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Aplicamos el filtro de desenfoque en el canvas
    canvas.style.filter = `blur(${blurRadius}px)`;
}

// Evento de "Pista" para reducir el desenfoque
document.getElementById('pista').addEventListener('click', () => {
    if (blurRadius > 0) {
        blurRadius -= 2; // Reducimos el desenfoque
        aplicarDesenfoque(); // Vuelve a aplicar el desenfoque
    }
});

// Evento de "Verificar" para comprobar la respuesta del jugador
document.getElementById('verificar').addEventListener('click', () => {
    const respuestaUsuario = document.getElementById('respuesta').value.trim().toLowerCase();
    console.log(respuestaUsuario, personajeSeleccionado.nombre.toLowerCase()); // Para ver lo que se compara
    if (respuestaUsuario === personajeSeleccionado.nombre.toLowerCase()) {
        alert('¡Correcto! Has adivinado el personaje.');
    } else {
        alert('Incorrecto. Intenta de nuevo.');
    }
});

