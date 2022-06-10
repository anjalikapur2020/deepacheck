class Ball {
    constructor() {

        var ball_options = {
            restitution: 0.5,
            friction: 0.01,
            mass: 0.1
        }

        this.body = Bodies.circle(200, 100, 20, ball_options);
        this.image = loadImage("ball.png")
        World.add(world, this.body);


        /*var options = {
            isStatic: false,
            restitution: .9
        }


        this.body = Bodies.circle(50, windowHeight - 100, 50, options)
        this.image = loadImage("ball.png")
        World.add(world, this.body)*/
    }


    display() {

        var pos = this.body.position
        push()
        imageMode(CENTER)
        image(this.image, pos.x, pos.y, 50, 50)
        pop()
    }


}