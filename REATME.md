# enoden-unyo

## License

These codes are licensed under CC0.

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png "CC0")](http://creativecommons.org/publicdomain/zero/1.0/deed.ja)

## files
### searchTweet.py
keys.pyにtwitterのapiキーを格納して呼び出す。
のでtwitterのapiキーがないと動かない。

結果をtoday.pyに書き込むが、today.pyへ手打ちもできるため、ぶっちゃけいらない。自動でやってくれるだけ。

### today.py
今日の編成とかを書き込んで、enoden2019.pyが読み出しに来る。手打ちしておk。

### enoden2019.py
メインの処理はこいつ。2019は古いファイルとの識別のためにつけたら外すのを忘れただけで深い意味はない。

段落とし交互発車運用の時のstateデータは整備途中。正確性を増すために、描画のところは改善したい。
