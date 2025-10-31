const IMAGES = [
  'images/A Mark Blue-Green.png',
  'images/A Mark Blue-Orange.png',
  'images/A Mark Blue-Red.png',
  'images/A Mark Greyscale.png',
  'images/A Mark Navy-Green.png',
  'images/A Mark White.png'
];

const NUM_HOLES = 9, TAPS_TO_WIN = 5, DISPLAY_TIME = 3000;
let taps = 0, currentTimeout;

const board = document.getElementById('game-board'),
      tapsDisplay = document.getElementById('taps'),
      result = document.getElementById('result'),
      skipLink = document.getElementById('skip'),
      holes = [];

for (let i = 0; i < NUM_HOLES; i++) {
  const hole = document.createElement('div');
  hole.className = 'hole';
  board.appendChild(hole);
  holes.push(hole);
}

function pumpkinBurst(hole, n = 16) {
  // clear existing burst container if any
  const old = hole.querySelector('.burst');
  if (old) old.remove();

  const burst = document.createElement('div');
  burst.className = 'burst';
  hole.appendChild(burst);

  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'pumpkin';
    p.textContent = '🎃';

    // random polar offsets
    const angle = Math.random() * Math.PI * 2;
    const radius = 45 + Math.random() * 60; // px
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    // random spin and scale
    const rot = (Math.random() * 720 - 360) + 'deg';
    const scale = 0.7 + Math.random() * 0.6;

    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.setProperty('--rot', rot);
    p.style.setProperty('--scale', scale.toString());

    burst.appendChild(p);

    // remove each pumpkin after animation completes
    setTimeout(() => p.remove(), 700);
  }

  // remove container shortly after
  setTimeout(() => burst.remove(), 750);
}

function showMole() {
  holes.forEach(h => h.innerHTML = '');
  const hole = holes[Math.floor(Math.random() * NUM_HOLES)];
  const img = document.createElement('img');
  img.src = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  img.className = 'mole';
  hole.appendChild(img);

  img.addEventListener('click', () => {
    pumpkinBurst(hole, 18);
    taps++;
    tapsDisplay.textContent = `Taps: ${taps}/${TAPS_TO_WIN}`;

    // Show a big centered pumpkin briefly
    hole.innerHTML = '<div class="celebration">🎃</div>';

    if (taps >= TAPS_TO_WIN) {
      endGame();
    }
  });

  currentTimeout = setTimeout(showMole, DISPLAY_TIME);
}

function endGame() {
  clearTimeout(currentTimeout);
  board.classList.add('hidden');
  tapsDisplay.classList.add('hidden');
  skipLink.classList.add('hidden');
  result.classList.remove('hidden');
}

showMole();
