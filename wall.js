class Wall{
    constructor(x,y){
     var options ={
       'isStatic':true
       
     }
      this.body = Bodies.rectangle(x,y,20,600,options);
      this.width= 20;
      this.height = 600;
      World.add(world,this.body)
    }    
    display(){
    push()

     rectMode(CENTER);
     rect(this.body.position.x,this.body.position.y,this.width,this.height)
     
    pop()    
    }
   }