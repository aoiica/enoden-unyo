'use strict';
// static method化してもいいのでは
//クラスオブジェクト渡して、thisでクラス変数にアクセスする方がすっきりするかも


let minCounter = 0;


function G_setUDLasTheHour(theHourNaueno,honsen,unyouDnmList){
  unyouDnmList = Array.from(eval(`stateDict${String(honsen)}[theHourNaueno]`));
  minCounter = 0+1;
  return unyouDnmList
}


function tomorrowUnyo(){
  core.unnList[1] = document.getElementById('lt5').innerHTML;
  core.unnList[2] = document.getElementById('lt3').innerHTML;
  core.unnList[3] = document.getElementById('lt4').innerHTML;
  core.unnList[4] = document.getElementById('lt6').innerHTML;
  core.unnList[5] = document.getElementById('lt1').innerHTML;
  core.unnList[6] = (document.getElementById('lt2').innerHTML).replace('&gt;','>');
}

function todayUnyo(){
  document.getElementById("unyoInputter").value.split('\n').forEach((currentValue, index)=>{
    // eval(`this.un${String(index+1)} = "${String(currentValue)}";`);
    eval(`core.unnList[${index+1}] = "${String(currentValue)}";`);
  });
}


function G_setUDLadd1min(unyouDnmList,theHourNaueno,theMinNaueno,honsen,kmkrPltf,twDay,theDay){
  // console.log(theHourNaueno,theMinNaueno);
  if(7 <= theHourNaueno && theHourNaueno <= 20){
    todayUnyo();
    // console.log('7-20');
    for(let [i, fig] of unyouDnmList.entries()){
        if(1 <= i && i <= honsen){
            if(honsen == 6){
                if(fig < 35){
                    fig++;
                }else{ //fig=35
                    fig = (fig+1)*(-1);
            }}else{ //honsen = 7
                if(fig == 42){
                    fig = fig*(-1)+1;
                }else if(fig == -36){
                    if(kmkrPltf == 3){
                        kmkrPltf = 4;
                    }else{
                        kmkrPltf = 3;
                    }fig++;
                }else{
                    fig++;
        }}}
        unyouDnmList[i] = fig
      }
  }else if (theHourNaueno == 0){
    if (theMinNaueno <= 5){
      todayUnyo();
      let minCounterZero = ("0"+minCounter).slice(-2);
      const attractedMinList = everyMinDict[`${theHourNaueno}${minCounterZero}`]
      for(let [i, fig] of attractedMinList.entries()){
        if(fig == 204){
          //if(unyouDnmList[i] == -36){
          //  kmkrPltf == 3 ? kmkrPltf = 4: kmkrPltf = 3;}
          unyouDnmList[i]++;
        }else if(fig != unyouDnmList[i]){
          unyouDnmList[i] = fig;
        }
      }
      minCounter++;
    }else{
      tomorrowUnyo();
      unyouDnmList =[3,   -27.1, 12.1, 12, -12, -27.2, -24,   27, 27, 12];
      // [3,   27, -24, -12.1, 12, -12.2, -12,   27, 27, 12];
    }
  }else if (1 <= theHourNaueno && theHourNaueno <= 4){
    tomorrowUnyo();
    console.log('1-4');
    //深夜のあさ江の
    unyouDnmList = [3,   -27.1, 12.1, 12, -12, -27.2, -24,   27, 27, 12];
    // [3,   27, -24, -12.1, 12, -12.2, -12,   27, 27, 12];
    // [3,   -27, 12, 12, -12, -27, -24,  27, 27, 12];
  }else{
    if(theDay != twDay){
      tomorrowUnyo();
    }else{
      todayUnyo();
    }
    // theDay count
    console.log('5-6=21-23');
    let minCounterZero = ("0"+minCounter).slice(-2)
    const attractedMinList = everyMinDict[`${theHourNaueno}${minCounterZero}`]
    for(let [i, fig] of attractedMinList.entries()){
      if(fig == 204){
        //if(unyouDnmList[i] == -36){
        //  kmkrPltf == 3 ? kmkrPltf = 4: kmkrPltf = 3;}
        unyouDnmList[i]++;
      }else if(fig != unyouDnmList[i]){
        unyouDnmList[i] = fig;
      }
    }
    minCounter++;
  }
  return unyouDnmList;
}


function G_setUDLasTheTime(unyouDnmList, theHourNaueno, theMinNaueno,honsen,kmkrPltf,twDay,theDay){
  //これが起点
unyouDnmList = G_setUDLasTheHour(theHourNaueno,honsen,unyouDnmList);
// Array.from(Array(theMinNaueno).keys()).forEach(i => G_setUDLadd1min(unyouDnmList,theHourNaueno,theMinNaueno,honsen));
for(let i of Array(theMinNaueno)){
  unyouDnmList = G_setUDLadd1min(unyouDnmList,theHourNaueno,theMinNaueno,honsen,kmkrPltf,twDay,theDay);
}
// console.log(String(unyouDnmList) + "now;init-uDL");

return unyouDnmList;
}



const stateDict6 = {
    // 5:[1,   12, 12, -36, -12, 24, -24,   27, 27, 12],
    5:[1,   -27.1, 12.1, 12, -12, -27.2, -24,  27, 27, 12],
    6:[1,   -12, -24, -34, 24, -27.2, 0,  27, 27, 12],
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
    22:[2,   12, 0, -12, -24, -36, 24,   27, 27, 12],
    23:[2,   27.1, -14, -12.1, 36, -12.2, 9,   27, 27, 12],

    0:[2,   27.1, -30, -12.1, 12, -12.2, -12,   27, 27, 12],
    1:[3,   -27.1, 12.1, 12, -12, -27.2, -24,   27, 27, 12],
    2:[3,   -27.1, 12.1, 12, -12, -27.2, -24,   27, 27, 12],
    3:[3,   -27.1, 12.1, 12, -12, -27.2, -24,   27, 27, 12],
    4:[3,   -27.1, 12.1, 12, -12, -27.2, -24,   27, 27, 12]
    // [3,   -27.2, 12, 12.1, -12, -27, -24,   27, 27, 12]
    }

const everyMinDict = {
  '500': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '501': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '502': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '503': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '504': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '505': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '506': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '507': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '508': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '509': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '510': [ 1, -27.1, 12.1, 12, -12, -27.2, -24, 27, 27, 12 ],
  '511': [ 1, -27.1, 12.1, 204, -12, -27.2, -24, 27, 27, 12 ],
  '512': [ 1, -27.1, 12.1, 14, -12, -27.2, -24, 27, 27, 12 ],
  '513': [ 1, -27.1, 12.1, 204, -12, -27.2, -24, 27, 27, 12 ],
  '514': [ 1, -27.1, 12.1, 16, -12, -27.2, -24, 27, 27, 12 ],
  '515': [ 1, -27.1, 12.1, 204, -12, -27.2, -24, 27, 27, 12 ],
  '516': [ 1, -27.1, 12.1, 204, -9, -27.2, -24, 27, 27, 12 ],
  '517': [ 1, -27.1, 12.1, 21, 204, -27.2, -24, 27, 27, 12 ],
  '518': [ 1, -27.1, 12.1, 204, 204, -27.2, -24, 27, 27, 12 ],
  '519': [ 1, -27.1, 12.1, 204, -6, -27.2, -24, 27, 27, 12 ],
  '520': [ 1, -27.1, 12.1, 24, 204, -27.2, -24, 27, 27, 12 ],
  '521': [ 1, -27.1, 12.1, 24, -4, -27.2, -24, 27, 27, 12 ],
  '522': [ 1, -27.1, 12.1, 24, -2, -27.2, -24, 27, 27, 12 ],
  '523': [ 1, -27.1, 12, 204, 204, -27.2, -24, 27, 27, 12 ],
  '524': [ 1, -27.1, 204, 27, -0, -27.2, 204, 27, 27, 12 ],
  '525': [ 1, -27.1, 14, 204, 0, -27.2, 204, 27, 27, 12 ],
  '526': [ 1, -27.1, 204, 30, 0, -27.2, -21, 27, 27, 12 ],
  '527': [ 1, -27.1, 16, 204, 0, -27.2, 204, 27, 27, 12 ],
  '528': [ 1, -27.1, 204, 32, 0, -27.2, 204, 27, 27, 12 ],
  '529': [ 1, -27.1, 204, 34, 0, -27.2, 204, 27, 27, 12 ],
  '530': [ 1, -27.1, 21, 204, 0, -27.2, -16, 27, 27, 12 ],
  '531': [ 1, -27.1, 204, 36, 0, -27.2, 204, 27, 27, 12 ],
  '532': [ 1, -27.1, 204, 36, 0, -27.2, -14, 27, 27, 12 ],
  '533': [ 1, -27.1, 24, 36, 0, -27.2, 204, 27, 27, 12 ],
  '534': [ 1, -27.1, 24, 36, 0, -27.2, 204, 27, 27, 12 ],
  '535': [ 1, -27.1, 24, 36, 0, -27.2, -12, 27, 27, 12 ],
  '536': [ 1, -27.1, 24, 36, 0, -27.2, -12, 27, 27, 12 ],
  '537': [ 1, -27.1, 204, 36, 2, -27.2, -9, 27, 27, 12 ],
  '538': [ 1, -27.1, 27, 36, 204, -27.2, 204, 27, 27, 12 ],
  '539': [ 1, -27.1, 204, 36, 4, -27.2, 204, 27, 27, 12 ],
  '540': [ 1, -27.1, 204, 36, 204, -27.2, 204, 27, 27, 12 ],
  '541': [ 1, -27.1, 30, 36, 6, -27.2, -6, 27, 27, 12 ],
  '542': [ 1, -27.1, 32, 36, 204, -27.2, -4, 27, 27, 12 ],
  '543': [ 1, -27.1, 204, 36, 204, -27.2, 204, 27, 27, 12 ],
  '544': [ 1, -27, 34, 36, 9, -27.2, -2, 27, 27, 12 ],
  '545': [ 1, -24, -36, 36, 204, -27.2, -0, 27, 27, 12 ],
  '546': [ 1, -24, -36, 36, 12, -27.2, 0, 27, 27, 12 ],
  '547': [ 1, -24, -36, 36, 12, -27.2, 0, 27, 27, 12 ],
  '548': [ 1, 204, -36, 36, 204, -27.2, 0, 27, 27, 12 ],
  '549': [ 1, 204, -34, 36, 14, -27.2, 0, 27, 27, 12 ],
  '550': [ 1, -21, 204, 36, 204, -27.2, 0, 27, 27, 12 ],
  '551': [ 1, 204, -32, 36, 16, -27.2, 0, 27, 27, 12 ],
  '552': [ 1, 204, 204, 36, 204, -27.2, 0, 27, 27, 12 ],
  '553': [ 1, 204, -30, 36, 204, -27.2, 0, 27, 27, 12 ],
  '554': [ 1, -16, 204, 36, 21, -27.2, 0, 27, 27, 12 ],
  '555': [ 1, 204, -27, 36, 204, -27.2, 0, 27, 27, 12 ],
  '556': [ 1, -14, 204, 36, 204, -27.2, 0, 27, 27, 12 ],
  '557': [ 1, 204, 204, 36, 24, -27.2, 0, 27, 27, 12 ],
  '558': [ 1, 204, -24, 36, 24, -27.2, 0, 27, 27, 12 ],
  '559': [ 1, -12, -24, 36, 24, -27.2, 0, 27, 27, 12 ],
  '600': [ 1, -12, 204, -34, 24, -27.2, 0, 27, 27, 12 ],
  '601': [ 1, -9, 204, 204, 204, -27.2, 2, 27, 27, 12 ],
  '602': [ 1, 204, 204, -32, 27, -27.2, 204, 27, 27, 12 ],
  '603': [ 1, 204, -21, 204, 204, -27.2, 4, 27, 27, 12 ],
  '604': [ 1, 204, 204, -30, 204, -27.2, 204, 27, 27, 12 ],
  '605': [ 1, -6, 204, 204, 30, -27.2, 6, 27, 27, 12 ],
  '606': [ 1, -4, -16, -27, 32, -27.2, 204, 27, 27, 12 ],
  '607': [ 1, 204, 204, 204, 204, -27.2, 204, 27, 27, 12 ],
  '608': [ 1, -2, -14, 204, 34, -27.1, 9, 27, 27, 12 ],
  '609': [ 1, -0, 204, -24, -36, 27, 204, 27, 27, 12 ],
  '610': [ 1, 0, -12, -24, -36, 24, 12, 27, 27, 12 ],
  '611': [ 1, 0, -12, 204, -36, 24, 12, 27, 27, 12 ],
  '612': [ 1, 0, -12, 204, 204, 24, 204, 27, 27, 12 ],
  '613': [ 1, 2, -9, -21, -34, 204, 14, 27, 27, 12 ],
  '614': [ 1, 204, 204, 204, -32, 204, 204, 27, 27, 12 ],
  '615': [ 1, 4, 204, 204, 204, 27, 16, 27, 27, 12 ],
  '616': [ 1, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '617': [ 1, 6, -6, 204, -30, 30, 204, 27, 27, 12 ],
  '618': [ 1, 204, -4, -16, 204, 204, 21, 27, 27, 12 ],
  '619': [ 1, 204, 204, 204, -27, 32, 204, 27, 27, 12 ],
  '620': [ 1, 9, -2, -14, 204, 34, 204, 27, 27, 12 ],
  '621': [ 1, 204, -0, 204, 204, 204, 24, 27, 27, 12 ],
  '622': [ 1, 12, 0, 204, -24, -36, 24, 27, 27, 12 ],
  '623': [ 1, 12, 0, -12, -24, -36, 24, 27, 27, 12 ],
  '624': [ 1, 204, 0, -12, 204, -36, 204, 27, 27, 12 ],
  '625': [ 1, 14, 2, -9, 204, -34, 204, 27, 27, 12 ],
  '626': [ 1, 204, 204, 204, -21, 204, 27, 27, 27, 12 ],
  '627': [ 1, 16, 4, 204, 204, -32, 204, 27, 27, 12 ],
  '628': [ 1, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '629': [ 1, 204, 6, -6, 204, -30, 30, 27, 27, 12 ],
  '630': [ 1, 21, 204, -4, -16, 204, 32, 27, 27, 12 ],
  '631': [ 1, 204, 204, 204, 204, -27, 204, 27, 27, 12 ],
  '632': [ 1, 204, 9, -2, -14, 204, 34, 27, 27, 12 ],
  '633': [ 1, 24, 204, -0, 204, 204, -36, 27, 27, 12 ],
  '634': [ 1, 24, 12, 0, 204, -24, -36, 27, 27, 12 ],
  '635': [ 1, 24, 12, 0, -12, -24, -36, 27, 27, 12 ],
  '636': [ 1, 204, 204, 0, -12, 204, -36, 27, 27, 12 ],
  '637': [ 1, 204, 14, 2, -9, 204, -34, 27, 27, 12 ],
  '638': [ 1, 27, 204, 204, 204, -21, 204, 27, 27, 12 ],
  '639': [ 1, 204, 16, 4, 204, 204, -32, 27, 27, 12 ],
  '640': [ 1, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '641': [ 1, 30, 204, 6, -6, 204, -30, 27, 27, 12 ],
  '642': [ 1, 32, 21, 204, -4, -16, 204, 27, 27, 12 ],
  '643': [ 1, 204, 204, 204, 204, 204, -27, 27, 27, 12 ],
  '644': [ 1, 34, 204, 9, -2, -14, 204, 27, 27, 12 ],
  '645': [ 1, -36, 24, 204, -0, 204, 204, 27, 27, 12 ],
  '646': [ 1, -36, 24, 12, 0, 204, -24, 27, 27, 12 ],
  '647': [ 1, -36, 24, 12, 0, -12, -24, 27, 27, 12 ],
  '648': [ 1, -36, 204, 204, 0, -12, 204, 27, 27, 12 ],
  '649': [ 1, -34, 204, 14, 2, -9, 204, 27, 27, 12 ],
  '650': [ 1, 204, 27, 204, 204, 204, -21, 27, 27, 12 ],
  '651': [ 1, -32, 204, 16, 4, 204, 204, 27, 27, 12 ],
  '652': [ 1, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '653': [ 1, -30, 30, 204, 6, -6, 204, 27, 27, 12 ],
  '654': [ 1, 204, 32, 21, 204, -4, -16, 27, 27, 12 ],
  '655': [ 1, -27, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '656': [ 1, 204, 34, 204, 9, -2, -14, 27, 27, 12 ],
  '657': [ 1, 204, -36, 24, 204, -0, 204, 27, 27, 12 ],
  '658': [ 1, -24, -36, 24, 12, 0, 204, 27, 27, 12 ],
  '659': [ 1, -24, -36, 24, 12, 0, -12, 27, 27, 12 ],

  '2100': [ 2, 204, 204, 0, -12, 204, -36, 27, 27, 12 ],
  '2101': [ 2, 204, 14, 2, -9, 204, -34, 27, 27, 12 ],
  '2102': [ 2, 27, 204, 204, 204, -21, 204, 27, 27, 12 ],
  '2103': [ 2, 204, 16, 4, 204, 204, -32, 27, 27, 12 ],
  '2104': [ 2, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '2105': [ 2, 30, 204, 6, -6, 204, -30, 27, 27, 12 ],
  '2106': [ 2, 32, 21, 204, -4, -16, 204, 27, 27, 12 ],
  '2107': [ 2, 204, 204, 204, 204, 204, -27, 27, 27, 12 ],
  '2108': [ 2, 34, 204, 9, -2, -14, 204, 27, 27, 12 ],
  '2109': [ 2, -36, 24, 204, -0, 204, 204, 27, 27, 12 ],
  '2110': [ 2, -36, 24, 12, 0, 204, -24, 27, 27, 12 ],
  '2111': [ 2, -36, 24, 12, 0, -12, -24, 27, 27, 12 ],
  '2112': [ 2, -36, 204, 204, 0, -12, 204, 27, 27, 12 ],
  '2113': [ 2, -34, 204, 14, 2, -9, 204, 27, 27, 12 ],
  '2114': [ 2, 204, 27, 204, 204, 204, -21, 27, 27, 12 ],
  '2115': [ 2, -32, 204, 16, 4, 204, 204, 27, 27, 12 ],
  '2116': [ 2, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '2117': [ 2, -30, 30, 204, 6, -6, 204, 27, 27, 12 ],
  '2118': [ 2, 204, 32, 21, 204, -4, -16, 27, 27, 12 ],
  '2119': [ 2, -27, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '2120': [ 2, 204, 34, 204, 9, -2, -14, 27, 27, 12 ],
  '2121': [ 2, 204, -36, 24, 204, -0, 204, 27, 27, 12 ],
  '2122': [ 2, -24, -36, 24, 12, 0, 204, 27, 27, 12 ],
  '2123': [ 2, -24, -36, 24, 12, 0, -12, 27, 27, 12 ],
  '2124': [ 2, 204, -36, 204, 204, 0, -12, 27, 27, 12 ],
  '2125': [ 2, 204, -34, 204, 14, 2, -9, 27, 27, 12 ],
  '2126': [ 2, -21, 204, 27, 204, 204, 204, 27, 27, 12 ],
  '2127': [ 2, 204, -32, 204, 16, 4, 204, 27, 27, 12 ],
  '2128': [ 2, 204, 204, 204, 204, 204, 204, 27, 27, 12 ],
  '2129': [ 2, 204, -30, 30, 204, 6, -6, 27, 27, 12 ],
  '2130': [ 2, -16, 204, 32, 21, 204, -4, 27, 27, 12 ],
  '2131': [ 2, 204, -27, 204, 204, 204, 204, 27, 27, 12 ],
  '2132': [ 2, -14, 204, 34, 204, 9, -2, 27, 27, 12 ],
  '2133': [ 2, 204, 204, -36, 24, 204, -0, 27, 27, 12 ],
  '2134': [ 2, 204, -24, -36, 24, 12, 0, 27, 27, 12 ],
  '2135': [ 2, -12, -24, -36, 24, 12, 0, 27, 27, 12 ],
  '2136': [ 2, -12, -24, -36, 204, 12, 0, 27, 27, 12 ],
  '2137': [ 2, -12, 204, -34, 204, 204, 0, 27, 27, 12 ],
  '2138': [ 2, -9, 204, 204, 27, 14, 2, 27, 27, 12 ],
  '2139': [ 2, 204, -21, -32, 204, 204, 204, 27, 27, 12 ],
  '2140': [ 2, 204, 204, 204, 204, 16, 4, 27, 27, 12 ],
  '2141': [ 2, 204, 204, -30, 30, 204, 204, 27, 27, 12 ],
  '2142': [ 2, -6, 204, 204, 32, 204, 6, 27, 27, 12 ],
  '2143': [ 2, -4, -16, -27, 204, 21, 204, 27, 27, 12 ],
  '2144': [ 2, 204, 204, 204, 34, 204, 204, 27, 27, 12 ],
  '2145': [ 2, -2, -14, 204, -36, 204, 9, 27, 27, 12 ],
  '2146': [ 2, -0, 204, -24, -36, 24, 204, 27, 27, 12 ],
  '2147': [ 2, 0, 204, -24, -36, 24, 12, 27, 27, 12 ],
  '2148': [ 2, 0, -12, -24, -36, 204, 12, 27, 27, 12 ],
  '2149': [ 2, 0, -12, 204, -34, 204, 204, 27, 27, 12 ],
  '2150': [ 2, 2, -9, 204, 204, 27, 14, 27, 27, 12 ],
  '2151': [ 2, 204, 204, -21, -32, 204, 204, 27, 27, 12 ],
  '2152': [ 2, 4, 204, 204, 204, 204, 16, 27, 27, 12 ],
  '2153': [ 2, 204, 204, 204, -30, 30, 204, 27, 27, 12 ],
  '2154': [ 2, 6, -6, 204, 204, 32, 204, 27, 27, 12 ],
  '2155': [ 2, 204, -4, -16, -27, 204, 21, 27, 27, 12 ],
  '2156': [ 2, 204, 204, 204, 204, 34, 204, 27, 27, 12 ],
  '2157': [ 2, 9, -2, -14, 204, -36, 204, 27, 27, 12 ],
  '2158': [ 2, 204, -0, 204, -24, -36, 24, 27, 27, 12 ],
  '2159': [ 2, 12, 0, 204, -24, -36, 24, 27, 27, 12 ],
  '2200': [ 2, 12, 0, -12, -24, -36, 24, 27, 27, 12 ],
  '2201': [ 2, 12, 0, -12.1, -24, -36, 24, 27, 27, 12 ],
  '2202': [ 2, 204, 0, -12.1, 204, -36, 204, 27, 27, 12 ],
  '2203': [ 2, 14, 2, -12.1, 204, -34, 204, 27, 27, 12 ],
  '2204': [ 2, 204, 204, -12.1, -21, 204, 27, 27, 27, 12 ],
  '2205': [ 2, 16, 4, -12.1, 204, -32, 204, 27, 27, 12 ],
  '2206': [ 2, 204, 204, -12.1, 204, 204, 204, 27, 27, 12 ],
  '2207': [ 2, 204, 6, -12.1, 204, -30, 30, 27, 27, 12 ],
  '2208': [ 2, 21, 204, -12.1, -16, 204, 32, 27, 27, 12 ],
  '2209': [ 2, 204, 204, -12.1, 204, -27, 204, 27, 27, 12 ],
  '2210': [ 2, 204, 9, -12.1, -14, 204, 34, 27, 27, 12 ],
  '2211': [ 2, 24, 204, -12.1, 204, 204, -36, 27, 27, 12 ],
  '2212': [ 2, 24, 12, -12.1, 204, -24, -36, 27, 27, 12 ],
  '2213': [ 2, 24, 12, -12.1, -12, -24, -36, 27, 27, 12 ],
  '2214': [ 2, 204, 204, -12.1, -12, 204, -36, 27, 27, 12 ],
  '2215': [ 2, 27, 14, -12.1, -9, 204, -36, 27, 27, 12 ],
  '2216': [ 2, 27.1, 204, -12.1, 204, 204, -36, 27, 27, 12 ],
  '2217': [ 2, 27.1, 16, -12.1, 204, -21, -34, 27, 27, 12 ],
  '2218': [ 2, 27.1, 204, -12.1, 204, 204, 204, 27, 27, 12 ],
  '2219': [ 2, 27.1, 204, -12.1, -6, 204, -32, 27, 27, 12 ],
  '2220': [ 2, 27.1, 21, -12.1, -4, -16, 204, 27, 27, 12 ],
  '2221': [ 2, 27.1, 204, -12.1, 204, 204, -30, 27, 27, 12 ],
  '2222': [ 2, 27.1, 204, -12.1, -2, -14, 204, 27, 27, 12 ],
  '2223': [ 2, 27.1, 24, -12.1, -0, 204, -27, 27, 27, 12 ],
  '2224': [ 2, 27.1, 24, -12.1, 0, 204, 204, 27, 27, 12 ],
  '2225': [ 2, 27.1, 24, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2226': [ 2, 27.1, 24, -12.1, 0, -12.2, -24, 27, 27, 12 ],
  '2227': [ 2, 27.1, 204, -12.1, 2, -12.2, -24, 27, 27, 12 ],
  '2228': [ 2, 27.1, 204, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2229': [ 2, 27.1, 27, -12.1, 4, -12.2, 204, 27, 27, 12 ],
  '2230': [ 2, 27.1, 204, -12.1, 204, -12.2, -21, 27, 27, 12 ],
  '2231': [ 2, 27.1, 30, -12.1, 6, -12.2, 204, 27, 27, 12 ],
  '2232': [ 2, 27.1, 204, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2233': [ 2, 27.1, 32, -12.1, 204, -12.2, -16, 27, 27, 12 ],
  '2234': [ 2, 27.1, 34, -12.1, 9, -12.2, 204, 27, 27, 12 ],
  '2235': [ 2, 27.1, 204, -12.1, 204, -12.2, -14, 27, 27, 12 ],
  '2236': [ 2, 27.1, -36, -12.1, 12, -12.2, 204, 27, 27, 12 ],
  '2237': [ 2, 27.1, -36, -12.1, 12, -12.2, 204, 27, 27, 12 ],
  '2238': [ 2, 27.1, -36, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '2239': [ 2, 27.1, -36, -12.1, 204, -12.2, -12, 27, 27, 12 ],
  '2240': [ 2, 27.1, -36, -12.1, 14, -12.2, -9, 27, 27, 12 ],
  '2241': [ 2, 27.1, -36, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2242': [ 2, 27.1, -34, -12.1, 16, -12.2, 204, 27, 27, 12 ],
  '2243': [ 2, 27.1, 204, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2244': [ 2, 27.1, -32, -12.1, 204, -12.2, -6, 27, 27, 12 ],
  '2245': [ 2, 27.1, 204, -12.1, 21, -12.2, -4, 27, 27, 12 ],
  '2246': [ 2, 27.1, -30, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2247': [ 2, 27.1, 204, -12.1, 204, -12.2, -2, 27, 27, 12 ],
  '2248': [ 2, 27.1, -27, -12.1, 24, -12.2, -0, 27, 27, 12 ],
  '2249': [ 2, 27.1, 204, -12.1, 24, -12.2, 0, 27, 27, 12 ],
  '2250': [ 2, 27.1, 204, -12.1, 24, -12.2, 0, 27, 27, 12 ],
  '2251': [ 2, 27.1, -24, -12.1, 24, -12.2, 0, 27, 27, 12 ],
  '2252': [ 2, 27.1, -24, -12.1, 204, -12.2, 0, 27, 27, 12 ],
  '2253': [ 2, 27.1, 204, -12.1, 204, -12.2, 2, 27, 27, 12 ],
  '2254': [ 2, 27.1, 204, -12.1, 27, -12.2, 204, 27, 27, 12 ],
  '2255': [ 2, 27.1, -21, -12.1, 204, -12.2, 4, 27, 27, 12 ],
  '2256': [ 2, 27.1, 204, -12.1, 30, -12.2, 204, 27, 27, 12 ],
  '2257': [ 2, 27.1, 204, -12.1, 204, -12.2, 6, 27, 27, 12 ],
  '2258': [ 2, 27.1, -16, -12.1, 32, -12.2, 204, 27, 27, 12 ],
  '2259': [ 2, 27.1, 204, -12.1, 34, -12.2, 204, 27, 27, 12 ],
  '2300': [ 2, 27.1, 204, -12.1, 204, -12.2, 9, 27, 27, 12 ],
  '2301': [ 2, 27.1, -14, -12.1, -36, -12.2, 204, 27, 27, 12 ],
  '2302': [ 2, 27.1, 204, -12.1, -36, -12.2, 12, 27, 27, 12 ],
  '2303': [ 2, 27.1, -12, -12.1, -36, -12.2, 12, 27, 27, 12 ],
  '2304': [ 2, 27.1, -12, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2305': [ 2, 27.1, -12, -12.1, -34, -12.2, 204, 27, 27, 12 ],
  '2306': [ 2, 27.1, -9, -12.1, -32, -12.2, 14, 27, 27, 12 ],
  '2307': [ 2, 27.1, 204, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2308': [ 2, 27.1, 204, -12.1, 204, -12.2, 16, 27, 27, 12 ],
  '2309': [ 2, 27.1, 204, -12.1, -30, -12.2, 204, 27, 27, 12 ],
  '2310': [ 2, 27.1, -6, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2311': [ 2, 27.1, -4, -12.1, -27, -12.2, 21, 27, 27, 12 ],
  '2312': [ 2, 27.1, 204, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2313': [ 2, 27.1, -2, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2314': [ 2, 27.1, -0, -12.1, -24, -12.2, 24, 27, 27, 12 ],
  '2315': [ 2, 27.1, 0, -12.1, -24, -12.2, 24, 27, 27, 12 ],
  '2316': [ 2, 27.1, 0, -12.1, -24, -12.2, 204, 27, 27, 12 ],
  '2317': [ 2, 27.1, 0, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2318': [ 2, 27.1, 0, -12.1, 204, -12.2, 27, 27, 27, 12 ],
  '2319': [ 2, 27.1, 2, -12.1, -21, -12.2, 204, 27, 27, 12 ],
  '2320': [ 2, 27.1, 204, -12.1, 204, -12.2, 30, 27, 27, 12 ],
  '2321': [ 2, 27.1, 4, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2322': [ 2, 27.1, 204, -12.1, -16, -12.2, 32, 27, 27, 12 ],
  '2323': [ 2, 27.1, 6, -12.1, 204, -12.2, 34, 27, 27, 12 ],
  '2324': [ 2, 27.1, 204, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2325': [ 2, 27.1, 204, -12.1, -14, -12.2, -36, 27, 27, 12 ],
  '2326': [ 2, 27.1, 9, -12.1, 204, -12.2, -36, 27, 27, 12 ],
  '2327': [ 2, 27.1, 204, -12.1, -12, -12.2, -36, 27, 27, 12 ],
  '2328': [ 2, 27.1, 12, -12.1, -12, -12.2, -36, 27, 27, 12 ],
  '2329': [ 2, 27.1, 12, -12.1, 204, -12.2, -36, 27, 27, 12 ],
  '2330': [ 2, 27.1, 204, -12.1, -9, -12.2, -36, 27, 27, 12 ],
  '2331': [ 2, 27.1, 204, -12.1, 204, -12.2, -36, 27, 27, 12 ],
  '2332': [ 2, 27.1, 14, -12.1, 204, -12.2, -36, 27, 27, 12 ],
  '2333': [ 2, 27.1, 204, -12.1, -6, -12.2, -34, 27, 27, 12 ],
  '2334': [ 2, 27.1, 16, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2335': [ 2, 27.1, 204, -12.1, -4, -12.2, -32, 27, 27, 12 ],
  '2336': [ 2, 27.1, 204, -12.1, -2, -12.2, 204, 27, 27, 12 ],
  '2337': [ 2, 27.1, 21, -12.1, 204, -12.2, -30, 27, 27, 12 ],
  '2338': [ 2, 27.1, 204, -12.1, -0, -12.2, 204, 27, 27, 12 ],
  '2339': [ 2, 27.1, 204, -12.1, 0, -12.2, -27, 27, 27, 12 ],
  '2340': [ 2, 27.1, 24, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2341': [ 2, 27.1, 24, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2342': [ 2, 27.1, 24, -12.1, 0, -12.2, -24, 27, 27, 12 ],
  '2343': [ 2, 27.1, 204, -12.1, 0, -12.2, -24, 27, 27, 12 ],
  '2344': [ 2, 27.1, 204, -12.1, 0, -12.2, -24, 27, 27, 12 ],
  '2345': [ 2, 27.1, 27, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2346': [ 2, 27.1, 204, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2347': [ 2, 27.1, 204, -12.1, 0, -12.2, -21, 27, 27, 12 ],
  '2348': [ 2, 27.1, 30, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2349': [ 2, 27.1, 32, -12.1, 0, -12.2, 204, 27, 27, 12 ],
  '2350': [ 2, 27.1, 204, -12.1, 2, -12.2, -16, 27, 27, 12 ],
  '2351': [ 2, 27.1, 34, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2352': [ 2, 27.1, -36, -12.1, 4, -12.2, -14, 27, 27, 12 ],
  '2353': [ 2, 27.1, -36, -12.1, 204, -12.2, 204, 27, 27, 12 ],
  '2354': [ 2, 27.1, -36, -12.1, 6, -12.2, 204, 27, 27, 12 ],
  '2355': [ 2, 27.1, -36, -12.1, 204, -12.2, -12, 27, 27, 12 ],
  '2356': [ 2, 27.1, -34, -12.1, 204, -12.2, -12, 27, 27, 12 ],
  '2357': [ 2, 27.1, 204, -12.1, 9, -12.2, -12, 27, 27, 12 ],
  '2358': [ 2, 27.1, -32, -12.1, 204, -12.2, -12, 27, 27, 12 ],
  '2359': [ 2, 27.1, 204, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '000': [ 1, 27.1, -30, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '001': [ 1, 27.1, 204, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '002': [ 1, 27.1, -27, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '003': [ 1, 27.1, 204, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '004': [ 1, 27.1, 204, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '005': [ 1, 27.1, -24, -12.1, 12, -12.2, -12, 27, 27, 12 ],
  '006': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '007': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '008': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '009': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '010': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ]
}











