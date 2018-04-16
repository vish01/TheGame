// Initialize Phaser, and create a 600 by 490px game
var game = new Phaser.Game(600, 490, Phaser.AUTO, 'Gamediv');

var mainState = {
    preload: function() { 
    // Load the bird sprite
    game.load.image('bird', 'assets/wbcnew.gif'); 
    game.load.image('pipe', 'assets/Flu.png');
    game.load.image('pipe2', 'assets/flufake.png');
    game.load.script('start',  'start.js');

},
    

create: function() { 
    
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#a0522d';
    //create an empty group
    this.pipes = game.add.group(); 
    
//adding pipes into the game
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 

    this.score = 0;
this.labelScore = game.add.text(20, 20, "0", 
    { font: "30px Arial", fill: "#ffffff" }); 
    
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);     
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
    this.addOnePipe(600, Math.random()*400);
    this.addOnePipe2(500,Math.random()*300);
        //for (var i = 0; i < 8; i++)
//        if (i != hole && i != hole + 1) 
//            this.addOnePipe(400, i * 60 + 10);   
        
        //increment score by 1:
        //this.score += 1;
this.labelScore.text = this.score;  
},

update: function() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
    //restart game if collided
    //console.log(this.pipes.children);
    for(i=0; i< this.pipes.length; i++) {
        //game.physics.arcade.overlap(this.bird, this.pipes[i], this.updateScore(i), null, this);
        if( (-25 < (this.bird.position.x - this.pipes.children[i].position.x)) && 
            (this.bird.position.x - this.pipes.children[i].position.x) < 25 ) {
            
                if( (-25 < (this.bird.position.y- this.pipes.children[i].position.y)) && 
                    (this.bird.position.y- this.pipes.children[i].position.y < 25 )) {
                        console.log(this.pipes.children[i].name);
                        if(this.pipes.children[i].key == "pipe2") {
                            this.restartGame();
                        }
                        this.pipes.children[i].destroy();
                        this.score+=1;
                }
        }
    }
},
    jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
        
},

// Restart the game
restartGame: function() {
    
    // Start the 'main' state, which restarts the game
    game.state.start('main');
}
};

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');
