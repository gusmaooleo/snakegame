
//const-set
const arrowLeft = document.getElementsByClassName('arrow__left')[0];
const arrowUp = document.getElementsByClassName('arrow__up')[0];
const arrowDown = document.getElementsByClassName('arrow__down')[0];
const arrowRight = document.getElementsByClassName('arrow__right')[0];

//arrowLeft:hover--------------------------------------
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        arrowLeft.classList.add('hovered');
    }
    if (event.key === 'a') {
        arrowLeft.classList.add('hovered');
    }
});
document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        arrowLeft.classList.remove('hovered');
    }
    if (event.key === 'a') {
        arrowLeft.classList.remove('hovered');
    }
});

//arrowUp:hover----------------------------------------
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        arrowUp.classList.add('hovered');
    }
    if (event.key === 'w') {
        arrowUp.classList.add('hovered');
    }
});
document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowUp') {
        arrowUp.classList.remove('hovered');
    }
    if (event.key === 'w') {
        arrowUp.classList.remove('hovered');
    }
});

//arrowDown:hover--------------------------------------
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        arrowDown.classList.add('hovered');
    }
    if (event.key === 's') {
        arrowDown.classList.add('hovered');
    }
});
document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowDown') {
        arrowDown.classList.remove('hovered');
    }
    if (event.key === 's') {
        arrowDown.classList.remove('hovered');
    }
});

//arrowRight:hover-------------------------------------
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        arrowRight.classList.add('hovered');
    }
    if (event.key === 'd') {
        arrowRight.classList.add('hovered');
    }
});
document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowRight') {
        arrowRight.classList.remove('hovered');
    }
    if (event.key === 'd') {
        arrowRight.classList.remove('hovered');
    }
});


//--board--
const blockSize = 25;
const rows = 28;
const columns = 32;

let board;
let context;

let counter = 0;

//--snake-- > head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;
let velocityUpdate = 1;

//--snake-- > body
let snakeBody = [];


//--food--
let foodX;
let foodY;

//--gameOver-- 
var gameOver = false;


window.onload = function () {
    board = document.getElementById("play__board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener('keyup', changeDirection);
    //update();
    setInterval(update, 100);
}


function update() {
    if (gameOver) {
        //window.location.reload(); 
        return;
    }

    context.fillStyle = "#29294F"; //board color
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "#FF514D"; // food color
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        updatePoints();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "#33A7FF"; //snake color
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        //losing conditional--0
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            Swal.fire({
                title: 'Você Perdeu!', 
                text: 'Pressione "ok" para reiniciar.', 
                icon: 'error',
                confirmButtonText: 'ok',
            }).then((result) => {
                window.location.reload();
            });
            gameOver = true;
        }
    }
    //losing conditional--1
    if (snakeX < 0 || snakeX > columns*blockSize - 1|| snakeY < 0 || snakeY > rows*blockSize - 1) {
        Swal.fire({
            title: 'Você Perdeu!', 
            text: 'Pressione "ok" para reiniciar.', 
            icon: 'error',
            confirmButtonText: 'ok',
        }).then((result) => {
            window.location.reload();
        });
        gameOver = true;
    }
}
function changeDirection(event) {
    if (event.key === "ArrowUp" && velocityY != velocityUpdate) {
        velocityX = 0;
        velocityY = -velocityUpdate;
    }
    if (event.key === "w" && velocityY != velocityUpdate) {
        velocityX = 0;
        velocityY = -velocityUpdate;
    }
    if (event.key === "ArrowDown" && velocityY != -velocityUpdate) {
        velocityX = 0;
        velocityY = velocityUpdate;
    }
    if (event.key === "s" && velocityY != -velocityUpdate) {
        velocityX = 0;
        velocityY = velocityUpdate;
    }
    if (event.key === "ArrowLeft" && velocityX != velocityUpdate) {
        velocityX = -velocityUpdate;
        velocityY = 0;
    }
    if (event.key === "a" && velocityX != velocityUpdate) {
        velocityX = -velocityUpdate;
        velocityY = 0;
    }
    if (event.key === "ArrowRight" && velocityX != -velocityUpdate) {
        velocityX = velocityUpdate;
        velocityY = 0;
    }
    if (event.key === "d" && velocityX != -velocityUpdate) {
        velocityX = velocityUpdate;
        velocityY = 0;
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}

function updatePoints() {
    counter++;
    $('#score').text("score: " + counter);
}