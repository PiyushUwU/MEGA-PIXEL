class Obstacle3 {

    constructor(x, y, width, height) {

        var options = {

            'restitution': 1,
            'friction': 1.0,
            'density': 0.9

        }
  
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.image = loadImage("image/mushroom.png");
      
        World.add(world, this.body);
  
    }
    
    display(){
  
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);

        fill("green");

		image(this.image, 0, 0, 40, 40);

        pop();
  
    }
    
}