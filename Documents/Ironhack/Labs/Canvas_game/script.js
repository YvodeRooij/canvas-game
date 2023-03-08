window.onload = () => {
  document.getElementById("btn-start").onclick =
    () => {
      startGame();
    };
};

let buttonEnd =
  document.getElementById(`btn-end`);

let ocean;
let ocean1X = 0;
let ocean1Y = 0;
let ocean2X = 0;
let ocean2Y = 0;
let pirateShip;
let pirateShipX = 350;
let pirateShipY = 300;
let enemyCannonLeft;
let enemyCannonRight;

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
}

function setup() {
  createCanvas(700, 380).parent(
    `canvas-container`
  );
  select("#canvas-container").hide(); // hide the canvas container initia
}

function draw() {
  // move the ocean image to the right
  move();

  // Display the ocean, pirate ship, and enemy cannons
  image(ocean, ocean1X, ocean1Y, width, height);
  // image(ocean, ocean2X, ocean2Y, widht, height);
  image(
    pirateShip,
    pirateShipX,
    pirateShipY,
    70,
    70
  );
  image(enemyCannonLeft, 0, 200, 30, 30);
  image(enemyCannonRight, 570, 200, 30, 30);
}

// make background move to the rights to simulate moving waves
function move() {
  ocean1X += 2;
}

// Start the game
function startGame() {
  select("#canvas-container").show();
  document.body.style.backgroundColor =
    "antiquewhite";
  document.body.style.backgroundImage = "none";
  setInterval(move, 30);
}

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
