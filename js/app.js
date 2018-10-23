const board = document.querySelector('#board');
const images = ['images/ifrit.png', 'images/cloud.png', 'images/sharingan.png', 'images/rinnegan.png', 'images/sephiroth.png',
];
let clonedImages = [];

const level1 = {
  board:
  [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
   [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
   [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
   [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]]
};

const level2 = {
  board:
  [[1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
   [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]]
 };
console.log(level1.board.length);
function renderBoard(level) {
  let idNum = 0; // used to add number in id names

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
  // for (let i = 0; i < images.length; i++) {
  //   let cell = document.querySelector(`#cell${i}`);
  //   let img = document.createElement('img');
  //   img.setAttribute('src', );
  //   img.style.width = '100%';
  //   img.style.height = '100%';
  //   cell.appendChild(img);
  // }
}


// cloneImages();
renderBoard(level1);
