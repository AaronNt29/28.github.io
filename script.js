// Referencias a elementos
const birthdayButton = document.getElementById('birthdayButton');
const birthdayButtonContainer = document.getElementById('birthdayButtonContainer');
const loveMessageContainer = document.getElementById('loveMessageContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const audioControlButton = document.getElementById('audioControl');

// Asegurar que el video no se detenga
const backgroundVideo = document.getElementById('backgroundVideo');
backgroundVideo.addEventListener('pause', () => {
  backgroundVideo.play();
});

// Registro de posiciones para evitar superposición
const existingMessagePositions = [];

// Obtener las coordenadas y dimensiones del contenedor principal
function getRestrictedZone() {
  const rect = loveMessageContainer.getBoundingClientRect();
  return {
    xMin: rect.left,
    xMax: rect.right,
    yMin: rect.top,
    yMax: rect.bottom
  };
}

// Obtener las dimensiones de la ventana
function getWindowDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// Verificar si la nueva posición es válida
function isPositionValid(x, y, elementWidth, elementHeight) {
  const minDistance = 100; // Distancia mínima entre mensajes
  const margin = 20; // Margen de seguridad respecto a los bordes

  // Verificar que el mensaje no se salga de la pantalla
  const windowDimensions = getWindowDimensions();
  if (
    x < margin || 
    y < margin || 
    x + elementWidth > windowDimensions.width - margin || 
    y + elementHeight > windowDimensions.height - margin
  ) {
    return false;
  }

  // Verificar si la nueva posición está demasiado cerca de las posiciones previas
  for (const pos of existingMessagePositions) {
    const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
    if (distance < minDistance) return false;
  }
  return true;
}

// Crear mensaje aleatorio
function createRandomMessage() {
  const messages = [
    "Te quiero mucho 💖",
    "¡Feliz cumpleaños hermosa! 🎉",
    "Me encantas demasiado 🌟",
    "Preciosa 💫",
    "¡Mi niña hermosa! 💕"
  ];

  const message = messages[Math.floor(Math.random() * messages.length)];

  const randomMessageElement = document.createElement('div');
  randomMessageElement.classList.add('random-message');
  randomMessageElement.textContent = message;

  const restrictedZone = getRestrictedZone();

  let randomX, randomY;
  let elementWidth, elementHeight;

  // Crear el mensaje para obtener las dimensiones del elemento
  randomMessageElement.style.position = 'absolute';
  document.body.appendChild(randomMessageElement);
  elementWidth = randomMessageElement.offsetWidth;
  elementHeight = randomMessageElement.offsetHeight;
  document.body.removeChild(randomMessageElement);

  // Asegurarse de que el mensaje esté dentro de la pantalla
  do {
    randomX = Math.random() * (window.innerWidth - elementWidth);
    randomY = Math.random() * (window.innerHeight - elementHeight);
  } while (
    (randomX >= restrictedZone.xMin && randomX <= restrictedZone.xMax &&
     randomY >= restrictedZone.yMin && randomY <= restrictedZone.yMax) || 
    !isPositionValid(randomX, randomY, elementWidth, elementHeight)
  );

  randomMessageElement.style.left = `${randomX}px`;
  randomMessageElement.style.top = `${randomY}px`;

  // Guardar posición
  existingMessagePositions.push({ x: randomX, y: randomY });

  document.body.appendChild(randomMessageElement);

  // Eliminar el mensaje después de la animación
  setTimeout(() => {
    randomMessageElement.remove();
    // Eliminar la posición del registro
    const index = existingMessagePositions.findIndex(pos => pos.x === randomX && pos.y === randomY);
    if (index !== -1) existingMessagePositions.splice(index, 1);
  }, 5000);
}

// Crear GIF de corazones aleatorio
function createRandomHeartGif() {
  const heartGif = document.createElement('img');
  heartGif.src = 'Corazones.gif'; // Asegúrate de que el archivo esté en la misma carpeta
  heartGif.classList.add('random-heart-gif');

  const restrictedZone = getRestrictedZone();

  let randomX, randomY;
  let elementWidth, elementHeight;

  // Crear el GIF para obtener las dimensiones del elemento
  heartGif.style.position = 'absolute';
  document.body.appendChild(heartGif);
  elementWidth = heartGif.offsetWidth;
  elementHeight = heartGif.offsetHeight;
  document.body.removeChild(heartGif);

  // Asegurarse de que el GIF esté dentro de la pantalla
  do {
    randomX = Math.random() * (window.innerWidth - elementWidth);
    randomY = Math.random() * (window.innerHeight - elementHeight);
  } while (
    (randomX >= restrictedZone.xMin && randomX <= restrictedZone.xMax &&
     randomY >= restrictedZone.yMin && randomY <= restrictedZone.yMax) || 
    !isPositionValid(randomX, randomY, elementWidth, elementHeight)
  );

  heartGif.style.left = `${randomX}px`;
  heartGif.style.top = `${randomY}px`;

  // Guardar posición
  existingMessagePositions.push({ x: randomX, y: randomY });

  document.body.appendChild(heartGif);

  // Eliminar el GIF después de la animación
  setTimeout(() => {
    heartGif.remove();
    const index = existingMessagePositions.findIndex(pos => pos.x === randomX && pos.y === randomY);
    if (index !== -1) existingMessagePositions.splice(index, 1);
  }, 3000);
}

// Iniciar mensajes aleatorios
function startRandomMessages() {
  setInterval(createRandomMessage, 2000); // Aparecer cada 2 segundos
}

// Iniciar GIFs de corazones aleatorios
function startRandomHeartGifs() {
  setInterval(createRandomHeartGif, 1000); // Un GIF nuevo cada segundo
}

// Mostrar mensaje y activar la animación de corazones
birthdayButton.addEventListener('click', () => {
  birthdayButtonContainer.style.display = 'none'; // Esconder botón inicial
  loveMessageContainer.classList.remove('hidden'); // Mostrar mensaje con animación
  startRandomHeartGifs(); // Iniciar corazones aleatorios
  startRandomMessages(); // Iniciar mensajes aleatorios
});

// Control de música
audioControlButton.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    audioControlButton.textContent = '🔊';
  } else {
    backgroundMusic.pause();
    audioControlButton.textContent = '🔇';
  }
});
