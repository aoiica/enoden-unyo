'use strict';



function N_drawTimeInHTML(theHourZero,theMinZero,theTime){
  // シミュ時刻の反映
  if(isFinite(theTime.getTime())){
  document.getElementById('timeSelector').value = `${theHourZero}:${theMinZero}`;
  }
}


function N_forcast(unnList){
  // 右上のシミュ図反映
  let lineList = unnList;
  let tDList=[];
  //車両の文字列から切り出してリストに突っ込む
  lineList.forEach((line, i) => {
    tDList.push(
      [
      line.match(/\]\d*F/)?line.match(/\]\d*F/)[0].match(/\d*F/)[0]:null
      ,line.match(/\+\d*F/)?line.match(/\+\d*F/)[0].match(/\d*F/)[0]:null
      ]
    );
  });

  for (let i of [1,3,5]){
    if (tDList[i][1] == null){
      tDList[i][1] = tDList[i][0];
      tDList[i][0] = null;
    };
  };

  document.getElementById('lr1').innerHTML = `f1812>極開1838>＿＿:(${tDList[1][0]})f`
  document.getElementById('lr2').innerHTML = `　`
  document.getElementById('lr3').innerHTML = `f1724>極開1750>＿＿:(${tDList[3][0]})f`
  document.getElementById('lr4').innerHTML = `　`
  document.getElementById('lr5').innerHTML = `f1748>極開1814>＿＿:(${tDList[5][0]})f`
  document.getElementById('lr6').innerHTML = `k1836>江開1900>左留:(${tDList[6][1]})k`

  document.getElementById('la1').innerHTML = `f2149>極終__2215>＿＿:(${tDList[1][1]})k`
  document.getElementById('la2').innerHTML = `k2355>稲終__2405>＿＿:(${tDList[2][0]}+${tDList[2][1]})fk`
  document.getElementById('la3').innerHTML = `k2202>江終1_2225>中線:(${tDList[3][1]})k`
  document.getElementById('la4').innerHTML = `f2349>江終4_2358>２番:(${tDList[4][0]}+${tDList[4][1]})fk`
  document.getElementById('la5').innerHTML = `k2136>江終2_2201>右線:(${tDList[5][1]})k`
  document.getElementById('la6').innerHTML = `k2332>江終3_2355>１番:(${tDList[6][0]})f`

  document.getElementById('lt1').innerHTML = `[5]　XF+XF`
  document.getElementById('lt2').innerHTML = `[6]　(${tDList[2][0]}>${tDList[6][1]})+${tDList[2][1]}`
  document.getElementById('lt3').innerHTML = `[2]　${tDList[3][1]}+XF`
  document.getElementById('lt4').innerHTML = `[3]　${tDList[4][0]}+${tDList[4][1]}`
  document.getElementById('lt5').innerHTML = `[1]　XF+${tDList[5][1]}`
  document.getElementById('lt6').innerHTML = `[4]　XF+${tDList[6][0]}`

}