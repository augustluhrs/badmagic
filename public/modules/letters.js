class Letter(){
  //more accurate name would be "Characters"
  constructor(_char, _fonts, _size, _timerMax){
    this.text = _char;
    this.font = _fonts[random(floor(0, _fonts.length))];
    this.size = _size;
    this.timerMax = _timerMax;
    this.counter = random(this.timerMax/3, this.timerMax);
  }
  
  update(){
    //counts down and then switches font or size
    this.counter--;
    if (this.counter <= 0){
      //reset counter
      this.counter = random(this.timerMax/3, this.timerMax);
      
      let newFont
      
    } else {
      return; //not needed but w/e
    }
  }
}