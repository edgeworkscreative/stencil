/*! Built with http://stenciljs.com */
const{h:t}=window.App;class e{constructor(){this.mismatchedPixels=null}navToDiff(t){t.preventDefault(),t.stopPropagation(),this.diffNavChange.emit(this.diff.id)}render(){const e=this.diff,i="number"==typeof this.mismatchedPixels,s=i?this.mismatchedPixels/(e.width*e.deviceScaleFactor*(e.height*e.deviceScaleFactor)):null;let a="";return i?this.mismatchedPixels>0&&(a="has-mismatch"):a="not-calculated",[t("p",{class:"test-path"},e.testPath),t("dl",null,t("div",null,t("dt",null,"Diff"),t("dd",null,t("a",{href:"#diff-"+e.id,onClick:this.navToDiff.bind(this)},e.id))),e.comparable?[t("div",{class:a},t("dt",null,"Mismatched Pixels"),t("dd",null,i?this.mismatchedPixels:"--")),t("div",{class:a},t("dt",null,"Mismatched Ratio"),t("dd",null,i?s.toFixed(4):"--"))]:null,t("div",null,t("dt",null,"Device"),t("dd",null,e.device)),t("div",null,t("dt",null,"Width"),t("dd",null,e.width)),t("div",null,t("dt",null,"Height"),t("dd",null,e.height)),t("div",null,t("dt",null,"Device Scale Factor"),t("dd",null,e.deviceScaleFactor)),t("div",{class:"desc"},t("dt",null,"Description"),t("dd",null,e.desc)))]}static get is(){return"compare-analysis"}static get encapsulation(){return"shadow"}static get properties(){return{diff:{type:"Any",attr:"diff"},mismatchedPixels:{type:Number,attr:"mismatched-pixels"}}}static get events(){return[{name:"diffNavChange",method:"diffNavChange",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".test-path.sc-compare-analysis{margin-top:0;padding-top:0;font-size:10px;color:var(--analysis-data-color)}dl.sc-compare-analysis{padding:0;margin:0;font-size:var(--analysis-data-font-size);line-height:28px}div.sc-compare-analysis{display:-webkit-box;display:-ms-flexbox;display:flex;width:260px}dt.sc-compare-analysis{display:inline;-webkit-box-flex:2;-ms-flex:2;flex:2;font-weight:500}dd.sc-compare-analysis{display:inline;-webkit-box-flex:1;-ms-flex:1;flex:1;color:var(--analysis-data-color)}.desc.sc-compare-analysis, .desc.sc-compare-analysis   dt.sc-compare-analysis{display:block}.desc.sc-compare-analysis   dd.sc-compare-analysis{display:block;margin:0;line-height:22px}.not-calculated.sc-compare-analysis   dd.sc-compare-analysis{color:#ccc}.has-mismatch.sc-compare-analysis   dd.sc-compare-analysis{color:#ff6200}p.sc-compare-analysis{padding-top:14px;font-size:var(--analysis-data-font-size)}a.sc-compare-analysis{color:var(--analysis-data-color)}a.sc-compare-analysis:hover{text-decoration:none}"}}function i(t,e){return`screenshot_mismatch_${t}_${e}`}var s=function(t,e,i,s,n,c){c||(c={});for(var o=void 0===c.threshold?.1:c.threshold,m=35215*o*o,f=0,u=0;u<n;u++)for(var g=0;g<s;g++){var p=4*(u*s+g);if(l(t,e,p,p)>m)c.includeAA||!a(t,g,u,s,n,e)&&!a(e,g,u,s,n,t)?(i&&h(i,p,255,0,0),f++):i&&h(i,p,255,255,0);else if(i){var v=d(r(d((w=t)[(y=p)+0],b=w[y+3]/255),d(w[y+1],b),d(w[y+2],b)),.1);h(i,p,v,v,v)}}var w,y,b;return f};function a(t,e,i,s,r,n){for(var c,d,h,o,m=Math.max(e-1,0),f=Math.max(i-1,0),u=Math.min(e+1,s-1),g=Math.min(i+1,r-1),p=4*(i*s+e),v=0,w=0,y=0,b=0,A=0,S=m;S<=u;S++)for(var C=f;C<=g;C++)if(S!==e||C!==i){var x=l(t,t,p,4*(C*s+S),!0);if(0===x?v++:x<0?y++:x>0&&w++,v>2)return!1;n&&(x<b&&(b=x,c=S,d=C),x>A&&(A=x,h=S,o=C))}return!n||0!==y&&0!==w&&(!a(t,c,d,s,r)&&!a(n,c,d,s,r)||!a(t,h,o,s,r)&&!a(n,h,o,s,r))}function l(t,e,i,s,a){var l=t[i+3]/255,h=e[s+3]/255,o=d(t[i+0],l),m=d(t[i+1],l),f=d(t[i+2],l),u=d(e[s+0],h),g=d(e[s+1],h),p=d(e[s+2],h),v=r(o,m,f)-r(u,g,p);if(a)return v;var w=n(o,m,f)-n(u,g,p),y=c(o,m,f)-c(u,g,p);return.5053*v*v+.299*w*w+.1957*y*y}function r(t,e,i){return.29889531*t+.58662247*e+.11448223*i}function n(t,e,i){return.59597799*t-.2741761*e-.32180189*i}function c(t,e,i){return.21147017*t-.52261711*e+.31114694*i}function d(t,e){return 255+(t-255)*e}function h(t,e,i,s,a){t[e+0]=i,t[e+1]=s,t[e+2]=a,t[e+3]=255}function o(t,e,i){if(f.has(e))return void i(f.get(e));if(m.has(e))return void m.get(e).push(i);m.set(e,[i]);const s=document.createElement("script");s.src=`${t}screenshot_${e}.js`,document.head.appendChild(s)}window.loadScreenshot=((t,e)=>{const i=m.get(t);i&&(i.forEach(t=>t(e)),m.delete(t)),f.set(t,e)});const m=new Map,f=new Map;class u{constructor(){this.imageASrc=null,this.imageBSrc=null,this.imageAClass="is-loading",this.imageBClass="is-loading",this.canvasClass="is-loading",this.imagesLoaded=new Set,this.isImageALoaded=!1,this.isImageBLoaded=!1,this.isMismatchInitialized=!1,this.hasCalculatedMismatch=!1}componentWillLoad(){this.loadScreenshots()}componentWillUpdate(){this.loadScreenshots()}loadScreenshots(){if(this.show&&this.diff.hasIntersected)return this.diff.identical?(this.imageASrc=this.imagesUrl+this.diff.imageA,void(this.imageBSrc=this.imagesUrl+this.diff.imageB)):void(this.isMismatchInitialized||(this.isMismatchInitialized=!0,null!=this.jsonpUrl?(null!=this.diff.imageA&&o(this.jsonpUrl,this.diff.imageA,t=>{this.imageASrc=t}),null!=this.diff.imageB&&o(this.jsonpUrl,this.diff.imageB,t=>{this.imageBSrc=t})):(this.imageASrc=this.imagesUrl+this.diff.imageA,this.imageBSrc=this.imagesUrl+this.diff.imageB)))}async compareImages(){const t=this.diff;this.isImageALoaded&&this.isImageBLoaded&&!this.hasCalculatedMismatch&&t.comparable&&(this.hasCalculatedMismatch=!0,t.mismatchedPixels=await function(t,e,i,a,l){let r=-1;try{const n=document.createElement("canvas");n.width=a,n.height=l;const c=document.createElement("canvas");c.width=a,c.height=l;const d=n.getContext("2d");d.drawImage(t,0,0);const h=c.getContext("2d");h.drawImage(e,0,0);const o=document.createElement("canvas").getContext("2d");o.drawImage(t,0,0),o.getImageData(0,0,a,l);const m=d.getImageData(0,0,a,l).data,f=h.getImageData(0,0,a,l).data,u=i.getContext("2d"),g=u.createImageData(a,n.height);r=s(m,f,g.data,a,l,{threshold:.1}),u.putImageData(g,0,0)}catch(t){console.error(t)}return r}(this.imageA,this.imageB,this.canvas,Math.round(t.width*t.deviceScaleFactor),Math.round(t.height*t.deviceScaleFactor)),this.canvasClass="has-loaded",function(e,s,a){const l=i(t.imageA,t.imageB);localStorage.setItem(l,String(a))}(0,0,t.mismatchedPixels),this.compareLoaded.emit(t))}render(){const e=this.diff,i={width:e.width+"px",height:e.height+"px"};return[t("compare-cell",null,null!=e.imageA?t("a",{href:this.imagesUrl+e.imageA,target:"_blank"},t("img",{src:this.imageASrc,class:this.imageAClass,style:i,onLoad:this.diff.identical?null:()=>{this.isImageALoaded=!0,this.imageAClass="has-loaded",this.compareImages()},ref:t=>this.imageA=t})):null),t("compare-cell",null,null!=e.imageB?t("a",{href:this.imagesUrl+e.imageA,target:"_blank"},t("img",{src:this.imageBSrc,class:this.imageBClass,style:i,onLoad:this.diff.identical?null:()=>{this.isImageBLoaded=!0,this.imageBClass="has-loaded",this.compareImages()},ref:t=>this.imageB=t})):null),t("compare-cell",null,this.diff.identical?t("img",{style:i,src:this.imageASrc}):t("canvas",{width:Math.round(e.width*e.deviceScaleFactor),height:Math.round(e.height*e.deviceScaleFactor),class:this.canvasClass,style:i,hidden:!e.comparable,ref:t=>this.canvas=t})),t("compare-cell",null,t("compare-analysis",{mismatchedPixels:this.diff.mismatchedPixels,diff:this.diff}))]}static get is(){return"compare-row"}static get properties(){return{canvasClass:{state:!0},diff:{type:"Any",attr:"diff"},elm:{elementRef:!0},imageAClass:{state:!0},imageASrc:{state:!0},imageBClass:{state:!0},imageBSrc:{state:!0},imagesUrl:{type:String,attr:"images-url"},jsonpUrl:{type:String,attr:"jsonp-url"},show:{type:Boolean,attr:"show"}}}static get events(){return[{name:"compareLoaded",method:"compareLoaded",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"compare-row canvas,compare-row img{-webkit-box-shadow:var(--screenshot-box-shadow);box-shadow:var(--screenshot-box-shadow);border-radius:var(--screenshot-border-radius)}compare-cell a{display:block}.is-loading{visibility:hidden}"}}class g{render(){if(!this.a||!this.b||!this.diffs)return;let e=0;this.diffs.forEach(t=>{t.width>e&&(e=t.width)});const i={width:(e-=6)+"px"};return[t("th-cell",null,t("div",{style:i},t("a",{href:this.a.url},this.a.message))),t("th-cell",null,t("div",{style:i},t("a",{href:this.b.url},this.b.message))),t("th-cell",null,t("div",{style:i},"Diff")),t("th-cell",{class:"analysis"},t("div",null,"Analysis"))]}static get is(){return"compare-thead"}static get encapsulation(){return"shadow"}static get properties(){return{a:{type:"Any",attr:"a"},b:{type:"Any",attr:"b"},diffs:{type:"Any",attr:"diffs"}}}static get style(){return".sc-compare-thead-h{display:-webkit-box;display:-ms-flexbox;display:flex}th-cell.sc-compare-thead{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:500;font-size:12px}th-cell.sc-compare-thead   div.sc-compare-thead{padding-left:12px;padding-right:12px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}th-cell.sc-compare-thead   a.sc-compare-thead{color:var(--font-color);text-decoration:none}th-cell.sc-compare-thead   a.sc-compare-thead:hover{color:var(--analysis-data-color);text-decoration:underline}.analysis.sc-compare-thead   div.sc-compare-thead{width:262px}"}}function p(t,e){const i=Object.assign({},t,e),s=Object.keys(i),a=[];return s.map(t=>{const e=i[t];!0===e?a.push(t):null!=e&&""!==e&&a.push(t+"-"+e)}),window.location.hash=a.sort().join(";"),i}class v{constructor(){this.appSrcUrl="",this.imagesUrl="/data/images/",this.buildsUrl="/data/builds/",this.comparesUrl="/data/compares/",this.jsonpUrl=null,this.diffs=[]}async componentWillLoad(){this.match&&this.match.params.buildIdA&&this.match.params.buildIdB&&await this.loadBuilds(this.match.params.buildIdA,this.match.params.buildIdB),this.diffs=await function(t,e,s){const a=[];return e&&s?(s.screenshots.forEach(e=>{a.push({id:e.id,desc:e.desc,testPath:e.testPath,imageA:null,imageUrlA:null,imageB:e.image,imageUrlB:`${t}${e.image}`,identical:!1,comparable:!1,mismatchedPixels:null,width:e.width,height:e.height,deviceScaleFactor:e.deviceScaleFactor,device:e.device||e.userAgent,show:!1,hasIntersected:!1})}),e.screenshots.forEach(e=>{const i=a.find(t=>t.id===e.id);i&&(i.imageA=e.image,i.imageUrlA=`${t}${e.image}`)}),a.forEach(t=>{if(t.comparable=null!=t.imageA&&null!=t.imageB,t.identical=t.comparable&&t.imageA===t.imageB,!t.identical){const e=function(e,s){const a=i(t.imageA,t.imageB),l=localStorage.getItem(a);if("string"==typeof l){const t=parseInt(l,10);if(!isNaN(t))return t}return null}();"number"==typeof e&&(t.mismatchedPixels=e,0===t.mismatchedPixels&&(t.identical=!0))}}),a):a}(this.imagesUrl,this.a,this.b),this.filter=function(){const t={},e=location.hash.replace("#","");return""!==e&&e.split(";").forEach(e=>{const i=e.split("-");t[i[0]]=!(i.length>1)||i[1]}),t}(),this.updateDiffs()}componentDidLoad(){if("IntersectionObserver"in window){const t={root:document.querySelector(".scroll-y"),rootMargin:"1200px"},e=new IntersectionObserver(t=>{let e=!1;t.forEach(t=>{if(t.isIntersecting){const i=this.diffs.find(e=>t.target.id===`d-${e.id}`);i&&(i.hasIntersected=!0,e=!0)}}),e&&(window.requestIdleCallback?window.requestIdleCallback(()=>{this.updateDiffs()}):window.requestAnimationFrame(()=>{this.updateDiffs()}))},t),i=document.querySelectorAll("compare-row");for(let t=0;t<i.length;t++)e.observe(i[t])}else this.diffs.forEach(t=>{t.hasIntersected=!0}),this.updateDiffs();this.filter&&this.filter.diff&&this.navToDiff(this.filter.diff)}async loadBuilds(t,e){let i=`${this.buildsUrl}${t}.json`;"master"===t&&(i+=`?ts=${Date.now()}`);let s=`${this.buildsUrl}${e}.json`;"master"===e&&(s+=`?ts=${Date.now()}`);const a=await Promise.all([fetch(i),fetch(s)]),l=await a[0],r=await a[1];l.ok&&r.ok&&(this.a=await l.json(),this.b=await r.json())}filterChange(t){this.filter=p(this.filter,t.detail),this.updateDiffs()}diffNavChange(t){const e=t.detail;this.filter=p(this.filter,{diff:e}),this.updateDiffs(),this.navToDiff(e)}navToDiff(t){const e=document.getElementById(`d-${t}`),i=document.querySelector(".scroll-y");e&&i&&(i.scrollTop=e.offsetTop-84)}compareLoaded(t){const e=t.detail,i=this.diffs.find(t=>t.id===e.id);i&&(i.mismatchedPixels=e.mismatchedPixels),this.updateDiffs()}updateDiffs(){var t;this.diffs=(t=this.filter,this.diffs.map(e=>(e=Object.assign({},e),function(t,e){const i=!t.device||t.device===e.device,s=!t.search||e.desc.includes(t.search);let a=!0;return t.diff&&t.diff===e.id?a=!0:t.mismatch?null!=e.mismatchedPixels&&"all"!==t.mismatch&&(a=parseInt(t.mismatch,10)<e.mismatchedPixels):a=e.mismatchedPixels>0||null==e.mismatchedPixels,e.show=i&&s&&a,e}(t,e))).sort((t,e)=>t.mismatchedPixels>e.mismatchedPixels?-1:t.mismatchedPixels<e.mismatchedPixels?1:t.desc.toLowerCase()<e.desc.toLowerCase()?-1:t.desc.toLowerCase()>e.desc.toLowerCase()?1:t.device.toLowerCase()<e.device.toLowerCase()?-1:t.device.toLowerCase()>e.device.toLowerCase()?1:0))}render(){return[t("compare-header",{diffs:this.diffs,filter:this.filter,appSrcUrl:this.appSrcUrl}),t("section",{class:"scroll-x"},t("compare-thead",{a:this.a,b:this.b,diffs:this.diffs}),t("section",{class:"scroll-y"},t("compare-table",null,t("compare-tbody",null,this.diffs.map(e=>t("compare-row",{key:e.id,id:"d-"+e.id,show:e.show,hidden:!e.show,imagesUrl:this.imagesUrl,jsonpUrl:this.jsonpUrl,diff:e}))))))]}static get is(){return"screenshot-compare"}static get properties(){return{a:{type:"Any",attr:"a"},appSrcUrl:{type:String,attr:"app-src-url"},b:{type:"Any",attr:"b"},buildsUrl:{type:String,attr:"builds-url"},comparesUrl:{type:String,attr:"compares-url"},diffs:{state:!0},filter:{state:!0},imagesUrl:{type:String,attr:"images-url"},jsonpUrl:{type:String,attr:"jsonp-url"},match:{type:"Any",attr:"match"}}}static get listeners(){return[{name:"filterChange",method:"filterChange"},{name:"diffNavChange",method:"diffNavChange"},{name:"compareLoaded",method:"compareLoaded"}]}}export{e as CompareAnalysis,u as CompareRow,g as CompareThead,v as ScreenshotCompare};