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
        game.bg=new Background();
        game.land=new Land();
        game.bird=new Bird();
        game.pipeArr=[];
        break;
      case 3:
        game.scene=3;
        this.isBoom=false;
        this.index=0;
        break;
      case 4:
        game.scene=4;
        let arr=JSON.parse(localStorage.getItem("FB"));
        for(let i=0;i<arr.length;i++){
          if(game.score>=arr[0]){
            arr[0]=game.score;
            this.model="medals_1";
          }else if(game.score>=arr[1]){
            this.model="medals_2";
            arr[1]=game.score;
          }else if(game.score>=arr[2]){
            this.model="medals_3";
            arr[2]=game.score;
          }else {
            this.model="medals_0"
          }
        }
        this.best=arr[0];
        localStorage.setItem("FB",JSON.stringify(arr));
        this.overX=game.canvas.width/2-game.allImg["game_over"].width/2;
        this.overY=-80;
        this.panelX=game.canvas.width/2-game.allImg["score_panel"].width/2;
        this.panelY=game.canvas.height;
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
        game.bg.update();
        game.bg.render();
        game.land.update();
        game.land.render();
        game.pipeArr.forEach((item)=>{
          item.update();
          item.render();
        });
        game.bird.update();
        game.bird.render();
        if(game.frame%150==0){
          new Pipe();
        }
        this.scoreRender();
        break;
      case 3:
        game.bg.render();
        game.land.render();
        game.pipeArr.forEach((item)=>{item.render();});
        if(this.isBoom){
          this.index++;
          if(this.index>9){
            this.enter(4);
            return;
          }
          game.draw.drawImage(game.allImg["baozha"+this.index],game.bird.x,game.bird.y-100,100,100)
        }else {
          game.bird.y+=5;
          if(game.bird.y>=game.canvas.height-game.allImg["land"].height){
            this.isBoom=true;
            document.getElementById("die").play();
            document.getElementById("hit").play();
          };
          game.bird.render();
        }
        break;
      case 4:
        game.bg.render();
        game.land.render();
        this.overY>=160?this.overY=160:this.overY+=5;
        this.panelY<=250?this.panelY=250:this.panelY-=10;
        game.draw.drawImage(game.allImg["game_over"],this.overX,this.overY);
        game.draw.drawImage(game.allImg["score_panel"],this.panelX,this.panelY);
        game.draw.drawImage(game.allImg[this.model],this.panelX+28,this.panelY+44);
        game.draw.fillStyle="#666";//设置颜色
        game.draw.font="20px consolas";//设置字体
        game.draw.textAlign="right";//对齐方式
        game.draw.fillText(game.score,(game.canvas.width / 2) + 90 , this.panelY + 50);
        game.draw.fillText(this.best,(game.canvas.width / 2) + 90 , this.panelY + 96);
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
          game.bird.fly();
          break;
        case 3:
          break;
        case 4:
          break;
      }
    }
  }

  scoreRender(){
    let str=game.score.toString();
    let line=game.canvas.width/2-str.length*30/2;
    for (let i=0;i<str.length;i++){
      game.draw.drawImage(game.allImg["shuzi"+str[i]],line+i*30,100);
    }
  }
}