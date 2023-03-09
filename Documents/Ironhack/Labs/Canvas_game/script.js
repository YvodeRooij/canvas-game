window.onload = () => {
  document.getElementById("btn-start").onclick =
    () => {
      startGame();
    };
};

let buttonEnd =
  document.getElementById(`btn-end`);

let jackSparrowIntro;
let totalScore = 0;
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
let enemyCannonLeftX = 0;
let enemyCannonLeftY = 200;
let enemyCannonRight;
let enemyCannonRightX = 650;
let enemyCannonRightY = 200;

// cannonnball Left
let cannonnballLeft;
let cannonnballSpeed = 0;
let cannonnballWidht = 30;
let cannonnballHeight = 20;
let cannonballLeftX = enemyCannonLeftX + 30;
let cannonballLeftY = enemyCannonLeftY - 5;

// cannonnball right
let cannonnballRight;
let cannonballRightX = enemyCannonRightX - 30;
let cannonballRightY = enemyCannonRightY - 5;

// treasure variables
let treasure;
let treasureX =
  Math.floor(Math.random() * 591) + 10;
let treasureY =
  Math.floor(Math.random() * 200) + 10;

// shark variables
let shark1;
let shark1X =
  Math.floor(Math.random() * 591) + 10;
let shark1Y =
  Math.floor(Math.random() * 200) + 10;
let shark2;
let shark2X =
  Math.floor(Math.random() * 591) + 10;
let shark2Y =
  Math.floor(Math.random() * 200) + 10;

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
  shark1 = loadImage(`./images/shark_image.png`);
  cannonnballLeft = loadImage(
    `./images/cannonball-removebg-preview.png`
  );
  cannonnballRight = loadImage(
    `./images/cannonball-removebg-preview.png`
  );
}

function setup() {
  createCanvas(700, 380).parent(
    `canvas-container`
  );
  select("#canvas-container").hide(); // hide the canvas container initially
  image(jackSparrowIntro, 0, 0, width, height);
  select(`.lose`).hide(); // hide the worst pirate image initially
  noLoop();
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
  image(
    enemyCannonLeft,
    enemyCannonLeftX,
    enemyCannonLeftY,
    30,
    30
  );
  image(
    enemyCannonRight,
    enemyCannonRightX,
    enemyCannonRightY,
    30,
    30
  );
  image(treasure, treasureX, treasureY, 70, 70);
  image(shark1, shark1X, shark1Y, 60, 60);
  image(shark1, shark2X, shark2Y, 60, 60);

  // Move cannonballLeft to the right and ehck for boundary
  cannonballLeftX += 2;
  if (cannonballLeftX > 700) {
    cannonballLeftX = enemyCannonLeftX + 30;
  }
  image(
    cannonnballLeft,
    cannonballLeftX,
    cannonballLeftY,
    cannonnballWidht,
    cannonnballHeight
  );

  // Move cannonballRight to the left and have boundary
  cannonballRightX -= 2;
  if (cannonballRightX < 0) {
    cannonballRightX = enemyCannonRightX - 30;
  }

  image(
    cannonnballRight,
    cannonballRightX,
    cannonballRightY,
    cannonnballWidht,
    cannonnballHeight
  );

  checkCollision();
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
  select(`.lose`).hide(); // hide the commodore picture
  loop();
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
// check for collision
function checkCollision() {
  // Calculate the distance between the center of the pirate ship and the center of the cannonballs
  let distLeft = dist(
    pirateShipX + 25,
    pirateShipY + 25,
    cannonballLeftX + cannonnballWidht / 2,
    cannonballLeftY + cannonnballHeight / 2
  );
  let distRight = dist(
    pirateShipX + 25,
    pirateShipY + 25,
    cannonballRightX + cannonnballWidht / 2,
    cannonballRightY + cannonnballHeight / 2
  );

  // Calculate the distance between the center of the pirate ship and the center of the shark images
  let distShark1 = dist(
    pirateShipX + 35,
    pirateShipY + 35,
    shark1X + 30,
    shark1Y + 30
  );
  let distShark2 = dist(
    pirateShipX + 35,
    pirateShipY + 35,
    shark2X + 30,
    shark2Y + 30
  );
  let distTreasure = dist(
    pirateShipX + 35,
    pirateShipY + 35,
    treasureX + 35,
    treasureY + 35
  );

  // Calculate the sum of the radius of the pirate ship and the cannonballs
  let radiusSum = 35 + 30;

  // Check if the distance is less than the sum of the radii
  if (
    distLeft < radiusSum ||
    distRight < radiusSum ||
    distShark1 < radiusSum ||
    distShark2 < radiusSum
  ) {
    // Collision detected, end the game
    // When lose, you must be the worst pirate I have ever seen
    endGame();
  } else if (distTreasure < radiusSum) {
    updateScore();
  }
}

function updateScore() {
  totalScore += 1;
  document.getElementById(
    "score"
  ).textContent = `Score: ${totalScore}`;
  noLoop();
  redraw();
}

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
  select(`.lose`).show(); // show the worst pirate image
}

// restart the game
// make sure the sharks are not on the same place as the treasure
