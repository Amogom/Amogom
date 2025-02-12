// Definimos el radio de desenfoque inicial
let blurRadius = 10;
let indiceActual = 0;
let puntos = 0;
let pistasUsadas = 0;

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

// Botón para administrar imágenes
const adminBtn = document.createElement('button');
adminBtn.textContent = '+';
adminBtn.id = 'adminBtn';
document.body.appendChild(adminBtn);

adminBtn.addEventListener('click', () => {
    const contraseña = prompt('Introduce la contraseña para administrar imágenes:');
    if (contraseña === 'admin123') {
        const opcion = prompt('Elige una opción: \n1. Agregar nueva imagen \n2. Eliminar imagen existente');
        if (opcion === '1') {
            const nuevaImagen = prompt('Introduce la URL de la nueva imagen:');
            const nuevoNombre = prompt('Introduce el nombre del personaje:');
            const nuevasPistas = prompt('Introduce pistas separadas por comas:').split(',');
            imagenes.push({ src: nuevaImagen, nombre: nuevoNombre.toLowerCase(), pistas: nuevasPistas });
            alert('Imagen añadida con éxito.');
        } else if (opcion === '2') {
            const eliminarNombre = prompt('Introduce el nombre del personaje a eliminar:').toLowerCase();
            const index = imagenes.findIndex(img => img.nombre === eliminarNombre);
            if (index !== -1) {
                imagenes.splice(index, 1);
                alert('Imagen eliminada con éxito.');
            } else {
                alert('No se encontró la imagen con ese nombre.');
            }
        } else {
            alert('Opción no válida.');
        }
    } else {
        alert('Contraseña incorrecta. No puedes administrar imágenes.');
    }
});

// Estilos para posicionar el botón en la esquina superior derecha
document.head.insertAdjacentHTML('beforeend', `
    <style>
        #adminBtn {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 24px;
            border: none;
            background-color: #ff9800;
            color: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        }
        #adminBtn:hover {
            background-color: #e68900;
        }
    </style>
`);

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
    if (blurRadius > 0 && pistasUsadas < imagenes[indiceActual].pistas.length) {
        pistaTexto.textContent = imagenes[indiceActual].pistas[pistasUsadas] || "No hay más pistas disponibles";
    } else {
        pistaTexto.textContent = "";
    }
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
