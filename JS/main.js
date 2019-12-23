var paintGame = (document.getElementById("game")).getContext("2d");
var headSnake = {x:195, y:195};
var bodySnake = [];
var direction = 'rigth';
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

bodySnake.push({x: -50, y: -50})
bodySnake.push({x:195, y:195})
bodySnake.push({x:195, y:195})

var game = setInterval(start, speed);

createFruit();
createShit();

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
            if(headSnake.x == 0)
            headSnake.x = 480;
            else
            headSnake.x -= 15;
            break;
        case 'up':
            imgHead.src = 'Imagens/head-u.png';
            if(headSnake.y == 0)
            headSnake.y = 480;
            else
            headSnake.y -= 15;
            break;
        case 'rigth':
            imgHead.src = 'Imagens/head-r.png';
            if(headSnake.x == 480)
            headSnake.x = 0;
            else
            headSnake.x += 15;
            break;
        case 'down':
            imgHead.src = 'Imagens/head-d.png';
            if(headSnake.y == 480)
            headSnake.y = 0;
            else
            headSnake.y += 15;
            break;
    }

    if(checkCollision()){
        clearInterval(game);
        for(var i = 0; i < 16; i++){
         $('#game').fadeToggle(200);
         console.log(i);}
        }
       
       for(var i = bodySnake.length - 1; i > 0 ; i--){
           paintGame.beginPath();
           paintGame.fillStyle = '#00FF7F';
           paintGame.rect(bodySnake[i].x, bodySnake[i].y, 15, 15);
           paintGame.fill();
           paintGame.stroke();
        }
        paintGame.drawImage(imgFruit, fruit.x, fruit.y, 15 , 15);
        paintGame.drawImage(imgShit, shit.x, shit.y, 15 , 15);        
        paintGame.drawImage(imgHead, headSnake.x-8, headSnake.y-8, 30, 30);

    bodySnake[0].x = headSnake.x;
    bodySnake[0].y = headSnake.y;
    
    for(var i = bodySnake.length - 1; i > 0 ; i--){
        bodySnake[i].x = bodySnake[i-1].x;
        bodySnake[i].y = bodySnake[i-1].y;
    }
                   
}


function eatFruit(){
    if(speed>50)
        speed -= 10;
    clearInterval(game);
    game = setInterval(start, speed);
    createFruit();
    score++;
    bodySnake.push({x: bodySnake[bodySnake.length-1].x, y: bodySnake[bodySnake.length-1].y});
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
    if(headSnake.x === bodySnake[i].x && headSnake.y === bodySnake[i].y)
    return true;
}