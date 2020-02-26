# enoden-unyo

## License

These codes are licensed under CC0.

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png "CC0")](http://creativecommons.org/publicdomain/zero/1.0/deed.ja)

## files
### html版
#### io
https://aoiica.github.io/enoden-unyo/html-enoden2019.html
ブラウザ版は上のURLにアクセスすれば開ける

#### html-enoden2019.html
ページ表示するためのhtml読めばわかる

#### main.js
描画処理、大まかにいうとn時op分のときは、n時00分の位置をレコードから引っ張り出しopぶん位置の値を変化させ描画している。位置のデータは藤沢鎌倉間を36分割した粒度。すると1分で1/36進めればいいので楽。正確性は捨てた。稲村ガ崎の59分発とかあるけれど見なかったことにする。

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
keys.pyにtwitterのapiキーを格納して呼び出す。
のでtwitterのapiキーがないと動かない。

結果をtoday.pyに書き込むが、today.pyへ手打ちもできるため、ぶっちゃけいらない。自動でやってくれるだけ。

#### today.py
今日の編成とかを書き込んで、enoden2019.pyが読み出しに来る。手打ちしておk。

#### enoden2019.py
メインの処理はこれ。2019は古いファイルとの識別のためにつけたら外すのを忘れただけで深い意味はない。

段落とし交互発車運用の時のstateデータは整備途中。正確性を増すために、描画のところは改善したい。
