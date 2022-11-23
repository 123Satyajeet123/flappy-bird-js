 // Create a variable called player
var player;
// Create block
var block;
// Create a variable for y-position
var playerYPosition = 200;
var fallSpeed=0;
var xSpeed=0;
// Create an interval 
var interval =  setInterval(updateCanvas, 20);
var canvasWidth=1490;
var canvasHeight=690;
var isJumping = 0;
var jumpSpeed = -7;
function startGame(){
    gameCanvas.start();
    // Create our player using our function
    player = new createPlayer(30,30,10);
    // Assign the block variable with the value from createBlock()
    block = new createBlock();
}
// Create a function called createPlayer
function createPlayer(width, height , x){
    this.width = width;
    this.height= height;
    this.x = x;
    this.y = playerYPosition;
    // Create a draw function
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.width, this.height);
    }
    // Create a makeFall function
    this.makeFall = function() {
        this.y += fallSpeed;
        this.x += xSpeed;
        fallSpeed +=0.2;
        // Call the stopPlayer funtion
        console.log('falling')
        this.stopPlayer();
        if(this.y>= canvasHeight - this.height ){
            fallSpeed *= -0.4;
        }
        if(this.y<=0){
            this.y-=2*fallSpeed;
            fallSpeed=0;
        }
        if(this.x>= canvasWidth - this.width || this.x<=0){
            this.x -= xSpeed;
            xSpeed *= -1;
        }
    }
    // Toggle the jump function when spacebar is pressed
    this.jump = function() {
            if(isJumping==1){
                fallSpeed=jumpSpeed;
                isJumping=0;
            }
    }
    
    this.stopPlayer = function() {
        var ground = canvasHeight-this.height;
        if(this.y>ground){
            this.y=ground;
        }
    }
}
function createblock(){
    this.speed=-2;
    this.draw = function(){
        this.rand = randomNumber(60,630);
        this.x
        ctx = gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(1360,0,30, this.rand);
        ctx.fillRect(1360,this.rand+60,30, 630-rand)
    }
}
// Create an updateCanvas function to redraw players and make him fall
function updateCanvas() {
    ctx = gameCanvas.context;
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    player.makeFall();
    player.draw();
    player.jump();
    // block.draw();
    
}
var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width=canvasWidth;
        this.canvas.height=canvasHeight;
        this.context =  this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function randomNumber(a, b){
    return Math.floor((Math.random() * (b-a)) + a);
}
document.addEventListener("keydown", function(event) {
        if (event.keyCode === 32 || event.keyCode===87) {
        console.log('Spacebar is pressed!');
        isJumping=1;
        }
});
document.addEventListener("keypress", function(event) {
    if (event.key === 'a' ) {
        xSpeed  -= 4;
        }
        if (event.key === 'd' ) {
        xSpeed  += 4;
        }
});