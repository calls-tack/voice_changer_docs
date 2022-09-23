const fs = require('fs');
const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support.js')(lunr);
require('lunr-languages/tinyseg.js')(lunr);
require('lunr-languages/lunr.ja.js')(lunr);

const docs = {
    "0": {
        doc: "夏目漱石",
        title: "吾輩は猫である",
        content: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。",
        url: "/test/#%E5%90%BE%E8%BC%A9%E3%81%AF%E7%8C%AB%E3%81%A7%E3%81%82%E3%82%8B",
        relUrl: "/#吾輩は猫である",
    },
    "1": {
        doc: "福沢諭吉",
        title: "学問のすゝめ",
        content: "「天は人の上に人を造らず人の下に人を造らず」と言えり。されば天より人を生ずるには、万人は万人みな同じ位にして、生まれながら貴賤上下の差別なく、万物の霊たる身と心との働きをもって天地の間にあるよろずの物を資り、もって衣食住の用を達し、自由自在、互いに人の妨げをなさずしておのおの安楽にこの世を渡らしめ給うの趣意なり。",
        url: "/test/#%E5%AD%A6%E5%95%8F%E3%81%AE%E3%81%99%E3%82%9D%E3%82%81",
        relUrl: "/#学問のすゝめ",
    },
    "2": {
        doc: "太宰治",
        title: "蜘蛛の糸",
        content: "ある日の事でございます。御釈迦様は極楽の蓮池のふちを、独りでぶらぶら御歩きになっていらっしゃいました。池の中に咲いている蓮の花は、みんな玉のようにまっ白で、そのまん中にある金色の蕊からは、何とも云えない好い匂が、絶間なくあたりへ溢れて居ります。極楽は丁度朝なのでございましょう。",
        url: "/test/#%E8%9C%98%E8%9B%9B%E3%81%AE%E7%B3%B8",
        relUrl: "/#蜘蛛の糸",
    },
};

const docs_json = JSON.stringify(docs/*, null, 2*/);
fs.writeFileSync('_site/assets/js/search-data.json', docs_json, 'utf-8');

const idx = lunr(function () {
    this.use(lunr.ja);
    this.ref('id');
    this.field('title', { boost: 200 });
    this.field('content', { boost: 2 });
    this.field('relUrl');
    this.metadataWhitelist = ['position'];
    for (var i in docs) {
        this.add({
          id: i,
          title: docs[i].title,
          content: docs[i].content,
          relUrl: docs[i].relUrl,
        });
    }
});

const idx_json = JSON.stringify(idx/*, null, 2*/);
fs.writeFileSync('_site/assets/js/lunr-index.json', idx_json, 'utf-8');
