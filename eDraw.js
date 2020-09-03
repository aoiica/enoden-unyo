'use strict';


// <canvas関連のもろもろ>
const WIDTH = window.innerWidth; /*800*/
const HEIGHT = WIDTH / 16 * 4;  /*16 * 9 = 450*/
const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext('2d');
//document.body.appendChild(canvas);

context.fillStyle = 'SkyBlue';
context.fillRect(20,40,50,100);


// <背景と電車の描画のためのクラス>
const wWidth = WIDTH;
const wHeight = HEIGHT;  /*16 * 9 = 450*/
const wMid = wHeight / 2;  /*225*/
const baseExpander = wWidth/40; /*20*/
const baseLength = 36 * baseExpander;  /*720*/
const baseX = (wWidth - baseLength) / 2;  /*40*/
const basePhase = wWidth/200;  /*4?*/


let stationObjects = ['hoge'];
let moveObjects = [];

function drawInit(unyouDnmList,unnList,honsen,kmkrPltf){
// <描画要素(駅)のインスタンスの作成>
const mainLine = new MainLine();
const fuji = new Terminal(0);
const isgm = new Single(2);
const yngk = new Single(4);
const kgnm = new Double(6);
const shkk = new Single(9);
const ensm = new Double(12);
const ksge = new Single(14);
const kkme = new Single(16);
const ming = new Double(18);
const schr = new Single(21);
const inmr = new Double(24);
const gkrk = new Single(27);
const hase = new Double(30);
const yghm = new Single(32);
const wddk = new Single(34);
const kmkr = new Terminal(36);


//駅のオブジェクトをまとめる
stationObjects = [mainLine, fuji, isgm, yngk, kgnm, shkk, ensm, ksge, kkme, ming, schr, inmr, gkrk, hase, yghm, wddk, kmkr];

//車両のオブジェクトを生成しつつまとめる
// moveObjects = [];

const rangeSS = (start,stop) => {return Array.from(Array(stop-start).keys(), x => x+start)}

rangeSS(1,honsen+1).forEach((num) => moveObjects.push(new Train(num,unyouDnmList,unnList,kmkrPltf)));
}


// <繰り返しとか実装>
function N_draw(unyouDnmList,unnList,kmkrPltf){
  console.log(unyouDnmList);
  context.clearRect(0, 0, WIDTH, HEIGHT);
  moveObjects.forEach((obj) => obj.update(unyouDnmList,unnList,kmkrPltf));
  stationObjects.forEach((obj) => obj.render(context));
  moveObjects.forEach((obj) => obj.render(context));

  //window.requestAnimationFrame((ts) => loop(ts));
}


function R_baser(eki36){
  // 小数点以下の処理はここ
  // return Math.floor(Number(eki36)) * baseExpander + baseX
  return ~~Number(eki36) * baseExpander + baseX
}

function R_iti(i,unyouDnmList) { //UDL
  let eki_abs = 0;
  if(Math.abs(unyouDnmList[i]) > 36){
    eki_abs = R_baser(36);
  }else{
    eki_abs = R_baser(Math.abs(unyouDnmList[i]));
  }
  return eki_abs;
}

function Rg_umiYama(i,unyouDnmList,kmkrPltf){ //UDL
  const yama = wMid-basePhase*4;
  const umi = wMid+basePhase*4;
  if(Math.abs(unyouDnmList[i]) >= 36){
    if(unyouDnmList[i] == 36){ //たぶん鎌倉駅のホーム判定がメイン関数で行われててそれのせいでif36が書かれているんだろうけど何を実装したか忘れた
      if(kmkrPltf == 3){
        return yama
      }else{
        return umi
    }}else{ //36以外
      if(kmkrPltf == 3){
        return umi
      }else{
        return yama
  }}}else{
    if(unyouDnmList[i] < 0){
      return umi
    }else{ //unyouDnmList[i] < 0
      return yama
}}}

class MainLine{
  constructor(){
    this.lSX = baseX;
    this.lSY = wMid;  /*225*/
    this.lEX = wWidth - baseX;  /*760*/
    this.lEY = wMid;  /*225*/
  }
  render(context){
    context.beginPath();
    context.moveTo(this.lSX, this.lSY);
    context.lineTo(this.lEX, this.lEY);
    context.stroke();
  }
}

class Terminal{
  constructor(eki36){
    this.sx = R_baser(eki36)-(basePhase+basePhase/4);
    this.sy = wMid-basePhase;
    this.ex = R_baser(eki36)+(basePhase+basePhase/4);
    this.ey = wMid+basePhase;
    this.width = this.ex - this.sx;
    this.height = this.ey - this.sy;
  }
  render(context){
    context.beginPath();
    context.strokeRect(this.sx, this.sy, this.width, this.height);
  }
}

class Double{
  constructor(eki36){
    this.cx = R_baser(eki36)
    this.cy = wMid;
    this.r = basePhase;
    this.sa = 0;
    this.ea = 2*Math.PI;
  }
  render(context){
    context.beginPath();
    context.arc(this.cx, this.cy, this.r, this.sa, this.ea);
    context.stroke();
  }
}

class Single{
  constructor(eki36){
    this.sx = R_baser(eki36);
    this.sy = wMid-basePhase;
    this.ex = R_baser(eki36);
    this.ey = wMid+basePhase;
  }
  render(context){
    context.beginPath();
    context.moveTo(this.sx, this.sy);
    context.lineTo(this.ex, this.ey);
    context.stroke();
  }
}

const iro = ['white', 'orange', 'green', 'red', 'purple', 'pink', 'skyblue', 'yellow']
class Train{
  constructor(i,unyouDnmList,unnList,kmkrPltf){ //UDL
    this.shisen = Number(String(unyouDnmList[i]).split(".")[1]) || 0;
    this.i = i;
    this.itiX = R_iti(i,unyouDnmList);
    this.itiPlus = this.itiX+(basePhase*2-basePhase/4);
    this.itiMinus = this.itiX-(basePhase*2-basePhase/4);
    this.umiYama = Rg_umiYama(i,unyouDnmList,kmkrPltf);
    this.umiYamaY = this.umiYama + ((this.umiYama - wMid)**0)*basePhase*5*this.shisen;
    this.gndY = wMid+((this.umiYamaY - wMid)**0)*basePhase*5*this.shisen;
    this.midY = wMid+((this.umiYamaY - wMid)**0)*basePhase + ((this.umiYamaY - wMid)**0)*basePhase*5*this.shisen;
    this.topY = wMid+((this.umiYamaY - wMid)**0)*basePhase*2 + ((this.umiYamaY - wMid)**0)*basePhase*5*this.shisen;
    // this.text = eval('un' + i)
    // this.topY = wMid+((this.umiYamaY - wMid)**0)*basePhase*2 + ((this.umiYamaY - wMid)**0)*basePhase*5*this.shisen;
    // this.text = eval('un' + i)
    this.text = unnList[i];
  }
  update(unyouDnmList,unnList,kmkrPltf){ //thisの寿命ってどんな感じかしら。これ動くの？
    this.shisen = Number(String(unyouDnmList[this.i]).split(".")[1]) || 0;
    this.itiX = R_iti(this.i,unyouDnmList);
    this.itiPlus = this.itiX+(basePhase*2-basePhase/4);
    this.itiMinus = this.itiX-(basePhase*2-basePhase/4);
    this.umiYama = Rg_umiYama(this.i,unyouDnmList,kmkrPltf)
    this.umiYamaY = this.umiYama + Math.sign(this.umiYama - wMid)*basePhase*5*this.shisen;
    this.gndY = wMid+Math.sign(this.umiYamaY - wMid)*basePhase*5*this.shisen;
    this.midY = wMid+Math.sign(this.umiYamaY - wMid)*basePhase + Math.sign(this.umiYamaY - wMid)*basePhase*5*this.shisen;
    this.topY = wMid+Math.sign(this.umiYamaY - wMid)*basePhase*2 + Math.sign(this.umiYamaY - wMid)*basePhase*5*this.shisen;
    // this.text = eval('un' + this.i)
    this.text = unnList[this.i];
  }
  render(context){
    context.beginPath();
    context.fillStyle = iro[this.i];
    context.moveTo(this.itiX, this.gndY);
    context.lineTo(this.itiMinus, this.midY);
    context.lineTo(this.itiX, this.topY);
    context.lineTo(this.itiPlus, this.midY);
    context.fill();

    context.beginPath();
    context.strokeStyle = 'gray';
    context.moveTo(this.itiX, this.gndY);
    context.lineTo(this.itiMinus, this.midY);
    context.lineTo(this.itiX, this.topY);
    context.lineTo(this.itiPlus, this.midY);
    context.closePath();
    context.stroke();

    context.fillStyle = 'Black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '12px sans-serif';
    context.fillText(this.text, this.itiX, this.umiYamaY);
  }
}





























