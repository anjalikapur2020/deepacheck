class Ball{
    constructor(){

        

var options={
    isStatic:false,
    restitution:.9
}


this.body=Bodies.circle(50,windowHeight-100,50,options)
this.image=loadImage("ball.png")
World.add(world,this.body)
    }


display(){

    var pos=this.body.position
    push()
imageMode(CENTER)
    image(this.image,pos.x,pos.y,50,50)
pop()
}


}