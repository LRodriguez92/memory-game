const board = document.querySelector('#board');
const timerEl = document.querySelector('#timer');
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

const levels = [
  {
    board:
    [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]],

    images: 5,
    time: 40, // seconds
    penalty: 2, // seconds
    bonus: 3 // seconds
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
     bonus: 3
   }
];

// const level1 = {
//   board:
//   [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
//    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
//    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
//    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
//    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]],
//
//   images: 5,
//   time: 40, // seconds
//   penalty: 2, // seconds
//   bonus: 3 // seconds
// };
//
// const level2 = {
//   board:
//   [[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
//    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
//    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
//    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
//    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]],
//
//    images: 6,
//    time: 40,
//    penalty: 2,
//    bonus: 3
//  };

  board.addEventListener('click', (event) => {
    if (timerEl.innerHTML != "Time's Up!" && canClick) {
      getImages(event);
      isMatch();
      win();
    }
  });


function timer(level) {
  time = level.time;
  timerEl.innerHTML = time;
  console.log(level.time);
  countDown;
}

const countDown = setInterval(() => {
  if (time > 1) {
    if (canClick) {
      time -= 1; console.log(time);
      timerEl.innerHTML = time;
    }
  } else {
    timerEl.innerHTML = "Time's Up!";
    stopTimer();
  }
}, 1000);

function stopTimer() {
  lose();
  clearInterval(countDown);
}

function win() {
  if (matches === winningMatches) {
    stopTimer();
    timerEl.innerHTML = "You Win!";
    console.log('You Win!');
    // board.children.style.display = 'none';

  }
}

function lose() {
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
  for (let i = 0; i < randomImages.length; i++) {
    let cell = document.querySelector(`#cell${i}`);
    let img = document.createElement('img');
    img.setAttribute('src', randomImages[i]);
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'none';
    img.id = `img${i}`;
    img.className = 'images';
    cell.appendChild(img);
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
  timer(level);
  console.log(`winning matches is ${winningMatches}`);
  for (let i = 0; i < level.board.length; i++) {
    for (let j = 0; j < level.board[i].length; j++) {
      if (level.board[i][j] === 1) {
        let card = document.createElement('div');
        card.className = 'cell';
        card.id = `cell${idNum}`;
        card.style.backgroundColor = '#000';
        card.style.backgroundSize = 'cover';
        card.style.border = '#5c0202 solid';
        card.style.width = '10%';
        card.style.height = '20%';
        board.appendChild(card);
        idNum++;
      } else {
        let card = document.createElement('div');
        card.className = 'empty-cell';
        card.style.backgroundColor = '#FFF';
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

renderBoard(levels[1]);
