const World = Matter.World
const Engine = Matter.Engine
const Bodies = Matter.Bodies
const Body = Matter.Body

var points = 0

var engine, world, ball1, wallright, wallleft
var balls = []
var gamestate = "wait"
var bgplay, b1, aboutpop, aboutImg, ballshadow


function preload() {
    bg = loadImage("splashscreen.png")
    bgplay = loadImage("bg.gif")
    //bgplay2=loadImage("bg.jpg")
    bgplay2 = loadImage("bgnew.gif")

    //bgplay2=loadImage("bgplay1.gif")
    aboutImg = loadImage("popabout.png")
    hoopimg = loadImage("basketballhoop.png")
    ballimg1 = loadImage("ballspin.gif")
    ballimg = loadImage("ball.png")
    scoreimg1 = loadImage("scoreimg.png")
    scoreimg2 = loadImage("scoreimg2.png")
    scoreimg = loadImage("scoreimg3.png")
    livesimg = loadImage("lives.png")
    playerimg = loadImage("boywalk.gif")
    playerleftimg = loadImage("boywalkleft.gif")
   // stopimg = loadImage("stopgame.png")
endbg=loadImage("hoop1.gif")

    got1 = loadImage("gotit1.gif")
    got2 = loadImage("gotit2.gif")
    got3 = loadImage("gotit3.gif")

    gameoverimg=loadImage("gameover.gif")

    //sounds
    gameplaysound=loadSound("bouncingsound.mp3")
hitsound=loadSound("hitsound.mp3")
}


function setup() {
    createCanvas(windowWidth - 50, windowHeight - 50)

    engine = Engine.create()
    world = engine.world

    //create buttons
    play = createImg("play.gif")
    play.position(width / 2 + width / 3.5, 18)
    play.size(200, 200)

    how = createImg("how.gif")
    how.position(width / 2 + width / 3.35, height - 200)
    how.size(275, 275)

    about = createImg("about.gif")
    about.position(play.x + 150, 0)
    about.size(180, 180)

    back = createImg("back.gif")
    back.position(width - 200, height - 200)
    back.size(250, 250)
    back.hide()


    cancel = createImg("cancelimg.gif")
    cancel.position(width - 200, height - 200)
    cancel.size(250, 250)
    cancel.hide()

    restart = createImg("reset.gif")
    restart.position(width/2-100, height - 200)
    restart.size(240, 240)
    restart.hide()

    stop = createImg("stopgame3.gif")
    stop.position(width-200,-30)
    stop.size(250, 250)
    stop.hide()



    //create ground objects from ground class using matter.js
    ground = new Ground(width / 2, height - 50, width, 20);
    wallleft = new Ground(20, height / 2, 20, height);
    wallright = new Ground(width - 20, height / 2, 20, height);
    walltop = new Ground(width / 2, 10, width, 20);


    var ball_options = {
        restitution: 0.5,
        friction: 0.01,
        mass: 0.1
    }

    ball = Bodies.circle(200, 100, 20, ball_options);
    World.add(world, ball);


    //sprites for pop up player etc
    aboutpop = createSprite(width / 2, height / 2 + 20, 200, 200)
    aboutpop.visible = false
    aboutpop.addImage(aboutImg)
    aboutpop.scale = 5

    score = createSprite(100, 70)
    score.addImage(scoreimg)
    score.visible = false
    score.scale = .4


    
    player = createSprite(ball.position.x - 40, height - (ball.position.y + 10))
    player.addImage(playerimg)
    player.visible = false
    player.scale = .4
    // player.debug=true

    ballshadow = createSprite(ball.position.x, ball.position.x)
    ballshadow.addImage(ballimg1)
    ballshadow.visible = false
    ballshadow.scale = .15

    gotit = createSprite(width / 2 - 10, height / 2)
    gotit.visible = false

    gameover = createSprite(width /4 , height / 2)
    gameover.addImage(gameoverimg)
   gameover.visible = false
    gameover.scale=1.5


    //create groups
    hoopsgroup = new Group()
    obstaclesgroup = new Group()




}


function draw() {
    Engine.update(engine)
    background(bg)
    Engine.update(engine)

    if (gamestate === "wait") {
        play.show()
        about.show()
        back.hide()
        cancel.hide()
        how.show()


    }

    //play button functionality
    play.mousePressed(() => {
        gamestate = "play"
        gameplaysound.play()

    })

    if (gamestate === "play") {

        background(bgplay2)
        play.hide()
        about.hide()
        back.show()
        cancel.hide()
        how.hide()
        stop.show()

        imageMode(CENTER)


        spawnHoops()
        //ground.show()
        score.visible = true
        //stopgame.visible=true
        player.visible = true
        player.x = ball.position.x - 70
        ballshadow.x = ball.position.x
        ballshadow.y = ball.position.y
        ballshadow.visible = true


        //if(ball!=null){
        //  image(ballimg,ball.position.x,ball.position.y,70,70);
        // }


        // player.y=height-(ball.position.y+10)
        for (i = 0; i < hoopsgroup.length; i++) {
            if (ballshadow.isTouching(hoopsgroup.get(i))) {
                hoopsgroup.get(i).destroy()
                gameplaysound.stop()
                hitsound.play()

                points += 1
                gotit.visible = true
                var rand = Math.round(random(1, 3))
                switch (rand) {
                    case 1: gotit.addImage(got1)
                        break;
                    case 2: gotit.addImage(got2)
                        break;
                    case 3: gotit.addImage(got3)
                        break;
                    default: break;

                }

            }
            else {gotit.visible = false}
        }




        if (ball.position.x >= width || ball.position.x < 0) {
            var ball_options = {
                restitution: 0.5,
                friction: 0.05,
                mass: 0.1
            }

            ball = Bodies.circle(200, 100, 20, ball_options);
            World.add(world, ball);



        }



        /*ground.show()
        wallleft.show()
        wallright.show()
        walltop.show()*/
    }


//stop game button functionality
stop.mousePressed(() => {
    gamestate = "end"
    //aboutpop.visible = true
    //cancel.show()
   

})

if (gamestate === "end") {
    background(endbg)
    play.hide()
    about.hide()
    cancel.hide()
    how.hide()
    stop.hide()
    back.hide()
    gameplaysound.stop()
    hitsound.stop()
    gameover.visible = true
    restart.show()

    fill("lime")
    textSize(100)
    stroke("red")
    strokeWeight(4)
    text(points,gameover.x-15, gameover.y+(gameover.height/2.8))


}


    //about button functionality
    about.mousePressed(() => {
        gamestate = "about"
        aboutpop.visible = true
        cancel.show()

    })

    if (gamestate === "about") {
        play.hide()
        about.hide()
        cancel.show()
        how.hide()

    }

    how.mousePressed(() => {
        gamestate = "how"
        aboutpop.visible = true
        cancel.show()

    })

    if (gamestate === "how") {
        play.hide()
        about.hide()
        cancel.show()
        how.hide()


    }

    //back button functionality
    back.mousePressed(() => {
        gamestate = "wait"
    })

    //cancel button functionality
    cancel.mousePressed(() => {
        gamestate = "wait"
        aboutpop.visible = false
    })

    if (gamestate !== "play") {
        hoopsgroup.destroyEach()
        score.visible = false
      //  stopgame.visible = false
        player.visible = false
        ballshadow.visible = false
        gotit.visible=false
        stop.hide()



    }


    //restart
    //cancel button functionality
    restart.mousePressed(() => {
        gamestate = "wait"
points=0    })

  

    drawSprites()


    if (gamestate === "about") {
        fill("red")
        stroke("black")
        strokeWeight(2)
        textSize(30)
        textAlign("center")
        text("Let the Madness begin!\nIf you play basketball\nfor hours with your friends\n or if you just like to watch \nyour favorite teams dominate in the NBA...\n come participate in this challenge!!\n Help Sam practice for his big day... \nThe tryouts for the Golden State Warriors!!\n The world's best basketball team is \ncoming up soon..\n\nHELP HIM TO SHOOT\nTHE BASKET ON EVERY HOOP..", aboutpop.x , aboutpop.y - (aboutpop.height + 50))

    }

    if (gamestate === "how") {
        fill("red")
        stroke("black")
        strokeWeight(2)
        textSize(45)
        textAlign("center")
        text("Instructions to PLAY",aboutpop.x, aboutpop.y - (aboutpop.height + 50))
        fill("green")
        text("************************",aboutpop.x, aboutpop.y - (aboutpop.height + 65))
        text("************************",aboutpop.x, aboutpop.y - (aboutpop.height + 10))
        fill("blue")
        stroke("red")
        strokeWeight(2)
        textSize(30)
        text("Use Arrow Keys to throw the ball...\nUP ARROW - Moves the ball up.\nLEFT ARROW - Moves the ball left.\nRIGHT ARROW - Moves the ball up.\nDOWN ARROW - Moves the ball down. ", aboutpop.x, aboutpop.y -(height/4))
        
        fill("cyan")
        stroke("green")
        strokeWeight(2)
        textSize(35)
        text("If the ball goes out of the screen..\n     Donot Panic!!\n Instead move towards the extreme\nleft of the screen and wait for the\nnew ball to spawn.", aboutpop.x, aboutpop.y +(height/10))


    }

    if (gamestate === "play") {
        fill("black")
        textSize(25)
        stroke("blue")
        strokeWeight(2)
        text(points, (score.x + 40), score.y - 15)
    }

    if(gamestate != "end"){
        gameover.visible = false
        restart.hide()


    }



}

function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight-10);
}

function spawnHoops() {
    if (frameCount % 200 === 0) {
        hoop = createSprite(width, 50, 50, 50)
        hoop.addImage(hoopimg)
        hoop.debug = true
        hoop.setCollider("circle", 0, 50, 20)
        hoop.velocityX = -4
        hoop.y = Math.round(random(50, height / 2))
        hoopsgroup.add(hoop)

    }

}

// Ball movement using keys
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        gameplaysound.play()

        Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: .01, y: -.01 })
        player.addImage(playerimg)
        player.scale = .4

    }


    else if (keyCode === LEFT_ARROW) {
        gameplaysound.play()

        Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: -.01, y: -.01 })
        player.addImage(playerleftimg)
        player.scale = .6
    }

    else if (keyCode === UP_ARROW) {
        gameplaysound.play()

        Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: -0, y: -.01 })
        //player.addImage(playerleftimg)
        //player.scale=.6
    }



    else if (keyCode === DOWN_ARROW) {
        gameplaysound.play()

        Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: -0, y: .001 })
    }
}


function collide(body, sprite) {
    if (body != null) {
        var d = dist(body.position.x, body.position.y, sprite.body.x, sprite.body.y);
        if (d <= 100) {
            World.remove(engine.world, ball);
            ball = null;
            points += 1
            return true;
        }
        else {
            return false;
        }
    }
}