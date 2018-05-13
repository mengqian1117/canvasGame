class Pipe {
  constructor(){
    this.w=game.allImg["pipe_down"].width;
    this.h=game.allImg["pipe_down"].height;
    this.h1=Math.round(Math.random()*200+100);
    this.space=140;
    this.h2=game.canvas.height-game.allImg["land"].height-this.h1-this.space;
    this.x=game.canvas.width;
    this.speed=1;
    //每new一个管子放进数组中
    game.pipeArr.push(this);
  };
  update(){
    //销毁没用的管子 什么样的管子没用了? 走出画布
    for(let i=0;i<game.pipeArr.length;i++){
      if(game.pipeArr[i].x<-this.w){
        game.pipeArr.splice(i,1);
        i--;
      }
    }
    this.x-=this.speed;
  };
  render(){

    game.draw.drawImage(game.allImg["pipe_down"],0,this.h-this.h1,this.w,this.h1,this.x,0,this.w,this.h1);
    game.draw.drawImage(game.allImg["pipe_up"],0,0,this.w,this.h2,this.x,this.h1+this.space,this.w,this.h2);
  }
}