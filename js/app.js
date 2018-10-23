const board = document.querySelector('#board');
const board1 = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
];

const board2 = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];

function renderBoard() {
  for (let i = 0; i < board1.length; i++) {
    for (let j = 0; j < board1[i].length; j++) {
      if (board1[i][j] === 1) {
        let card = document.createElement('div');
        card.className = 'cell';
        card.style.backgroundColor = '#000';
        card.style.border = '#5c0202 solid'
        card.style.width = '10%';
        card.style.height = '20%';
        board.appendChild(card);
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
}
renderBoard();
