class Block{
    constructor(x,y){
     var options ={
     'inertia':Infinity
     }
      this.body = Bodies.rectangle(x,y,0.001,0.001,options);
      this.width= 0.001;
      this.height = 0.001;
      this.image=loadImage("images/rock.png")
      World.add(world,this.body)
    }    
    display(){
    push()
     rectMode(CENTER);
     rect(this.body.position.x,this.body.position.y,this.width,this.height)
     
    imageMode(CENTER);
    image(this.image,this.body.position.x,this.body.position.y,80,80)
    pop()    
    }
   }