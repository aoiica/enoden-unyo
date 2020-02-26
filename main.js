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



// <メインの変数たちと外部との接点>
// 運用メインの変数
let unyouDnmList = [0,    1, 2, 3, 4, 5, 6,    7, 8, 9];
// 解説: 不明なのは運用番号0、1-6はいつもの、7はGWのために空き、8は極楽寺で休み、9は江ノ島で休み
// 段落としに楽に変更できるように
const honsen = 6;
let kmkrPltf = 3;
// 運用バケツ　Fがついていようとなかろうと+だろうと-だろうと、とりあえず突っ込む。あとでよしなにする。
var un1 = '[1]';
var un2 = '[2]';
var un3 = '[3]';
var un4 = '[4]';
var un5 = '[5]';
var un6 = '[6]';

let un7 = '[7]';
// 休みバケツ
let yasumi = '';
// なうえの
let naueno = 0;




// <時刻を変化させる処理>
// 現在時刻
let theTime = new Date();
let theHourZero = ("0"+theTime.getHours()).slice(-2);
let theMinZero = ("0"+theTime.getMinutes()).slice(-2);

let theTimeForComparison = new Date();

let theTimeNaueno = new Date();
theTimeNaueno.setMinutes(theTime.getMinutes() - naueno);
let theHourNaueno = theTimeNaueno.getHours();
let theMinNaueno = theTimeNaueno.getMinutes();

let minCounter = 0;


function G_setTheTimeNow(){
  theTime = new Date();
}

function G_pourTheTimeIntoNaueno(){
  theHourZero = ("0"+theTime.getHours()).slice(-2);
  theMinZero = ("0"+theTime.getMinutes()).slice(-2);

  theTimeNaueno = theTime;
  theTimeNaueno.setMinutes(theTime.getMinutes() - naueno);
  theHourNaueno = theTimeNaueno.getHours();
  theMinNaueno = theTimeNaueno.getMinutes();
}


const stateDict6 = {
    5:[1,   12, 12, -36, -12, 24, -24,   27, 27, 12],
    6:[1,   -12, -24, -34, 24, 24, 0,   27, 27, 12],
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
    23:[2,   27, -14, -12, 36, -12, 9,   27, 27, 12],
    0:[2,   27, -30, -12, 12, -12, -12,   27, 27, 12],
    }

const everyMinDict = {
  '500': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '501': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '502': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '503': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '504': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '505': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '506': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '507': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '508': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '509': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '510': [ 1, -27, 12, 12, -12, -27, -24, 27, 27, 12 ],
  '511': [ 1, -27, 12, 204, -12, -27, -24, 27, 27, 12 ],
  '512': [ 1, -27, 12, 14, -12, -27, -24, 27, 27, 12 ],
  '513': [ 1, -27, 12, 204, -12, -27, -24, 27, 27, 12 ],
  '514': [ 1, -27, 12, 16, -12, -27, -24, 27, 27, 12 ],
  '515': [ 1, -27, 12, 204, -12, -27, -24, 27, 27, 12 ],
  '516': [ 1, -27, 12, 204, -9, -27, -24, 27, 27, 12 ],
  '517': [ 1, -27, 12, 21, 204, -27, -24, 27, 27, 12 ],
  '518': [ 1, -27, 12, 204, 204, -27, -24, 27, 27, 12 ],
  '519': [ 1, -27, 12, 204, -6, -27, -24, 27, 27, 12 ],
  '520': [ 1, -27, 12, 24, 204, -27, -24, 27, 27, 12 ],
  '521': [ 1, -27, 12, 24, -4, -27, -24, 27, 27, 12 ],
  '522': [ 1, -27, 12, 24, -2, -27, -24, 27, 27, 12 ],
  '523': [ 1, -27, 12, 204, 204, -27, -24, 27, 27, 12 ],
  '524': [ 1, -27, 204, 27, -0, -27, 204, 27, 27, 12 ],
  '525': [ 1, -27, 14, 204, 0, -27, 204, 27, 27, 12 ],
  '526': [ 1, -27, 204, 30, 0, -27, -21, 27, 27, 12 ],
  '527': [ 1, -27, 16, 204, 0, -27, 204, 27, 27, 12 ],
  '528': [ 1, -27, 204, 32, 0, -27, 204, 27, 27, 12 ],
  '529': [ 1, -27, 204, 34, 0, -27, 204, 27, 27, 12 ],
  '530': [ 1, -27, 21, 204, 0, -27, -16, 27, 27, 12 ],
  '531': [ 1, -27, 204, 36, 0, -27, 204, 27, 27, 12 ],
  '532': [ 1, -27, 204, 36, 0, -27, -14, 27, 27, 12 ],
  '533': [ 1, -27, 24, 36, 0, -27, 204, 27, 27, 12 ],
  '534': [ 1, -27, 24, 36, 0, -27, 204, 27, 27, 12 ],
  '535': [ 1, -27, 24, 36, 0, -27, -12, 27, 27, 12 ],
  '536': [ 1, -27, 24, 36, 0, -27, -12, 27, 27, 12 ],
  '537': [ 1, -27, 204, 36, 2, -27, -9, 27, 27, 12 ],
  '538': [ 1, -27, 27, 36, 204, -27, 204, 27, 27, 12 ],
  '539': [ 1, -27, 204, 36, 4, -27, 204, 27, 27, 12 ],
  '540': [ 1, -27, 204, 36, 204, -27, 204, 27, 27, 12 ],
  '541': [ 1, -27, 30, 36, 6, -27, -6, 27, 27, 12 ],
  '542': [ 1, -27, 32, 36, 204, -27, -4, 27, 27, 12 ],
  '543': [ 1, -27, 204, 36, 204, -27, 204, 27, 27, 12 ],
  '544': [ 1, -27, 34, 36, 9, -27, -2, 27, 27, 12 ],
  '545': [ 1, -24, -36, 36, 204, -27, -0, 27, 27, 12 ],
  '546': [ 1, -24, -36, 36, 12, -27, 0, 27, 27, 12 ],
  '547': [ 1, -24, -36, 36, 12, -27, 0, 27, 27, 12 ],
  '548': [ 1, 204, -36, 36, 204, -27, 0, 27, 27, 12 ],
  '549': [ 1, 204, -34, 36, 14, -27, 0, 27, 27, 12 ],
  '550': [ 1, -21, 204, 36, 204, -27, 0, 27, 27, 12 ],
  '551': [ 1, 204, -32, 36, 16, -27, 0, 27, 27, 12 ],
  '552': [ 1, 204, 204, 36, 204, -27, 0, 27, 27, 12 ],
  '553': [ 1, 204, -30, 36, 204, -27, 0, 27, 27, 12 ],
  '554': [ 1, -16, 204, 36, 21, -27, 0, 27, 27, 12 ],
  '555': [ 1, 204, -27, 36, 204, -27, 0, 27, 27, 12 ],
  '556': [ 1, -14, 204, 36, 204, -27, 0, 27, 27, 12 ],
  '557': [ 1, 204, 204, 36, 24, -27, 0, 27, 27, 12 ],
  '558': [ 1, 204, -24, 36, 24, -27, 0, 27, 27, 12 ],
  '559': [ 1, -12, -24, 36, 24, -27, 0, 27, 27, 12 ],
  '600': [ 1, -12, 204, -34, 24, -27, 0, 27, 27, 12 ],
  '601': [ 1, -9, 204, 204, 204, -27, 2, 27, 27, 12 ],
  '602': [ 1, 204, 204, -32, 27, -27, 204, 27, 27, 12 ],
  '603': [ 1, 204, -21, 204, 204, -27, 4, 27, 27, 12 ],
  '604': [ 1, 204, 204, -30, 204, -27, 204, 27, 27, 12 ],
  '605': [ 1, -6, 204, 204, 30, -27, 6, 27, 27, 12 ],
  '606': [ 1, -4, -16, -27, 32, -27, 204, 27, 27, 12 ],
  '607': [ 1, 204, 204, 204, 204, -27, 204, 27, 27, 12 ],
  '608': [ 1, -2, -14, 204, 34, -27, 9, 27, 27, 12 ],
  '609': [ 1, -0, 204, -24, -36, -27, 204, 27, 27, 12 ],
  '610': [ 1, 0, -12, -24, -36, -24, 12, 27, 27, 12 ],
  '611': [ 1, 0, -12, 204, -36, -24, 12, 27, 27, 12 ],
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
  '2201': [ 2, 12, 0, -12, -24, -36, 24, 27, 27, 12 ],
  '2202': [ 2, 204, 0, -12, 204, -36, 204, 27, 27, 12 ],
  '2203': [ 2, 14, 2, -12, 204, -34, 204, 27, 27, 12 ],
  '2204': [ 2, 204, 204, -12, -21, 204, 27, 27, 27, 12 ],
  '2205': [ 2, 16, 4, -12, 204, -32, 204, 27, 27, 12 ],
  '2206': [ 2, 204, 204, -12, 204, 204, 204, 27, 27, 12 ],
  '2207': [ 2, 204, 6, -12, 204, -30, 30, 27, 27, 12 ],
  '2208': [ 2, 21, 204, -12, -16, 204, 32, 27, 27, 12 ],
  '2209': [ 2, 204, 204, -12, 204, -27, 204, 27, 27, 12 ],
  '2210': [ 2, 204, 9, -12, -14, 204, 34, 27, 27, 12 ],
  '2211': [ 2, 24, 204, -12, 204, 204, -36, 27, 27, 12 ],
  '2212': [ 2, 24, 12, -12, 204, -24, -36, 27, 27, 12 ],
  '2213': [ 2, 24, 12, -12, -12, -24, -36, 27, 27, 12 ],
  '2214': [ 2, 204, 204, -12, -12, 204, -36, 27, 27, 12 ],
  '2215': [ 2, 27, 14, -12, -9, 204, -36, 27, 27, 12 ],
  '2216': [ 2, 27, 204, -12, 204, 204, -36, 27, 27, 12 ],
  '2217': [ 2, 27, 16, -12, 204, -21, -34, 27, 27, 12 ],
  '2218': [ 2, 27, 204, -12, 204, 204, 204, 27, 27, 12 ],
  '2219': [ 2, 27, 204, -12, -6, 204, -32, 27, 27, 12 ],
  '2220': [ 2, 27, 21, -12, -4, -16, 204, 27, 27, 12 ],
  '2221': [ 2, 27, 204, -12, 204, 204, -30, 27, 27, 12 ],
  '2222': [ 2, 27, 204, -12, -2, -14, 204, 27, 27, 12 ],
  '2223': [ 2, 27, 24, -12, -0, 204, -27, 27, 27, 12 ],
  '2224': [ 2, 27, 24, -12, 0, 204, 204, 27, 27, 12 ],
  '2225': [ 2, 27, 24, -12, 0, -12, 204, 27, 27, 12 ],
  '2226': [ 2, 27, 24, -12, 0, -12, -24, 27, 27, 12 ],
  '2227': [ 2, 27, 204, -12, 2, -12, -24, 27, 27, 12 ],
  '2228': [ 2, 27, 204, -12, 204, -12, 204, 27, 27, 12 ],
  '2229': [ 2, 27, 27, -12, 4, -12, 204, 27, 27, 12 ],
  '2230': [ 2, 27, 204, -12, 204, -12, -21, 27, 27, 12 ],
  '2231': [ 2, 27, 30, -12, 6, -12, 204, 27, 27, 12 ],
  '2232': [ 2, 27, 204, -12, 204, -12, 204, 27, 27, 12 ],
  '2233': [ 2, 27, 32, -12, 204, -12, -16, 27, 27, 12 ],
  '2234': [ 2, 27, 34, -12, 9, -12, 204, 27, 27, 12 ],
  '2235': [ 2, 27, 204, -12, 204, -12, -14, 27, 27, 12 ],
  '2236': [ 2, 27, -36, -12, 12, -12, 204, 27, 27, 12 ],
  '2237': [ 2, 27, -36, -12, 12, -12, 204, 27, 27, 12 ],
  '2238': [ 2, 27, -36, -12, 12, -12, -12, 27, 27, 12 ],
  '2239': [ 2, 27, -36, -12, 204, -12, -12, 27, 27, 12 ],
  '2240': [ 2, 27, -36, -12, 14, -12, -9, 27, 27, 12 ],
  '2241': [ 2, 27, -36, -12, 204, -12, 204, 27, 27, 12 ],
  '2242': [ 2, 27, -34, -12, 16, -12, 204, 27, 27, 12 ],
  '2243': [ 2, 27, 204, -12, 204, -12, 204, 27, 27, 12 ],
  '2244': [ 2, 27, -32, -12, 204, -12, -6, 27, 27, 12 ],
  '2245': [ 2, 27, 204, -12, 21, -12, -4, 27, 27, 12 ],
  '2246': [ 2, 27, -30, -12, 204, -12, 204, 27, 27, 12 ],
  '2247': [ 2, 27, 204, -12, 204, -12, -2, 27, 27, 12 ],
  '2248': [ 2, 27, -27, -12, 24, -12, -0, 27, 27, 12 ],
  '2249': [ 2, 27, 204, -12, 24, -12, 0, 27, 27, 12 ],
  '2250': [ 2, 27, 204, -12, 24, -12, 0, 27, 27, 12 ],
  '2251': [ 2, 27, -24, -12, 24, -12, 0, 27, 27, 12 ],
  '2252': [ 2, 27, -24, -12, 204, -12, 0, 27, 27, 12 ],
  '2253': [ 2, 27, 204, -12, 204, -12, 2, 27, 27, 12 ],
  '2254': [ 2, 27, 204, -12, 27, -12, 204, 27, 27, 12 ],
  '2255': [ 2, 27, -21, -12, 204, -12, 4, 27, 27, 12 ],
  '2256': [ 2, 27, 204, -12, 30, -12, 204, 27, 27, 12 ],
  '2257': [ 2, 27, 204, -12, 204, -12, 6, 27, 27, 12 ],
  '2258': [ 2, 27, -16, -12, 32, -12, 204, 27, 27, 12 ],
  '2259': [ 2, 27, 204, -12, 34, -12, 204, 27, 27, 12 ],
  '2300': [ 2, 27, 204, -12, 204, -12, 9, 27, 27, 12 ],
  '2301': [ 2, 27, -14, -12, -36, -12, 204, 27, 27, 12 ],
  '2302': [ 2, 27, 204, -12, -36, -12, 12, 27, 27, 12 ],
  '2303': [ 2, 27, -12, -12, -36, -12, 12, 27, 27, 12 ],
  '2304': [ 2, 27, -12, -12, 204, -12, 204, 27, 27, 12 ],
  '2305': [ 2, 27, -12, -12, -34, -12, 204, 27, 27, 12 ],
  '2306': [ 2, 27, -9, -12, -32, -12, 14, 27, 27, 12 ],
  '2307': [ 2, 27, 204, -12, 204, -12, 204, 27, 27, 12 ],
  '2308': [ 2, 27, 204, -12, 204, -12, 16, 27, 27, 12 ],
  '2309': [ 2, 27, 204, -12, -30, -12, 204, 27, 27, 12 ],
  '2310': [ 2, 27, -6, -12, 204, -12, 204, 27, 27, 12 ],
  '2311': [ 2, 27, -4, -12, -27, -12, 21, 27, 27, 12 ],
  '2312': [ 2, 27, 204, -12, 204, -12, 204, 27, 27, 12 ],
  '2313': [ 2, 27, -2, -12, 204, -12, 204, 27, 27, 12 ],
  '2314': [ 2, 27, -0, -12, -24, -12, 24, 27, 27, 12 ],
  '2315': [ 2, 27, 0, -12, -24, -12, 24, 27, 27, 12 ],
  '2316': [ 2, 27, 0, -12, -24, -12, 204, 27, 27, 12 ],
  '2317': [ 2, 27, 0, -12, 204, -12, 204, 27, 27, 12 ],
  '2318': [ 2, 27, 0, -12, 204, -12, 27, 27, 27, 12 ],
  '2319': [ 2, 27, 2, -12, -21, -12, 204, 27, 27, 12 ],
  '2320': [ 2, 27, 204, -12, 204, -12, 30, 27, 27, 12 ],
  '2321': [ 2, 27, 4, -12, 204, -12, 204, 27, 27, 12 ],
  '2322': [ 2, 27, 204, -12, -16, -12, 32, 27, 27, 12 ],
  '2323': [ 2, 27, 6, -12, 204, -12, 34, 27, 27, 12 ],
  '2324': [ 2, 27, 204, -12, 204, -12, 204, 27, 27, 12 ],
  '2325': [ 2, 27, 204, -12, -14, -12, -36, 27, 27, 12 ],
  '2326': [ 2, 27, 9, -12, 204, -12, -36, 27, 27, 12 ],
  '2327': [ 2, 27, 204, -12, -12, -12, -36, 27, 27, 12 ],
  '2328': [ 2, 27, 12, -12, -12, -12, -36, 27, 27, 12 ],
  '2329': [ 2, 27, 12, -12, 204, -12, -36, 27, 27, 12 ],
  '2330': [ 2, 27, 204, -12, -9, -12, -36, 27, 27, 12 ],
  '2331': [ 2, 27, 204, -12, 204, -12, -36, 27, 27, 12 ],
  '2332': [ 2, 27, 14, -12, 204, -12, -36, 27, 27, 12 ],
  '2333': [ 2, 27, 204, -12, -6, -12, -34, 27, 27, 12 ],
  '2334': [ 2, 27, 16, -12, 204, -12, 204, 27, 27, 12 ],
  '2335': [ 2, 27, 204, -12, -4, -12, -32, 27, 27, 12 ],
  '2336': [ 2, 27, 204, -12, -2, -12, 204, 27, 27, 12 ],
  '2337': [ 2, 27, 21, -12, 204, -12, -30, 27, 27, 12 ],
  '2338': [ 2, 27, 204, -12, -0, -12, 204, 27, 27, 12 ],
  '2339': [ 2, 27, 204, -12, 0, -12, -27, 27, 27, 12 ],
  '2340': [ 2, 27, 24, -12, 0, -12, 204, 27, 27, 12 ],
  '2341': [ 2, 27, 24, -12, 0, -12, 204, 27, 27, 12 ],
  '2342': [ 2, 27, 24, -12, 0, -12, -24, 27, 27, 12 ],
  '2343': [ 2, 27, 204, -12, 0, -12, -24, 27, 27, 12 ],
  '2344': [ 2, 27, 204, -12, 0, -12, -24, 27, 27, 12 ],
  '2345': [ 2, 27, 27, -12, 0, -12, 204, 27, 27, 12 ],
  '2346': [ 2, 27, 204, -12, 0, -12, 204, 27, 27, 12 ],
  '2347': [ 2, 27, 204, -12, 0, -12, -21, 27, 27, 12 ],
  '2348': [ 2, 27, 30, -12, 0, -12, 204, 27, 27, 12 ],
  '2349': [ 2, 27, 32, -12, 0, -12, 204, 27, 27, 12 ],
  '2350': [ 2, 27, 204, -12, 2, -12, -16, 27, 27, 12 ],
  '2351': [ 2, 27, 34, -12, 204, -12, 204, 27, 27, 12 ],
  '2352': [ 2, 27, -36, -12, 4, -12, -14, 27, 27, 12 ],
  '2353': [ 2, 27, -36, -12, 204, -12, 204, 27, 27, 12 ],
  '2354': [ 2, 27, -36, -12, 6, -12, 204, 27, 27, 12 ],
  '2355': [ 2, 27, -36, -12, 204, -12, -12, 27, 27, 12 ],
  '2356': [ 2, 27, -34, -12, 204, -12, -12, 27, 27, 12 ],
  '2357': [ 2, 27, 204, -12, 9, -12, -12, 27, 27, 12 ],
  '2358': [ 2, 27, -32, -12, 204, -12, -12, 27, 27, 12 ],
  '2359': [ 2, 27, 204, -12, 12, -12, -12, 27, 27, 12 ],
  '0': [ 1, 27, -30, -12, 12, -12, -12, 27, 27, 12 ],
  '1': [ 1, 27, 204, -12, 12, -12, -12, 27, 27, 12 ],
  '2': [ 1, 27, -27, -12, 12, -12, -12, 27, 27, 12 ],
  '3': [ 1, 27, 204, -12, 12, -12, -12, 27, 27, 12 ],
  '4': [ 1, 27, 204, -12, 12, -12, -12, 27, 27, 12 ],
  '5': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '6': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '7': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '8': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '9': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ],
  '10': [ 1, 27, -24, -12, 12, -12, -12, 27, 27, 12 ]
}

function G_setUDLasTheHour(){
  unyouDnmList = Array.from(eval(`stateDict${String(honsen)}[theHourNaueno]`));
  minCounter = 0+1;
}


function G_setUDLadd1min(){
  if(7 <= theHourNaueno && theHourNaueno <= 20){
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
  }else{
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
}


function G_setUDLasTheTime(){
G_setUDLasTheHour()
Array.from(Array(theMinNaueno).keys()).forEach(i => G_setUDLadd1min());

console.log(String(unyouDnmList) + "now;init-uDL");
}

function G_yahooRealTime(un1, un2, un3, un4, un5, un6){

  fetch('https://search.yahoo.co.jp/realtime/search?p=%23%E6%B1%9F%E3%83%8E%E9%9B%BB%E9%81%8B%E7%94%A8', {
    mode: 'cors' //'no-cors' //
  })
  .then(res => res.text())
  .then(body => console.log(body));

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
    N_forcast(un1, un2, un3, un4, un5, un6, un6);
  });
  */
}

// <ここから処理を起動しはじめるゾーン>
// 起動時の処理
G_setTheTimeNow();
G_pourTheTimeIntoNaueno();
G_setUDLasTheTime();
//G_yahooRealTime();
/*
for(i=0; i<theMinNaueno; i++){
  G_setUDLadd1min();
console.log(String(unyouDnmList) + "now;init");
}
*/
/*
if(7 <= theHourNaueno <= 20){
  G_setUDLasTheHour()
  for(i=0; i<theMinNaueno; i++){
    G_setUDLadd1min();
  console.log(String(unyouDnmList) + "now;init");
  }
}else if(5 <= theHourNaueno <= 6){
  jump_state_minute();
}else(21 <= nowHour <= 23){
  jump_state_minute();
}
*/






// <背景と電車の描画のためのクラス>
const wWidth = WIDTH;
const wHeight = HEIGHT;  /*16 * 9 = 450*/
const wMid = wHeight / 2;  /*225*/
const baseExpander = wWidth/40; /*20*/
const baseLength = 36 * baseExpander;  /*720*/
const baseX = (wWidth - baseLength) / 2;  /*40*/
const basePhase = wWidth/200;

function R_baser(eki36){
  return Number(eki36) * baseExpander + baseX
}

function R_iti(i) {
  let eki_abs = 0;
  if(Math.abs(unyouDnmList[i]) > 36){
    eki_abs = R_baser(36);
  }else{
    eki_abs = R_baser(Math.abs(unyouDnmList[i]));
  }
  return eki_abs;
}

function Rg_umiYama(i){
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
  constructor(i){
    this.i = i;
    this.itiX = R_iti(i);
    this.itiPlus = R_iti(i)+(basePhase*2-basePhase/4);
    this.itiMinus = R_iti(i)-(basePhase*2-basePhase/4);
    this.midY = wMid+((Rg_umiYama(i) - wMid)**0)*basePhase;
    this.topY = wMid+((Rg_umiYama(i) - wMid)**0)*basePhase*2;
    this.umiYamaY = Rg_umiYama(i);
    this.text = eval('un' + i)
  }
  update(){ //thisの寿命ってどんな感じやねん。これ動くの？
    this.itiX = R_iti(this.i);
    this.itiPlus = R_iti(this.i)+(basePhase*2-basePhase/4);
    this.itiMinus = R_iti(this.i)-(basePhase*2-basePhase/4);
    this.midY = wMid+Math.sign(Rg_umiYama(this.i) - wMid)*basePhase;
    this.topY = wMid+Math.sign(Rg_umiYama(this.i) - wMid)*basePhase*2;
    this.umiYamaY = Rg_umiYama(this.i);
    this.text = eval('un' + this.i)
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
function N_draw(){
  context.clearRect(0, 0, WIDTH, HEIGHT);
  moveObjects.forEach((obj) => obj.update());
  stationObjects.forEach((obj) => obj.render(context));
  moveObjects.forEach((obj) => obj.render(context));

  //window.requestAnimationFrame((ts) => loop(ts));
}
//window.requestAnimationFrame((ts) => loop(ts));

function N_drawTimeInHTML(){
  if(isFinite(theTime.getTime())){
  document.getElementById('timeSelector').value = `${theHourZero}:${theMinZero}`;
  }
}

function N_forcast(un1, un2, un3, un4, un5, un6){
  let lineList = [un1, un2, un3, un4, un5, un6];
  let tDList=[];
  lineList.forEach((line, i) => {
    tDList.push(
      [
      line.match(/\]\d*F/)?line.match(/\]\d*F/)[0].match(/\d*F/)[0]:null
      ,line.match(/\+\d*F/)?line.match(/\+\d*F/)[0].match(/\d*F/)[0]:null
      ]
    );
  });

  for (let i of [0,2,4]){
    if (tDList[i][1] == null){
      tDList[i][1] = tDList[i][0];
      tDList[i][0] = null;
    };
  };

  document.getElementById('lr1').innerHTML = `f1812>極開1838>＿＿:(${tDList[0][0]})f`
  document.getElementById('lr2').innerHTML = `　`
  document.getElementById('lr3').innerHTML = `f1724>極開1750>＿＿:(${tDList[2][0]})f`
  document.getElementById('lr4').innerHTML = `　`
  document.getElementById('lr5').innerHTML = `f1748>極開1814>＿＿:(${tDList[4][0]})f`
  document.getElementById('lr6').innerHTML = `k1836>江開1900>左留:(${tDList[5][1]})k`

  document.getElementById('la1').innerHTML = `f2148>極終__2215>＿＿:(${tDList[0][1]})k`
  document.getElementById('la2').innerHTML = `k2355>稲終__2405>＿＿:(${tDList[1][0]}+${tDList[1][1]})fk`
  document.getElementById('la3').innerHTML = `k2202>江終1_2215>中線:(${tDList[2][1]})k`
  document.getElementById('la4').innerHTML = `k2332>江終4_2358>２番:(${tDList[3][0]}+${tDList[3][1]})fk`
  document.getElementById('la5').innerHTML = `k2202>江終2_2225>右線:(${tDList[4][1]})k`
  document.getElementById('la6').innerHTML = `k2332>江終3_2355>１番:(${tDList[5][0]})f`

  document.getElementById('lt1').innerHTML = `[5]　XF+XF`
  document.getElementById('lt2').innerHTML = `[6]　(${tDList[1][0]}>${tDList[5][1]})+${tDList[1][1]}`
  document.getElementById('lt3').innerHTML = `[2]　${tDList[2][1]}+XF`
  document.getElementById('lt4').innerHTML = `[3]　${tDList[3][0]}+${tDList[3][1]}`
  document.getElementById('lt5').innerHTML = `[1]　XF+${tDList[4][1]}`
  document.getElementById('lt6').innerHTML = `[4]　XF+${tDList[5][0]}`

}

function RG_eatherTimesAreNOTSame(){
  G_setTheTimeNow();
  let TTC = theTimeForComparison.getMinutes();
  let TT = theTime.getMinutes();
  return !(TTC == TT);

}
//変数じゃなくて(配列?)オブジェクトに時間数値突っ込めばいいかも
//そのうちラベルに書き換える
function G_loop(timestamp){
  if(RG_eatherTimesAreNOTSame()){
    theTimeForComparison = new Date();
    G_setTheTimeNow();
    G_pourTheTimeIntoNaueno();

    G_setUDLadd1min();

    N_draw();
    N_drawTimeInHTML();
  }
  if(!document.getElementById("toggleSwitch").checked){
    Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
      item.disabled = false;
    });
    return;
  }
  N_drawTimeInHTML();
  window.requestAnimationFrame(G_loop);
  //requestId = window.requestAnimationFrame(G_loop); //戻り値を取得
  //window.cancelAnimationFrame(requestId);
};

function G_fastLoop(timestamp){
  if (!document.getElementById("toggleSwitch").checked) {
    G_setTheTimeNow();

    let ymdhm = `2019/${String(theTime.getMonth())}/${String(theTime.getDate())} ${String(document.getElementById("timeSelector").value)}`;

    theTime = new Date(ymdhm);
    if(isFinite(theTime.getTime())){
      theTime.setMinutes(theTime.getMinutes()+1);

      G_pourTheTimeIntoNaueno();

      G_setUDLasTheTime();

      N_draw();
    }
  }

  if(!document.getElementById("fastForward").checked){
    Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
      item.disabled = false;
    });
    return;
  }
  N_drawTimeInHTML();
  setTimeout(G_fastLoop, 500);
  //window.requestAnimationFrame(G_loop);
  //requestId = window.requestAnimationFrame(G_loop); //戻り値を取得
  //window.cancelAnimationFrame(requestId);
};

function G_minChange(min){
  if (!document.getElementById("toggleSwitch").checked && !document.getElementById("fastForward").checked) {
    G_setTheTimeNow();

    let ymdhm = `2019/${String(theTime.getMonth())}/${String(theTime.getDate())} ${String(document.getElementById("timeSelector").value)}`;

    theTime = new Date(ymdhm);
    if(isFinite(theTime.getTime())){
      theTime.setMinutes(theTime.getMinutes()+min);

      G_pourTheTimeIntoNaueno();

      G_setUDLasTheTime();

      N_draw();
    }
  }
};



function paste() {
  var pasteText = document.querySelector("#output");
  pasteText.focus();
  document.execCommand("paste");
  console.log(pasteText.textContent);

  un1 = pasteText.textContent.match(/\[1\]\S+(\s|\n)/g)[0];
  un2 = pasteText.textContent.match(/\[2\]\S+(\s|\n)/g)[0];
  un3 = pasteText.textContent.match(/\[3\]\S+(\s|\n)/g)[0];
  un4 = pasteText.textContent.match(/\[4\]\S+(\s|\n)/g)[0];
  un5 = pasteText.textContent.match(/\[5\]\S+(\s|\n)/g)[0];
  un6 = pasteText.textContent.match(/\[6\]\S+(\s|\n)/g)[0];
}


function shiftMin(min) {
  //theTime = new Date(ymdhm);
  theTime.setMinutes(theTime.getMinutes()+min);

  G_pourTheTimeIntoNaueno();

  G_setUDLasTheTime();

  N_draw();
  N_drawTimeInHTML();
}

//document.querySelector("#paste").addEventListener("click", paste);



document.getElementById("nauenoSetter").addEventListener('input',() => {
  naueno = Number(document.getElementById("nauenoSetter").value);
}, false);


document.getElementById("unyoInputter").addEventListener('input',() => {
  //テキストエリアの文字をunxにそれぞれ突っ込んでる
  document.getElementById("unyoInputter").value.split('\n').forEach((currentValue, index)=>{
    eval(`un${String(index+1)} = "${String(currentValue)}";`);
  });

  N_draw();
  N_forcast(un1, un2, un3, un4, un5, un6);
}, false);


document.getElementById("timeSelector").addEventListener('input',() => {
  if (!document.getElementById("toggleSwitch").checked) {
    G_setTheTimeNow();

    let ymdhm = `2019/${String(theTime.getMonth())}/${String(theTime.getDate())} ${String(document.getElementById("timeSelector").value)}`;

    theTime = new Date(ymdhm);
    if(isFinite(theTime.getTime())){
      G_pourTheTimeIntoNaueno();

      G_setUDLasTheTime();

      N_draw();
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

    theTimeForComparison = new Date();
    G_setTheTimeNow();
    G_pourTheTimeIntoNaueno();

    G_setUDLasTheTime();

    N_draw();
    N_drawTimeInHTML();

    window.requestAnimationFrame(G_loop);
  };
}, false);


document.getElementById("fastForward").addEventListener('change',(e) => {
  e.preventDefault();
  if (document.getElementById("fastForward").checked) {
    Array.prototype.slice.call(document.getElementsByClassName("antiLive")).forEach((item, i) => {
      item.disabled = true;
    });
    document.getElementById("fastForward").disabled = false;
    window.requestAnimationFrame(G_fastLoop);
  };
}, false);



N_draw();
N_drawTimeInHTML();
console.log('piyo');
/*
const checkEqual = function(a, b) {
  if (a !== b) {
    throw new Error('Error:' + message);
  }
}


function check(a, b) {
  var message;
  if (a !== b) {
    message =
        'A != B' + '\n' +
        'A = ' + a + '\n' +
        'B = ' + b;
    alert(message);
  }
};


//https://github.com/standard-software/stsLib.js/blob/master/Source/stsLib.js/stslib_core.js
*/
