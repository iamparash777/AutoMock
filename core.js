(function(root){
'use strict';
const ISO='AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const REGIONS=["Asia","Europe","Africa","North America","South America","Oceania","Other"];
const REGION_CODES={"Asia":"AE AF AM AZ BD BH BN BT CN CY GE HK ID IL IN IQ IR JO JP KG KH KP KR KW KZ LA LB LK MM MN MO MV MY NP OM PH PK PS QA SA SG SY TH TJ TL TM TR TW UZ VN YE","Europe":"AD AL AT AX BA BE BG BY CH CZ DE DK EE ES FI FO FR GB GG GI GR HR HU IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE SI SJ SK SM UA VA","Africa":"AO BF BI BJ BW CD CF CG CI CM CV DJ DZ EG EH ER ET GA GH GM GN GQ GW IO KE KM LR LS LY MA MG ML MR MU MW MZ NA NE NG RE RW SC SD SH SL SN SO SS ST SZ TD TG TN TZ UG YT ZA ZM ZW","North America":"AG AI AW BB BL BM BQ BS BZ CA CR CU CW DM DO GD GL GP GT HN HT JM KN KY LC MF MQ MS MX NI PA PM PR SV SX TC TT US VC VG VI","South America":"AR BO BR CL CO EC FK GF GS GY PE PY SR UY VE","Oceania":"AS AU CC CK CX FJ FM GU KI MH MP NC NF NR NU NZ PF PG PN PW SB TK TO TV UM VU WF WS","Other":"AQ BV HM TF"};
function regionOf(code){return REGIONS.find(r=>REGION_CODES[r].split(' ').includes(code))||'Other';}
const PROFILES={
 US:{label:'United States',locale:'en-US',currency:'USD',dial:'+1',female:['Olivia','Amelia','Sophia','Charlotte','Mia','Isabella'],male:['Liam','Noah','James','Elijah','Oliver','Henry'],last:['Morgan','Williams','Parker','Johnson','Lee','Taylor'],cities:['New York','Austin','Seattle','Chicago','Boston'],street:'Maple Street',phone:'202-555-01'},
 GB:{label:'United Kingdom',locale:'en-GB',currency:'GBP',dial:'+44',female:['Amelia','Isla','Florence','Freya','Poppy','Grace'],male:['Oliver','George','Arthur','Harry','Oscar','Leo'],last:['Smith','Davies','Wilson','Clarke','Evans','Walker'],cities:['London','Bristol','Manchester','Leeds','York'],street:'Willow Road',phone:'7700 900'},
 NP:{label:'Nepal',locale:'ne-NP',currency:'NPR',dial:'+977',female:['Aarati','Srijana','Anisha','Prakriti','Nisha','Sneha'],male:['Aarav','Suman','Prakash','Bikash','Rohan','Niraj'],last:['Shakya','Shrestha','Gurung','Tamang','Thapa','Karki'],cities:['Kathmandu','Pokhara','Lalitpur','Bhaktapur','Biratnagar'],street:'Sample Marg',phone:'98XX XXX'},
 IN:{label:'India',locale:'en-IN',currency:'INR',dial:'+91',female:['Aanya','Diya','Ishita','Priya','Ananya','Kavya'],male:['Aarav','Vihaan','Arjun','Aditya','Kabir','Rohan'],last:['Sharma','Patel','Singh','Rao','Mehta','Kapoor'],cities:['Mumbai','Delhi','Bengaluru','Pune','Jaipur'],street:'Sample Road',phone:'9XXX XXX'},
 DE:{label:'Germany',locale:'de-DE',currency:'EUR',dial:'+49',female:['Emilia','Hannah','Mia','Emma','Lina','Clara'],male:['Noah','Matteo','Leon','Finn','Elias','Paul'],last:['Schmidt','Weber','Meyer','Wagner','Becker','Hoffmann'],cities:['Berlin','Munich','Hamburg','Cologne','Dresden'],street:'Beispielstrasse',phone:'15XX XXX'},
 FR:{label:'France',locale:'fr-FR',currency:'EUR',dial:'+33',female:['Emma','Louise','Jade','Alice','Chloe','Lea'],male:['Gabriel','Louis','Raphael','Arthur','Jules','Hugo'],last:['Martin','Bernard','Dubois','Thomas','Robert','Moreau'],cities:['Paris','Lyon','Bordeaux','Nice','Lille'],street:'Rue Exemple',phone:'6 XX XX'},
 JP:{label:'Japan',locale:'ja-JP',currency:'JPY',dial:'+81',female:['Yui','Sakura','Aoi','Hina','Rin','Mei'],male:['Haruto','Minato','Ren','Yuto','Sota','Riku'],last:['Sato','Suzuki','Takahashi','Tanaka','Ito','Watanabe'],cities:['Tokyo','Kyoto','Osaka','Sapporo','Kobe'],street:'Sample district',phone:'90-XXXX'},
 AU:{label:'Australia',locale:'en-AU',currency:'AUD',dial:'+61',female:['Charlotte','Amelia','Isla','Olivia','Ava','Mia'],male:['Oliver','Noah','Jack','Leo','William','Lucas'],last:['Smith','Nguyen','Wilson','Brown','Jones','Williams'],cities:['Sydney','Melbourne','Perth','Adelaide','Brisbane'],street:'Example Avenue',phone:'4XX XXX'}
};
Object.assign(PROFILES,{"NG":{"label":"Nigeria","locale":"en-NG","currency":"NGN","dial":"+234","female":["Ada","Chiamaka","Zainab","Amina","Ifeoma","Funke"],"male":["Chidi","Emeka","Tunde","Ibrahim","Umar","Segun"],"last":["Okafor","Adeyemi","Bello","Eze","Ibrahim","Obi"],"cities":["Lagos","Abuja","Ibadan","Kano","Enugu"],"street":"Example Road","phone":"8XX XXX"},"KE":{"label":"Kenya","locale":"en-KE","currency":"KES","dial":"+254","female":["Wanjiku","Amina","Njeri","Grace","Faith","Zawadi"],"male":["Kamau","Brian","Otieno","David","Kiptoo","James"],"last":["Mwangi","Otieno","Wanjala","Kipchoge","Njoroge","Ochieng"],"cities":["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret"],"street":"Example Road","phone":"7XX XXX"},"BR":{"label":"Brazil","locale":"pt-BR","currency":"BRL","dial":"+55","female":["Alice","Helena","Laura","Julia","Mariana","Beatriz"],"male":["Miguel","Arthur","Heitor","Davi","Gabriel","Lucas"],"last":["Silva","Santos","Oliveira","Souza","Costa","Pereira"],"cities":["Sao Paulo","Rio de Janeiro","Brasilia","Salvador","Recife"],"street":"Rua Exemplo","phone":"XX 9XXXX"},"MX":{"label":"Mexico","locale":"es-MX","currency":"MXN","dial":"+52","female":["Sofia","Valentina","Camila","Regina","Ximena","Daniela"],"male":["Santiago","Mateo","Leonardo","Emiliano","Diego","Daniel"],"last":["Garcia","Hernandez","Martinez","Lopez","Gonzalez","Perez"],"cities":["Mexico City","Guadalajara","Monterrey","Puebla","Merida"],"street":"Calle Ejemplo","phone":"XX XXXX"},"CA":{"label":"Canada","locale":"en-CA","currency":"CAD","dial":"+1","female":["Olivia","Emma","Charlotte","Amelia","Sophia","Mia"],"male":["Noah","Liam","Oliver","Leo","Theodore","William"],"last":["Smith","Brown","Tremblay","Roy","Wilson","Martin"],"cities":["Toronto","Vancouver","Montreal","Ottawa","Calgary"],"street":"Example Street","phone":"XXX XXX"},"NZ":{"label":"New Zealand","locale":"en-NZ","currency":"NZD","dial":"+64","female":["Isla","Amelia","Charlotte","Olivia","Ava","Willow"],"male":["Noah","Oliver","Leo","Jack","Luca","George"],"last":["Smith","Williams","Brown","Taylor","Wilson","Jones"],"cities":["Auckland","Wellington","Christchurch","Hamilton","Dunedin"],"street":"Example Road","phone":"2X XXX"}});
const TYPES={fullName:'Full name',firstName:'First name',lastName:'Last name',username:'Username',email:'Email',url:'URL',id:'ID',date:'Date',address:'Address',phone:'Phone number',currency:'Currency',country:'Country',language:'Language',city:'City'};
const LANGS='en ne hi de fr ja es zh ar pt ko it nl sv tr ru uk bn ur ta'.split(' ');
const pick=a=>a[Math.floor(Math.random()*a.length)];
const digits=n=>Array.from({length:n},()=>Math.floor(Math.random()*10)).join('');
const flag=code=>String.fromCodePoint(...code.toUpperCase().split('').map(c=>127397+c.charCodeAt(0)));
function countries(region='all'){const d=new Intl.DisplayNames(['en'],{type:'region'});return ISO.filter(code=>region==='all'||regionOf(code)===region).map(code=>({code,name:d.of(code),flag:flag(code),region:regionOf(code)})).sort((a,b)=>a.name.localeCompare(b.name));}
function make(type,o={}){
 const p=PROFILES[o.country]||PROFILES.US;
 const sex=o.gender==='female'?'female':o.gender==='male'?'male':pick(['female','male']);
 const first=pick(p[sex]),last=pick(p.last),city=pick(p.cities),slug=(first+'.'+last).toLowerCase();
 if(type==='custom') {const rows=(o.entries||[]).filter(e=>!o.gender||o.gender==='mixed'||e.gender===o.gender);if(!rows.length)throw Error('No entries match this gender. Choose Mixed or add matching entries.');return pick(rows).value;}
 switch(type){
 case 'fullName':return first+' '+last;
 case 'firstName':return first;
 case 'lastName':return last;
 case 'username':return slug.replace('.','_')+digits(2);
 case 'email':return slug+'@example.com';
 case 'url':return 'https://example.com/people/'+slug;
 case 'id':return 'USR-'+digits(8);
 case 'city':return city;
 case 'country':{const list=countries(o.region||'all');if(!list.length)throw Error('No countries in this region.');return pick(list).name;}
 case 'language':{const regional={"Asia":["ne","hi","ja","zh","ko","bn","ur","ta","ar","th","vi","id"],"Europe":["en","de","fr","es","it","nl","sv","ru","uk","pl","el","pt"],"Africa":["sw","en","fr","ar","yo","ig","ha","am","af"],"North America":["en","es","fr"],"South America":["es","pt","gn"],"Oceania":["en","mi","sm","fj"],"Other":[]};const list=o.region&&o.region!=='all'?(regional[o.region]||[]):LANGS;if(!list.length)throw Error('No language presets for this region.');return new Intl.DisplayNames(['en'],{type:'language'}).of(pick(list));}
 case 'address':return (10+Math.floor(Math.random()*190))+' '+p.street+', '+city+', '+p.label;
 case 'phone':return p.dial+' '+p.phone+digits(o.country==='US'?2:3);
 case 'currency':{const min=Number(o.minAmount===undefined?10:o.minAmount),max=Number(o.maxAmount===undefined?5000:o.maxAmount);if(!Number.isFinite(min)||!Number.isFinite(max)||min>max)throw Error('Enter a valid amount range.');return new Intl.NumberFormat(p.locale,{style:'currency',currency:o.currency||p.currency}).format(min+Math.random()*(max-min));}
 case 'date':{const start=Date.parse((o.start||'2025-01-01')+'T00:00:00Z'),end=Date.parse((o.end||'2027-12-31')+'T00:00:00Z');if(!Number.isFinite(start)||!Number.isFinite(end)||start>end)throw Error('Choose a valid date range.');const date=new Date(start+Math.floor(Math.random()*(Math.floor((end-start)/86400000)+1))*86400000);const y=date.getUTCFullYear(),m=String(date.getUTCMonth()+1).padStart(2,'0'),d=String(date.getUTCDate()).padStart(2,'0');if(o.dateFormat==='iso')return y+'-'+m+'-'+d;if(o.dateFormat==='dmy')return d+'/'+m+'/'+y;if(o.dateFormat==='mdy')return m+'/'+d+'/'+y;return new Intl.DateTimeFormat(p.locale,{dateStyle:o.dateFormat==='long'?'long':'short',timeZone:'UTC'}).format(date);}
 default:throw Error('Unknown content type.');
 }
}
function csv(text){
 const rows=[];let row=[],cell='',quoted=false;
 text=text.replace(/^\uFEFF/,'');
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else if(quoted||cell==='')quoted=!quoted;else cell+=c;}
 else if(c===','&&!quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x.trim()))rows.push(row);row=[];cell='';}else cell+=c;}
 if(quoted)throw Error('CSV contains an unclosed quote.');row.push(cell);if(row.some(x=>x.trim()))rows.push(row);return rows;
}
function entries(text,format='lines'){
 let items;
 if(format==='json'){items=JSON.parse(text);if(!Array.isArray(items))throw Error('JSON must be an array of strings or {value, gender} objects.');}
 else if(format==='csv'){const rows=csv(text);const header=(rows[0]||[]).map(x=>x.trim().toLowerCase());const v=header.indexOf('value'),g=header.indexOf('gender');items=(v>=0?rows.slice(1):rows).map(r=>({value:r[v>=0?v:0],gender:g>=0?r[g]:'mixed'}));}
 else items=text.split(/\r?\n/).filter(x=>x.trim()).map(line=>{const m=line.match(/^(female|male|mixed)\s*\|\s*(.+)$/i);return m?{gender:m[1].toLowerCase(),value:m[2]}:line;});
 const out=items.map(x=>{if(typeof x==='string')x={value:x};if(!x||typeof x.value!=='string')throw Error('Each entry needs a text value.');const gender=String(x.gender||'mixed').trim().toLowerCase();if(!['female','male','mixed'].includes(gender))throw Error('Gender must be female, male, or mixed.');return {value:x.value.trim(),gender};}).filter(x=>x.value);
 if(!out.length)throw Error('Add at least one entry.');if(out.length>10000)throw Error('Maximum 10,000 entries per collection.');return out;
}
function mapURL(o){
 const lon=Number(o.lon),lat=Number(o.lat),zoom=Number(o.zoom);
 if(!Number.isFinite(lon)||lon< -180||lon>180||!Number.isFinite(lat)||lat< -85||lat>85||!Number.isFinite(zoom)||zoom<0||zoom>22)throw Error('Enter valid coordinates and zoom (0-22).');
 if(!/^pk\.[A-Za-z0-9_.-]+$/.test(o.token||''))throw Error('Enter a Mapbox public token beginning with pk.');
 let style=o.mode==='satellite'?'mapbox/satellite-streets-v12':o.mode==='dark'?'mapbox/dark-v11':'mapbox/streets-v12';
 if(o.mode==='traffic'){if(!/^[\w-]+\/[\w-]+$/.test(o.trafficStyle||''))throw Error('Traffic requires your Mapbox owner/style-id containing a traffic layer.');style=o.trafficStyle;}
 return 'https://api.mapbox.com/styles/v1/'+style+'/static/'+(o.pin?'pin-s+635bff('+lon+','+lat+')/':'')+lon+','+lat+','+zoom+'/640x400@2x?access_token='+encodeURIComponent(o.token);
}
const api={ISO,REGIONS,REGION_CODES,regionOf,PROFILES,TYPES,pick,countries,flag,make,csv,entries,mapURL};if(typeof module!=='undefined')module.exports=api;root.ContentCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
