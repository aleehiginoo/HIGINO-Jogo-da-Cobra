var paintGame = (document.getElementById("game")).getContext("2d");
var headSnake = {x:200, y:200};
var bodySnake = [];
var tailSnake = {x:170, y:200};
var direction = 'rigth';
var fruit = {x:0, y:0};
var score = 0;

    
bodySnake.push({x: -10, y: -10})
bodySnake.push({x:180, y:200})
bodySnake.push({x:170, y:200})

var game = setInterval(start, 200);

createFruit();

$('body').keydown(function(event){
    switch(event.which){
        case 37:
        case 65:
            start();
            if(direction!= 'rigth')
                direction = 'left';
            break;
        case 38:
        case 87:
            start();
            if(direction!= 'down')
                direction = 'up';
            break;
        case 39:
        case 68:
            start();
            if(direction!= 'left')
                direction = 'rigth';
            break;
        case 40:
        case 83:
            start();
            if(direction!= 'up')
                direction = 'down';
            break;
        case 32:
            start();
            clearInterval(game);
            break;
    }
})

function start(){ 

    $('span').text(score)
             .css('font-size', '40px')
             .css('margin-left', '20px')

    if(headSnake.x == fruit.x && headSnake.y == fruit.y)
        eatFruit();        
    
    switch(direction){
        case 'left':
            if(headSnake.x == 0)
            headSnake.x = 490;
            else
            headSnake.x -= 10;
            break;
        case 'up':
            if(headSnake.y == 0)
            headSnake.y = 490;
            else
            headSnake.y -= 10;
            break;
        case 'rigth':
            if(headSnake.x == 490)
            headSnake.x = 0;
            else
            headSnake.x += 10;
            break;
        case 'down':
            if(headSnake.y == 490)
            headSnake.y = 0;
            else
            headSnake.y += 10;
            break;
    }

    if(checkCollision())
       clearInterval(game);

        paintGame.fillStyle = '#00FF7F';
        paintGame.fillRect(bodySnake[0].x, bodySnake[0].y, 10, 10);
        paintGame.clearRect(tailSnake.x, tailSnake.y, 10, 10);
        paintGame.fillStyle = '#8FBC8F';
        paintGame.fillRect(headSnake.x, headSnake.y, 10, 10);
        
    
    bodySnake[0].x = headSnake.x;
    bodySnake[0].y = headSnake.y;
    
    tailSnake.x = bodySnake[bodySnake.length-1].x;
    tailSnake.y = bodySnake[bodySnake.length-1].y;
    
    for(var i = bodySnake.length - 1; i > 0 ; i--){
        bodySnake[i].x = bodySnake[i-1].x;
        bodySnake[i].y = bodySnake[i-1].y;
    }
                   
}


function eatFruit(){
    createFruit();
    score++;
    bodySnake.push({x: tailSnake.x, y: tailSnake.y}); 
}


function createFruit(){
    fruit.x = Math.floor(Math.random() * (24 - 1)) * 10;
    fruit.y = Math.floor(Math.random() * (24 - 1)) * 10;

    paintGame.fillStyle = 'blue';
    paintGame.beginPath();
    paintGame.arc(fruit.x+5, fruit.y+5, 3, 0, 100);
    paintGame.fill();
}

function checkCollision(){
    for(var i=0; i<bodySnake.length; i++)
    if(headSnake.x === bodySnake[i].x && headSnake.y === bodySnake[i].y)
    return true;
}