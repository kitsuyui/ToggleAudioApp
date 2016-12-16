# ToggleAudioApp.js

いい感じに iTunes と Google Chrome の再生状態を切り替えてくれるコマンド

## こんなストレスをなくします。

1. iTunes でお気に入りの音楽を聴きはじめる。
2. おもしろそうな動画を YouTube で見つけて再生する。
3. iTunes で聴いてる曲と重なって、なにがなんだかわからない。
4. iTunes の再生を止める。
5. YouTube の再生を巻き戻す。
6. 動画を観る。
7. さぁ観終わったぞ。さぁ iTunes に切り替えてまた再生し始めなきゃ……。

ToggleAudioApp.js は Google Chrome で再生が始まったら iTunes を自動的に停止します。
そして Google Chrome の再生が止まったら、また iTunes を再生し始めます。

## 使い方

シェルで ToggleAudioApp.js を実行しておくだけです。

```console
$ ./ToggleAudioApp.js
```

ずっとカレントシェルで立ち上げておくのは面倒です。
nohup で起動したり LaunchDaemons に追加してもよいでしょう。

### epichrome ユーザに朗報

[epichrome](https://github.com/dmarmor/epichrome) を使ってブラウザを分離している場合でも、
引数にそのアプリケーション名を渡すことで Google Chrome と同様に検出できます。

例えば

```console
$ ./ToggleAudioApp.js 'YouTube' 'Nicovideo' 'SoundCloud'
```

といった具合です。

`~/.taa_rc` が設定ファイルです。 1 行につき 1 アプリケーション記入することができます。
`#` を先頭に書いた行や空行はコメント行として無視します。

```
Google Chrome
Netflix
Nicovideo
SoundCloud
```

## アプリケーション版

ここからダウンロードできます。メニューバーに `T` のアイコンで立ち上がります。
https://github.com/kitsuyui/ToggleAudioApp/releases

## 注意

Google Chrome の再生状態については、 HTML5 の Audio 要素と Video 要素を使って検出しています。
つまり、それ以外の音をだすオブジェクト (例えば Flash Player や Java Applet などなど) には無力です。
これを解決することは技術的にはおそらく可能ですが、今のところは修正する予定はありません。

## License

[BSD 2-clause "Simplified" License](https://spdx.org/licenses/BSD-2-Clause)
