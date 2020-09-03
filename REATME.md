# enoden-unyo

## License

These codes are licensed under CC0.

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png "CC0")](http://creativecommons.org/publicdomain/zero/1.0/deed.ja)

## files
### html&javascript版
#### io
ブラウザ版のURL
https://aoiica.github.io/enoden-unyo/enodoko.html

#### enodoko.html
いろいろ

#### html-enoden2019.htm
旧URL。リダイレクトかけた。

#### eCore.js
起点のjavascriptファイル、ここから追えばだいたいいける。以前のmainを縮小したもの。

#### eCalc.js
時間を渡すと、走行位置が返ってくる

#### eDraw.js
いろいろ渡すと、いい感じにcanvasに描画してくれる。N_draw(unyouDnmList,unnList,kmkrPltf)のみ外部から呼ばれる。そのうちクラス化して静的メソッドにしたい。

#### eFill.js
canvas以外のhtml要素へのアウトプットを担当

#### uny.js
サーバーの方で収集した#江ノ電運用;をeCoreに渡すためのもの

#### eusCron.sh
サーバーの方で動かしているスクリプト。yahooリアルタイムにリクエストを送って、いい感じに処理して、uny.jsに書き出すだけ。おそらくアップしてなかったはず。

#### 旧main.js
描画処理。大まか流れは、x時yz分のときにx時00分の位置をレコードから引っ張り出しyzの分だけ位置の値(リストで管理)を変化させ描画している。位置のデータは藤沢鎌倉間を36分割した粒度。すると1分で1/36進めればいいので楽。正確性は捨てた。稲村ガ崎の59分発とかあるけれど見なかったことにする。



### 作業用スクリプト
#### xlsx.py
毎分位置リストを作るためのコード

#### powerplay.py
毎分位置リストを作るためのコード

#### 毎分位置リストの作り方
1. wikiから全時間時刻表をコピーしてきて表計算ソフトに貼る
2. 3.のために1~6の6つの表にバラす(任意)
3. columnに1~6,rowに510~0005の表を作る
4. 到着時刻と出発時刻のみが表にあるため、滞在時間中の位置も埋めるためにxlsx.pyに突っ込む
5. 早朝動き出すまでと深夜終電してからの位置を手作業で修正
6. ここまでは駅位置を0~15で進めてきたので0~36に翻訳する
7. 方法問わず表を2次元リストにする(惰性で全てexcelでやっている)
8. 連想配列を作るためにpowerplay.pyに突っ込む
9. 時間がキーで位置がバリューの連想配列が全時間分できた



### Python3版
#### searchTweet.py
keys.pyにtwitterのapiキーを格納して呼び出す。なのでtwitterのapiキーがないと動かない。

結果をtoday.pyに書き込むが、today.pyへ手打ちもできるため、実はいらない子。自動でやってくれるだけ。

#### today.py
今日の編成とかを書き込んで、enoden2019.pyが読み出しに来る。手打ちしてOK。

#### enoden2019.py
メインの処理はこのスクリプト。2019は古いファイルとの識別のためにつけたら外すのを忘れただけで深い意味はない。

段落とし交互発車運用の時のstateデータは整備途中。正確性を増すために、描画のところは改善したい。
