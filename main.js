var game = new Phaser.Game(1350, 650, Phaser.AUTO, 'Gamediv');
var playing = false
var background;
var finalscore = 0;
var mainState = {
    preload: function() {
    // Load the userwbc sprite
    
    game.load.image('background','assets/fluu2.jpg');
    game.load.spritesheet('userwbc', 'assets/wbcnew.gif'); 
    game.load.image('flu1', 'assets/Flu.png');
    game.load.image('flu2', 'assets/flufake.png');
    game.load.script('start',  'start.js');
    game.load.audio('jump', 'assets/sounds/jump.mp3');
    game.load.audio('collect', 'assets/sounds/collect.mp3');
    game.load.audio('wrong', 'assets/sounds/wrong.mp3');
	game.load.audio('music', 'assets/sounds/clap.mp3');
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
            game.paused = true;
music = game.add.audio('music');

    music.play();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    background = game.add.tileSprite(0, 0, 1350, 650, 'background');

    background.tint = 0x445566;
    game.stage.backgroundColor = '#a0522d';
    //create an empty group
    this.flu1s = game.add.group(); 
    this.jumpSound = game.add.audio('jump'); 
    this.collectSound = game.add.audio('collect'); 
    this.wrongSound = game.add.audio('wrong');

    this.timer = game.time.events.loop(1500, this.addRowOfflu1s, this); 

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
    game.physics.arcade.enable(this.userwbc);

    // Add gravity to the userwbc to make it fall
    this.userwbc.body.gravity.y = 1000;

    // Call the 'jump' function when the spacekey is hit
    var onTap = game.input.Touch;
	onTap.OnDown.add(this.unpause, this);
    
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);  
    var leftmouse = game.input.mousePointer.leftButton;
//	var touchscreen = game.input.activePointer;
	
    leftmouse.onDown.add(this.leftmouse, this);

    var spacePauseKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //var alternatePauseKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    spacePauseKey.onDown.add(this.unpause, this);  
    //alternatePauseKey.onDown.add(this.pause, this);  
    var leftPmouse = game.input.mousePointer.leftButton;
    leftPmouse.onDown.add(this.unpause, this);
},
	
onTap: function () {
	 if (game.input.pointer1.isDown)
			{
 this.userwbc.body.velocity.y = -350;
    this.jumpSound.play(); 
	 }
},
    pause : function() {
        if(game.paused == true) {
            game.paused = false;
        }
        else {
            game.paused = true;
        }
    },
    unpause: function(event) {
        game.paused = false;
        console.log(event);
    },
        
   addOneflu2: function(x, y) {
    // Create a flu1 at the position x and y
    
    var flu2 = game.add.sprite(x, y, 'flu2');

        this.flu1s.add(flu2);

    game.physics.arcade.enable(flu2);

    flu2.body.velocity.x = -250; 

    // Automatically kill the flu1 when it's no longer visible 
           
    flu2.checkWorldBounds = true;
    flu2.outOfBoundsKill = true;
},
    addOneflu1: function(x, y) {
        // Create a flu1 at the position x and y
        var flu1 = game.add.sprite(x, y, 'flu1');
        // Add the flu1 to our previously created group
        this.flu1s.add(flu1);
    
        // Enable physics on the flu1 
        game.physics.arcade.enable(flu1);
    
        // Add velocity to the flu1 to make it move left
        flu1.body.velocity.x = -200; 
    
        // Automatically kill the flu1 when it's no longer visible 
        flu1.checkWorldBounds = true;
        flu1.outOfBoundsKill = true;
    },
    ///new code starts
    //addRowOfflu1s2: function(){
      //  var hole2 = Math.floor(Math.random() * 1) + 1;

        
        //this.addOneflu2(300,Math.random()*300);
          //  this.score2 += 1;
//this.labelScore2.text = this.score2;  

   // },
    ///new code ends
    addRowOfflu1s: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 1) + 1;

    // Add the flus 
    // With one flue at position flu and flu + 1
    this.addOneflu1(1300, Math.random()*screen.height - 40);
    this.addOneflu2(1250,Math.random()*screen.height -40);
        //for (var i = 0; i < 8; i++)
//        if (i != hole && i != hole + 1) 
//            this.addOneflu1(400, i * 60 + 10);   
        
        //increment score by 1:
        //this.score += 1;
this.labelScore.text = this.score;  
// var spacePauseKey = game.input.keyboard.addKey(
//     Phaser.Keyboard.SPACEBAR);
// spacePauseKey.onDown.add(this.pause, self);  

// var leftPmouse = game.input.mousePointer.leftButton;
// leftPmouse.onDown.add(pause, self);
// game.input.onDown.add(pause, self);
game.input.onDown.add(this.jump, this);

// function pause(event)  {
//     //if(game.paused == true) {
//             game.paused = false;
//             console.log(game.paused);
//             console.log(event);
//       //  }
//     }
},

update: function() {
    // If the userwbc is out of the screen (too high or too low)
    // Call the 'restartGame' function

    if (this.userwbc.y < 0 || this.userwbc.y > screen.height - 100 ) {
        this.userwbc.visible = false;
        this.wrongSound.play(); 

//        game.paused = true;
        finalscore = this.score;
        game.state.start('restart');
    }
    //restart game if collided
    //console.log(this.flu1s.children);
    for(i=0; i< this.flu1s.length; i++) {
        //game.physics.arcade.overlap(this.userwbc, this.flu1s[i], this.updateScore(i), null, this);
        if( (-25 < (this.userwbc.position.x - this.flu1s.children[i].position.x)) && 
            (this.userwbc.position.x - this.flu1s.children[i].position.x) < 25 ) {
            
                if( (-25 < (this.userwbc.position.y- this.flu1s.children[i].position.y)) && 
                    (this.userwbc.position.y- this.flu1s.children[i].position.y < 25 )) {
                        

                        console.log(this.flu1s.children[i].name);
                        if(this.flu1s.children[i].key == "flu2") {
                            
                            this.userwbc.visible = false;
                            finalscore = this.score;
                            this.wrongSound.play();
                            game.state.start('restart');
                        }
                        else {
                            this.collectSound.play(); 
                            this.flu1s.children[i].destroy();
                            this.score+=1;
                        }

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
        
    var style = { font: "30px Arial", fill: "#33cc33", wordWrap: true, wordWrapWidth: background.width, align: "center", backgroundColor: "#000000" };
    var style2 = { font: "26px Arial", fill: "#00F0F8FF ", wordWrap: true, wordWrapWidth: background.width, align: "center", backgroundColor: "#000000" };
    var style3 = { font: "26px Arial", fill: "#0099ff", wordWrap: true, wordWrapWidth: background.width, align: "center", backgroundColor: "#ccff99" };


       var text = game.add.text(450, 10, "Read these rules before starting the game \n(Hit the Play Button)", style);
       var text = game.add.text(0, 110, "There are white blood cells(WBC) in \n our body who protects us from flu virus.", style2);
       var text = game.add.text(0, 210, " Imagine if you could play as a WBC, &\n fight those flu viruses.", style2);
       var text = game.add.text(0, 310, " In this game,You will be playing as WBC and \nwill be collecting all the correct flus", style2);
       var text = game.add.text(870, 150, "How to Play the Game:", style);
       var text = game.add.text(840, 250, "Press the Space bar key/ Mouse click \n to jump and keep playing.", style2);
       var text = game.add.text(1045, 390, "Collect the correct flus to gain score \n Collect the wrong flus and game over.", style2);



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
    music.stop();

        var background = game.add.tileSprite(0, 0, 1350, 650, 'background');
        labelScore = game.add.text(120, 120, finalscore, 
                        { font: "60px Arial", fill: "#4488ff" });
        background.tint = 0x114422;
        var restartbutton = game.add.button(505, 190, 'rebutton', this.starting, this, 2, 1, 0);
        
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