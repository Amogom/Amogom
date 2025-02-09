<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Juego de Arte Muggle: Adivina el Personaje</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    h1 {
      color: #333;
    }
    canvas {
      border: 2px solid #333;
      margin: 10px auto;
      display: block;
      max-width: 100%;
      height: auto;
    }
    input, button {
      padding: 10px;
      font-size: 16px;
      margin: 5px;
    }
  </style>
</head>
<body>
  <h1>Juego de Arte Muggle: Adivina el Personaje</h1>
  <canvas id="canvas" width="300" height="300"></canvas>
  <br>
  <input type="text" id="respuesta" placeholder="Escribe el nombre del personaje">
  <br>
  <button id="verificar">Verificar</button>
  <button id="pista">Pedir Pista</button>
  
  <script>
    let blurRadius = 10;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const imagenes = [
      { src: 'ruta/a/imagen1.jpg', nombre: 'harry potter' },
      { src: 'ruta/a/imagen2.jpg', nombre: 'hermione granger' },
      { src: 'ruta/a/imagen3.jpg', nombre: 'ron weasley' },
      { src: 'ruta/a/imagen4.jpg', nombre: 'albus dumbledore' },
      { src: 'ruta/a/imagen5.jpg', nombre: 'severus snape' },
      { src: 'ruta/a/imagen6.jpg', nombre: 'lord voldemort' },
      { src: 'ruta/a/imagen7.jpg', nombre: 'draco malfoy' }
    ];
    
    const personajeSeleccionado = imagenes[Math.floor(Math.random() * imagenes.length)];
    const img = new Image();
    img.src = personajeSeleccionado.src;
    
    img.onload = () => {
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
        aplicarDesenfoque();
      }
    });
    
    document.getElementById('verificar').addEventListener('click', () => {
      const respuestaUsuario = document.getElementById('respuesta').value.trim().toLowerCase();
      if (respuestaUsuario === personajeSeleccionado.nombre) {
        alert('¡Correcto! Has adivinado el personaje.');
      } else {
        alert('Incorrecto. Intenta de nuevo.');
      }
    });
  </script>
</body>
</html>
