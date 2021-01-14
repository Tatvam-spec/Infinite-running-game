var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, backgroundImage, background1;
var FoodGroup, obstacleGroup;
var score = 0;
var gameOver, restart;


function preload(){
  
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("OIP.jpg");
}



function setup() {
 createCanvas(1000, 500)

  
  //creating monkey
  monkey=createSprite(100,415,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,450,1000,10);
  ground.visible = true;
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x); 
  
  
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
  gameOver = createSprite(500,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
}


function draw() {
  background(backgroundImage);
 

  if(gameState === END && keyDown("space")){
    gameState = PLAY;
    monkey.y = 100;
    monkey.scale = 0.1;
    gameOver.visible = false;
    restart.visible = false;
  
  }
 
  if (gameState===PLAY){
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY= -12;
  }
  monkey.velocityY= monkey.velocityY+0.8;
  
  monkey.collide(ground); 
  
  if(bananasGroup.isTouching(monkey)){
    score=score+2;
    bananasGroup.distroyEach;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.06
    
  
  
  if(obstaclesGroup.isTouching(monkey) && monkey.scale === 0.06){
   gameState = END

  } 

    if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
    monkey.distroy
    obstaclesGroup.visible = false
    text("Survival Time:"+ survivalTime, 1115,0);
  }
  }
}
  
  //spawn bananas
  spawnBananas();
  
  //spawn obtacles
  spawnObstacles();
  
  showscore();
  
  stroke("black");
  textSize(10);
  fill("black");
  text("Press SPACE to restart if game ended", 350, 25);
  stroke("black");
  textSize(10);
  fill("black");
  text("If monkey is touching the stone from front then it will die but if touched from top then 1 lifeline vanish ", 350, 40);
 

  drawSprites();

}

function spawnBananas(){
  if(frameCount % 100 === 0) {
    var banana=createSprite(600,400,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(150,250));
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifeTime=900;
    bananasGroup.add(banana)
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0) {
    var obstacle =createSprite(400,465,10,40);
    obstacle.addImage(obstacleImage)
    obstacle.y = Math.round(random(375,450));
    
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    obstacle.lifeTime=900;
    obstaclesGroup.add(obstacle)
  }
}

function showscore(){
   stroke("white");
  textSize(20);
  fill("white");
  text("Score" + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/frameRate())
  text("Survival Time:"+ survivalTime, 115,30);
}

