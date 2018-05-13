class SceneManager {
  constructor(){
    this.bindEvent();
  };
  enter(number){
    switch (number){
      case 0:
        game.bg=new Background();
        game.land=new Land();
        this.titleW=game.allImg["title"].width;
        this.titleX=game.canvas.width/2-this.titleW/2;
        this.titleY=-50;
        this.btnX=game.canvas.width/2-game.allImg["button_play"].width/2;
        this.btnY=game.canvas.height;
        this.birdX=game.canvas.width/2-game.allImg["bird0_0"].width/2;
        this.birdY=220;
        this.birdChangeY=2;
        break;
      case 1:
        game.scene=1;
        game.bg=new Background();
        game.land=new Land();
        this.tutorialW=game.allImg["tutorial"].width;
        this.tutorialX=game.canvas.width/2-this.tutorialW/2;
        this.tutorialY=250;
        this.alpha=1;
        this.alphaChange=0.03;
        break;
      case 2:
        game.scene=2;
        break;
      case 3:
        break;
      case 4:
        break;
    }
  };
  updateAndRender(){
    switch (game.scene){
      case 0:
        game.bg.render();
        game.land.render();
        this.titleY>=160?this.titleY=160:this.titleY+=5;
        this.btnY<=370?this.btnY=370:this.btnY-=10;
        if(this.birdY>300||this.birdY<220){
          this.birdChangeY*=-1;
        }
        this.birdY+=this.birdChangeY;
        game.draw.drawImage(game.allImg["title"],this.titleX,this.titleY);
        game.draw.drawImage(game.allImg["bird0_0"],this.birdX,this.birdY);
        game.draw.drawImage(game.allImg["button_play"],this.btnX,this.btnY);
        break;
      case 1:
        game.bg.render();
        game.land.render();
        game.draw.drawImage(game.allImg["bird0_0"],game.canvas.width/2-24,160);
        if(this.alpha>1||this.alpha<0)this.alphaChange*=-1;
        this.alpha+=this.alphaChange;
        game.draw.save();
        game.draw.globalAlpha=this.alpha;
        game.draw.drawImage(game.allImg["tutorial"],this.tutorialX,this.tutorialY);
        game.draw.restore();
        break;
      case 2:

        break;
      case 3:
        break;
      case 4:
        break;
    }
  };
  bindEvent(){
    game.canvas.onclick=(e)=>{
      switch (game.scene){
        case 0:
          if(e.clientX>=this.btnX&&e.clientX<=this.btnX+116&&e.clientY>=this.btnY&&e.clientX<=this.btnY+70){
            this.enter(1);
          }
          break;
        case 1:
          this.enter(2);
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
      }
    }
  }
}