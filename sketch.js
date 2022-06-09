const World= Matter.World
const Engine= Matter.Engine
const Bodies= Matter.Bodies
const Body= Matter.Body

var points=0

var engine,world,ball1,wallright,wallleft

var gamestate= "wait"
var bgplay,b1,aboutpop,aboutImg


function preload(){
bg=loadImage("splashscreen.png")
bgplay=loadImage("bg.gif")
bgplay2=loadImage("bgplay1.gif")
aboutImg=loadImage("popabout.png")
hoopimg=loadImage("basketballhoop.png")
ballimg1=loadImage("ball.gif")
ballimg=loadImage("ball.png")
scoreimg=loadImage("scoreimg.png")

}


function setup(){
createCanvas(windowWidth-20,windowHeight-20)

engine=Engine.create()
world=engine.world

play=createImg("play.gif")
play.position(width/2+width/3.5,18)
play.size(200,200)

about=createImg("about.gif")
about.position(play.x+150,0)
about.size(180,180)

back=createImg("back.gif")
back.position(width-200,height-200)
back.size(250,250)
back.hide()


cancel=createImg("cancelimg.gif")
cancel.position(width-200,height-200)
cancel.size(250,250)
cancel.hide()

aboutpop=createSprite(width/2,height/2+20,200,200)
aboutpop.visible=false
aboutpop.addImage(aboutImg)
aboutpop.scale=5


hoopsgroup = new Group()
obstaclesgroup = new Group()

ground =new Ground(width/2,height-50,width,20);
wallleft =new Ground(20,height/2,20,height);
wallright =new Ground(width-20,height/2,20,height);
walltop =new Ground(width/2,10,width,20);


score=createSprite(100,50)
score.addImage(scoreimg)
score.visible=false
score.scale=.4


var ball_options = {
    restitution: 0.5,
        friction :0.01,
        mass:0.1
  }

  ball = Bodies.circle(200,100,20,ball_options);
  World.add(world,ball);



}


function draw()
{
    background(bg)
    Engine.update(engine)

if(gamestate==="wait"){
    play.show()
    about.show()
    back.hide()
    cancel.hide()


}

//play button functionality
play.mousePressed(()=>{
   gamestate="play"
})

if(gamestate==="play"){
    background(bgplay2)
    play.hide()
    about.hide()
    back.show()
    cancel.hide()
    imageMode(CENTER)

image(ballimg,this.ball.position.x,this.ball.position.y,80,80)
    spawnHoops()
    //ground.show()
    score.visible=true

    if(ball!=null){
        image(ballimg,ball.position.x,ball.position.y,70,70);
      }
    
    for(i=0;i<hoopsgroup.length;i++){
    if(collide(ball,hoopsgroup.get(i))==true)
    {
      points +=1
    }}
  
   

  
if(ball.position.x>=width || ball.position.x<0){
    var ball_options = {
        restitution: 0.5,
        airFriction:1.5,
        mass:2
      }
    
      ball = Bodies.circle(200,100,20,ball_options);
      World.add(world,ball);
    
    
    
    }
    


/*ground.show()
wallleft.show()
wallright.show()
walltop.show()*/
}


//about button functionality
about.mousePressed(()=>{
    gamestate="about"
    aboutpop.visible=true
    cancel.show()

 })
 
 if(gamestate==="about"){
     play.hide()
     about.hide()
     cancel.show()

 }

//back button functionality
back.mousePressed(()=>{
    gamestate="wait"
 })

 //cancel button functionality
cancel.mousePressed(()=>{
    gamestate="wait"
    aboutpop.visible=false
 })

 if (gamestate !== "play"){
     hoopsgroup.destroyEach()
     score.visible=false

 }
 
 drawSprites()


 if (gamestate==="about"){
     fill("red")
     stroke("black")
     strokeWeight(2)
    textSize(30)
textAlign("left")
     text("Let the Madness begin!\nIf you play basketball\nfor hours with your friends\n or if you just like to watch \nyour favorite teams dominate in the NBA...\n come participate in this challenge!!\n Help Sam practice for his big day... \nThe tryouts for the Golden State Warriors!!\n The world's best basketball team is \ncoming up soon..\n\nHELP HIM TO SHOOT\nTHE BASKET ON EVERY HOOP..",aboutpop.x+50-(aboutpop.width+80),aboutpop.y-(aboutpop.height+50))
 
    }

    if(gamestate==="play")
    { fill("green")
        textSize(25)
        stroke("blue")
        strokeWeight(2)
        text(points,(score.x+20),score.y+2)
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function spawnHoops(){
if(frameCount%200===0){
    hoop=createSprite(width,50,50,50)
    hoop.addImage(hoopimg)
hoop.debug=true
hoop.setCollider("circle",0,50,20)
hoop.velocityX=-4
hoop.y=Math.round(random(50,height/2))
    hoopsgroup.add(hoop)

}

}

// Ball movement using keys
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {

   Matter.Body.applyForce(ball,{x:0,y:0},{x:.01,y:-.01})
}


  else if (keyCode === LEFT_ARROW) {

    Matter.Body.applyForce(ball,{x:0,y:0},{x:-.01,y:-.01})
}



 else if (keyCode === DOWN_ARROW) {

    Matter.Body.applyForce(ball,{x:0,y:0},{x:-0,y:.001})
}}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,ball);
               ball = null;
               return true; 
            }
            else{
              return false;
            }
         }
        }