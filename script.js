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

// life variables
let life;

// songs
let songIntro;
let songDuringGame;
let audioContext;

// function preload
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
  life = loadImage(`./images/life.png`);
  songDuringGame = loadSound(
    "./Sounds/He's a Pirate.mp3"
  );
  songIntro = loadSound(
    `./Sounds/Yo Ho, Yo Ho! A pirates life for me.mp3`
  );
}

function setup() {
  createCanvas(700, 380).parent(
    `canvas-container`
  );
  select("#canvas-container").hide(); // hide the canvas container initially
  image(jackSparrowIntro, 0, 0, width, height);
  select(`.lose`).hide(); // hide the worst pirate image initially
  select(`.buttons-bottom-canvas`).hide();
  select(`.win`).hide();
  audioContext = getAudioContext();
  audioContext.resume();
  songIntro.play();
  noLoop();
}

function draw() {
  // Move the ocean images to the right
  move();

  // Display the ocean, pirate ship, enemy cannons and lives
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
  // add sharks. add more sharks when higher score than 3
  if (totalScore < 3) {
    image(shark1, shark1X, shark1Y, 60, 60);
    image(shark1, shark2X, shark2Y, 60, 60);
  } else {
    image(shark1, shark1X, shark1Y, 60, 60);
    image(shark1, shark2X, shark2Y, 60, 60);
    image(
      shark1,
      shark1X + 100,
      shark1Y + 100,
      60,
      60
    );
    image(
      shark1,
      shark2X + 100,
      shark2Y + 100,
      60,
      60
    );
  }
  for (let i = 0; i < testLives; i++) {
    image(life, i * 30, 0, 30, 30);
  }

  // Move cannonballLeft to the right and ehck for boundary. Also increase speed when score is >3
  if (totalScore <= 3) {
    cannonballLeftX += 2;
  } else cannonballLeftX += 4;
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

  // Move cannonballRight to the left and have boundary. Also increase speed when score is >3
  if (totalScore <= 3) {
    cannonballRightX -= 2;
  } else cannonballRightX -= 4;
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
  songIntro.stop();
  songDuringGame.play();

  document.querySelector(
    "#canvas-container"
  ).style.display = "block"; // display the canvas
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
  select(`.buttons-bottom-canvas`).show();
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
    lifeDown(); // invoke the lifeDown function
  } else if (distTreasure < radiusSum) {
    // Increase the score when the pirate ship collides with the treasure
    totalScore += 1;
    document.getElementById(
      "score"
    ).textContent = `Score: ${totalScore}`;
    nextLevel(); // restart the game
  }
}

function nextLevel() {
  if (totalScore < 10) {
    restartGame();
  } else gameWon();
}

// when win, he is the best pirate i have ever seen

buttonEnd.onclick = () => {
  endGame();
};

let testLives = 3;

// substract one life by disappearing the life image
function lifeDown() {
  // Subtract one from the number of lives remaining and hide the corresponding life image
  testLives -= 1;

  if (testLives === 0) {
    endGame();
  } else {
    // Restart the game after a collision
    restartGame();
  }
}

// game over
function endGame() {
  if (canvas) {
    canvas.remove();
    songDuringGame.stop();

    document.body.style.backgroundColor =
      "transparent";
    document.body.style.backgroundImage =
      "url('./images/island.jpg')";
    songDuringGame.stop();
    select(`.lose`).show(); // show the worst pirate image
  }
}

// restart the game
function restartGame() {
  // Reset all game variables to their initial values

  ocean1X = 0;
  ocean1Y = 0;
  ocean2X = 700;
  ocean2Y = 0;
  pirateShipX = 350;
  pirateShipY = 300;
  enemyCannonLeftX = 0;
  enemyCannonLeftY = 200;
  enemyCannonRightX = 650;
  enemyCannonRightY = 200;
  cannonballLeftX = enemyCannonLeftX + 30;
  cannonballLeftY = enemyCannonLeftY - 5;
  cannonballRightX = enemyCannonRightX - 30;
  cannonballRightY = enemyCannonRightY - 5;
  treasureX =
    Math.floor(Math.random() * 591) + 10;
  treasureY =
    Math.floor(Math.random() * 200) + 10;
  shark1X = Math.floor(Math.random() * 591) + 10;
  shark1Y = Math.floor(Math.random() * 200) + 10;
  shark2X = Math.floor(Math.random() * 591) + 10;
  shark2Y = Math.floor(Math.random() * 200) + 10;

  // Reset the canvas and game elements
  select("#canvas-container").show();
  document.body.style.backgroundColor =
    "antiquewhite";
  document.body.style.backgroundImage = "none";
  // select(".lose").hide();
  loop();
}

// game won

function gameWon() {
  if (canvas) {
    canvas.remove();
  }
  document.body.style.backgroundColor =
    "transparent";
  document.body.style.backgroundImage =
    "url('./images/island.jpg')";
  select(`.win`).show();
  songDuringGame.stop();
}

// restart the gane when play again button is pressed
let gameRestart = (document.getElementById(
  `play-again`
).onclick = () => {
  startGame();
});
