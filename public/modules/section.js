class Section{
  constructor(_title, _performers, _pos, _color){
    this.title = _title; //{"text", font, performers}
    this.title.rot = 0;
    this.color = _color;
    this.performers = _performers;
    this.r = 20; //TODO
    this.pos = _pos;
    
  }
  
  update(){
    push();
    fill(this.color);
    // textFont(this.title.font);
    // textSize(this.r / 2); //TODO
    // text(this.title.text, 0, 0);
    pop();
  }

  // checkBounds(x, y){
  //   let mousePos = createVector(x, y);
  //   if (mousePos.dist(this.pos) < this.r){
  //     //in range to click
  //     this.clicked();
  //   }
  // }

  // checkHover(x, y){
  //   //if not hovering over, wiggle
  //   let mousePos = createVector(x, y);
  //   if (mousePos.dist(this.pos) >= this.r){
  //     this.wiggle();
  //   }
  // }

  // wiggle(){
  //   for (let i = 0; i < this.vertices.length; i++){
  //     this.vertices[i] += random(-1, 1);
  //   }
  //   // this.title.performers += random(-1,1);
  //   this.title.rot += random(-0.01, 0.01);
  // }

  // clicked(){
  //   this.color = color(random(0, 360), 255, 255);
  //   window.open("https://tisch.nyu.edu/collaborative-arts/Students");
  // }
}
