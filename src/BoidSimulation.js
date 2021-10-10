var boidCount = 100;

var boids = [];

function setup() {
  // Create a new canvas which is used by the raytracer
  InitializeNewCanvas();

  // Create boids for testing
  for(var i = 0; i < boidCount; i+=1) {
    SpawnRandomBoid();
  }
}

function draw() {
  // Fade the canvas to black for the trail effect the boids have
  noStroke();
  fill(0, 0, 0, 35);
  rect(0, 0, 500, 500);

  // Update and draw all boids
  boids.forEach(element => {
    element.Update(1);
    element.Draw();
  });

  // Todo: Extract math and vector stuff into its own github repo and link to it in other projects!
}

// Spawn a boid with a click
function mouseClicked() {
  boids.push(new Boid(new Vector(mouseX, mouseY), Color.Random()));
}

// Spawn  a boid at a random position with a random color
function SpawnRandomBoid() {
  boids.push(new Boid(
    new Vector(RandomInRange(0, 500), RandomInRange(0, 500)),
    Color.Random(),
    ));
}

// Get the average velocity of all boids in a radius around a point
function GetBoidsAverageVelocityInRadius(point, radius) {
  var boidsInRadius = GetBoidsInRadius(point, radius);
  var avarageVelocity = Vector.zero;
  boidsInRadius.forEach(element => {
    avarageVelocity = Vector.Add(avarageVelocity, element.velocity);
  });
  return Vector.Scale(avarageVelocity, 1/boidsInRadius.length);
}

// Get the average position of all boids in a radius around a point
function GetBoidsAveragePositionInRadius(point, radius) {
  var boidsInRadius = GetBoidsInRadius(point, radius);
  var avaragePosition = Vector.zero;
  boidsInRadius.forEach(element => {
    avaragePosition = Vector.Add(avaragePosition, element.position);
  });
  return Vector.Scale(avaragePosition, 1/boidsInRadius.length);
}

// Get a list of all boids in a radius around the given point
function GetBoidsInRadius(point, radius) {
  var result = [];
  var sqrRadius = Math.pow(radius, 2);
  boids.forEach(element => {
    if(Vector.SqrDistance(element.position, point) < sqrRadius) {
      result.push(element);
    }
  });
  return result;
}

// Canvas helper functions:

// Create a new canvas and set it to be a child of the rayTracer-canvas element
function InitializeNewCanvas() {
  var sketchHolder = document.getElementById("rendering-canvas");
  var canvas = createCanvas(sketchHolder.offsetWidth, sketchHolder.offsetHeight);
  canvas.parent("rendering-canvas");
}

function windowResized() {
  ResizeCanvasToFit();
}

// Resize the canvas to fit the rayTracer-canvas element
function ResizeCanvasToFit() {
  var sketchHolder = document.getElementById("rendering-canvas");
  if (sketchHolder.offsetWidth != width || sketchHolder.offsetHeight != height) {
    resizeCanvas(sketchHolder.offsetWidth, sketchHolder.offsetHeight);
  }
}
