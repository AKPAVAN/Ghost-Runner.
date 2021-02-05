var GameState="play"
var tower;
var towerImage;
var ghost;
var ghostImage
var doors;
var doorsImage;
var doorsGroup;
var climbers;
var climbersImage;
var climbersGroup;
var Iblock;
var IblocksGroup;


    function preload(){
towerImage=loadImage("tower.png")
doorsImage=loadImage("door.png")
climbersImage=loadImage("climber.png")
ghostImage=loadImage("ghost-standing.png")
}


    function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage("tower",towerImage)
  tower.velocityY=3;

  climbersGroup=new Group();
  doorsGroup=new Group();
  IblocksGroup=new Group();

  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.3;
}


    function draw(){
background(0);

if(GameState==="play"){
if(tower.y>400){
tower.y=300;
}
if(keyDown(LEFT_ARROW)){
ghost.x-=3;
}

if(keyDown(RIGHT_ARROW)){
ghost.x+=3;
}

if(keyDown("space")){
ghost.velocityY=-5;

}
ghost.velocityY+=0.8;
if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0
}
if(IblocksGroup.isTouching(ghost)||ghost.y===600){
ghost.destroy();
GameState="end"
}
spawndoors();
drawSprites();
}

if(GameState==="end"){
stroke("yellow")
fill("yellow")
textSize(30)
text("GameOver",230,250)
}
}


    function spawndoors(){
if(frameCount%240===0){
var door=createSprite(200,-50)
door.addImage(doorsImage)
door.x=Math.round(random(120,400))
var climbers=createSprite(200,-10)
Iblock=createSprite(200,15)
Iblock.width=climbers.width
Iblock.height=2;
Iblock.debug=true;
climbers.addImage(climbersImage)
climbers.x=door.x
climbers.velocityY=1;
Iblock.x=door.x
Iblock.velocityY=1;
Iblock.lifetime=800;
IblocksGroup.add(Iblock);
climbers.lifetime=800;
ghost.depth=door.depth
ghost.depth+=1;
climbersGroup.add(climbers)
door.velocityY=1;
door.lifetime=800;
doorsGroup.add(door);


}
}