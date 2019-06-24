'use strict';



const xlsx = require('xlsx');
const utils = xlsx.utils; // XLSX.utilsのalias
let workbook = xlsx.readFile('zenjikoku.xlsx');

let sheetNames = workbook.SheetNames;
console.log(sheetNames);

// Sheet1読み込み
let sheet1 = workbook.Sheets['シート1'];


let objects = [];

class Obj{
  constructor(reshabango, unyobango, updw, itiTimes){
    this.id = reshabango;
    this.car = unyobango;
    this.updw = updw;
    this.itiTimes = itiTimes;
  }
  citationTimeFromObj(){
    for(let time of this.itiTime){
      zenJikokuYouso.push([itiTime.iti, itiTime.sen, itiTime.time, this.car]);
    }
  }
}

class itiTime{
  constructor(iti, time, track){
    this.iti = iti;
    this.time = time;
    this.track = track;
  }
}



const extractFromRaw = (args)=>{

let startRowNum = utils.decode_row(args.startRow);
let rowNum = startRowNum;
let endRowNum = utils.decode_row(args.endRow);

while(rowNum <= endRowNum){
  let itiTimes = [];

  let updw = sheet1[args.updwCell].v;
  let updwOne = updw / Math.abs(updw); //絶対値1にする

  let startColNum = utils.decode_col(args.startCol);
  let colNum = startColNum;
  let endColNum = utils.decode_col(args.endCol);
  while(colNum <= endColNum){
    if(sheet1[`${utils.encode_col(colNum)}${utils.encode_row(rowNum)}`] == null){
      colNum +=1;
      continue;
    }

    let time = sheet1[`${utils.encode_col(colNum)}${utils.encode_row(rowNum)}`].v;
    let iti = sheet1[`${utils.encode_col(colNum)}${args.itiRow}`].v;

    itiTimes.push(new itiTime(iti, time, updwOne))
    colNum +=1;
  }
  let reshabango = sheet1[`${args.reshabangoCol}${utils.encode_row(rowNum)}`].v;
  let unyobango = sheet1[`${args.unyobangoCol}${utils.encode_row(rowNum)}`].v;
  let unyobangoNum = unyobango.match(/\d/)[0]

  objects.push(new Obj(reshabango, unyobangoNum, updwOne, itiTimes))
  rowNum +=1;
}
}


/*のぼり=F*/
extractFromRaw({
  startCol: 'V',
  startRow: '5',
  endCol: 'AK',
  endRow: '94',
  updwCell: 'T3',
  itiRow: '3',
  reshabangoCol: 'T',
  unyobangoCol: 'U'
});
/*くだり=K*/
extractFromRaw({
  startCol: 'C',
  startRow: '5',
  endCol: 'R',
  endRow: '93',
  updwCell: 'A3',
  itiRow: '3',
  reshabangoCol: 'A',
  unyobangoCol: 'B'
});


//console.log(objects);
//ここまでが下ごしらえで、列車番号ごとのデータがobjectsにぶち込んである






//ここからは作りたい物によって処理変える
//全時刻オブジェクトを生成する
let zenJikokuYouso = {};
for(let t=5; t<=23; t++){
  for(let m=0; m<=59; m++){
    let m0 = String(m).padStart(2, '0');
    zenJikokuYouso[`${t}${m0}`] = [];
  }
}
  for(let m=0; m<=10; m++){
    zenJikokuYouso[`${m}`] = [];
  }


//列車番号ごとデータを取り出し加工しながら全時刻辞書に突っ込む
const ekiDictE = {0:'0', 1:'2', 2:'4', 3:'6', 4:'9', 5:'12', 6:'14', 7:'16', 8:'18', 9:'21', 10:'24', 11:'27', 12:'30', 13:'32', 14:'34', 15:'36'}
for(let obj of objects){
  for(let itiTime of obj.itiTimes){
    let itiAbs = itiTime.iti
    //36で整理するかは好み
    let iti36abs = ekiDictE[itiAbs];
    let iti36 = iti36abs * obj.updw;
    zenJikokuYouso[itiTime.time][obj.car] = iti36;
  }
}
//51Bの修正
zenJikokuYouso[609][5] = -27;
//ここまでで第一段階


//とりあえず埋める1：1~6の空きデータをよしなにする
//全時刻辞書のインデックスとして使う時間のリストを作る。0時台のために
let timeArray =[];
for(let t=5; t<=23; t++){
  for(let m=0; m<=59; m++){
    let m0 = String(m).padStart(2, '0');
    timeArray.push(`${t}${m0}`);
  }
}
  for(let m=0; m<=10; m++){
    timeArray.push(`${m}`);
  }
//めんどくさいやつ
for(let col=1; col<=6; col++){//運用番号分次のループを繰り返す
  for(let [row, time] of timeArray.entries()){//時間で縦に並べて上から下まで処理
    //インデックスを使い、あとで場合分けに使う値と前後の値を取り出しておく
    let ruct = zenJikokuYouso[time][col];

    let rowM1 = row-1;
    let ructM1 = null;
    if(timeArray[rowM1]){
      ructM1 = zenJikokuYouso[timeArray[rowM1]][col];
    }
    let rowDown = row+1;
    let ructDown = null;
    if(timeArray[rowDown]){
      ructDown = zenJikokuYouso[timeArray[rowDown]][col];
    }

    //ガーって下まで
    while(!Number.isFinite(ructDown)){
      rowDown +=1;
      if(timeArray[rowDown] == null){
        ructDown = null;
        break;
      }
      ructDown = zenJikokuYouso[timeArray[rowDown]][col];
    }

    //場合分けして埋める
    if(ructM1 == null){
      zenJikokuYouso[time][col] = ructDown;
    }else if(ruct == null){
      if(Math.abs(ructM1) == Math.abs(ructDown)){
        zenJikokuYouso[time][col] = ructDown;
      }else if(ructDown == null){
        zenJikokuYouso[time][col] = ructM1;
      }else{
        zenJikokuYouso[time][col] = 204;
      }
    }
  }
}


//とりあえず埋める2：0と789を埋める
for(let time of timeArray){
  if(time <= 660){
    zenJikokuYouso[time][0] = 1;
  }else if(time >= 2100 || time <= 10){
    zenJikokuYouso[time][0] = 2;
  }else{
    zenJikokuYouso[time][0] = 0;
  }

  zenJikokuYouso[time][7] = 27;
  zenJikokuYouso[time][8] = 27;
  zenJikokuYouso[time][9] = 12;
}


//細かな修正
//昼の鎌倉3番線停車
for(let col=1; col<=6; col++){
  for(let time of timeArray){
    if(Math.abs(zenJikokuYouso[time][col]) == 36){
      zenJikokuYouso[time][col] = -36;
    }
  }
}
//朝の鎌倉24分4番線停車
for(let [row, time] of timeArray.entries()){
  if(time == 531){
    zenJikokuYouso[timeArray[row]][3] = +36;
    let rowDown = row+1;
    while(Math.abs(zenJikokuYouso[timeArray[rowDown]][3]) == 36){
      zenJikokuYouso[timeArray[rowDown]][3] = +36;
      rowDown +=1;
    }
  }
}
//稲村ヶ崎オーバーラン対策
for(let col=1; col<=6; col++){
  for(let [row, time] of timeArray.entries()){
    if(zenJikokuYouso[timeArray[row]][col] == +21){
      let rowP3P = row+3;
      if(timeArray[rowP3P] != null){
        while(zenJikokuYouso[timeArray[rowP3P]][col] == 204){
          zenJikokuYouso[timeArray[rowP3P]][col] = +24;
          rowP3P +=1;
        }
      }
    }
  }
}


console.log(zenJikokuYouso);
