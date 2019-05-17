'use strict';

// <canvas関連のもろもろ>
const WIDTH = 800;
const HEIGHT = WIDTH / 16 * 9; /*450*/
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

context.fillStyle = 'SkyBlue';
context.fillRect(20,40,50,100);



// <メインの変数たちと外部との接点>
// 運用メインの変数
let unyouDnmList = [0,    1, 2, 3, 4, 5, 6,    7, 8, 9];
// 解説: 不明なのは運用番号0、1-6はいつもの、7はGWのために空き、8は極楽寺で休み、9は江ノ島で休み
// 段落としに楽に変更できるように
const honsen = 6;
const kmkrPltf = 3;
// 運用バケツ　Fがついていようとなかろうと+だろうと-だろうと、とりあえず突っ込む。あとでよしなにする。
let un1 = '[1]';
let un2 = '[2]';
let un3 = '[3]';
let un4 = '[4]';
let un5 = '[5]';
let un6 = '[6]';

let un7 = '[7]';
// 休みバケツ
let yasumi = '';
// なうえの
const naueno = 0;




// <時刻を変化させる処理>
// 現在時刻
let nowTime = new Date();
let nowTimeNaueno = new Date();
nowTimeNaueno.setMinutes(nowTime.getMinutes() - naueno);
let nowHourNaueno = nowTime.getHours();
let nowMinNaueno = nowTime.getMinutes();

function nowTimeDef(){
  nowTime = new Date();
  timeUpdater();
}

function timeUpdater(){
  nowTimeNaueno = new Date();
  nowTimeNaueno.setMinutes(nowTime.getMinutes() - naueno);
  nowHourNaueno = nowTimeNaueno.getHours();
  nowMinNaueno = nowTimeNaueno.getMinutes();
}


const stateDict6 = {
    7:[0,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    8:[0,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    9:[0,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    10:[0,   12, 0, -12, -24, -36, 24,   27, 27, 12],
    11:[0,   0, -12, -24, -36, 24, 12,   27, 27, 12],
    12:[0,   -12, -24, -36, 24, 12, 0,   27, 27, 12],
    13:[0,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    14:[0,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    15:[0,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    16:[0,   12, 0, -12, -24, -36, 24,   27, 27, 12],
    17:[0,   0, -12, -24, -36, 24, 12,   27, 27, 12],
    18:[0,   -12, -24, -36, 24, 12, 0,   27, 27, 12],
    19:[0,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    20:[0,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    21:[0,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    }

function jumpStateHour(){
    //nowTimeDef();
    //unyouDnmList = eval('stateDict' +String(honsen))[nowHourNaueno];
    unyouDnmList = Array.from(stateDict6[nowHourNaueno]);
    console.log(nowHourNaueno+'nHN');
    console.log(stateDict6[20]+'sD62020');
    //console.log(stateDict6[Number(nowHourNaueno)]+'sD6');
    console.log(unyouDnmList+'uDL');
    console.log('------------------------');
}

function add1min(){
    for(let [i, fig] of unyouDnmList.entries()){
        if(1 <= i && i <= honsen){
            if(honsen == 6){
                if(fig < 36){
                    fig += 1;
                }else{
                    fig = fig*(-1)+1;
            }}else{ //honsen = 7
                if(fig == 42){
                    fig = fig*(-1)+1;
                }else if(fig == -36){
                    if(kmkrPltf == 3){
                        kmkrPltf = 4;
                    }else{
                        kmkrPltf = 3;
                    }fig += 1;
                }else{
                    fig += 1;
        }}}
        unyouDnmList[i] = fig
}console.log(stateDict6[20]+'sD62020add1111');}






// <ここから処理を起動しはじめるゾーン>

function starter(){
jumpStateHour()
Array.from(Array(nowMinNaueno).keys()).forEach(i => add1min());

console.log(String(unyouDnmList) + "now;init-uDL");
console.log(stateDict6[20]+'sD62020addadd');
}
// 起動時の処理 (とスケジューラーの起動:今使ってない)
nowTimeDef();
starter();
/*
for(i=0; i<nowMinNaueno; i++){
  add1min();
console.log(String(unyouDnmList) + "now;init");
}
*/
/*
if(7 <= nowHourNaueno <= 20){
  jumpStateHour()
  for(i=0; i<nowMinNaueno; i++){
    add1min();
  console.log(String(unyouDnmList) + "now;init");
  }
}else if(5 <= nowHourNaueno <= 6){
  jump_state_minute();
}else(21 <= nowHour <= 23){
  jump_state_minute();
}
*/






// <背景と電車の描画のためのクラス>
const wWidth = WIDTH;
const wHeight = wWidth / 16 * 9;  /*450*/
const wMid = wHeight / 2;  /*225*/
const baseExpander = 20
const baseLength = 36 * baseExpander;  /*720*/
const baseX = (wWidth - baseLength) / 2;  /*40*/
const basePhase = 4;

function baser(eki36){
  return Number(eki36) * baseExpander + baseX
}

function iti(i) {
  let eki_abs = 0;
  if(Math.abs(unyouDnmList[i]) > 36){
    eki_abs = baser(36);
  }else{
    eki_abs = baser(Math.abs(unyouDnmList[i]));
  }
  return eki_abs;
}

function umiYama(i){
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
    }else{ //unyouDnmList[i-1+1] < 0
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
    this.sx = baser(eki36)-(basePhase+basePhase/4);
    this.sy = wMid-basePhase;
    this.ex = baser(eki36)+(basePhase+basePhase/4);
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
    this.cx = baser(eki36)
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
    this.sx = baser(eki36);
    this.sy = wMid-basePhase;
    this.ex = baser(eki36);
    this.ey = wMid+basePhase;
  }
  render(context){
    context.beginPath();
    context.moveTo(this.sx, this.sy);
    context.lineTo(this.ex, this.ey);
    context.stroke();
  }
}

const iro = ['white', 'yellow', 'lightGreen', 'orange', 'violet', 'pink', 'SkyBlue', 'purple']
class Train{
  constructor(i){
    this.i = i;
    this.itiX = iti(i);
    this.itiPlus = iti(i)+(basePhase*2-basePhase/4);
    this.itiMinus = iti(i)-(basePhase*2-basePhase/4);
    this.midY = wMid+((umiYama(i) - wMid)**0)*basePhase;
    this.topY = wMid+((umiYama(i) - wMid)**0)*basePhase*2;
    this.umiYamaY = umiYama(i);
    this.text = eval('un' + i)
  }
  update(){ //thisの寿命ってどんな感じやねん。これ動くの？
    this.itiX = iti(this.i);
    this.itiPlus = iti(this.i)+(basePhase*2-basePhase/4);
    this.itiMinus = iti(this.i)-(basePhase*2-basePhase/4);
    this.midY = wMid+Math.sign(umiYama(this.i) - wMid)*basePhase;
    this.topY = wMid+Math.sign(umiYama(this.i) - wMid)*basePhase*2;
    this.umiYamaY = umiYama(this.i);
  }
  render(context){
    context.beginPath();
    context.fillStyle = iro[this.i];
    context.moveTo(this.itiX, wMid);
    context.lineTo(this.itiMinus, this.midY);
    context.lineTo(this.itiX, this.topY);
    context.lineTo(this.itiPlus, this.midY);
    context.fill();

    context.beginPath();
    context.strokeStyle = 'gray';
    context.moveTo(this.itiX, wMid);
    context.lineTo(this.itiMinus, this.midY);
    context.lineTo(this.itiX, this.topY);
    context.lineTo(this.itiPlus, this.midY);
    context.closePath();
    context.stroke();

    context.fillStyle = 'Black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '12px sans-serif';
    context.font = '12px serif';
    context.fillText(this.text, this.itiX, this.umiYamaY);
  }
}






// <描画要素のインスタンスの作成>
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

const stationObjects = [mainLine, fuji, isgm, yngk, kgnm, shkk, ensm, ksge, kkme, ming, schr, inmr, gkrk, hase, yghm, wddk, kmkr];
const moveObjects = [];

const rangeSS = (start,stop) => {return Array.from(Array(stop-start).keys(), x => x+start)}

rangeSS(1,honsen+1).forEach((num) => moveObjects.push(new Train(num)));






// <繰り返しとか実装>
function draw(){
  context.clearRect(0, 0, WIDTH, HEIGHT);
  moveObjects.forEach((obj) => obj.update());
  stationObjects.forEach((obj) => obj.render(context));
  moveObjects.forEach((obj) => obj.render(context));
}

function loop() {
  nowTimeDef();
  add1min();
  document.querySelector('input[type="time"]').value = String(nowHourNaueno+':'+nowMinNaueno);
  draw();
  //window.requestAnimationFrame((ts) => loop(ts));
}
//window.requestAnimationFrame((ts) => loop(ts));


document.getElementById("timeSelector").addEventListener('change',(times) => {
  if (!document.getElementById("toggleSwitch").checked) {
    onsole.log(times);
    nowTime = new Date('2019'+times);
    timeUpdater();
    starter();
    draw();
  }
}, false);


let intervalID = -1;
document.getElementById("toggleSwitch").addEventListener('change',(e) => {
  e.preventDefault();
  if (!document.getElementById("toggleSwitch").checked) {
    // タイマーが動いている状態でボタンを押すとタイマー停止
    clearInterval(intervalID);
    intervalID = -1;
    return;
  }
  nowTimeDef();
  starter();
  intervalID = window.setInterval(()=>{loop()}, 500);
}, false);


console.log('piyo')
