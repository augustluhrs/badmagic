/*
    ~ * ~ * ~ * 
    CLIENT
    ~ * ~ * ~ * 
*/

//
//  VARIABLES
//

let flock; //holds the stuff flying around the mouse/screen

//
//  ASSET LOAD
//

let pointer; //the image of the mouse pointer
let clouds; //the loaded background image
let cloudColor; //stores the color we're tinting the clouds
let font; // the custom font

function preload() {
  pointer = loadImage("assets/images/pointer.png");
  clouds = loadImage("assets/images/clouds.jpg");
  font = loadFont("assets/fonts/MochiyPopOne-Regular.ttf");
}

//
//  MAIN
//

function setup(){
  createCanvas(windowWidth - 3, windowHeight - 3); //TODO better way of ensuring scrollbars don't show up
  
  //layout
  imageMode(CENTER); //draws the image from center coordinates instead of corner
  textAlign(CENTER, CENTER); //aligns the text to the center horizontally, and to the bottom vertically
  textFont(font);
  noStroke();//removes the outline so the text isn't as thick
  colorMode(HSB);
  
  //create flock array
  flock = new Flock();
  
  //set cloud tint
  cloudColor = color("#93a808"); //idk i love this color
  cloudColor.setAlpha(flock.flockParams.trailAmount); //adding transparency so we get some pointer trails when draw() loops
  
  //font scale 
  textSize(40); 
} 

//
//  FUNCTIONS
//

function draw() {
  // background("#93a808"); //not using background
  push(); //isolates the changes to just whatever comes before pop()
  tint(cloudColor);
  image(clouds, width/2, height/2, width, height); //using half the value of the dimensions because we're drawing the image from the center of the image, not the corner
  pop();
  image(pointer, mouseX + 3, mouseY + 5, flock.pointerSize - 5, flock.pointerSize - 5); //so we get a trail of our own pointer, size a little off rn
  
  //have the pointers look at the flock and the mouse, update each pointer, and then draw each pointer
  let mousePos = createVector(mouseX, mouseY);
  flock.update(mousePos);
  
  //text updates
  
}

//
//  MOUSE FUNCTIONS
//


//
//  SHOW FUNCTIONS
//


//
//  MISC FUNCTIONS
//
