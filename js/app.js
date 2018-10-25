const board = document.querySelector('#board');
const images = ['images/ifritfull.png', 'images/odinfull.png', 'images/sharingan.png', 'images/caitsithfull.png', 'images/bahamutfull.png',
];
let levelImages = [];
let randomImages = [];
let firstImage;
let secondImage;
let winningMatches; // Determined in renderBoard according to # of images per level
let matches = 0; // Updates when there's a match
let time;

const level1 = {
  board:
  [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
   [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
   [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]],

  images: 5,

  time: 10 // seconds
};

const level2 = {
  board:
  [[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]],

   images: 5
 };

board.addEventListener('click', (event) => {
  getImages(event);
  isMatch(event);
  winOrLose();
});

const countDown = setInterval(() => {
  if (time > 1) {
    time -= 1; console.log(time);
  } else {
    stopTimer();
  }
}, 1000);

function timer(level) {
  time = level.time;
  console.log(level.time);
    countDown;
}

function stopTimer() {
  console.log("Time's up!");
  clearInterval(countDown);
}

function winOrLose() {
  if (matches === winningMatches) {
    console.log('You Win!');
  }
}

function isMatch(event) {
  if (firstImage && secondImage) {
    if (firstImage.getAttribute('src') === secondImage.getAttribute('src')) {
      // console.log(firstImage, secondImage);
      console.log("Match!");
      matches += 1;
      firstImage = undefined;
      secondImage = undefined;

    } else {
      // console.log(firstImage, secondImage);
      console.log("Wrong!");
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
  firstImage.style.display = 'none';
  secondImage.style.display = 'none';
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

renderBoard(level1);
