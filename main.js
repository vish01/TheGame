// Initialize Phaser, and create a 600 by 490px game
var game = new Phaser.Game(1350, 650, Phaser.AUTO, 'Gamediv');
var playing = false
var background;
var finalscore = 0;
var mainState = {
    preload: function() {
    // Load the userwbc sprite
//    game.load.image('startbutton', 'assets/buttons/button.png', 10, 10);
    
    game.load.image('background','assets/fluu2.jpg');
    game.load.spritesheet('userwbc', 'assets/wbcnew.gif'); 
    game.load.image('pipe', 'assets/Flu.png');
    game.load.image('pipe2', 'assets/flufake.png');
    game.load.script('start',  'start.js');
    game.load.audio('jump', 'assets/sounds/jump.mp3');
    game.load.audio('collect', 'assets/sounds/collect.mp3');
    game.load.audio('wrong', 'assets/sounds/wrong.mp3');

},

restartGameButton: function () {
    
    var button = game.add.button(game.world.centerX , game.world.centerY, 'sbutton', this.actionOnClick, this, 2, 1, 0);
    button.visible = true;
    button.inputEnabled = true;

    button.events.onInputUp.add(function() {
        button.destroy();
        game.paused = false;
//        this.restartGame();
    })
},

actionOnClick: function() {
    game.paused = false;
    this.restartGame();
},
    
create: function() { 
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    background = game.add.tileSprite(0, 0, 1350, 650, 'background');

    background.tint = 0x445566;
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#a0522d';
    //create an empty group
    this.pipes = game.add.group(); 
    this.jumpSound = game.add.audio('jump'); 
    this.collectSound = game.add.audio('collect'); 
    this.wrongSound = game.add.audio('wrong');

//adding pipes into the game
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 

    this.score = 0;
this.labelScore = game.add.text(20, 20, "0", 
    { font: "30px Arial", fill: "#ffffff" }); 
    
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the userwbc at the position x and y
    this.userwbc = game.add.sprite(100, 245, 'userwbc');
    
//    Phaser.Animation.generateFrameNames('userwbc', 1, 3);
//    this.sprite.animations.play('userwbc');
//    var animatewbc = this.userwbc.animations.add('animatewbc');
//    this.userwbc.animations.play('animatewbc', 10, true);



    // Add physics to the userwbc
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.userwbc);

    // Add gravity to the userwbc to make it fall
    this.userwbc.body.gravity.y = 1000;

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);  
    
    var leftmouse = game.input.mousePointer.leftButton;
    leftmouse.onDown.add(this.leftmouse, this);

},
    
    ///new code starts
    
   addOnePipe2: function(x, y) {
    // Create a pipe at the position x and y
    
    var pipe2 = game.add.sprite(x, y, 'pipe2');

    // Add the pipe to our previously created group
        this.pipes.add(pipe2);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe2);

    // Add velocity to the pipe to make it move left
    pipe2.body.velocity.x = -250; 

    // Automatically kill the pipe when it's no longer visible 
           
    pipe2.checkWorldBounds = true;
    pipe2.outOfBoundsKill = true;
},
    ////new code ends here
    addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');
    // Add the pipe to our previously created group
    this.pipes.add(pipe);
   
    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);
   
    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 
   
    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
        
   },
    ///new code starts
    //addRowOfPipes2: function(){
      //  var hole2 = Math.floor(Math.random() * 1) + 1;

        
        //this.addOnePipe2(300,Math.random()*300);
          //  this.score2 += 1;
//this.labelScore2.text = this.score2;  

   // },
    ///new code ends
    addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 1) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    this.addOnePipe(1300, Math.random()*400);
    this.addOnePipe2(1250,Math.random()*300);
        //for (var i = 0; i < 8; i++)
//        if (i != hole && i != hole + 1) 
//            this.addOnePipe(400, i * 60 + 10);   
        
        //increment score by 1:
        //this.score += 1;
this.labelScore.text = this.score;  
},

update: function() {
    // If the userwbc is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.userwbc.y < 0 || this.userwbc.y > 580) {
        this.userwbc.visible = false;
//        game.paused = true;
        finalscore = this.score;
        game.state.start('restart');
    }
    //restart game if collided
    //console.log(this.pipes.children);
    for(i=0; i< this.pipes.length; i++) {
        //game.physics.arcade.overlap(this.userwbc, this.pipes[i], this.updateScore(i), null, this);
        if( (-25 < (this.userwbc.position.x - this.pipes.children[i].position.x)) && 
            (this.userwbc.position.x - this.pipes.children[i].position.x) < 25 ) {
            
                if( (-25 < (this.userwbc.position.y- this.pipes.children[i].position.y)) && 
                    (this.userwbc.position.y- this.pipes.children[i].position.y < 25 )) {
                        this.collectSound.play(); 

                        console.log(this.pipes.children[i].name);
                        if(this.pipes.children[i].key == "pipe2") {
                            
                            this.userwbc.visible = false;
                            finalscore = this.score;
                            this.wrongSound.play();
                            game.state.start('restart');
                        }
                        this.pipes.children[i].destroy();
                        this.score+=1;

                }
        }
    }
},
    jump: function() {
    // Add a vertical velocity to the userwbc
    this.userwbc.body.velocity.y = -350;
    this.jumpSound.play(); 

},
    leftmouse: function(){
        this.userwbc.body.velocity.y = -350;
            this.jumpSound.play(); 
    },

// Restart the game
restartGame: function() {
    
    // Start the 'main' state, which restarts the game
    game.state.start('main');

}
};

var introstate = {
    preload: function() { 
        game.load.image('startbutton', 'assets/buttons/button.png', 10, 10);
        game.load.image('background','assets/fluu3.jpg');
    },

    create: function() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        var background = game.add.tileSprite(0, 0, 1350, 650, 'background');
        
        var startbutton = game.add.button(game.world.centerX - 95, game.world.centerY - 95, 'startbutton', this.starting, this, 2, 1, 0);
        
    var style = { font: "32px Arial", fill: "#33cc33", wordWrap: true, wordWrapWidth: background.width, align: "center", backgroundColor: "#000000" };
     var style2 = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: background.width, align: "center", backgroundColor: "#92a8d1" };

       var text = game.add.text(400, 10, "Read these rules before starting the game", style);
       var text = game.add.text(0, 110, "There are white blood cells(WBC) in \n our body who protects us from flu virus.", style2);
       var text = game.add.text(0, 260, " Imagine if you could play as a WBC, &\n fight those flus.", style2);
       var text = game.add.text(0, 460, " You will be playing as WBC and will be \n collecting all the correct flus", style2);
       var text = game.add.text(780, 100, "Press the Space bar key/ Mouse click \n to jump and keep playing.", style2);
       var text = game.add.text(1060, 300, "Collect the correct flus to gain score \n Collect the wrong flus and game over.", style2);



    text.anchor.set(0.5);
        startbutton.visible = true;
        startbutton.inputEnabled = true;

        startbutton.events.onInputUp.add(function() {
            startbutton.visible = false;
            game.paused = false;
            game.state.start('main');
        })
    },
    
    starting: function() {
        console.log("Starting the game");
    },

    update: function() {

    },
};

var restartstate = {
    preload: function() { 
        game.load.image('rebutton', 'assets/gameover.jpg');
        game.load.image('background','assets/fluu2.jpg');
    },

    create: function() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        var background = game.add.tileSprite(0, 0, 1350, 650, 'background');
        labelScore = game.add.text(120, 120, finalscore, 
                        { font: "60px Arial", fill: "#4488ff" }); 
        background.tint = 0x114422;
        var restartbutton = game.add.button(game.world.centerX - 95, 190, 'rebutton', this.starting, this, 2, 1, 0);
        
        restartbutton.visible = true;
        restartbutton.inputEnabled = true;

        restartbutton.events.onInputUp.add(function() {
            restartbutton.visible = false;
            game.paused = false;
            game.state.start('main');
        })
    },
    
    starting: function() {
        console.log("restarting the game");
    },

    update: function() {

    },
};
// Add the 'mainState' and call it 'main'
game.state.add('intro', introstate);
game.state.add('main', mainState); 
game.state.add('restart', restartstate);

// Start the state to actually start the game


game.state.start('intro');
