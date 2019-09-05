const canvas = document.getElementById('tetris'); //access the canvas
const context = canvas.getContext('2d');//get the context because we can't draw on the element

context.scale(20, 20);

const matrix = [
  [0,0,0],
  [1,1,1],
  [0,1,0],
];

function draw(){
  context.fillStyle = '#000'; // paint the context black
  context.fillRect(0,0,canvas.width, canvas.height); //fill the rectangle black with the width and height chosen for the canvas in the HTML file
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

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0){
  const deltaTime = time - lastTime; //create a regular time difference to draw
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }

  draw();
  requestAnimationFrame(update);
}

const player = {
  pos: {x: 5, y: 5},
  matrix: matrix,
}

document.addEventListener('keydown', event => {
  console.log(event);
})

update();
