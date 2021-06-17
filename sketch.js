var balloon, background;
var position, database;

function preload() {
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation(
    "hotairballoon1.png",
    "hotairballoon1.png",
    "hotairballoon1.png",
    "hotairballoon2.png",
    "hotairballoon2.png",
    "hotairballoon2.png",
    "hotairballoon3.png",
    "hotairballoon3.png",
    "hotairballoon3.png"
  );
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500, 700);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;
  database.ref("baloon/position").on("value", function (data) {
    position = data.val();
    balloon.x=position.x
    balloon.y=position.y
  });

  textSize(20);
}

// function to display UI
function draw() {
  background(bg);

  if(position){

  if (keyDown(LEFT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(-5, 0);
    //write code to move air balloon in left direction
  } else if (keyDown(RIGHT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(5, 0);
    //write code to move air balloon in right direction
  } else if (keyDown(UP_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(0, -5);
    balloon.scale = 0.35;
    //write code to move air balloon in up direction
  } else if (keyDown(DOWN_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(0, 5);

    //write code to move air balloon in down direction
  }

  console.log(position);

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}
}
function changePosition(x, y) {
  database.ref("baloon/position").set({
    x: balloon.x + x,
    y: balloon.y + y,
  });
}

function readHeight(data) {
  height = data.val();
  baloon.x = height.x;
  baloon.y = height.y;
}

function showError() {
  console.log("Error in connecting to Database");
}
