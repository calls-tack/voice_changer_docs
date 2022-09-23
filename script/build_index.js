const fs = require('fs');
const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support.js')(lunr);
require('lunr-languages/tinyseg.js')(lunr);
require('lunr-languages/lunr.ja.js')(lunr);

const docs_json = fs.readFileSync('_site/assets/js/search-data.json', 'utf-8');
const docs = JSON.parse(docs_json);
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
fs.writeFileSync('assets/js/lunr-index.json', idx_json, 'utf-8');
