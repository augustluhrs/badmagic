/*
    ~ * ~ * ~ * 
    CLIENT
    ~ * ~ * ~ * 
*/

//
//  VARIABLES
//
let canvas, program;
let flock; //holds the stuff flying around the mouse/screen
let title; //holds all the characters in the title
let button; //reference to the triangle button
let sections = [//could use tdTable csv, but fine with doing by hand for now
  ["Altar", {Lily: "Lilygudas", Oriana: "orianamejer", Sam: "woahsxm"}],
  ["After the Screen", {Lucia: "iwant2batree111"}],
  ["WRungway Gallery", {Ariel: "am.aaaariel", Florence: "dyaksh5"}],
  ["Dentist", {Zora: "zorazora_1118", Sara: "sarafishinadaze"}],
  ["Chicken", {Katy: "kaidikaty", Jenny: "jieyin_tan111111", Catherine: "caathy_rong"}],
  // ["INTERMISSION", {FiveMinutes: ""}],
  ["Infection", {Theo: "mx.theolevine", Mira: "mira__aiko", Eden: "garden0f3d3n", Kiran: "whereisthewolfstew"}],
  ["Recoil", {Magdalena: "mags_treter"}],
  ["Jellyfish Quest", {Chiara: "chiaratabet", Z: ""}],
  ["Under the Skin of the Earth", {Chuxi: "sheslackluster", Kexin: "ihoyanisme", Clover: "cloverzou_1013"}], 
  ["On My Own", {Taryn: "", Hayley: "hayley_brooks_"}],
  ["Out of the Unreal", {Emily: "universiviaaa", Kitty: "yuyu_ch3n", Zora: "zorazora_1118"}],
  // ["INSTALLATIONS", {In404: "", BetweenTwoSeas: "", d: "", Sam: ""}],
  // ["", {: "", : ""}],
]; 
let buttons = [];
let info, playlist;
let testInfo;
let isInfoBoxUp = false;
let isShowingInstallations = false;
//
//  ASSET LOAD
//

let pointer; //the image of the mouse pointer
let poster, posterSquare, posterCenter;
let cloudColor; //stores the color we're tinting the clouds
let fonts = []; // the array of custom fonts
let fontSize;
let installDiv;
let akronim, cherrybomb, eater, griffy, kablammo, mochiy, pressstart, rock3D, rubikIso, rubikMoonrocks, rubikPuddles; //the references to the custom fonts getting loaded

function preload() {
  // poster = loadImage('https://cdn.glitch.global/d01f7cb8-7120-4c82-9d9c-4b8ddeebdb9a/GlitchGala_VerticalPoster.jpg?v=1733970845771');
  // posterSquare = loadImage('https://cdn.glitch.global/d01f7cb8-7120-4c82-9d9c-4b8ddeebdb9a/GlitchGala_Square.jpg?v=1733970851534');
  // posterCenter = loadImage('https://cdn.glitch.global/d01f7cb8-7120-4c82-9d9c-4b8ddeebdb9a/posterCenter.jpg?v=1733971316451');
  // showOrder = loadImage('https://cdn.glitch.global/d01f7cb8-7120-4c82-9d9c-4b8ddeebdb9a/showOrder.png?v=1733970731807');
  // poster = loadImage('./assets/images/BadMagic_flyer.png');
  poster = loadImage('https://raw.githubusercontent.com/augustluhrs/badmagic/refs/heads/main/public/assets/images/BadMagic_Flyer.png');
  pointer = loadImage("./assets/images/pointer.png");
  // clouds = loadImage("assets/images/clouds.jpg");
  akronim= loadFont("./assets/fonts/Akronim-Regular.ttf");
  cherrybomb= loadFont("./assets/fonts/CherryBombOne-Regular.ttf");
  eater= loadFont("./assets/fonts/Eater-Regular.ttf");
  griffy= loadFont("./assets/fonts/Griffy-Regular.ttf");
  kablammo= loadFont("./assets/fonts/Kablammo-Regular.ttf");
  mochiy= loadFont("./assets/fonts/MochiyPopOne-Regular.ttf");
  pressstart= loadFont("./assets/fonts/PressStart2P-Regular.ttf");
  rock3D= loadFont("./assets/fonts/Rock3D-Regular.ttf");
  rubikIso= loadFont("./assets/fonts/RubikIso-Regular.ttf");
  rubikMoonrocks= loadFont("./assets/fonts/RubikMoonrocks-Regular.ttf");
  rubikPuddles = loadFont("./assets/fonts/RubikPuddles-Regular.ttf");
  
  fonts.push(akronim, cherrybomb, eater, griffy, kablammo, mochiy, pressstart, rock3D, rubikIso, rubikMoonrocks, rubikPuddles);
}

//
//  MAIN
//

function setup(){
  canvas = createCanvas(windowWidth, windowHeight); //TODO better way of ensuring scrollbars don't show up
  
  //layout
  imageMode(CENTER); //draws the image from center coordinates instead of corner
  angleMode(RADIANS);
  textAlign(CENTER, CENTER); //aligns the text to the center horizontally, and to the bottom vertically
  // textFont(font);
  noStroke();//removes the outline so the text isn't as thick
  colorMode(HSB);
  
  //font scale 
  fontSize = width/8;
  textSize(fontSize); 
  
  //create flock array
  flock = new Flock();
  
  //set cloud tint
  cloudColor = color("#93a808"); //idk i love this color
  cloudColor.setAlpha(flock.flockParams.trailAmount); //adding transparency so we get some pointer trails when draw() loops
  
  //set up the title characters
  let titles = ["BAD", "MAGIC", "", "", "", "", "", "", "", "", "", "", "", ""]; //empty strings just silly way of spacing
  title = new Title(titles, fonts, fontSize);
  
  //set up the section buttons
  program = createDiv().class("program");
  program.size(width * .85, height * .65);
  program.position(width * 0.075, height * 0.185);
  // program.style("background-color", "#ff00ff")
  let index = 0;
  for (let section of sections) {
    let s = createButton(section[0]).parent(program).class("buttons");
    // let secButt = [];
    // let s = createButton(section[0]).parent(program).class("expandable-button");
    s.size(width * .75, program.height / sections.length);
    s.style("font-size", `${width * 0.05}px`);
    s.style("float", (random() < 0.5) ? "right" : "left");
    s.mousePressed(clickInfo.bind(`${index}`));
    
    
    // s.style("float", (index < 6) ? "right" : "left")
    // s.position(random(0, program.width - s.width), )
    buttons.push([s, makeInfo(section[0],section[1])]);
    index++; //shhhhh
  }
  
  
  
  //installations 
  installDiv = createDiv('').id('installDiv');
  installDiv.size(width * 0.7, height * 0.7);
  installDiv.position(width *.15, height * 0.05);
  installDiv.style('background-color', "00fffacc");
  let t2 = createDiv('Game in Blackbox in Lobby: \n\n').parent(installDiv).class("performer");
  t2.style("font-size", `${width * 0.08}px`);
  t2.style("color", "black");
  let t3 = createDiv('resurface \n\n').parent(installDiv).class("performer");
  t3.style("font-size", `${width * 0.08}px`);
  t3.style("color", "black");
  let spacer = createDiv(' ~ * ~* ~* * ~ ~*   ~ ~*').parent(installDiv).class("performer");
  spacer.style('font-size', `${width * 0.04}px`);

  let t = createDiv('Installation in 404: \n').parent(installDiv).class("performer"); 
  t.style("font-size", `${width * 0.08}px`);
  t.style("color", "black");
  let t4 = createDiv('Water in Translation\n').parent(installDiv).class("performer"); 
  t4.style("font-size", `${width * 0.08}px`);
  t4.style("color", "black");
  
  waterGroup = {Nicole: "n_colez", Raphael: "boyan5024", Vivian: "vivi_ann1verse", Marian: "mariehschu"};
  for (let performer of Object.keys(waterGroup)){
    let p = createDiv(performer).parent(installDiv).class('performer');
      p.style("font-size", `${width * 0.07}px`);
    if (waterGroup[performer] != ""){
      p.style("color", "blue");
      p.mousePressed(()=>{
        window.location.assign(`https://instagram.com/${waterGroup[performer]}`);
      })
    } else {
      p.style("color", "black");
    }
  }
  installDiv.hide();

  installations = createButton("INSTALLATIONS").class("buttons");
  installations.position(width * .25, height * .85);
  installations.size(width * .5, height * .05);
  installations.style("font-size", `${width * 0.05}px`);
  installations.mousePressed(()=>{
    //idk toggle display
    if(isShowingInstallations){
      console.log('hide');
      installDiv.hide();
      isShowingInstallations = false;
    } else {
      console.log('show');

      installDiv.show();
      isShowingInstallations = true;
    }
  })
  // buttons.push([installations, makeInfo("installations", {In404: "", WaterInTranslation: "", Nicole: "n_colez", Raphael: "boyan5024", Vivian: "vivi_ann1verse", Marian: "mariehschu", _______: "", InLobby: "", RESURFACING: ""})])
  // installations.mousePressed(clickInfo.bind(`${buttons.length - 1}`));

  for (let sectionthingidk of buttons){
    sectionthingidk[1].hide();
  }

  info = createButton("What???").class("buttons");
  info.position(width * (0.33 /2), height * .92);
  info.size(width * .2, height * .05);
  info.style("font-size", `${width * 0.03}px`);
  info.mousePressed(()=>{
    window.location.assign("https://tisch.nyu.edu/collaborative-arts");
  })
  
  
  playlist = createButton("Playlist").class("buttons");
  playlist.position(width * (.8 - (0.33/2)), height * .92);
  playlist.size(width * .2, height * .05);
  playlist.style("font-size", `${width * 0.03}px`);
  playlist.mousePressed(()=>{
    window.location.assign("https://open.spotify.com/playlist/0qwGoxf1UF3ZPhemmfl97j?si=f6e4fe8216e1403a");
  })
  
  // testInfo = createDiv('test button').mousePressed(()=>{
  //   window.location.assign("www.google.com");
  // })
} 

//
//  FUNCTIONS
//

function draw() {
  // background("#93a808"); //not using background
  push(); //isolates the changes to just whatever comes before pop()
  tint(cloudColor);
  // image(clouds, width/2, height/2, width, height); //using half the value of the dimensions because we're drawing the image from the center of the image, not the corner
  // image(posterCenter, width/2, height/2, width, height);
  //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])
  image(poster, width/2, height/2, width, height, .8 * width, .28* height, .5 * width, .4 * height);
  pop();
  image(pointer, mouseX + 3, mouseY + 5, flock.pointerSize, flock.pointerSize); //so we get a trail of our own pointer, size a little off rn
  
  //placeholder
  // image(showOrder, width/2, height * .6, width * .85, height * .5);

  //have the pointers look at the flock and the mouse, update each pointer, and then draw each pointer
  if (mouseX < 20 && mouseY < 20) {
    mouseX = width/2;
    mouseY = height/2;
  }
  let mousePos = createVector(mouseX, mouseY);
  flock.update(mousePos);
  
  //text updates 
  stroke('#00fffa');
  fill(255); 
  title.update();
  
  //silly text info pop up
  
}

//
//  MOUSE FUNCTIONS
//

function mousePressed(){
    // button.checkBounds(mouseX, mouseY);

  //idk some sort of installation thing
  if (isShowingInstallations){
    // if ((mouseX < width * 0.25 || mouseX > width * 0.75) || (mouseY < height * 0.3 || mouseY > height * 0.8)){
    if ((mouseX < width * 0.25 || mouseX > width * 0.75) || (mouseY < height * 0.3)){

      console.log('install close');
      installDiv.hide();
      isShowingInstallations = false;
    }
  }
}

//
//  SHOW FUNCTIONS
//


//
//  MISC FUNCTIONS
//

function clickInfo(index){
  let t = index.srcElement.innerText
  console.log(t); //wtfffffff
    if (isInfoBoxUp){
      for (let button of buttons){
        button[1].hide();
      }
    } else {
      instOverride = true;
      for ( let [i, section] of sections.entries()){ //idk
        if (section[0] == t){
          console.log(buttons[i][1]);
          buttons[i][1].show();
          instOverride = false;
        }
      }
      if (instOverride){
        console.log(buttons[buttons.length -1][1]);
        buttons[buttons.length -1][1].show();
      }
    }
    isInfoBoxUp = !isInfoBoxUp
}

function makeInfo(title, performers){
  let s_info;
  let s_div;
 // for (let section of sections){
 //   //shhhh
 //   if (section[0] = title){
 //     s_info = section[1]
 //   }
 // }
  s_info = performers;
  s_div = createDiv().id(`${title}`).class('sinfo');
  // s_div.size(program.width * 0.6, program.height * 0.6);
  s_div.size(width * 0.6, height * 0.1);
  s_div.position(width *.2, height * 0.4);
  s_div.style('background-color', "00fffacc");
  for (let performer of Object.keys(s_info)){
    let p = createDiv(performer).parent(s_div).class('performer');
      p.style("font-size", `${width * 0.1}px`);
    if (s_info[performer] != ""){
      p.style("color", "blue");
      p.mousePressed(()=>{
        window.location.assign(`https://instagram.com/${s_info[performer]}`);
      })
    } else {
      p.style("color", "black");
    }
    
  }
  return s_div;
}
