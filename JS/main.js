var paintGame = (document.getElementById("game")).getContext("2d");
var headSnake = {x:195, y:195};
var bodySnake = [{x:195, y:195},{x:180, y:195}];
var direction = 'right';
var fruit = {x:0, y:0};
var shit = {x:0, y:0};
var score = 0;
var speed = 200;
var counter = 0;
var imgHead = new Image();
var imgFruit = new Image();
imgFruit.src = 'Imagens/strawberry.png';
var imgShit = new Image();
imgShit.src = 'Imagens/shit.png';
var border = 0; 
var walk = false;

var game = setInterval(start, speed);

createFruit();
createShit();

$('body').keydown(function(event){
    switch(event.which){
        case 37:
        case 65:
            start();
            if(direction != 'right')
                direction = 'left';
            break;
        case 38:
        case 87:
            start();
            if(direction != 'down')
                direction = 'up';
            break;
        case 39:
        case 68:
            start();
            if(direction != 'left')
                direction = 'right';
            break;
        case 40:
        case 83:
            start();
            if(direction != 'up')
                direction = 'down';
            break;
        case 32:
            start();
            clearInterval(game);
            break;
        }
    })
    
    function start(){

    speed == 30 ? counter++ : null ;
    counter == 250 ? (
        speed = 200,
        clearInterval(game),
        game = setInterval(start, speed),
        counter = 0 )
        : null;
        
    paintGame.clearRect(0, 0, 500, 500 );

    $('span').text(score)
    .css('font-size', '40px')
    .css('margin-left', '20px')
    
    headSnake.x == fruit.x && headSnake.y == fruit.y ? eatFruit() : null;
        
    headSnake.x == shit.x && headSnake.y == shit.y ? (
        speed = 30,
        clearInterval(game),
        game = setInterval(start, speed),
        createShit(),
        counter = 0
    ) : null;
    
    switch(direction){
        case 'left':
            imgHead.src = 'Imagens/head-l.png';
            if(headSnake.x == 0 && (headSnake.y > border && headSnake.y < 480-border))
            headSnake.x = 480;
            else if(headSnake.x == 0)
            walk = true;
            else
            headSnake.x -= 15;
            break;
        case 'up':
            imgHead.src = 'Imagens/head-u.png';
            if(headSnake.y == 0 && (headSnake.x > border && headSnake.x < 480-border))
            headSnake.y = 480;
            else if(headSnake.y == 0)
            walk = true;
            else
            headSnake.y -= 15;
            break;
        case 'right':
            imgHead.src = 'Imagens/head-r.png';
            if(headSnake.x == 480 && (headSnake.y > border && headSnake.y < 480-border))
            headSnake.x = 0;
            else if(headSnake.x == 480)
            walk = true;
            else
            headSnake.x += 15;
            break;
        case 'down':
            imgHead.src = 'Imagens/head-d.png';
            if(headSnake.y == 480 && (headSnake.x > border && headSnake.x < 480-border))
            headSnake.y = 0;
            else if(headSnake.y == 480)
            walk = true;
            else
            headSnake.y += 15;
            break;
    }

    if(checkCollision()){
        clearInterval(game);
        for(var i = 0; i < 16; i++)
         $('#game').fadeToggle(200);
    }

        
       
       for(var i = bodySnake.length - 1; i >= 0 ; i--){
           paintGame.beginPath();
           paintGame.fillStyle = '#00FF7F';
           paintGame.rect(bodySnake[i].x, bodySnake[i].y, 15, 15);
           paintGame.fill();
           paintGame.stroke();
        }

        paintBorder();
        paintGame.drawImage(imgFruit, fruit.x, fruit.y, 15 , 15);
        paintGame.drawImage(imgShit, shit.x, shit.y, 15 , 15);        
        paintGame.drawImage(imgHead, headSnake.x-8, headSnake.y-8, 30, 30);
        
        
        
        for(var i = bodySnake.length - 1; i > 0 ; i--){
            bodySnake[i].x = bodySnake[i-1].x;
            bodySnake[i].y = bodySnake[i-1].y;
        }
        
        bodySnake[0].x = headSnake.x;
        bodySnake[0].y = headSnake.y;
}


function eatFruit(){
    if(speed>50)
        speed -= 10;
    clearInterval(game);
    game = setInterval(start, speed);
    createFruit();
    score++;
    bodySnake.push({x: bodySnake[bodySnake.length-1].x, y: bodySnake[bodySnake.length-1].y});
    border<270 ? border +=15 : null;
}
function paintBorder(){
    paintGame.strokeStyle = 'black';
    paintGame.beginPath();
    paintGame.moveTo(1,border);
    paintGame.lineTo(1,1);
    paintGame.lineTo(border,1);
    paintGame.stroke();
    paintGame.beginPath();
    paintGame.moveTo(494,494-border);
    paintGame.lineTo(494,494);
    paintGame.lineTo(494-border,494);
    paintGame.stroke();
    paintGame.beginPath();
    paintGame.moveTo(1,494-border);
    paintGame.lineTo(1,494);
    paintGame.lineTo(1+border,494);
    paintGame.stroke();
    paintGame.beginPath();
    paintGame.moveTo(494,1+border);
    paintGame.lineTo(494,1);
    paintGame.lineTo(494-border,1);
    paintGame.stroke();
}
function createFruit(){
    fruit.x = Math.floor(Math.random() * (33 - 1)) * 15;
    fruit.y = Math.floor(Math.random() * (33 - 1)) * 15;
}

function createShit(){
    shit.x = Math.floor(Math.random() * (33 - 1)) * 15;
    shit.y = Math.floor(Math.random() * (33 - 1)) * 15;
}

function checkCollision(){
    for(var i=0; i<bodySnake.length; i++)
    if(headSnake.x === bodySnake[i].x && headSnake.y === bodySnake[i].y && walk)
    return true;
}