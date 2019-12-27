var paintGame = (document.getElementById("game")).getContext("2d");
var headSnake = {};
var bodySnake = [];
var direction, score, speed, border, game;
var fruit = {x:0, y:0};
var shit = {x:0, y:0};
var counter = 0;
var imgHead = new Image();
var imgFruit = new Image();
var imgShit = new Image();
var imgGameOver = new Image();
var stop = false;

imgFruit.src = 'Imagens/strawberry.png';
imgShit.src = 'Imagens/shit.png';
imgGameOver.src = 'Imagens/game-over.png';

$('legend').css('font-size', '40px')
        .css('margin-left', '20px')


$('#btn-lvl-easy').click(function(){toStart(200, 0), $('#btn-lvl-easy').addClass('active')})

$('#btn-lvl-normal').click(function(){toStart(100, 120), $('#btn-lvl-normal').addClass('active')})

$('#btn-lvl-hard').click(function(){toStart(50, 250), $('#btn-lvl-hard').addClass('active')})

function toStart(speedStart, beginBorder) {
    fruit = randomPos(fruit);
    shit = randomPos(shit);
    paintBorder();

    score = 0;
    border = beginBorder;
    direction = 'right';
    headSnake = {x:195, y:195};
    bodySnake = [{x:195, y:195},{x:180, y:195}];
    speed = speedStart,
    clearInterval(game);
    game = setInterval(start, speed)
    $('body').on('keydown');
    stop = false;
    $(".btn-levels").prop("disabled", true);
}

$('body').keydown(function(event){
    if(!stop){
    switch(event.which){
        case 37:
        case 65:
            start();
            if(direction!= 'right')
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
            break;
        }
    }})
    
function start(){
    $('span').text(score);

    speed === 30 ? counter++ : null ;
    counter === 250 ? (speed = 200, clearInterval(game), game = setInterval(start, speed), counter = 0 ): null;
        
    paintGame.clearRect(0, 0, 500, 500 );
    
    headSnake.x === fruit.x && headSnake.y === fruit.y ? eatFruit() : null;
        
    headSnake.x === shit.x && headSnake.y === shit.y ? eatShit() : null;
    
    switch(direction){
        case 'left':
            headSnake.x = toWalk(headSnake.x, headSnake.y, 'l', 0, 480, -15);
            break;
        case 'up':
            headSnake.y = toWalk(headSnake.y, headSnake.x, 'u', 0, 480, -15);
            break;
        case 'right':
            headSnake.x = toWalk(headSnake.x, headSnake.y, 'r', 480, 0, 15)
            break;
        case 'down':
            headSnake.y = toWalk(headSnake.y, headSnake.x, 'd', 480, 0, 15);
            break;
    }

    checkCollision();
       
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

function toWalk(pos, pos2, dir, begin, end, inc){
    imgHead.src = 'Imagens/head-'+dir+'.png';
        if(pos === begin){
            if(pos2 > border && pos2 < 480-border)
            pos = end;  
        } 
        else
        pos += inc;
    return pos;
}

function eatFruit(){
    if(speed>50)
        speed -= 10;
    clearInterval(game);
    game = setInterval(start, speed);
    fruit = randomPos(fruit);
    score += 10;
    bodySnake.push({x: bodySnake[bodySnake.length-1].x, y: bodySnake[bodySnake.length-1].y});
    border<270 ? border +=15 : null;
}

function eatShit() {
    speed = 30;
    clearInterval(game);
    game = setInterval(start, speed);
    shit = randomPos(shit);
    counter = 0;
    score -= 5;
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

function randomPos(sort) {
    sort.x = Math.floor(Math.random() * (33 - 1)) * 15;
    sort.y = Math.floor(Math.random() * (33 - 1)) * 15;
    if(sort.x != headSnake.x && sort.y != headSnake.y)
        for(var i=0; i < bodySnake.length; i++)
          bodySnake[i].x == sort.x && bodySnake[i].y == sort.y ? randomPos(sort) : null;

    return sort;
}

function checkCollision(){
    for(var i=0; i<bodySnake.length; i++)
    if(headSnake.x === bodySnake[i].x && headSnake.y === bodySnake[i].y){
        clearInterval(game);
        for(var i = 0; i < 15; i++)
        $('#game').fadeToggle(200);

         $('#game').fadeToggle(200, function() {
            paintGame.fillStyle = '#000000';
            paintGame.fillRect(0, 0, 495, 495);
            paintGame.drawImage(imgGameOver, 0, 70, 495, 300);
            paintGame.fillStyle = '#eeeeee';
            paintGame.font = '30px Lucida Sans';
            paintGame.fillText('Your Score: ' + score, 150,380);   
            paintGame.font = '20px Lucida Sans';          
            paintGame.fillText('Escolha um nível para recomeçar', 90,450);
            $(".btn-levels").prop("disabled", false );
            $(".btn-levels").removeClass('active');
         });
         stop = true;
    }
}