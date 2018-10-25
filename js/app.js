const board = document.querySelector('#board');
const images = ['images/ifritfull.png', 'images/odinfull.png', 'images/sharingan.png', 'images/caitsithfull.png', 'images/bahamutfull.png',
];
let levelImages = [];
let randomImages = [];
let firstImage;
let secondImage;



const level1 = {
  board:
  [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
   [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
   [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]],

  images: 5
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
  if (!firstImage || !secondImage) {
    if (!firstImage) {
      firstImage = imageSrc();
      showImage(event);
    } else {
      secondImage = imageSrc();
      showImage(event);
      if (firstImage === secondImage) {
          console.log("Match!");
          firstImage = undefined;
          secondImage = undefined;
      } else {
        console.log("Wrong!");
        firstImage = undefined;
        secondImage = undefined;
      }
    }
  }
  console.log(firstImage, secondImage);
});

function imageSrc() {
  return event.target.firstChild.getAttribute('src');
}

function hideImages() {
  document.querySelector('.images').style.display = 'none';
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
  let idNum = 0; // used to add number to id names
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
