let beeModel;
let targetX = 0, targetY = 0;
let currX = 0, currY = 0;
let zoom = 150;
let targetZoom = 150;
let pitch = 0, yaw = 0;
let targetPitch = 0, targetYaw = 0;

function preload() {
  // Loading the OBJ model
  beeModel = loadModel('models/bee3.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  currX = width / 2;
  currY = height / 2;
}

function draw() {
  clear(); // Transparent background
  noStroke(); // Remove wireframe/edges
  
  // Basic lighting for 3D effect
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);
  pointLight(255, 255, 255, currX, currY, 100);

  // Smoothly move towards mouse position
  // mousePosX and mousePosY are updated by the BroadcastChannel in the HTML
  if (typeof mousePosX !== 'undefined') {
    targetX = mousePosX - width / 2;
    targetY = mousePosY - height / 2;
  }
  
  currX = lerp(currX, targetX, 0.05);
  currY = lerp(currY, targetY, 0.05);
  
  // Floating oscillation
  let floatX = sin(frameCount * 0.02) * 20;
  let floatY = cos(frameCount * 0.015) * 25;
  let floatZ = sin(frameCount * 0.01) * 15;
  
  // Smoothly interpolate zoom
  zoom = lerp(zoom, targetZoom, 0.1);
  
  // Smoothly interpolate rotation
  pitch = lerp(pitch, targetPitch, 0.1);
  yaw = lerp(yaw, targetYaw, 0.1);
  
  push();
  translate(currX + floatX, currY + floatY, floatZ);
  
  // Apply zoom
  scale(zoom / 100); 
  
  // Apply pitch and yaw
  rotateX(pitch);
  rotateY(yaw);
  
  // Add some continuous slight rotation for "space" feel
  rotateZ(frameCount * 0.005);
  
  // Material for the bee
  specularMaterial(250);
  shininess(20);
  
  model(beeModel);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Function to be called from HTML on click
function triggerClickEffect() {
  targetPitch += random(-PI/4, PI/4);
  targetYaw += random(-PI/2, PI/2);
}

// Function to be called from HTML on keyboard
function updateZoom(delta) {
  targetZoom = constrain(targetZoom + delta, 5, 500);
}
