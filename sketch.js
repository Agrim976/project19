var WELCOME = 5;
var STORY = 4;
var CHARACTER = 3;
var START = 2
var PLAY = 1;
var END = 0;
var gameState = WELCOME;

var bgImage, ground;
var player;
var boyImage,boy,girl, girlImage;
var girlThiefImage, thiefImage, thief;
var playButtonImage, playButton;
var nextButtonImage, nextButton,nextButtonImage1, nextButton1;
var backButtonImage, backButton;
var restartButtonImage, restartButton;
var menuButtonImage, menuButton;
var jumpSound, gameOverSound, selectPlayerSound, bgSound, clickSound;
var houseImage, house;
var obstaclesGroup, obstaclesImage,obstaclesImage1,obstaclesImage2,obstaclesImage3,obstaclesImage4;
var invisibleGround;
var score;

function preload(){
  playButtonImage = loadImage("play1.png");
  nextButtonImage = loadImage("next.png");
  nextButtonImage1 = loadImage("next1.png");
  backButtonImage = loadImage("back.png");
  restartButtonImage = loadImage("restart.png");
  menuButtonImage = loadImage("menu.png");
  
  boyImage = loadImage("boy.png");
  girlImage = loadImage("girl.png");
  
  thiefImage = loadImage("thief.png");
  girlThiefImage = loadImage("girl thief.png");
  
  bgImage = loadImage("bg1.jpg");
  
  houseImage = loadImage("bank.png");
  
  obstaclesImage = loadImage("obstacles.png");
  obstaclesImage1 = loadImage("obstacles1.png");
  obstaclesImage2 = loadImage("obstacles2.png");
  obstaclesImage3 = loadImage("obstacles3.png");
  obstaclesImage4 = loadImage("obstacles4.png");
  
  jumpSound = loadSound("jumpSound.aac");
  gameOverSound = loadSound("gameOver.aac");
  selectPlayerSound = loadSound("selectPlayer.aac");
  bgSound = loadSound("bgSound.aac");
  clickSound = loadSound("click.wav");

}

function setup() {
  createCanvas(600,400);
  
  bgSound.loop();
  
  ground = createSprite(300,200);
  ground.addImage(bgImage);
  ground.scale = 0.15;
  ground.velocityX = -10;
  
  invisibleGround = createSprite(300,340,600,5);
  invisibleGround.visible = false;
  
  house = createSprite(140,246);
  house.scale = 1.4;
  house.addImage(houseImage);
  house.visible = false;
  
  
  boy = createSprite(100,220);
  boy.addImage(boyImage);
  
  girl = createSprite(500,220);
  girl.addImage(girlImage);
  
  boy.visible = false;
  girl.visible = false;
  
  boy.setCollider("rectangle",0,0,100,300);
  
  thief = createSprite(140,262);
  thief.addImage(girlThiefImage);
  thief.scale = 0.3;
  thief.visible = false;
  
  playButton = createSprite(300,200);
  playButton.addImage(playButtonImage);
  playButton.visible = false;
  
  nextButton = createSprite(300,300);
  nextButton.addImage(nextButtonImage);
  nextButton.setCollider("circle",0,10,35);
  
  nextButton1 = createSprite(400,340);
  nextButton1.addImage(nextButtonImage1);
  nextButton1.visible = false;
  nextButton1.setCollider("circle",0,0,40);
  
  backButton = createSprite(200,340);
  backButton.addImage(backButtonImage);
  backButton.visible = false;
  backButton.setCollider("circle",0,0,40);
  
  restartButton = createSprite(300,200);
  restartButton.addImage(restartButtonImage);
  restartButton.scale = 0.5;
  restartButton.setCollider("circle",0,0,65);
  restartButton.visible = false;
  
  menuButton = createSprite(300,280);
  menuButton.addImage(menuButtonImage);
  menuButton.scale = 1.3;
  menuButton.visible = false;
  
  score = 0;
  
  obstaclesGroup = new Group();

}

function draw() {
  background("lightblue");
  
  thief.collide(invisibleGround);
  
  if(ground.x<10){
    
    ground.x = 800;
    
  }
  

  if(gameState === 2){
    
    selectPlayerSound.stop();
    boy.visible = false;
    girl.visible = false;
    playButton.visible = true;
    
    if(mousePressedOver(playButton)){
      
      gameState = PLAY;
      clickSound.play();      
      
    }
    
  }
  
  drawSprites();
  
  if(gameState === 1){
    
    gameOverSound.stop();
    
    playButton.visible = false;
    
    house.visible = true;
    house.velocityX = -10;
    house.lifetime = 40;
    
    thief.visible = true;
    
    if(keyDown("space") && thief.y > 260){
      thief.velocityY = -20;
      jumpSound.play();
    }
    
    thief.velocityY = thief.velocityY + 1.5;
    
    ground.velocityX = -(10 + 3 * score / 100);
    
    score = score + Math.round(getFrameRate()/60);
    
    fill("black");
    textSize(20);
    text("Score : " + score, 460,30);
    
    SpawnObstacles();
    
    obstaclesGroup.setVelocityXEach(ground.velocityX);
    
    if(thief.isTouching(obstaclesGroup)){
      
      gameState = 0;
      gameOverSound.play();
    }
    
  }
  
  if(gameState === 0){
    
    bgSound.stop();
   
    thief.velocityY = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    score = score;
    
    fill("black");
    textSize(20);
    text("Score : " + score, 460,30);
    
    restartButton.visible = true;
    menuButton.visible = true;
    
    if(mousePressedOver(restartButton)){
      
      reset();
    }
    
  }
  

  
  if(gameState === 3){
    
    boy.visible = true;
    girl.visible = true;
    
    fill("black");
    textSize(30);
    text("Choose your character..",150,40);
    
    if(mousePressedOver(boy)){
      
      gameState = START;
      thief.addImage(thiefImage);
      thief.y = 285;
      thief.scale = 0.37;
      thief.setCollider("circle",-25,0,140);
      
      
    }
    
    if(mousePressedOver(girl)){
      
      gameState = START;
      thief.setCollider("rectangle", -100, 50, 200,400);
      
      
    }
  
  }
  
  if(gameState === 5){
    
    fill("pink");
    textSize(40);
    text("Welcome to the world of thieves..",10,100);
    
    nextButton.visible = true;
    
    if(mousePressedOver(nextButton)){
      
      gameState = STORY;
      nextButton.visible = false;
      
    }
    
  }
  
  if(gameState === 4){
    
    fill("blue");
    textSize(35);
    text("You are running from the police as ",20,100);
    text("you have stolen money",120,180);
    text(" from a bank..",190,260);
    
    nextButton1.visible = true;
    backButton.visible = true;
    
    if(mousePressedOver(nextButton1)){
      
      gameState = 3;
      nextButton1.visible = false;
      backButton.visible = false;
      selectPlayerSound.play();
      
    }
    if(mousePressedOver(backButton)){
      
      gameState = 5;
      
      backButton.visible = false;
      
      nextButton1.visible = false;
      
    }
    
  }
  
 
}

function reset(){
  
  gameState = PLAY;
  bgSound.play();
  house.x = 140;
  house.lifetime = 40;
  score = 0;
  restartButton.visible = false;
  menuButton.visible = false;
  obstaclesGroup.destroyEach();
  
}

function SpawnObstacles(){
  
  if(frameCount % 100 === 0){
    
    var obstacles = createSprite(620,280);
    obstacles.lifetime = 400;
    obstacles.setCollider("rectangle",-22,60,50,200);
    //obstacles.debug = true;
    
    
    var rand = Math.round(random(1,5));
    
    switch(rand){
      case 1 : obstacles.addImage(obstaclesImage);
        obstacles.y = 320;
        obstacles.setCollider("rectangle",0,0,110,20);
        break;
        
      case 2 : obstacles.addImage(obstaclesImage1);
        obstacles.scale = 0.3;
        break;
        
      case 3 : obstacles.addImage(obstaclesImage2);
        obstacles.scale = 0.4;
        obstacles.y = 285;
        obstacles.setCollider("rectangle",0,0,20,250);
        break;
        
      case 4 : obstacles.addImage(obstaclesImage3);
        obstacles.scale = 0.35;
        obstacles.setCollider("rectangle",0,0,20,300);
        break;
        
      case 5 : obstacles.addImage(obstaclesImage4);
        obstacles.scale = 0.5;
        obstacles.y = 300;
        obstacles.setCollider("rectangle",0,10,25,100);
        break;
      
    }
    
    obstaclesGroup.add(obstacles);
    
    

  }
}