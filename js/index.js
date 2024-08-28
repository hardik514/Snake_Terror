let inputA = {x: 0,y: 0};
const foodMusic = new Audio('food.mp3');
const gameMusic = new Audio('khatam.mp3');
const moveMusic = new Audio('move.mp3');
const backMusic = new Audio('bgmusic.mp3');
let pastTime = 0;
let speed = 13;
let score = 0;
let snakeArr = [
    {x: 2,y: 17}
]
let food = {x: 7,y: 17};

function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-pastTime)/1000 < 1/speed)
    {
        return;
    }
    pastTime = ctime;
    gameEngine();
}

function isCollide(snakeArr){
 //Collision to itself
 for (let index = 1; index < snakeArr.length; index++) {
    if(snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y)
    {
        return true;
    }
  }
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0)
    {
       return true;
    }
}

function gameEngine()
{ 
   // Collide
    if(isCollide(snakeArr))
    {
      backMusic.pause();
      gameMusic.currentTime = 0;
      gameMusic.play();
      inputA = {x:0 ,y:0};
      alert("GAME OVER...PRESS ANY KEY TO START!!");
      gameMusic.pause();
      gameMusic.currentTime = 0;
      snakeArr = [{x: 2,y: 17}];
      backMusic.currentTime = 0;
      backMusic.play();
      score = 0;
    }

    //Snake eat food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y)
    {
        foodMusic.play(); 
        score += 1;
        if(score>hisco)
            {
              hisco = score;
              localStorage.setItem("hiscore",JSON.stringify(hisco));
              highBox.innerHTML = "Highest Score: " + hiscore;
            }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputA.x, y: snakeArr[0].y + inputA.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    //Snake crawling
    for (let index = snakeArr.length-2; index >= 0; index--) {
        snakeArr[index+1] = {...snakeArr[index]};
    }
    snakeArr[0].x += inputA.x;
    snakeArr[0].y += inputA.y;

    //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0)
    {
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  })

  //Display food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Main Code for moving
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hisco = 0;
    localStorage.setItem("hiscore", JSON.stringify(hisco));
} else {
    hisco = JSON.parse(hiscore);
    highBox.innerHTML = "Highest Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputA = {x: 0,y: 1};
    moveMusic.play();
    backMusic.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputA.x = 0;
            inputA.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputA.x = 0;
            inputA.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputA.x = -1;
            inputA.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputA.x = 1;
            inputA.y = 0;
            break;
    
        default:
            break;
    }
});