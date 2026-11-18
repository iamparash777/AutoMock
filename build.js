const fs=require('node:fs'),path=require('node:path');
const dir=__dirname;
const core=fs.readFileSync(path.join(dir,'core.js'),'utf8');
const assets=JSON.stringify(JSON.parse(fs.readFileSync(path.join(dir,'assets.json'),'utf8'))).replace(/</g,'\\u003c');
const source=fs.readFileSync(path.join(dir,'ui.source.html'),'utf8');
fs.writeFileSync(path.join(dir,'ui.html'),source.replace('/* CORE_INSERT */',()=>core+'\nconst ContentAssets='+assets+';'));
console.log('Built ui.html with offline SVG assets');
