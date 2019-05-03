# -*- coding: utf8 -*-

import sys
import re
import tkinter as tk
#import threading
#import concurrent.futures
import datetime
#import drew
#from apscheduler.schedulers.blocking import BlockingScheduler
#scdl = BlockingScheduler()
import today


# <メインの変数たちと外部との接点>
# 運用メインの変数
unyouDnmList = [0,    1, 2, 3, 4, 5, 6,    7, 8, 9]
# 解説: 不明なのは運用番号0、1-6はいつもの、7はGWのために空き、8は極楽寺で休み、9は江ノ島で休み
# 段落としに楽に変更できるように
roku = 6
nana = 7
honsen = today.honsen
kmkrPltf = 3
# 運用バケツ　Fがついていようとなかろうと+だろうと-だろうと、とりあえず突っ込む。あとでよしなにする。
un1 = today.un1
un2 = today.un2
un3 = today.un3
un4 = today.un4
un5 = today.un5
un6 = today.un6

un7 = today.un7
# 休みバケツ
yasumi = today.yasumi
# なうえの
naueno = today.naueno


# <雑なデータをととのえてクラスにぶっこむ>
# 車両のクラス: ぶっちゃけいらない
class Car():
    global unyouDnmList
    def __init__(self, name, unyounum=0, shisen=0):
        self.name = name
        self.kname = int(name) + 50
        self.unyounum = unyounum
        self.shisen = shisen

    def addUnoyunum(self, supUnyounum):
        self.unyounum = supUnyounum

    def addHonshisen(self, supHonshisen):
        self.shisen = supShisen

    def findUnyounum(self):
        return self.unyounum

    def findWhere(self):
        return unyouDnmList[self.unyounum]

# 車両のインスタンスを作っておく
F305 = Car(name=305)
F1002 = Car(name=1002)
F1101 = Car(name=1101)
F1201 = Car(name=1201)
F1501 = Car(name=1501)
F1502 = Car(name=1502)
F2001 = Car(name=2001)
F2002 = Car(name=2002)
F2003 = Car(name=2003)
F10 = Car(name=10)
F21 = Car(name=21)
F22 = Car(name=22)
F501 = Car(name=501)
F502 = Car(name=502)

cars = [305, 1001, 1002, 1101, 1201, 1501, 1502, 2001, 2002, 2003, 10, 21, 22, 501, 502]

# 運用バケツから車両インスタンスに運用番号を流し込む
def fromBucketToUnyounum():
    carDict = {i: re.findall('\d+', eval('un' + str(i))) for i in range(1, honsen+1)}

    for i, nameList in carDict.items():
        for name in nameList:
            if name in cars:
                eval('F' + str(name)).addUnoyunum(i)
# 休みバケツから車両インスタンスに8番と支線番号を流し込む
def fromBucketToYasumi():
    for name in re.findall('\d+', yasumi):
        if name in cars:
            eval('F' + str(name)).addUnoyunum(8)



# <時刻を変化させる処理>
# 現在時刻
nowHour = datetime.datetime.now().hour
nowMin = datetime.datetime.now().minute
def nowHourDef():
    global nowHour
    nowHour = datetime.datetime.now().hour
def nowMinDef():
    global nowMin
    nowMin = datetime.datetime.now().minute

#　時刻変化処理
stateDict6 = {
    7:[24,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    8:[24,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    9:[24,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    10:[24,   12, 0, -12, -24, -36, 24,   27, 27, 12],
    11:[24,   0, -12, -24, -36, 24, 12,   27, 27, 12],
    12:[24,   -12, -24, -36, 24, 12, 0,   27, 27, 12],
    13:[24,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    14:[24,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    15:[24,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    16:[24,   12, 0, -12, -24, -36, 24,   27, 27, 12],
    17:[24,   0, -12, -24, -36, 24, 12,   27, 27, 12],
    18:[24,   -12, -24, -36, 24, 12, 0,   27, 27, 12],
    19:[24,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    20:[24,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    21:[24,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    }

stateDict7 = {
    7:[24,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    8:[24,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    9:[24,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    10:[24,   24, 12, 0, -24, -36, 36, -12,   27, 12],
    11:[24,   0, -12, -24, 36, 24, 12, -36,   27, 12],
    12:[24,   -24, -36, 36, 12, 0, -12, 24,   27, 12],
    13:[24,   36, 24, 12, -12, -24, -36, 0,   27, 12],
    14:[24,   12, 0, -12, -36, 36, 24, -24,   27, 12],
    15:[24,   -12, -24, -36, 24, 12, 0, 36,   27, 12],
    16:[24,   -36, 36, 24, 0, -12, -24, 12,   27, 12],
    17:[24,   24, 12, 0, -24, -36, 36, -12,   27, 12],
    18:[24,   0, -12, -24, 36, 24, 12, -36,   27, 12],
    19:[24,   -24, -36, 24, 12, 0, -12,   27, 27, 12],
    20:[24,   -36, 24, 12, 0, -12, -24,   27, 27, 12],
    21:[24,   24, 12, 0, -12, -24, -36,   27, 27, 12],
    }

def jumpState():
    global unyouDnmList
    nowHourDef()
    unyouDnmList = eval('stateDict' +str(honsen)).get(nowHour)
    print(str(unyouDnmList) + 'jumpState')

def add1min():
    global unyouDnmList
    global kmkrPltf
    for i, fig in enumerate(unyouDnmList):
        if 1 <= i <= honsen:
            if honsen == 6:
                if fig < 36:
                    fig += 1
                else:
                    fig = fig*(-1)+1
            else: #honsen = 7
                if fig == 42:
                    fig = fig*(-1)+1
                elif fig == -36:
                    if kmkrPltf == 3:
                        kmkrPltf = 4
                    else:
                        kmkrPltf = 3
                    fig += 1
                else:
                    fig += 1

        unyouDnmList[i] = fig
#unyouDnmList = [i+1 if i < 36 else i*(-1)+1 for i in unyouDnmList]



# <繰り返しはここら辺で実装>
# 駆動用
#@scdl.scheduled_job('interval',minutes=1)
def timed_job():
    nowMinDef()
    if nowMin != 0:
        add1min()
    else:
        jumpState()
    w.coords(un1d, iti(1), umiYma(1))
    w.coords(un2d, iti(2), umiYma(2))
    w.coords(un3d, iti(3), umiYma(3))
    w.coords(un4d, iti(4), umiYma(4))
    w.coords(un5d, iti(5), umiYma(5))
    w.coords(un6d, iti(6), umiYma(6))
    if honsen == 7:
        w.coords(un7d, iti(7), umiYma(7))

    w.coords(loz1, iti(1), wMid,  iti(1)-7, loz(1,4),  iti(1), loz(1,8),  iti(1)+7, loz(1,4))
    w.coords(loz2, iti(2), wMid,  iti(2)-7, loz(2,4),  iti(2), loz(2,8),  iti(2)+7, loz(2,4))
    w.coords(loz3, iti(3), wMid,  iti(3)-7, loz(3,4),  iti(3), loz(3,8),  iti(3)+7, loz(3,4))
    w.coords(loz4, iti(4), wMid,  iti(4)-7, loz(4,4),  iti(4), loz(4,8),  iti(4)+7, loz(4,4))
    w.coords(loz5, iti(5), wMid,  iti(5)-7, loz(5,4),  iti(5), loz(5,8),  iti(5)+7, loz(5,4))
    w.coords(loz6, iti(6), wMid,  iti(6)-7, loz(6,4),  iti(6), loz(6,8),  iti(6)+7, loz(6,4))
    if honsen == 7:
        w.coords(loz7, iti(7), wMid,  iti(7)-7, loz(7,4),  iti(7), loz(7,8),  iti(7)+7, loz(7,4))

    w.after(600, timed_job)


# <ここから処理を起動しはじめるゾーン>
#起動時の処理 (とスケジューラーの起動:今使ってない)
jumpState()
for i in range(nowMin):
    add1min()
print(str(unyouDnmList) + "now;init")

fromBucketToUnyounum()
fromBucketToYasumi()


#if __name__ == "__main__":
#scdl.start()



# <ほとんどおまけの描画処理>
#描画処理
root = tk.Tk()
root.title(u"here is title")
root.geometry("800x450")
#座標群
wWidth = 800
wHeight = wWidth / 16 * 9  #450
wMid = wHeight / 2  #225
lLeng = 36 * 20  #720
lSX = (wWidth - lLeng ) / 2  #40
lSY = wMid  #225
lEX = wWidth - lSX  #760
lEY = wMid  #225

w = tk.Canvas(root, width=wWidth,  height=wHeight)
# 背景
w.create_line(lSX, lSY, lEX, lEY, fill="#111111")
def base(num):
    return int(num) * 20 + lSX
terminal = [0,36]
for i in terminal:
    w.create_rectangle(base(i)-5, wMid-4, base(i)+5, wMid+4,  fill = 'white', stipple = 'gray25')
double = [6, 12, 18, 24, 30]
for i in double:
    w.create_oval(base(i)-4, wMid-4, base(i)+4, wMid+4,  fill = 'white', stipple = 'gray25')
single = [2, 4, 9, 14, 16, 21, 27, 32, 34]
for i in single:
    w.create_line(base(i), wMid-4, base(i), wMid+4)
# 背景おまけ
w.create_oval(100, 450-200, 700, 450+200,  fill = 'lightsteelblue1', outline = 'steelblue4')
w.create_oval(280-30, 310-25, 280+30, 310+25,  fill = 'DarkOliveGreen2', outline = 'tan4')

# 列車
def iti(i):
    abss = 0
    if abs(unyouDnmList[i-1+1]) > 36:
        abss = 36 * 20 + lSX
    else:
        abss = abs(unyouDnmList[i-1+1]) * 20 + lSX
    return abss
def umiYma(i):
    yama = wMid-12
    umi = wMid+12
    if abs(unyouDnmList[i-1+1]) >= 36:
        if unyouDnmList[i-1+1] == 36:
            if kmkrPltf == 3:
                return yama
            else:
                return umi
        else: #36以外
            if kmkrPltf == 3:
                return umi
            else:
                return yama
    else:
        if unyouDnmList[i-1+1] < 0:
            return umi
        else: # unyouDnmList[i-1+1] < 0
            return yama
un1d = w.create_text(iti(1), umiYma(1), text=un1)
un2d = w.create_text(iti(2), umiYma(2), text=un2)
un3d = w.create_text(iti(3), umiYma(3), text=un3)
un4d = w.create_text(iti(4), umiYma(4), text=un4)
un5d = w.create_text(iti(5), umiYma(5), text=un5)
un6d = w.create_text(iti(6), umiYma(6), text=un6)
if honsen == 7:
    un7d = w.create_text(iti(7), umiYma(7), text=un7)

iro =['white', 'orange', 'chartreuse3', 'red', 'purple', 'pink', 'SkyBlue1', 'violet']
def loz(i,num):
    if umiYma(i) - wMid > 0:
        return wMid + num
    else:
        return wMid - num
def createLoz(i):
    return w.create_polygon(iti(i), wMid,  iti(i)-7, loz(i,4),  iti(i), loz(i,8),  iti(i)+7, loz(i,4), fill=iro[i-1+1], outline='gray')
loz1 = createLoz(1)
loz2 = createLoz(2)
loz3 = createLoz(3)
loz4 = createLoz(4)
loz5 = createLoz(5)
loz6 = createLoz(6)
if honsen ==7:
    loz7 = createLoz(7)


w.place(x=0, y=0)

timed_job()
#ここまで描画処理
# <この子が延々の繰り返しを起動する>
root.mainloop()



# <あると便利な早見表>
# 資料
ekidictA = {'01':'藤沢', '02':'石上', '03':'柳小路', '04':'鵠沼', '05':'湘南海岸公園', '06':'江ノ島', '07':'腰越', '08':'鎌倉高校前', '09':'七里ヶ浜', '10':'稲村ヶ崎', '11':'極楽寺', '12':'長谷', '13':'由比ヶ浜', '14':'和田塚', '15':'鎌倉'}

ekiDictB = {0:'藤沢', 2:'石上', 4:'柳小路', 6:'鵠沼', 9:'湘南海岸公園', 12:'江ノ島', 14:'腰越', 16:'鎌倉高校前', 18:'峰ヶ原', 21:'七里ヶ浜', 24:'稲村ヶ崎', 27:'極楽寺', 30:'長谷', 32:'由比ヶ浜', 34:'和田塚', 36:'鎌倉'}

ekiDictC = {'fu':0, 'ku':6, 'en':12, 'mi':18, 'in':24, 'ha':30, 'ka':36}

ekiDictD = {0:'藤沢', 1:'石上', 2:'柳小路', 3:'鵠沼', 4:'湘南海岸公園', 5:'江ノ島', 6:'腰越', 7:'鎌倉高校前', 8:'峰ヶ原', 9:'七里ヶ浜', 10:'稲村ヶ崎', 11:'極楽寺', 12:'長谷', 13:'由比ヶ浜', 14:'和田塚', 15:'鎌倉'}

ekiDictE = {}

cars = [305, 1001, 1002, 1101, 1201, 1501, 1502, 2001, 2002, 2003, 10, 21, 22, 501, 502]

paternDiya = '0617->935'

jikokuhyo = 'http://enoden.wiki.fc2.com/wiki/時刻表'
