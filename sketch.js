//Creating variables for main characters of game
var steve1,steve2,platform,ground,arrow,zombie;
//Creating variables to add image to them
var steve1Img,steve2Img,platformImg,groundImg,arrowImg,zombieImg;
var restart,gameOver;
var restartImg,gameOverImg;

//Creating variables for adding sound to the game
var minecraft_background_sound,minecraft_background_sound1,minecrcaft_die_sound,minecraft_arrow_shoot_sound;
var loop1 = false;

//Creating variable for score
var score = 0;
var scoreTxt,instructionTxt;

//Creating 'constant' variable for gamestate
var PLAY = 1;
   var END = 0;
     var gameState = PLAY;



function preload(){

//Loading Images
steve1Img = loadImage("steve1.png");
platformImg = loadImage("minecraft.jpeg");
steve2Img = loadImage("steve_with_arrow.png");
groundImg = loadImage("ground.jpeg");
arrowImg = loadImage("Untitled.png");
zombieImg = loadImage("zombie.png");
restartImg = loadImage("restart.png");

//Sound loading
minecraft_background_sound = createAudio('c418 minecraft.mp3');
   minecraft_background_sound1 = minecraft_background_sound.play();

//Creating Groups
zombieG = new Group();
arrowG = new Group();
steves = new Group();
}

function setup() {
//Creating canvas
 createCanvas(1600,500);
 
 //Creating sprite(character) 'steve1'
 steve1 = createSprite(100,312,20,20);
    steve1.addImage(steve1Img);
      steve1.scale = 0.2;
  steves.add(steve1);

  //Creating spraite for restarting the game
  restart = createSprite(750,300);
  restart.addImage(restartImg);
  restart.scale = 0.09;
  restart.visible = false;

 //Creating ground
 ground = createSprite(width/2,475,width,150);
    ground.addImage(groundImg);
 
 }



function draw() {
  //Adding image to the background
 background(platformImg);

 //Displaying score and instructions
 fill("black");
 textSize(15);
 scoreTxt = text("Score: "+score,1400,50);
 instructionTxt = text("Please press space to shoot an arrow,if it touches the zombie your score increases, remember don't let zombie touch you",
 400,40 );

 //Adding 'if' statement for following gameState
 if(gameState === PLAY){

     loop1 = true;

     if(loop1 = true){
         
        //Playing background music
         minecraft_background_sound1.loop();
     }
     
     //Adding velocity to the ground
     ground.velocityX = -(3.5 + Math.round(frameCount/90));

     //Making ground appear to move
      if(ground.x < 500){
       ground.x = ground.width/2;
        }
  
        //Changing sprite and shooting arrow when particular key pressed 
              if(keyDown("space")){
                
                //Spawning arrow when key pressed
                arrow = createSprite(220,300,30);
                  arrow.velocityX = 4.5;
                    arrow.addImage(arrowImg);
                     arrow.scale = 0.2;
                       arrow.lifetime = 280;
                arrowG.add(arrow);

                //Destroying steve1 and spawning steve2 when "space" key pressed
                steve1.destroy();
                  steve2 = createSprite(100,312,20,20);
                    steve2.addImage(steve2Img);
                      steve2.scale = 0.3;
                    ground.depth = steve2.depth +1
                steves.add(steve2);
               }
                 //Increasing score,destroying zombie and destroying arrow when arrow touches zombie
                 if(arrowG.isTouching(zombieG)){
                   score = score +1;
                   zombieG.destroyEach();
                   arrowG.destroyEach();
                  } 
                    
                    //Changing gamestate when steve is touching zombie
                    if(steves.isTouching(zombieG)){
                      gameState = END;
                       }
                         spawnZombies();
}

//Adding 'else if' for following gamestate
else if(gameState === END){
 steves.destroyEach();
 ground.velocityX = 0;
 arrowG.destroyEach();
 zombieG.velocityX = 0;
 score = 0;
     fill("red");
       textSize(30);
         text("GAME OVER", 670,250);
   restart.visible = true;
     if(mousePressedOver(restart) || keyDown("space")){
     gameState = PLAY;
     restart.visible = false;
     }
 }
 drawSprites();
}

//Creating function "spawnZombies"
function spawnZombies(){
if(frameCount%60===0){
  zombie = createSprite(300,312,20,20);
   zombie.x = Math.round(random(500,1300));
    zombie.addImage(zombieImg);
     zombie.scale = 0.3;
       zombie.lifetime = 400;
         zombie.velocityX = (1*ground.velocityX);
       zombie.setCollider("circle",5,5,5);
    zombie.debug = true;
  zombieG.add(zombie);
}
}