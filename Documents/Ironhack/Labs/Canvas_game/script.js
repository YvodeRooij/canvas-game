window.onload = () => {
  document.getElementById("btn-start").onclick =
    () => {
      startGame();
    };
};

let buttonEnd =
  document.getElementById(`btn-end`);

let jackSparrowIntro;

//ocean variables
let ocean;
let ocean1X = 0;
let ocean1Y = 0;
let ocean2X = 700;
let ocean2Y = 0;
let pirateShip;
let pirateShipX = 350;
let pirateShipY = 300;

// enemy cannons
let enemyCannonLeft;
let enemyCannonRight;

// treasure variables
let treasure;
let treasureX =
  Math.floor(Math.random() * 591) + 10;
let treasureY =
  Math.floor(Math.random() * 200) + 10;

// shark variables
let shark;
let sharkX = 0;
let sharkY = 0;

function preload() {
  ocean = loadImage(`./images/ocean.jpg`);
  pirateShip = loadImage(
    `./images/pirate-ship.png`
  );
  enemyCannonLeft = loadImage(
    `./images/cannon-left-side.png`
  );
  enemyCannonRight = loadImage(
    `./images/cannon-right-side.png`
  );
  jackSparrowIntro = loadImage(
    `./images/jack_sparrow_sinking.jpg`
  );
  treasure = loadImage(
    `./images/treasure_chest-removebg-preview.png`
  );
}

function setup() {
  createCanvas(700, 380).parent(
    `canvas-container`
  );
  select("#canvas-container").hide(); // hide the canvas container initially
  image(jackSparrowIntro, 0, 0, width, height);
}

function draw() {
  // Move the ocean images to the right
  move();

  // Display the ocean, pirate ship, and enemy cannons
  image(ocean, ocean1X, ocean1Y, width, height);
  image(ocean, ocean2X, ocean2Y, width, height);
  image(
    pirateShip,
    pirateShipX,
    pirateShipY,
    70,
    70
  );
  image(enemyCannonLeft, 0, 200, 30, 30);
  image(enemyCannonRight, 570, 200, 30, 30);
  image(treasure, treasureX, treasureY, 70, 70);
}

function move() {
  // Move both ocean images to the right
  ocean1X += 2;
  ocean2X += 2;

  // Check if the first ocean image has moved off the screen
  if (ocean1X > width) {
    ocean1X = -width;
  }

  // Check if the second ocean image has moved off the screen
  if (ocean2X > width) {
    ocean2X = -width;
  }
}

// Start the game
function startGame() {
  document.querySelector(
    "#canvas-container"
  ).style.display = "block";
  document.body.style.backgroundColor =
    "antiquewhite";
  document.body.style.backgroundImage = "none";
  document.querySelector(
    ".introduction"
  ).style.display = "none";
  document.getElementById(
    "jack-sparrow"
  ).style.display = "none";
  document.querySelector(
    ".start-options"
  ).style.display = "none";
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    pirateShipX -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    pirateShipX += 20;
  }
  if (keyCode === UP_ARROW && pirateShipY > 30) {
    pirateShipY -= 20;
  }
  if (
    keyCode === DOWN_ARROW &&
    pirateShipY < 360
  ) {
    pirateShipY += 20;
  }
}

// When lose, you must be the worst pirate I have ever seen

// when win, he is the best pirate i have ever seen

buttonEnd.onclick = () => {
  endGame();
};

function endGame() {
  select("#canvas-container").hide();
  document.body.style.backgroundColor =
    "transparent";
  document.body.style.backgroundImage =
    "url('./images/island.jpg')";
}
