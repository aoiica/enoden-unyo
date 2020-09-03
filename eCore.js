'use strict';

// import eCalc
// import eDraw
// import eFill


class Core {
  constructor(){
// <メインの変数たちと外部との接点>
// 運用メインの変数
  this.unyouDnmList = [0,    1, 2, 3, 4, 5, 6,    7, 8, 9];
// 解説: 不明なのは運用番号0、1-6はいつもの、7はGWのために空き、8は極楽寺で休み、9は江ノ島で休み
// 段落としに楽に変更できるように
  this.honsen = 6;
  this.kmkrPltf = 3;
// 運用バケツ　Fがついていようとなかろうと+だろうと-だろうと、とりあえず突っ込む。あとでよしなにする。
  /*
  this.un1 = '[1]';
  this.un2 = '[2]';
  this.un3 = '[3]';
  this.un4 = '[4]';
  this.un5 = '[5]';
  this.un6 = '[6]';
  this.un7 = '[7]';
  */
  this.unnList = ['0','1','2','3','4','5','6','7'];


// 休みバケツ
  this.yasumi = '';
// なうえの
  this.naueno = 0;
// day
  this.twDay = 0;



// <時刻を変化させる処理>
// 現在時刻
  this.theTime = new Date();
  this.theHourZero = ("0"+this.theTime.getHours()).slice(-2);
  this.theMinZero = ("0"+this.theTime.getMinutes()).slice(-2);

  this.theTimeForComparison = new Date();

  this.theTimeNaueno = new Date();
  this.theTimeNaueno.setMinutes(this.theTime.getMinutes() - this.naueno);
  this.theHourNaueno = this.theTimeNaueno.getHours();
  this.theMinNaueno = this.theTimeNaueno.getMinutes();

  this.theDay = this.theTime.getDate();
  }


  core_begin(){
    // <ここから処理を起動しはじめるゾーン>
    // 起動時の処理
    drawInit(this.unyouDnmList,this.unnList,this.honsen,this.kmkmkrPltf);
    this.G_setTheTimeNow();
    this.G_pourTheTimeIntoNaueno();
    this.G_yahooRealTime(); //here
    N_forcast(this.unnList);

    this.unyouDnmList = G_setUDLasTheTime(this.unyouDnmList,this.theHourNaueno,this.theMinNaueno,this.honsen,this.kmkrPltf,core.twDay,core.theDay); //eCalc

    N_draw(this.unyouDnmList,this.unnList,this.kmkrPltf);
    N_drawTimeInHTML(this.theHourZero,this.theMinZero,this.theTime);
  }


  //変数じゃなくて(配列?)オブジェクトに時間数値突っ込めばいいかも
  //そのうちラベルに書き換える
  core_loop(timestamp){ ///G_loop
    if(core.RG_eatherTimesAreNOTSame()){
      core.theTimeForComparison = new Date();
      core.G_setTheTimeNow();
      core.G_pourTheTimeIntoNaueno();

      core.unyouDnmList = G_setUDLadd1min(core.unyouDnmList,core.theHourNaueno,core.theMinNaueno,core.honsen,core.kmkrPltf); //eCalc

      N_draw(core.unyouDnmList,core.unnList,core.kmkrPltf); //eDraw
      N_drawTimeInHTML(core.theHourZero,core.theMinZero,core.theTime); //eFill
    }
    if(!document.getElementById("toggleSwitch").checked){
      Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
        item.disabled = false;
      });
      return;
    }
    N_drawTimeInHTML(core.theHourZero,core.theMinZero,core.theTime); //eFill
    window.requestAnimationFrame(core.core_loop);
    //requestId = window.requestAnimationFrame(this.core_loop); //戻り値を取得
    //window.cancelAnimationFrame(requestId);
  };


  core_fastLoop(timestamp){ ///G_fastLoop
    if (!document.getElementById("toggleSwitch").checked) {
      core.G_setTheTimeNow();

      let ymdhm = `2019/${String(core.theTime.getMonth())}/${String(core.theTime.getDate())} ${String(document.getElementById("timeSelector").value)}`;

      core.theTime = new Date(ymdhm);
      if(isFinite(core.theTime.getTime())){
        core.theTime.setMinutes(core.theTime.getMinutes()+1);

        core.G_pourTheTimeIntoNaueno();

        core.unyouDnmList =  G_setUDLasTheTime(core.unyouDnmList, core.theHourNaueno,core.theMinNaueno,core.honsen,core.kmkrPltf,core.twDay,core.theDay);

        N_draw(core.unyouDnmList,core.unnList,core.kmkrPltf); //eDraw
      }
    }

    if(!document.getElementById("fastForward").checked){
      Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
        item.disabled = false;
      });
      return;
    }
    N_drawTimeInHTML(core.theHourZero,core.theMinZero,core.theTime); //eFill
    setTimeout(core.core_fastLoop, 500);
    //window.requestAnimationFrame(this.core_loop);
    //requestId = window.requestAnimationFrame(this.core_loop); //戻り値を取得
    //window.cancelAnimationFrame(requestId);
  };


  G_setTheTimeNow(){
    this.theTime = new Date();
  }


  G_pourTheTimeIntoNaueno(){
    this.theHourZero = ("0"+this.theTime.getHours()).slice(-2);
    this.theMinZero = ("0"+this.theTime.getMinutes()).slice(-2);

    this.theTimeNaueno = this.theTime;
    this.theTimeNaueno.setMinutes(this.theTime.getMinutes() - this.naueno);
    this.theHourNaueno = this.theTimeNaueno.getHours();
    this.theMinNaueno = this.theTimeNaueno.getMinutes();
  }


  RG_eatherTimesAreNOTSame(){
    this.G_setTheTimeNow();
    let TTC = this.theTimeForComparison.getMinutes();
    let TT = this.theTime.getMinutes();
    return !(TTC == TT);
  }


  G_yahooRealTime(){
    /*
    try{this.un1=uny1} catch(e){}
    try{this.un2=uny2} catch(e){}
    try{this.un3=uny3} catch(e){}
    try{this.un4=uny4} catch(e){}
    try{this.un5=uny5} catch(e){}
    try{this.un6=uny6} catch(e){}
    */
    try{this.unnList[1]=uny1} catch(e){}
    try{this.unnList[2]=uny2} catch(e){}
    try{this.unnList[3]=uny3} catch(e){}
    try{this.unnList[4]=uny4} catch(e){}
    try{this.unnList[5]=uny5} catch(e){}
    try{this.unnList[6]=uny6} catch(e){}

    for (let i of [1,2,3,4,5,6]){
      //全パンHTMLデコード対応
      this.unnList[i] = (this.unnList[i]).replace('&gt;','>').replace('&lt;','<');
    }

    try{this.twDay=twDay} catch(e){}

    let unyoText = `${this.unnList[1]}\n${this.unnList[2]}\n${this.unnList[3]}\n${this.unnList[4]}\n${this.unnList[5]}\n${this.unnList[6]}`
    document.getElementById("unyoInputter").value = unyoText

    /* CROSS ORIGIN があるのでブラウザがではなく、サーバーで書き出したファイルを読む
    fetch('https://search.yahoo.co.jp/realtime/search?p=%23%E6%B1%9F%E3%83%8E%E9%9B%BB%E9%81%8B%E7%94%A8', {
      mode: 'cors' //'no-cors' //
    })
    .then(res => res.text())
    .then(body => console.log(body));
    */
    /*
    var request = require('request');

    request('https://search.yahoo.co.jp/realtime/search?p=%23%E6%B1%9F%E3%83%8E%E9%9B%BB%E9%81%8B%E7%94%A8', function (error, response, body) {
      if (!error && response.statusCode == 200) {
          //console.log(body);
          un1 = body.match(/\[1\]\S+(\s|\n)/g)[0];
          un2 = body.match(/\[2\]\S+(\s|\n)/g)[0];
          un3 = body.match(/\[3\]\S+(\s|\n)/g)[0];
          un4 = body.match(/\[4\]\S+(\s|\n)/g)[0];
          un5 = body.match(/\[5\]\S+(\s|\n)/g)[0];
          un6 = body.match(/\[6\]\S+(\s|\n)/g)[0];
      };
      N_forcast(unnList);
    });
    */
  }
}






const core = new Core();
core.core_begin();
core.core_loop();


document.getElementById("nauenoSetter").addEventListener('input',() => {
  naueno = Number(document.getElementById("nauenoSetter").value);
}, false);


document.getElementById("unyoInputter").addEventListener('input',() => {
  //テキストエリアの文字をunxにそれぞれ突っ込んでる
  document.getElementById("unyoInputter").value.split('\n').forEach((currentValue, index)=>{
    // eval(`this.un${String(index+1)} = "${String(currentValue)}";`);
    eval(`core.unnList[${index+1}] = "${String(currentValue)}";`);
  });

  N_draw(core.unyouDnmList,core.unnList,core.kmkrPltf);
  N_forcast(core.unnList);
}, false);


document.getElementById("timeSelector").addEventListener('input',() => {
  if (!document.getElementById("toggleSwitch").checked) {
    core.G_setTheTimeNow();

    let ymdhm = `2019/${String(core.theTime.getMonth())}/${String(core.theTime.getDate())} ${String(document.getElementById("timeSelector").value)}`;

    core.theTime = new Date(ymdhm);
    if(isFinite(core.theTime.getTime())){
      core.G_pourTheTimeIntoNaueno();
      // console.log(core.unyouDnmList);
      core.unyouDnmList = G_setUDLasTheTime(core.unyouDnmList,core.theHourNaueno,core.theMinNaueno,core.honsen,core.kmkrPltf,core.twDay,core.theDay);

      N_draw(core.unyouDnmList,core.unnList,core.kmkrPltf);
    }
  }
}, false);


document.getElementById("toggleSwitch").addEventListener('change',(e) => {
  e.preventDefault();
  if (document.getElementById("toggleSwitch").checked) {
    Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
      item.disabled = true;
    });
    document.getElementById("fastForward").checked = false;

    this.theTimeForComparison = new Date();
    core.G_setTheTimeNow();
    core.G_pourTheTimeIntoNaueno();
    core.unyouDnmList = G_setUDLasTheTime(core.unyouDnmList,core.theHourNaueno,core.theMinNaueno,core.honsen,core.kmkrPltf,core.twDay,core.theDay);

    N_draw(core.unyouDnmList,core.unnList,core.kmkrPltf);
    N_drawTimeInHTML(core.theHourZero,core.theMinZero,core.theTime);

    window.requestAnimationFrame(core.core_loop);
  };
}, false);


document.getElementById("fastForward").addEventListener('change',(e) => {
  e.preventDefault();
  if (document.getElementById("fastForward").checked) {
    Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
      item.disabled = true;
    });
    document.getElementById("fastForward").disabled = false;
    window.requestAnimationFrame(core.core_fastLoop);
  };
}, false);


function shiftMin(min) {
  console.log('shiftMin');
  //theTime = new Date(ymdhm);
  core.theTime.setMinutes(core.theTime.getMinutes()+min);

  core.G_pourTheTimeIntoNaueno();

  core.unyouDnmList = G_setUDLasTheTime(core.unyouDnmList,core.theHourNaueno,core.theMinNaueno,core.honsen,core.kmkrPltf,core.twDay,core.theDay);

  N_draw(core.unyouDnmList,core.unnList,core.kmkrPltf);
  N_drawTimeInHTML(core.theHourZero,core.theMinZero,core.theTime);
}

































