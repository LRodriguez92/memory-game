const root = document.querySelector('#root');
const board = document.querySelector('#board');
const timerEl = document.querySelector('#timer');
const overlay = document.querySelector('#overlay');
const audio = new Audio('audio/chillwave.mp3');
const pauseBtn = document.querySelector('#pause-play');
const pause = document.querySelector('#pause');
const play = document.querySelector('#play');
const restart = document.querySelector('#restart');
const penaltyOrBonus = document.querySelector('#penalty-or-bonus');
const images = ['images/dragon.png','images/ifrit.png', 'images/odin.png', 'images/caitsithfull.png', 'images/bahamut.png', 'images/naruto.png', 'images/midoriya.png', 'images/todoroki.png', 'images/brave.png', 'images/wolf.png'
];
let currentLevel;
let nextLevel;
let levelImages = [];
let randomImages = [];
let firstImage;
let secondImage;
let winningMatches; // Determined in renderBoard according to # of images per level
let matches = 0; // Updates when there's a match
let time;
let canClick = true;
let countDown;
let paused;

const levels = [
  {
    board:
    [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]],

    images: 5,
    time: 4, // seconds
    penalty: 2, // seconds
    bonus: 3, // seconds
    bg: 'images/background1.jpg'
  },

  {
    board:
    [[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
     [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]],

     images: 6,
     time: 40,
     penalty: 2,
     bonus: 3,
     bg: 'images/background2.jpg'
   }
];

  root.addEventListener('click', (event) => {
    audio.play();
    if ((timerEl.innerHTML != "Time's Up!" && canClick) && (event.target.classList[1] === 'image-cell')) {
      getImages(event);
      isMatch();
      win();
    }
    ifPauseGame();
  });

  function ifPauseGame() {
    if (event.target.id === 'pause') {
      pause.style.display = 'none';
      play.style.display = 'flex';
      restart.style.display = 'flex';
      restart.style.paddingLeft = '14px';
      audio.pause();
      canClick = false;
      overlay.style.display = 'flex';
      overlay.style.zIndex = '2';
      pauseUi();
    } else if (event.target.id === 'play'){
      play.style.display = 'none';
      restart.style.display = 'none';
      restart.style.paddingLeft = '0';
      pause.style.display = 'flex';
      audio.play();
      canClick = true;
      paused.parentNode.removeChild(paused);
      overlay.style.display = 'none';
    }
  }

  function pauseUi() {
    paused = document.createElement('h1');
    paused.id = "paused";
    paused.innerHTML = "PAUSED";
    paused.style.fontSize = "70px";
    paused.style.color = "#8696a0";
    paused.style.textShadow = "1px 5px 1px #000";
    overlay.appendChild(paused);
  }

  function reset() {
    matches = 0;
    randomImages = [];
    countDown = setInterval(timeInterval, 1000);
    for (let i = 0; i < 50; i++) {
      let cell = document.querySelector(`.cell`);
      console.log(cell.parentNode);
      cell.parentNode.removeChild(cell);
    }
    renderBoard(nextLevel);
  }

  function nextLevelIs(){
    for (i=0;i<levels.length;i++){
      if (currentLevel === levels[i]){
        return levels[i+1];
      }
    }
  }

function timer(level) {
  time = level.time;
  timerEl.innerHTML = time;
}

countDown = setInterval(timeInterval, 1000);

function timeInterval() {
  if (time > 1) {
    if (canClick) {
      time -= 1;
      timerEl.innerHTML = time;
    }
  } else {
    timerEl.innerHTML = "Time's Up!";
    stopTimer();
  }
}

function stopTimer() {
  lose();
  clearInterval(countDown);
}

function win() {
  if (matches === winningMatches) {
    if (nextLevel) {
      stopTimer();
      timerEl.innerHTML = "You Win!";
      console.log('You Win!');
      reset();
    } else {
      stopTimer();
      timerEl.innerHTML = "You Win!";
    }
  }
}

function lose() {
  overlay.style.display = 'flex';
  play.style.display = 'none';
  pause.style.display = 'none';
  restart.style.display = 'flex';
  console.log("Time's up!");
}

function isMatch() {
  if (firstImage && secondImage) {
    if (firstImage.getAttribute('src') === secondImage.getAttribute('src')) {
      console.log("Match!");
      matches += 1;
      penaltyOrBonus.innerHTML = `+${currentLevel.bonus}`
      penaltyOrBonus.style.color = '#1b8700';
      penaltyOrBonus.style.animation = 'timeMod 1s ease';

      time += currentLevel.bonus;
      firstImage = undefined;
      secondImage = undefined;
    } else {
      console.log("Wrong!");
      canClick = false;
      penaltyOrBonus.innerHTML = `-${currentLevel.penalty}`
      penaltyOrBonus.style.color = '#981515';
      penaltyOrBonus.style.animation = 'timeMod 1s ease';
      time -= currentLevel.penalty;
      setTimeout(hideImages, 1000);
    }
  }
}

// Gets saves both images that were clicked into variables and shows them
function getImages(event) {
  if (!firstImage || !secondImage) {
    if (!firstImage) {
      firstImage = imageSrc();
      showImage(event);
    } else {
      secondImage = imageSrc();
      showImage(event);
    }
  }
}

function imageSrc() {
  return event.target.firstChild;
}

// Hides images and clears first & second image variables
function hideImages() {
  canClick = true;
  firstImage.style.display = 'none';
  secondImage.style.display = 'none';
  penaltyOrBonus.style.animation = 'none';
  firstImage = undefined;
  secondImage = undefined;
}

function showImage(event) {
  event.target.firstChild.style.display = 'block';
}

// Renders the random images into the cells
function renderImages() {
  let counter;
  for (let i = 0; i < randomImages.length; i++) {
    let cell = document.querySelector(`#cell${i}`);
    let img = document.createElement('img');
    img.setAttribute('src', randomImages[i]);
    img.style.width = '100%';
    img.style.height = '100%';
    img.id = `img${i}`;
    img.className = 'images';
    cell.appendChild(img);
  }
  setTimeout(previewImages, 1500);
}

function previewImages() {
  let images = document.querySelectorAll('.images');
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = 'none';
  }
}

// Doubles the images in the array
function doubleImageArr(level) {
  for (let i = 0; i < level.images; i++) {
    levelImages.push(images[i]);
  }
  for (let i = 0; i < level.images * 2; i++) {
    if (i < level.images) {
      levelImages.push(images[i]);
    }
  }
}

// Randomizes images from levelImages into new array
function randomizeImages(level) {
  while (levelImages.length > 0) {
    let randNum = Math.floor(Math.random() * levelImages.length);
    let removed = levelImages.splice(randNum, 1);
    randomImages.push(removed);
  }
}

function renderBoard(level) {
  let idNum = 0; // Used to add number to id names
  winningMatches = level.images; // winningMatches decides
  currentLevel = level;
  nextLevel = nextLevelIs();
  timer(level);
  root.style.background = `url(${level.bg})`;
  root.style.backgroundSize = 'cover';
  for (let i = 0; i < level.board.length; i++) {
    for (let j = 0; j < level.board[i].length; j++) {
      if (level.board[i][j] === 1) {
        let card = document.createElement('div');
        card.classList.add('cell');
        card.classList.add('image-cell');
        card.id = `cell${idNum}`;
        card.style.backgroundColor = '#000';
        card.style.backgroundSize = 'cover';
        card.style.border = '#00c7cac2 solid';
        card.style.borderRadius = '10%';
        card.style.opacity = '.9';
        card.style.width = '10%';
        card.style.height = '20%';
        board.appendChild(card);
        idNum++;
      } else {
        let card = document.createElement('div');
        card.className = 'cell';
        card.style.opacity = '0';
        card.style.width = '10%';
        card.style.height = '20%';
        board.appendChild(card);
      }
    }
  }
  doubleImageArr(level);
  randomizeImages(level);
  renderImages();
}

renderBoard(levels[0]);
