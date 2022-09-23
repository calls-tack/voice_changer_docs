# voice_changer_docs

ボイチェンの情報をまとめたサイト。

## 事前準備

GitHub Pages の公式ドキュメントを参考に環境を構築する。  
[Jekyll を使用して GitHub Pages サイトを作成する](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)

テーマを導入する。  
[Just the Docs デモサイト](https://just-the-docs.github.io/just-the-docs/)

スクリプト実行環境を構築する。  
[Node.js 公式サイト](https://nodejs.org/ja/)
```
> npm install lunr lunr-languages
```

## push の前に

ローカルで確認する。
```
> bundle exec jekyll serve --config _config_local.yml
```

検索用インデックスを更新する。
```
> node script/build_index.js
```

`_config_local.yml` の内容を `_config.yml` にコピーし、下記のコメント・アンコメントを切り替える。
```
theme: just-the-docs
# remote_theme: just-the-docs/just-the-docs@v0.4.0.rc2
```

## サイト内検索

Just the Docs はサイト内検索のライブラリに Lunr.js を使用している。  
[Lunr.js 公式サイト](https://lunrjs.com/)  
[GitHub: lunr.js](https://github.com/olivernn/lunr.js)

デフォルトでは英語しか対応していないが、サポートライブラリで日本語に対応できる。  
[Lunr.js: Language Support](https://lunrjs.com/guides/language_support.html)  
[GitHub: lunr-languages](https://github.com/MihaiValentin/lunr-languages)

検索インデックスを事前に構築することで、サポートライブラリをサイトに配置せずとも動作する。  
[Lunr.js: Pre-building Indexes](https://lunrjs.com/guides/index_prebuilding.html)  
[JSの全文検索lunrをNode.jsで使う](https://blog.kozakana.net/2019/03/lunr-node/)

検証用スクリプト。  
`bundle exec jekyll serve` した後に下記を実行して、ローカルの確認ページで検索してみる。
```
> node script/index_exp.js
```
