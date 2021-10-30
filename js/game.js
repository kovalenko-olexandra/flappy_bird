var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 25;
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// Область где рисуеться игра
function draw() {
 ctx.drawImage(bg, 0, 0); // загрузка картинки заднего фона
// создание цикла появления блоков в рандомном порядке
 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); // загрузка картинки верхнего блока
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap); // загрузка картинки нижнего блока

 pipe[i].x--; // чтобы блоки передвигались
// проверка расположения блоков и добавление новых элементов
 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }
// количество очков 
 if(pipe[i].x == 5) {
 score++;
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height); // загрузка картинки пола
 ctx.drawImage(bird, xPos, yPos); // загрузка картинки птички

 yPos += grav;
// текст для очков 
 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw); // цикличный вызов метода draw чтобы птички падала постоянно
}

pipeBottom.onload = draw;