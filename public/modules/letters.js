class Letter(){
  //more accurate name would be "Characters"
  constructor(_char, _fonts, _size, _pos, _timerMax){
    this.text = _char;
    this.fonts = _fonts;
    this.font = this.fonts[floor(random(0, this.fonts.length))];
    this.size = _size;
    this.pos = _pos;
    this.timerMax = _timerMax;
    this.counter = random(this.timerMax/3, this.timerMax);
  }
  
  update(){
    //counts down and then switches font or size
    this.counter--;
    if (this.counter <= 0){
      //reset counter
      this.counter = random(this.timerMax/3, this.timerMax);
      
      let newFont = this.fonts[floor(random(0, this.fonts.length))];
      
      while(newFont == this.font){
        newFont = this.fonts[floor(random(0, this.fonts.length))];
      }
      
      this.font = newFont;
      
    } else {
      
      return; //not needed but w/e
      
    }
  }
  show(){
    push();
    textSize(this.size);
    font(this.font);
    text(this.text, this.pos.x, this.pos.y);
    pop();
  }
}