class Game {
  constructor(){
    this.canvas=document.getElementById("canvas");
    //创建一个绘制环境 2d环境
    this.draw=this.canvas.getContext("2d");
    let W=document.documentElement.clientWidth>420?420:document.documentElement.clientWidth;
    let H=document.documentElement.clientHeight>750?750:document.documentElement.clientHeight;
    this.canvas.width=W;
    this.canvas.height=H;
    this.timer=null;
    this.frame=0;
    this.score=0;
    this.scene=0;
    if(!localStorage.getItem("FB")){
      localStorage.setItem("FB","[]");
    }
    this.imgLoad();
  };
  clear(){
    //清屏的
    this.draw.clearRect(0,0,this.canvas.width,this.canvas.height);
  };
  start(){
    this.SM=new SceneManager();
    this.SM.enter(this.scene);
    this.timer=setInterval(()=>{
      this.frame++;
      this.clear();
      this.SM.updateAndRender();
    },20)
  };
  imgLoad(){
    this.allImg={
      "bg_day":"images/bg_day.png",
      "land":"images/land.png",
      "pipe_down" : "images/pipe_down.png",
      "pipe_up" : "images/pipe_up.png",
      "bird0_0":"images/bird0_0.png",
      "bird0_1":"images/bird0_1.png",
      "bird0_2":"images/bird0_2.png",
      "title":"images/title.png",
      "button_play":"images/button_play.png",
      "tutorial":"images/tutorial.png",
      "shuzi0" : "images/font_048.png",
      "shuzi1" : "images/font_049.png",
      "shuzi2" : "images/font_050.png",
      "shuzi3" : "images/font_051.png",
      "shuzi4" : "images/font_052.png",
      "shuzi5" : "images/font_053.png",
      "shuzi6" : "images/font_054.png",
      "shuzi7" : "images/font_055.png",
      "shuzi8" : "images/font_056.png",
      "shuzi9" : "images/font_057.png",
      "baozha1" : "images/1.png",
      "baozha2" : "images/2.png",
      "baozha3" : "images/3.png",
      "baozha4" : "images/4.png",
      "baozha5" : "images/5.png",
      "baozha6" : "images/6.png",
      "baozha7" : "images/7.png",
      "baozha8" : "images/8.png",
      "baozha9" : "images/9.png",
      "game_over":"images/text_game_over.png",
      "score_panel":"images/score_panel.png",
      "medals_0" : "images/medals_0.png",
      "medals_1" : "images/medals_1.png",
      "medals_2" : "images/medals_2.png",
      "medals_3" : "images/medals_3.png",
    };
    let count=0,total=Object.keys(this.allImg).length;
    for (let key in this.allImg){
      let img=new Image();
      img.src=this.allImg[key];
      img.onload=()=>{
        count++;
        this.allImg[key]=img;
        if(count>=total) this.start();
      }
    }
  };
}