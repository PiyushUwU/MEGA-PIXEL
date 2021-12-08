//MADE BY Piyush.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var pc, ground, pcpc;

var coin, powerJump;

var gameState = 0;

var level = 0;

var powerJumpDone = 0;

var score = 0;
var swordsc = 0;
var HP = 1000;

var ob1, ob2, ob3, ob4, ob5, ob6, ob7;

var a = 0;

function preload(){

    forward = loadAnimation("pc/1f.png", "pc/2f.png","pc/3f.png","pc/4f.png");
    backward = loadAnimation("pc/1b.png", "pc/2b.png","pc/3b.png","pc/4b.png");

    powerImg = loadImage("image/power.png");
    oppositeImg = loadImage("image/opposite.png");
    coinimg = loadImage("image/coin.png");
    swordimg = loadImage("image/sword.png");

    WON = loadImage("image/WON.png");

    bossimg = loadAnimation("boss/2.png", "boss/3.png", "boss/4.png", "boss/5.png", "boss/6.png", "boss/7.png");

    point = loadSound("sound/point.mp3");
    jump = loadSound("sound/jumpSound.mp3");
    swordSound = loadSound("sound/sword.mp3");

    end = loadSound("sound/END.wav");

    lv = loadSound("sound/level.mp3");

    fail = loadSound("sound/fail.mp3");
    ohNo = loadSound("sound/ohno.mp3");

    die = loadSound("sound/die.mp3");
    dielast = loadSound("sound/lastdie.mp3");

    hity = loadSound("sound/hit.mp3");

}

function setup(){

    createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(windowWidth/2, 605, 1740, 10);
    
    pc = new Player(1440/2, 600);

    ob1 = new Obstacle(windowWidth+30, windowHeight/2, 40, 40);
    ob2 = new Obstacle(windowWidth+60, windowHeight/2, 40, 40);
    ob3 = new Obstacle(windowWidth+90, windowHeight/2-50, 40, 40);
    ob4 = new Obstacle2(windowWidth+30, windowHeight/2+50, 40, 40);
    ob5 = new Obstacle3(windowWidth+30, windowHeight/2-100, 40, 40);
    ob6 = new Obstacle2(windowWidth+30, windowHeight/2+100, 40, 40);
    ob7 = new Obstacle3(windowWidth+30, windowHeight/3, 40, 40);

    pcpc = createSprite(100, 640, 60, 60);
    pcpc.addAnimation("f", forward)
    pcpc.addAnimation("b", backward)
    pcpc.setCollider("rectangle", 0, 0, pcpc.width-50, pcpc.height-50);

    boss = createSprite(windowWidth+50, 530);
    boss.addAnimation("b", bossimg);
    boss.scale = 1;
    boss.visible = false;
    boss.setCollider("rectangle", 0, 0, boss.width-230, boss.height-180);

    Won = createSprite(windowWidth/2, windowHeight/2);
    Won.addImage(WON);
    Won.visible = false;

    q = createSprite(windowWidth/2-50, 126);
    q.addImage(coinimg);
    q.visible = false;
    q.scale = 0.07;

    w = createSprite(windowWidth/2-50, 255);
    w.addImage(powerImg);
    w.visible = false;
    w.scale = 0.3;

    e = createSprite(windowWidth/2-140, 375);
    e.addImage(oppositeImg);
    e.visible = false;
    e.scale = 0.1;

    r = createSprite(windowWidth/2-50, 500);
    r.addImage(swordimg);
    r.visible = false;
    r.scale = 0.1;

    o1 = createSprite(0, 0, 40, 40);
    o2 = createSprite(0, 0, 40, 40);
    o3 = createSprite(0, 0, 40, 40);
    o4 = createSprite(0, 0, 40, 40);
    o5 = createSprite(0, 0, 40, 40);
    o6 = createSprite(0, 0, 40, 40);
    o7 = createSprite(0, 0, 40, 40);
    o1.visible = false;
    o2.visible = false;
    o3.visible = false;
    o4.visible = false;
    o5.visible = false;
    o6.visible = false;
    o7.visible = false;

    powerGroup = new Group();
    oppositeGroup = new Group();
    coinGroup = new Group();
    swordGroup = new Group();
    group = new Group();

    group.add(pcpc);

}

function draw(){

    background(0);

    Engine.update(engine);

    pcpc.x = pc.body.position.x;
    pcpc.y = pc.body.position.y;

    o1.x = ob1.body.position.x;
    o1.y = ob1.body.position.y;
    o2.x = ob2.body.position.x;
    o2.y = ob2.body.position.y;
    o3.x = ob3.body.position.x;
    o3.y = ob3.body.position.y;
    o4.x = ob4.body.position.x;
    o4.y = ob4.body.position.y;
    o5.x = ob5.body.position.x;
    o5.y = ob5.body.position.y;
    o6.x = ob6.body.position.x;
    o6.y = ob6.body.position.y;
    o7.x = ob7.body.position.x;
    o7.y = ob7.body.position.y;

    if(o1.isTouching(pcpc)){

        hity.play();

    }

    if(o2.isTouching(pcpc)){

        hity.play();

    }

    if(o3.isTouching(pcpc)){

        hity.play();

    }

    if(o4.isTouching(pcpc)){

        hity.play();

    }

    if(o5.isTouching(pcpc)){

        hity.play();

    }

    if(o6.isTouching(pcpc)){

        hity.play();

    }

    if(o7.isTouching(pcpc)){

        hity.play();

    }

    if(keyCode === LEFT_ARROW){

        pcpc.changeAnimation("b", backward);

    }
    else{

        pcpc.changeAnimation("f", forward);

    }

    if (gameState === 4){

        drawSprites();

        strokeWeight(0);
        textSize(30);
        textStyle(BOLDITALIC);

        fill("green");
        text('Collect           To earn POINTS', windowWidth/2-200, 130);
        fill("blue");
        text('Collect           To Jump On AIR', windowWidth/2-200, 260);
        fill("red");
        text('Dont Collect           It Will Take Your JUMPING POWER', windowWidth/2-370, 390);
        fill("white");
        text('Collect           To kill the Boss', windowWidth/2-200, 510);

        q.visible = true;
        w.visible = true;
        e.visible = true;
        r.visible = true;

        if(keyDown("space")){

            lv.play();
            level = 1;
            gameState = 1;

        }

    }

    if(gameState === 0){

        strokeWeight(0);
        textSize(30);
        textStyle(BOLDITALIC);

        fill("green");
        text('Press Space To Start', windowWidth/2-150, 757/2-100);
        text('Press Enter For Instructions', windowWidth/2-200, 757/2);
        
        textSize(60);
        
        fill("red");
        text('MEGA PIXEL', windowWidth/2-170, 140);

        if(keyDown("space")){

            lv.play();
            level = 1;
            gameState = 1;

        }

        if(keyCode === 13){

            gameState = 4;

        }

    }

    if(gameState === 1){

        ground.display();
        pc.display();
        q.visible = false;
        w.visible = false;
        e.visible = false;
        r.visible = false;
        drawSprites();

        pcpc.x = pc.body.position.x;
        pcpc.y = pc.body.position.y;

        if(pc.body.position.x<-20 || pc.body.position.x>windowWidth+20 || 
            pc.body.position.y>windowHeight+20 || pc.body.position.y<-30){
            
            fail.play();

            a = Math.round(random(1, 17));
            gameState = 2;

        }

        if(level === 1){

            textSize(30);
            textStyle(BOLDITALIC);

            fill("orange");
            text('Score 60 For Level-2', 100, 50);

            strokeWeight(0);
            textStyle(BOLDITALIC);            
            textSize(30);

            fill("red");
            text('Score : ' + score, 100, 100);
            
            if(!(score > 50)){

                powerJumpFuntion();
                oppositeFuntion();
                coinFunction();

                obstacleFunction();

            }

            if(pcpc.isTouching(oppositeGroup)){

                ohNo.play();
                powerJumpDone = 0;
                oppositeGroup.destroyEach();
    
            }

            if(pcpc.isTouching(powerGroup)){

                jump.play();
                powerJumpDone = 1;
                powerGroup.destroyEach();

            }

            if(pcpc.isTouching(coinGroup)){

                point.play();
                score = score + 10;
                coinGroup.destroyEach();
    
            }

            ob1.display();
            ob2.display();
            ob3.display();
            ob4.display();
            ob5.display();
            ob6.display();
            ob7.display();

            if(score >= 60){

                lv.play();
                dielast.play();
                score = 0;
                level = 2;

            }

        }

        if(level === 2){

            textSize(30);
            textStyle(BOLDITALIC);

            fill("orange");
            text('Score 60 For Level-3', 100, 50);

            strokeWeight(0);
            textStyle(BOLDITALIC);       
            textSize(30);

            fill("red");
            text('Score : ' + score, 100, 100);

            if(pcpc.isTouching(powerGroup)){

                jump.play();
                powerJumpDone = 1;
                powerGroup.destroyEach();
    
            }

            if(pcpc.isTouching(oppositeGroup)){

                ohNo.play();
                powerJumpDone = 0;
                oppositeGroup.destroyEach();
    
            }

            if(pcpc.isTouching(coinGroup)){

                point.play();
                score = score+10;
                coinGroup.destroyEach();
    
            }

            if(!(score > 50)){

                oppositeFuntion();
                powerJumpFuntion();
                coinFunction();

                obstacleFunction();
                obstacle2Function();

            }

            ob1.display();
            ob2.display();
            ob3.display();
            ob4.display();
            ob5.display();
            ob6.display();
            ob7.display();

            if(score >= 60){

                dielast.play();
                lv.play();
                score = 0;
                level = 3;
                
            }

        }

        if(level === 3){

            textSize(30);
            textStyle(BOLDITALIC);

            fill("orange");
            text('Score 40 For BOSS LEVEL', 100, 50);

            strokeWeight(0);
            textStyle(BOLDITALIC);
            textSize(30);
            fill("red");
            text('Score : ' + score, 100, 100);

            if(pcpc.isTouching(powerGroup)){

                jump.play();
                powerJumpDone = 1;
                powerGroup.destroyEach();
    
            }

            if(pcpc.isTouching(oppositeGroup)){

                ohNo.play();
                powerJumpDone = 0;
                oppositeGroup.destroyEach();
    
            }

            if(pcpc.isTouching(coinGroup)){

                point.play();
                score = score+10;
                coinGroup.destroyEach();
    
            }

            if(!(score>30)){

                powerJumpFuntion();
                coinFunction();
                oppositeFuntion();

                obstacleFunction();
                obstacle2Function();
                obstacle3Function();


            }

            ob1.display();
            ob2.display();
            ob3.display();
            ob4.display();
            ob5.display();
            ob6.display();
            ob7.display();

            if(score >= 40){

                powerGroup.destroyEach();
                oppositeGroup.destroyEach();

                powerJumpDone = 1;

                dielast.play();

                level = 4;

            }

        }

        if(level === 4){

            boss.visible = true;

            textSize(30);
            textStyle(BOLDITALIC);

            fill("orange");
            text('Defeat Boss By collecting Swords And Hitting him', 100, 50);

            strokeWeight(0);
            textStyle(BOLDITALIC);
            textSize(30);
            fill("red");
            text('Swords : ' + swordsc, 100, 120);
            
            text('BOSS HP : ' + HP, 100, 200);
            
            if(pcpc.isTouching(swordGroup)){

                swordSound.play();
                swordsc = swordsc+1;
                swordGroup.destroyEach();
    
            }

            ob1.display();
            ob2.display();
            ob3.display();
            ob5.display();
            ob7.display();

            obstacleFunction();
            obstacle3Function();
            swordFunction();

            boss.velocityX = -5;

            if(boss.x<-35){

                boss.x = windowWidth+50;
                boss.y = random(100, 530);

            }

            if(pcpc.isTouching(boss) && swordsc === 0){

                dielast.play();
                a = Math.round(random(1, 17));
                gameState = 2;

            }

            if(pcpc.isTouching(boss) && swordsc>0){

                swordsc = swordsc - 1;
                HP = HP - 100;
                die.play();

                boss.x = windowWidth+50;
                boss.y = random(100, 530);

            }

            if(HP === 0){

                dielast.play();
                boss.visible = false;
                gameState = 3;

            }

        }

    }

    if(gameState === 2){

        strokeWeight(0);
        textStyle(BOLDITALIC);
        textSize(40);

        fill("blue");
        text('GAME OVER', windowWidth/2-130, 100);

        fill("grey");
        text('Press F5 or Refresh the page To Restart', windowWidth/2-370, windowHeight/2+100);

        var lin = createA('https://gamejolt.com/games/Mega-Pixel/668588', 'Leave A Like And Relpy In GameJolt');
        lin.position(0, 0);

        if(a === 1 && level === 1){

            fill("red");
            text('Oh No What A NOOB Player Is Playing My Game', windowWidth/2-440, 300);

        }

        if(a === 2 && level === 1){

            fill("red");
            text("Ok Leave It I Think You Can't Do It", windowWidth/2-340, 300);

        }

        if(a === 3 && level === 1){

            fill("red");
            text('Needs Much Attention YOU LOSER', windowWidth/2-340, 300);

        }

        if(a === 4 && level === 1){

            fill("red");
            text('JUST THINK OF YOUR FUTURE LEAVE THIS GAME YOU LOSER', windowWidth/2-550, 300);

        }

        if(a === 5 && level === 1){

            fill("red");
            text('BETTER LUCK NEXT TIME YOU NOOB', windowWidth/2-350, 300);

        }

        if(a === 6 && level === 1){

            fill("red");
            text('THE WORLD IS A GAME PLAY IT AND COMPLETE IT YOU NEWBIE', windowWidth/2-600, 300);

        }

        if(a === 1 && level === 2){

            fill("red");
            text('OH MY GOD YOU CANT EVEN COMPLETE THIS GAME', windowWidth/2-460, 300);

        }

        if(a === 2 && level === 2){

            fill("red");
            text('Do Not See Others See Your GAME YOU NEWBIE', windowWidth/2-400, 300);

        }

        if(a === 3 && level === 2){

            fill("red");
            text('OH NO YOU WERE JUST BEATEN IN 2ND ROUND', windowWidth/2-460, 300);

        }

        if(a === 4 && level === 2){

            fill("red");
            text('OK THATS GREAT THAT YOU REACH BY HERE WITH LUCK', windowWidth/2-520, 300);

        }

        if(a === 5 && level === 2){

            textSize(35);
            fill("red");
            text('OK THATS GREAT THAT YOU WERE BEATEN UP IN 2nd ROUND YOU LOSER', windowWidth/2-620, 300);

        }

        if(a === 6 && level === 2){

            textSize(35);
            fill("red");
            text('WHATS UP YOU EXPERINCED NEWBIE OR ELSE I SAY NOOB', windowWidth/2-570, 300);

        }

        if(a === 1 && level === 3){

            textSize(40);
            fill("red");
            text('OK I BELIVE YOU ARE THE BEST OF ALL', windowWidth/2-400, 300);

        }

        if(a === 2 && level === 3){

            textSize(40);
            fill("red");
            text('I THINK YOU CAN COMPLETE THIS GAME BRO', windowWidth/2-420, 300);

        }

        if(a === 3 && level === 3){

            textSize(40);
            fill("red");
            text('I KNOW YOU CAN LOSE BRO , AND I KNEW YOU HAVE LOSED', windowWidth/2-570, 300);

        }

        if(a === 4 && level === 3){

            textSize(40);
            fill("red");
            text('YOU WERE JUST CLOSE BRO JUST CLOSE', windowWidth/2-390, 300);

        }

        if(a === 5 && level === 3){

            textSize(40);
            fill("red");
            text('CRY BRO CRY BECAUSE YOU HAVE TO START FROM LEVEL 1', windowWidth/2-600, 300);

        }

        if(a === 6 && level === 3){

            textSize(40);
            fill("red");
            text('I AM A NOOB, SEE YOU JUST SAID YOU ARE A NOOB YOU TOLD EVERYONE', windowWidth/2-630, 300);

        }

        if(a === 1 && level === 4){

            textSize(40);
            fill("red");
            text('YOU CAN DEFEAT THE BOSS I BELIVE ON YOU', windowWidth/2-420, 300);

        }

        if(a === 2 && level === 4){

            textSize(40);
            fill("red");
            text('I THINK YOU CAN COMPLETE THIS GAME BRO', windowWidth/2-420, 300);

        }

        if(a === 3 && level === 4){

            textSize(40);
            fill("red");
            text('I KNOW YOU CAN LOSE BRO , AND I KNEW YOU HAVE LOSED', windowWidth/2-570, 300);

        }

        if(a === 4 && level === 4){

            textSize(40);
            fill("red");
            text('YOU WERE JUST CLOSE BRO JUST CLOSE', windowWidth/2-390, 300);

        }

        if(a === 5 && level === 4){

            textSize(40);
            fill("red");
            text('CRY BRO CRY BECAUSE YOU HAVE TO START FROM LEVEL 1', windowWidth/2-600, 300);

        }

        if(a === 6 && level === 4){

            textSize(40);
            fill("red");
            text('DO YOU KNOW NOW YOU HAVE TO START FROM LEVEL 1, ITS TRUE', windowWidth/2-615, 300);

        }

        if(a === 7){

            textSize(40);
            fill("red");
            text('LEAVE A LIKE ON GAMEJOLT PLSSS LINK ON LEFT TOP CORNER', windowWidth/2-650, 300);

        }        
        
        if(a === 8){

            textSize(40);
            fill("red");
            text('LEAVE A LIKE ON GAMEJOLT PLSSS LINK ON LEFT TOP CORNER', windowWidth/2-650, 300);

        }

        if(a === 9){

            textSize(40);
            fill("red");
            text('I KNOW, YOU KNOW, YOU CANT, AND YOU KNOW I ALSO CANT', windowWidth/2-570, 300);

        }

        if(a === 10){

            textSize(40);
            fill("red");
            text('DONT GET LOSE BRO COMPLETE THIS YOU CAN DO IT I BELIVE', windowWidth/2-680, 300);

        }

        if(a === 11){

            textSize(40);
            fill("red");
            text('OK I AM TELLING YOU A SECRET THAT YOU HAVE LOSED THE GAME', windowWidth/2-680, 300);

        }

        if(a === 12){

            textSize(40);
            fill("red");
            text('THIS GAME IS NOT ENDLESS YOU CAN DO IT I BELIVE IN NOOBS', windowWidth/2-680, 300);

        }

        if(a === 13){

            textSize(30);
            fill("red");
            text('NEVER EVER UNDERRESTIMATE MUSHROOMs YOU KNOW THAT', windowWidth/2-600, 300);

        }

        if(a === 14){

            textSize(38);
            fill("red");
            text('YOU KNOW THAT THIS IS NOT A VIDEO GAME, ITS A BROWSER GAME', windowWidth/2-680, 300);

        }

        if(a === 15){

            textSize(38);
            fill("red");
            text('THE DEVELOPER OF MEGA PIXEL IS HUMAN OR YOU CAN SAY Piyush', windowWidth/2-680, 300);

        }

        if(a === 16){

            textSize(38);
            fill("red");
            text('THE DEVELOPER OF MEGA PIXEL IS HUMAN OR YOU CAN SAY Piyush', windowWidth/2-680, 300);

        }

        if(a === 17){

            textSize(40);
            fill("red");
            text('Oh No What A NOOB Player Is Playing My Game', windowWidth/2-440, 300);

        }

    }

    if(gameState === 3){

        if(frameCount % 100 === 0){

            end.play();

        }

        drawSprites();

        ground.display();
        pc.display();

        Won.visible = true;
        Won.scale = 1;

        strokeWeight(0);
        textStyle(BOLDITALIC);
        textSize(40);

        fill("blue");
        text('Press F5 or Refresh the page To Restart', windowWidth/2-350, windowHeight/2+100);

        fill("green");
        text('YOU WON', windowWidth/2-103, 240);

        textSize(60);

        fill("red");
        text('MEGA PIXEL', windowWidth/2-170, 120);

    }

}

function keyPressed(){

    if(keyCode === UP_ARROW && pc.body.position.y>500 && powerJumpDone === 0){

        Matter.Body.applyForce(pc.body, pc.body.position, {	x : 0, y : -150 });
    
    }
    
    if(keyCode === RIGHT_ARROW && pc.body.position.y>500 && powerJumpDone === 0 ){
    
        Matter.Body.applyForce(pc.body, pc.body.position, {	x : 135, y : 0 });
    
    }
    
    if(keyCode === LEFT_ARROW && pc.body.position.y>500 && powerJumpDone === 0){

        Matter.Body.applyForce(pc.body, pc.body.position, {	x : -135, y : 0 });
    
    }

    if(keyCode === DOWN_ARROW && powerJumpDone === 0){
    
        Matter.Body.applyForce(pc.body, pc.body.position, {	x : 0, y : 35 });
    
    }

    if(keyCode === UP_ARROW && powerJumpDone === 1){

        Matter.Body.applyForce(pc.body, pc.body.position, {	x : 0, y : -160 });
    
    }
    
    if(keyCode === RIGHT_ARROW && powerJumpDone === 1){
    
        Matter.Body.applyForce(pc.body, pc.body.position, {	x : 130, y : 0 });
    
    }
    
    if(keyCode === LEFT_ARROW && powerJumpDone === 1){
    
        Matter.Body.applyForce(pc.body, pc.body.position, {	x : -130, y : 0 });
    
    }

    if(keyCode === DOWN_ARROW && powerJumpDone === 1){
    
        Matter.Body.applyForce(pc.body, pc.body.position, {	x : 0, y : 35 });
    
    }

}

function powerJumpFuntion(){

    if(frameCount % 250 === 0 && powerJumpDone === 0){

        powerJump = createSprite(windowWidth+40, random(380, 490));
        powerJump.addImage(powerImg);
        powerJump.scale = 0.3;

        powerJump.velocityX = -5;
        powerJump.lifetime = 400;

        powerGroup.add(powerJump);

    }
 
}

function oppositeFuntion(){

    if(frameCount % 250 === 0 && powerJumpDone === 1){

        Opposite = createSprite(windowWidth+40, random(100, 500));
        Opposite.addImage(oppositeImg);
        Opposite.scale = 0.07;

        Opposite.velocityX = -5;
        Opposite.lifetime = 400;

        oppositeGroup.add(Opposite);

    }
 
}

function coinFunction(){

    if(frameCount % 230 === 0){

        coin = createSprite(windowWidth+20, random(50, 300));
        coin.addImage(coinimg);
        coin.scale = 0.04;

        coin.velocityX = -5;
        coin.lifetime = 400;

        coinGroup.add(coin);

    }

}

function swordFunction(){

    if(frameCount % 200 === 0){

        sword = createSprite(windowWidth+20, random(50, 300));
        sword.addImage(swordimg);
        sword.scale = 0.1;

        sword.velocityX = -5;
        sword.lifetime = 400;

        swordGroup.add(sword);

    }

}

function obstacleFunction(){

    if(frameCount % 1 === 0){

        Matter.Body.applyForce(ob1.body, ob1.body.position, {x : -2, y : 0 });
        Matter.Body.applyForce(ob2.body, ob2.body.position, {x : -3, y : 0 });
        Matter.Body.applyForce(ob3.body, ob3.body.position, {x : -2, y : 0 });

    }

    if(ob1.body.position.x < 0){

        Matter.Body.setPosition(ob1.body, {x: windowWidth+20, y: 200})

    }

    if(ob2.body.position.x < 0){

        Matter.Body.setPosition(ob2.body, {x: windowWidth+20, y: 300})

    }

    if(ob3.body.position.x < 0){

        Matter.Body.setPosition(ob3.body, {x: windowWidth+20, y: 400})

    }

}

function obstacle2Function(){

    if(frameCount % 1 === 0){

        Matter.Body.applyForce(ob4.body, ob4.body.position, {x : -2, y : 0 });
        Matter.Body.applyForce(ob6.body, ob6.body.position, {x : -2, y : 0 });

    }

    if(ob4.body.position.x < 0){

        Matter.Body.setPosition(ob4.body, {x: windowWidth+20, y: 50})

    }

    if(ob6.body.position.x < 0){

        Matter.Body.setPosition(ob6.body, {x: windowWidth+20, y: 500})

    }

}

function obstacle3Function(){

    if(frameCount % 1 === 0){

        Matter.Body.applyForce(ob5.body, ob5.body.position, {x : -2, y : 0 });
        Matter.Body.applyForce(ob7.body, ob7.body.position, {x : -2, y : 0 });

    }

    if(ob5.body.position.x < 0){

        Matter.Body.setPosition(ob5.body, {x: windowWidth+20, y: 250})

    }

    if(ob7.body.position.x < 0){

        Matter.Body.setPosition(ob7.body, {x: windowWidth+20, y: 150})

    }

}