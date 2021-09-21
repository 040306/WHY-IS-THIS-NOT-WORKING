class Ship{
 constructor(x,y){
  var options ={
    'friction':0.5,
    'restitution':0.2,
    'density':3
  }
   engine.world.gravity.y = 0;
   this.body = Bodies.rectangle(x,y,15,50,options);
   this.width= 15;
   this.height = 50;
   this.image=loadImage("images/ship.png")
   World.add(world,this.body)
 }    
 display(){
 push()

  translate(this.body.position.x,this.body.position.y)
  rotate(this.body.angle)
  rectMode(CENTER);
  rect(0,0,this.width,this.height)
  imageMode(CENTER);
  image(this.image,2,10,100,this.height*2.3)
  
  
 pop()    
 }
}