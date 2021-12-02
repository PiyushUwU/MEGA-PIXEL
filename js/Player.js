class Player {

    constructor(x, y) {

        var options = {

            'restitution': 0.4,
            'friction': 0.2,
            'density': 0.6

        }
  
        this.body = Bodies.rectangle(x, y, 100, 100, options);
        this.image = loadImage("image/trans.png");

        this.width = 100;
        this.height = 80;
      
        World.add(world, this.body);
  
    }
    
    display(){
  
        var pos = this.body.position;

        push();

        translate(pos.x, pos.y);
        imageMode(CENTER);

		image(this.image, 0, 0, this.width, this.height);

        pop();
  
    }
    
}