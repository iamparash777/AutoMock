'use strict';
figma.showUI(__html__,{width:460,height:740,themeColors:true});
let busy=false;
const STORAGE='content-nest-v1';
function targets(kind){
 const found=[],seen=new Set();
 function visit(n){if(seen.has(n.id)||n.locked||n.visible===false)return;seen.add(n.id);if(kind==='text'&&n.type==='TEXT')found.push(n);else if(kind==='image'&&['RECTANGLE','ELLIPSE','POLYGON','STAR','VECTOR','FRAME','COMPONENT','INSTANCE'].includes(n.type)&&'fills' in n)found.push(n);if(kind==='text'&&'children' in n)n.children.forEach(visit);}
 figma.currentPage.selection.forEach(visit);return found;
}
function selection(){figma.ui.postMessage({type:'selection',selected:figma.currentPage.selection.length,text:targets('text').length,image:targets('image').length});}
figma.on('selectionchange',selection);
async function fonts(node){const all=node.characters.length?node.getRangeAllFontNames(0,node.characters.length):[node.fontName];const seen=new Set();for(const font of all){if(font===figma.mixed)continue;const key=JSON.stringify(font);if(!seen.has(key)){seen.add(key);await figma.loadFontAsync(font);}}}
function place(n,i){const c=figma.viewport.center;n.x=c.x+(i%4)*280;n.y=c.y+Math.floor(i/4)*280;}
function report(done,failed){figma.commitUndo();selection();figma.ui.postMessage({type:'done',message:done+' layer'+(done===1?'':'s')+' updated'+(failed?'; '+failed+' skipped (locked, unsupported, or missing fonts)':'')+'.'});}
async function raster(msg){
 if(Array.isArray(msg.bytes)&&msg.bytes.length<=15000000)return figma.createImage(new Uint8Array(msg.bytes));
 throw Error('Image data is missing or too large.');
}
figma.ui.onmessage=async msg=>{
 let acquired=false;
 try{
 if(msg.type==='ready'){let collections=[];try{const saved=await figma.clientStorage.getAsync(STORAGE);if(Array.isArray(saved))collections=saved;}catch(e){figma.ui.postMessage({type:'warning',message:'Saved collections could not be loaded.'});}figma.ui.postMessage({type:'collections',collections});selection();return;}
 if(msg.type==='save'){if(!Array.isArray(msg.collections)||JSON.stringify(msg.collections).length>4000000)throw Error('Collection storage limit reached (4 MB). Export a backup and reduce the collection.');await figma.clientStorage.setAsync(STORAGE,msg.collections);figma.ui.postMessage({type:'saved'});return;}
 if(!['text','image','svg'].includes(msg.type))return;
 if(busy)throw Error('Please wait for the current operation.');busy=true;acquired=true;
 if(msg.type==='text'){
 if(!Array.isArray(msg.values)||!msg.values.length||msg.values.length>500||msg.values.some(v=>typeof v!=='string'||v.length>20000))throw Error('Invalid text values (maximum 500).');
 const nodes=targets('text');if(!nodes.length&&figma.currentPage.selection.length)throw Error('Select text layers, or a frame containing text.');if(nodes.length>500)throw Error('Select at most 500 text layers.');let done=0,failed=0;
 let textY=figma.viewport.center.y;
 if(!nodes.length){await figma.loadFontAsync({family:'Inter',style:'Regular'});for(let i=0;i<msg.values.length;i++){const n=figma.createText();n.fontName={family:'Inter',style:'Regular'};n.fontSize=16;n.characters=msg.values[i];n.name=msg.label||'Content Nest';n.x=figma.viewport.center.x;n.y=textY;textY+=n.height+20;nodes.push(n);}done=nodes.length;figma.currentPage.selection=nodes;}
 else for(let i=0;i<nodes.length;i++){try{await fonts(nodes[i]);nodes[i].characters=msg.values[i%msg.values.length];done++;}catch(e){failed++;}}
 report(done,failed);
 }else if(msg.type==='image'){
 const image=await raster(msg),nodes=targets('image');if(!nodes.length&&figma.currentPage.selection.length)throw Error('Select a shape or frame to fill.');let done=0,failed=0;
 if(!nodes.length){const n=figma.createRectangle();n.resize(msg.map?640:240,msg.map?400:240);place(n,0);nodes.push(n);figma.currentPage.selection=nodes;}
 for(const n of nodes){try{n.fills=[{type:'IMAGE',scaleMode:msg.map?'FIT':'FILL',imageHash:image.hash}];n.name=msg.label||'Content Nest image';done++;}catch(e){failed++;}}report(done,failed);
 }else{
 if(typeof msg.svg!=='string'||msg.svg.length>1000000||!/<svg[\s>]/i.test(msg.svg)||/<script|<foreignObject|\son\w+\s*=/i.test(msg.svg))throw Error('Unsupported SVG.');
 const n=figma.createNodeFromSvg(msg.svg);n.name=msg.label||'Content Nest icon';place(n,0);figma.currentPage.selection=[n];report(1,0);
 }
 }catch(e){figma.ui.postMessage({type:'error',message:e.message||String(e)});}finally{if(acquired)busy=false;}
};
