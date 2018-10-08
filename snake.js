//cd Homework/HUE_01_Snake

var ansi = require('ansi');
var keypress = require('keypress');

var cursor = ansi(process.stdout);
var height = 16;
var width = 42;
var applePosX;
var applePosY;
var snakePosX = width/2;
var snakePosY = height/2;
var snakeDirectionX = 1;
var snakeDirectionY = 0;
var score = 0;

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('keypress', handleInput);

process.stdout.write('\x1Bc');    

printGameBoard();
newApple();
resetCursor();
updateGame();

 
function handleInput(chunk,key){
    switch(key.name){
        case "up":snakeDirectionX=0;snakeDirectionY=-1;break;
        case "down":snakeDirectionX=0;snakeDirectionY=1;break;
        case "left":snakeDirectionX=-1;snakeDirectionY=0;break;
        case "right":snakeDirectionX=1;snakeDirectionY=0;break;
        case "w":snakeDirectionX=0;snakeDirectionY=-1;break;
        case "s":snakeDirectionX=0;snakeDirectionY=1;break;
        case "a":snakeDirectionX=-1;snakeDirectionY=0;break;
        case "d":snakeDirectionX=1;snakeDirectionY=0;break;
    }
}

function updateGame(){
    if(applePosX == snakePosX && applePosY == snakePosY){
        newApple();
        score += 10;
        resetCursor();
        cursor.goto(0,height+2).write("Score: "+score);
        resetCursor();
    }
    moveSnake();
    if(snakePosX>1&&snakePosX<=width&&snakePosY>1&&snakePosY<=height){
        setTimeout(updateGame,1000/((score+10)/10));
    } else {
        resetCursor();
        cursor.bg.black();
        cursor.red();
        cursor.goto(width/2-3,height/2+1).write("Game Over");
        resetCursor();
    }
}

function moveSnake(){
    cursor.bg.white();
    cursor.goto(snakePosX,snakePosY).write(" ");
    if(snakeDirectionX != 0){
        snakePosX+=snakeDirectionX;
    }
    if(snakeDirectionY != 0){
        snakePosY+=snakeDirectionY;
    }
    cursor.bg.green();
    cursor.goto(snakePosX,snakePosY).write(" ");
    resetCursor();
}

function resetCursor(){
    cursor.goto(0,height+3);
    cursor.reset();
}

function newApple(){
    applePosX = Math.floor((Math.random()*(width-2))+2);
    applePosY =  Math.floor((Math.random()*(height-2))+2);
    cursor.bg.red();
    cursor.goto(applePosX,applePosY).write(" ");
}

function printGameBoard(){
    cursor.bg.grey();
    var i;
    for(i=0;i<=width;i++){
        cursor.write(" ");
    }
    cursor.write("\n");
    for(i=1;i<=height-1;i++){
        cursor.write(" ");
        cursor.bg.white();
        for(var j=1;j<=width-1;j++){
            cursor.write(" ");
        }
        cursor.bg.grey();
        cursor.write(" \n");
    }
    for(i=0;i<=width;i++){
        cursor.write(" ");
    }
    cursor.write("\n");
    cursor.bg.black();
}