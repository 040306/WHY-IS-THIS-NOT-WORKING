const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
var engine 
var world 



var gamestate=0;
var timer =1
var fakeMouse
var angle
var obstacle
var blackScreen
var score = 0
function preload(){

fakeMouseImg=loadImage("images/fakeMouse.png")
blackScreenImg=loadImage("images/deathscreen.png")
logoImg=loadImage("images/COOLDOWN.png")
playButtonImg=loadImage("images/playButton.png")

music1 = loadSound("celeste- resurrections.mp3")
music2 = loadSound("celeste- celestial resorts.mp3")

explosion = loadSound("explosion.mp3")
}

function setup(){
createCanvas(400,600)
engine = Engine.create()
world = engine.world
bg=loadImage("images/space.jpg")


//THIS IS THE MOST MESSY CODE I HAVE EVER WRITTEN AND I HATE IT
playBox=createSprite(200,347,100,45)

logo = createSprite(200,280,75,50)
logo.addImage("logo",logoImg)
logoImg.resize(350,300)
playButton = createSprite(200,350,75,50)
playButton.addImage("playbutton",playButtonImg)
playButtonImg.resize(200,170)
fakeMouse = createSprite(0,0,1,1)
fakeMouse.addImage("mouse",fakeMouseImg)
fakeMouse.scale=0.04
ship=new Ship(200,400)
wallLeft=new Wall(-10,300);
wallRight=new Wall(490,300);

block1=new Block(0,700)

block2=new Block(50,700)

block3=new Block(100,700)

block4=new Block(150,700)

block5=new Block(200,700)

block6=new Block(250,700)


blackScreen=createSprite(200,925,45,65)
blackScreen.addImage("blackscreen",blackScreenImg)

blackScreenImg.resize(400,1000)

music1.play()
}

function draw(){
Engine.update(engine)    
  background(bg)

  ship.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
  };


    blackScreen.velocityY=25


    if(gamestate===0){
      score= 0
        if(blackScreen.y>325){
        fakeMouse.visible=false
        logo.visible=true
        playButton.visible=true
        playBox.visible=true
        music2.stop()

        text("soundtrack: celeste- resurrections - Lena raine",10,575)
        text("celeste- celestial resorts - Lena Raine",10,590,)
        text("A game by Evan Pearson Maraj", 10,560)

        }
     if(mousePressedOver(playBox)){
         
        music1.stop()
       music2.loop()
        playBox.visible=false
      playButton.visible=false
      logo.visible=false
      gamestate = 1;
        block1.body.position={x:0,y:700}
        block2.body.position={x:50,y:700}
        block3.body.position={x:100,y:700}
        block4.body.position={x:150,y:700}
        block5.body.position={x:200,y:700}
        block6.body.position={x:250,y:700}
        ship.body.position={x:200,y:400}
        timer=2
        
    Matter.Body.setStatic(ship.body,true)
    Matter.Body.setStatic(ship.body,false)
      console.log("i am working properly :)")
      
    Matter.Body.setStatic(block1.body,false)
    Matter.Body.setStatic(block2.body,false)
    Matter.Body.setStatic(block3.body,false)
    Matter.Body.setStatic(block4.body,false)
    Matter.Body.setStatic(block5.body,false)
    Matter.Body.setStatic(block6.body,false)
    fakeMouse.x=mouseX
    fakeMouse.y=mouseY;
     }
    }

    if(gamestate===1){
        fakeMouse.visible=true
        if(timer<1){
    fakeMouse.x=mouseX
    fakeMouse.y=mouseY
        }
        hitreg()
        if(ship.body.position.x > fakeMouse.x -20 && ship.body.position.x <fakeMouse.x +20 && ship.body.position.y > fakeMouse.y -30 && ship.body.position.y <fakeMouse.y +30 ){

            
           Matter.Body.setStatic(ship.body,true)
           Matter.Body.setStatic(ship.body,false)
           
           
            } 
        
     if(timer<1){
     if(mousePressedOver(fakeMouse) ){
         Matter.Body.applyForce(ship.body, ship.body.position,{x:ship.body.position.x - fakeMouse.x - (ship.body.position.x - fakeMouse.x)*1.5,y:ship.body.position.y - fakeMouse.y - (ship.body.position.y - fakeMouse.y)*1.5});
         }
        }
        console.log(score)
        score=score+1
      text("SCORE "+Math.round(score/10),320,10)
        if(ship.body.position.x >1000 ||ship.body.position.x<-1000 || ship.body.position.y>1000 || ship.body.position.y<-1000){
             ship.body.position.x =200
             ship.body.position.y=400   
             
         }
    //particle(ship.body.position.x,ship.body.position.y)  
    stroke(0,190,255)   
    line(ship.body.position.x,ship.body.position.y,fakeMouse.x,fakeMouse.y)
    
    
    Matter.Body.setVelocity(block1.body,{x:0,y:7})
    //Matter.Body.setAngularVelocity(block1.body, 300)
    block1.body.x=60
    Matter.Body.setVelocity(block2.body,{x:0,y:7})
   // Matter.Body.setAngularVelocity(block2.body, 300)
   block2.body.x=120
    Matter.Body.setVelocity(block3.body,{x:0,y:7})
   //  Matter.Body.setAngularVelocity(block3.body, 300)
   block3.body.x=180
     Matter.Body.setVelocity(block4.body,{x:0,y:7})
    // Matter.Body.setAngularVelocity(block4.body, 300)
    block4.body.x=240
     Matter.Body.setVelocity(block5.body,{x:0,y:7})
  //  Matter.Body.setAngularVelocity(block5.body, 300)
  block5.body.x=300
    Matter.Body.setVelocity(block6.body,{x:0,y:7})
  //  Matter.Body.setAngularVelocity(block6.body, 300)
  block6.body.x=350
    if(frameCount%20===0){
    spawnObstacles()   
    }
        ship.display()
       // wallLeft.display()
      //  wallRight.display()
        block1.display()
        block2.display()
        block3.display()
        block4.display()
        block5.display()
        block6.display()
    }


    timerLoop()
    drawSprites()
}

function timerLoop(){
  
    if(timer<1 && mousePressedOver(fakeMouse)){
        timer=3.5
    }
    else{
    
        timer = timer-0.05
    }
    
}

function spawnObstacles(){

  
switch(Math.round(random(0,5))){
case 0:    
if(block1.body.position.y>600){
    Matter.Body.setPosition(block1.body,{x:60,y:-40})
    }
break;
case 1:    

if(block2.body.position.y>600){
    Matter.Body.setPosition(block2.body,{x:120,y:-40})
    }
break;
case 2:  

if(block3.body.position.y>600){
    Matter.Body.setPosition(block3.body,{x:180,y:-40})
    }
break;
case 3:  

if(block4.body.position.y>600){
    Matter.Body.setPosition(block4.body,{x:240,y:-40})
    }
break;
case 4:  

if(block5.body.position.y>600){
    Matter.Body.setPosition(block5.body,{x:300,y:-40})
    }
break;
case 5:  

if(block6.body.position.y>600){
    Matter.Body.setPosition(block6.body,{x:350,y:-40})
    }
break;
default:break;
} 
}


function hitreg(){

        if(block1.body.position.x > ship.body.position.x -50 && block1.body.position.x <ship.body.position.x +50 && block1.body.position.y > ship.body.position.y -50 && block1.body.position.y <ship.body.position.y +50 ){
    
        collide()
    }

        if(block2.body.position.x > ship.body.position.x -50 && block2.body.position.x <ship.body.position.x +50 && block2.body.position.y > ship.body.position.y -50 && block2.body.position.y <ship.body.position.y +50 ){
    
         collide()
    }

      if(block3.body.position.x > ship.body.position.x -50 && block3.body.position.x <ship.body.position.x +50 && block3.body.position.y > ship.body.position.y -50 && block3.body.position.y <ship.body.position.y +50 ){
    
        collide()
    }

      if(block4.body.position.x > ship.body.position.x -50 && block4.body.position.x <ship.body.position.x +50 && block4.body.position.y > ship.body.position.y -50 && block4.body.position.y <ship.body.position.y +50 ){
    
        collide()
    }

      if(block5.body.position.x > ship.body.position.x -50 && block5.body.position.x <ship.body.position.x +50 && block5.body.position.y > ship.body.position.y -50 && block5.body.position.y <ship.body.position.y +50 ){
     
         collide()
    }

      if(block6.body.position.x > ship.body.position.x -50 && block6.body.position.x <ship.body.position.x +50 && block6.body.position.y > ship.body.position.y -50 && block6.body.position.y <ship.body.position.y +50 ){
   
  
        collide()
    }

         
}

function collide(){
    explosion.play()
    Matter.Body.setStatic(ship.body,true)
    Matter.Body.setStatic(ship.body,false)

    Matter.Body.setStatic(block1.body,true)
    Matter.Body.setStatic(block2.body,true)
    Matter.Body.setStatic(block3.body,true)
    Matter.Body.setStatic(block4.body,true)
    Matter.Body.setStatic(block5.body,true)
    Matter.Body.setStatic(block6.body,true)
    blackScreen.y=-375;
    blackScreen.velocityY=-25
    gamestate=0
    setTimeout(() => { music1.play()}, 500);
}
