const canvas = document.getElementById('tetris'); //access the canvas
const context = canvas.getContext('2d');//get the context because we can't draw on the element

context.scale(20, 20);

const matrix = [
  [0,0,0],
  [1,1,1],
  [0,1,0],
];

function collide (arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && //check if the player matrix is not zero
          (arena[y + o.y] && //check if the arena has a row and a column and they are not zero
          arena[y + o.y][x + o.x]) !== 0) {
            return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--){
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}
function draw(){
  context.fillStyle = '#000'; // paint the context black
  context.fillRect(0,0,canvas.width, canvas.height); //fill the rectangle black with the width and height chosen for the canvas in the HTML file

  drawMatrix( arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);

}

function drawMatrix(matrix, offset) {
  matrix.forEach((row,y) => {         //for each row of the matrix
    row.forEach((value, x) => {       //for each value in a row
      if (value !== 0) {              //check if it has value then paint it if it does
        context.fillStyle = 'red';
        context.fillRect (x + offset.x,
                          y + offset.y
                          ,1,1);
      }
    });
  });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) =>{
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
}

function playerDrop (){
  player.pos.y++;
  if(collide(arena, player)){
    player.pos.y--;
    merge(arena, player);
    player.pos.y = 0;
  }
  dropCounter = 0; //add one second delay after player forces piece down
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }

}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0){
  const deltaTime = time - lastTime; //create a regular time difference to draw
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);

const player = {
  pos: {x: 5, y: 5},
  matrix: matrix,
}

document.addEventListener('keydown', event => {
  if(event.keyCode === 37){
    playerMove(-1);
  } else if (event.keyCode === 39){
    playerMove(+1);
  }else if (event.keyCode === 40) {
    playerDrop();
  }
})

update();
