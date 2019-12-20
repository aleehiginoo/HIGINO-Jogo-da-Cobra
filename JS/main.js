var paintSnake = (document.getElementById("snake")).getContext("2d");
var headSnake = {x:200, y:200};
var bodySnake = [];
var tailSnake = {x:140, y:200};
var direction = 'rigth';
var fruit = {x:0, y:0};

    
bodySnake.push({x: 0, y: 0})
bodySnake.push({x:180, y:200})
bodySnake.push({x:160, y:200})

var game = setInterval(start, 200);

createFruit();

$('body').keydown(function(event){
    switch(event.which){
        case 37:
        case 65:
            start();
            direction = 'left';
            break;
        case 38:
        case 87:
            start();
            direction = 'up';
            break;
        case 39:
        case 68:
            start();
            direction = 'rigth';
            break;
        case 40:
        case 83:
            start();
            direction = 'down';
            break;
        case 32:
            start();
            clearInterval(game);
            break;
    }
})

function start(){ 

    if(headSnake.x == fruit.x && headSnake.y == fruit.y)
        eatFruit();
    
    if(checkCollision())
        clearInterval(game);

    paintSnake.clearRect(tailSnake.x, tailSnake.y, 20, 20);
    paintSnake.fillRect(headSnake.x, headSnake.y, 20, 20);
    
    bodySnake[0].x = headSnake.x;
    bodySnake[0].y = headSnake.y;
    
    tailSnake.x = bodySnake[bodySnake.length-1].x;
    tailSnake.y = bodySnake[bodySnake.length-1].y;
    
    for(var i = bodySnake.length - 1; i > 0 ; i--){
        bodySnake[i].x = bodySnake[i-1].x;
        bodySnake[i].y = bodySnake[i-1].y;
    }
    
    switch(direction){
        case 'left':
            if(headSnake.x == 0)
            headSnake.x = 500;
            else
            headSnake.x -= 20;
            break;
        case 'up':
            if(headSnake.y == 0)
            headSnake.y = 500;
            else
            headSnake.y -= 20;
            break;
        case 'rigth':
            if(headSnake.x == 500)
            headSnake.x = 0;
            else
            headSnake.x += 20;
            break;
        case 'down':
            if(headSnake.y == 500)
            headSnake.y = 0;
            else
            headSnake.y += 20;
            break;
    }
                   
}


function eatFruit(){
    createFruit();
    bodySnake.push({x: tailSnake.x, y: tailSnake.y});   
}


function createFruit(){
    fruit.x = Math.floor(Math.random() * (24 - 1)) * 20;
    fruit.y = Math.floor(Math.random() * (24 - 1)) * 20;

    paintSnake.beginPath();
    paintSnake.arc(fruit.x+10, fruit.y+10, 5, 0, 100);
    paintSnake.fill();
}

function checkCollision(){
    for(var i=0; i<bodySnake.length; i++)
    if(headSnake.x === bodySnake[i].x && headSnake.y === bodySnake[i].y)
    return true;
}