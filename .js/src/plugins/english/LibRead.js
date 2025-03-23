var e=this&&this.__awaiter||function(e,t,r,a){return new(r||(r=Promise))((function(n,l){function i(e){try{u(a.next(e))}catch(e){l(e)}}function o(e){try{u(a.throw(e))}catch(e){l(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,o)}u((a=a.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var r,a,n,l={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=o(0),i.throw=o(1),i.return=o(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(u){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(l=0)),l;)try{if(r=1,a&&(n=2&o[0]?a.return:o[0]?a.throw||((n=a.return)&&n.call(a),0):a.next)&&!(n=n.call(a,o[1])).done)return n;switch(a=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,a=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(n=l.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){l.label=o[1];break}if(6===o[0]&&l.label<n[1]){l.label=n[1],n=o;break}if(n&&l.label<n[2]){l.label=n[2],l.ops.push(o);break}n[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],a=0}finally{r=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("@libs/fetch"),a=require("cheerio"),n=require("@libs/filterInputs"),l=function(){function l(){this.id="libread",this.name="Lib Read",this.icon="src/en/libread/icon.png",this.site="https://libread.com",this.version="1.1.0",this.filters={type_genre:{type:n.FilterTypes.Picker,label:"Novel Type/Genre",value:"all",options:[{label:"Tous",value:"all"},{label:"═══NOVEL TYPES═══",value:"/sort/latest-release/"},{label:"Chinese Novel",value:"/sort/latest-release/chinese-novel/"},{label:"Korean Novel",value:"/sort/latest-release/korean-novel/"},{label:"Japanese Novel",value:"/sort/latest-release/japanese-novel/"},{label:"English Novel",value:"/sort/latest-release/english-novel/"},{label:"═══GENRES═══",value:"genre"},{label:"Action",value:"/genre/Action/"},{label:"Adult",value:"/genre/Adult/"},{label:"Adventure",value:"/genre/Adventure/"},{label:"Comedy",value:"/genre/Comedy/"},{label:"Drama",value:"/genre/Drama/"},{label:"Eastern",value:"/genre/Eastern/"},{label:"Ecchi",value:"/genre/Ecchi/"},{label:"Fantasy",value:"/genre/Fantasy/"},{label:"Game",value:"/genre/Game/"},{label:"Gender Bender",value:"/genre/Gender+Bender/"},{label:"Harem",value:"/genre/Harem/"},{label:"Historical",value:"/genre/Historical/"},{label:"Horror",value:"/genre/Horror/"},{label:"Josei",value:"/genre/Josei/"},{label:"Martial Arts",value:"/genre/Martial+Arts/"},{label:"Mature",value:"/genre/Mature/"},{label:"Mecha",value:"/genre/Mecha/"},{label:"Mystery",value:"/genre/Mystery/"},{label:"Psychological",value:"/genre/Psychological/"},{label:"Reincarnation",value:"/genre/Reincarnation/"},{label:"Romance",value:"/genre/Romance/"},{label:"School Life",value:"/genre/School+Life/"},{label:"Sci-fi",value:"/genre/Sci-fi/"},{label:"Seinen",value:"/genre/Seinen/"},{label:"Shoujo",value:"/genre/Shoujo/"},{label:"Shounen Ai",value:"/genre/Shounen+Ai/"},{label:"Shounen",value:"/genre/Shounen/"},{label:"Slice of Life",value:"/genre/Slice+of+Life/"},{label:"Smut",value:"/genre/Smut/"},{label:"Sports",value:"/genre/Sports/"},{label:"Supernatural",value:"/genre/Supernatural/"},{label:"Tragedy",value:"/genre/Tragedy/"},{label:"Wuxia",value:"/genre/Wuxia/"},{label:"Xianxia",value:"/genre/Xianxia/"},{label:"Xuanhuan",value:"/genre/Xuanhuan/"},{label:"Yaoi",value:"/genre/Yaoi/"}]}}}return l.prototype.getCheerio=function(n){return e(this,void 0,void 0,(function(){var e,l;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(n)];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site (".concat(e.status,": ").concat(e.statusText,") try to open in webview."));return l=a.load,[4,e.text()];case 2:return[2,l.apply(void 0,[t.sent()])]}}))}))},l.prototype.parseNovels=function(e){return e(".li-row").map((function(t,r){return{name:e(r).find(".tit").text()||"",cover:e(r).find("img").attr("src"),path:e(r).find("h3 > a").attr("href")||""}})).get().filter((function(e){return e.name&&e.path}))},l.prototype.popularNovels=function(r,a){return e(this,arguments,void 0,(function(e,r){var a,n,l=r.showLatestNovels,i=r.filters;return t(this,(function(t){switch(t.label){case 0:if(a=this.site,l)a+="/sort/latest-novels/";else if(i&&i.type_genre&&"all"!==i.type_genre.value&&"genre"!==i.type_genre.value)a+=i.type_genre.value;else{if(a+="/most-popular/",1!=e)return[2,[]];e=0}return a+=e,[4,this.getCheerio(a)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},l.prototype.parseNovel=function(r){return e(this,void 0,void 0,(function(){var e,a,n;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+r)];case 1:return e=t.sent(),(a={path:r,name:e("h1.tit").text(),cover:e(".pic > img").attr("src"),summary:e(".inner").text().trim()}).genres=e("[title=Genre]").next().text().replace(/[\t\n]/g,""),a.author=e("[title=Author]").next().text().replace(/[\t\n]/g,""),a.status=e("[title=Status]").next().text().replace(/[\t\n]/g,""),a.genres=e("[title=Genre]").next().text().trim().replace(/[\t\n]/g,",").replace(/, /g,","),n=e("#idData > li > a").map((function(t,a){return{name:e(a).attr("title")||"Chapter "+(t+1),path:e(a).attr("href")||r.replace(".html","/chapter-"+(t+1)+".html"),releaseTime:null,chapterNumber:t+1}})).get(),a.chapters=n,[2,a]}}))}))},l.prototype.parseChapter=function(r){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+r)];case 1:return(e=t.sent())("style").text().includes("p:nth-last-child(1)")&&e("div.txt").find("p:last-child").remove(),[2,e("div.txt").html()||""]}}))}))},l.prototype.searchNovels=function(n){return e(this,void 0,void 0,(function(){var e,l,i,o,u;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+"/search/",{headers:{"Content-Type":"application/x-www-form-urlencoded",Referer:this.site,Origin:this.site},method:"POST",body:new URLSearchParams({searchkey:n}).toString()})];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return i=a.load,[4,e.text()];case 2:if(l=i.apply(void 0,[t.sent()]),o=(null===(u=l("script").text().match(/alert\((.*?)\)/))||void 0===u?void 0:u[1])||"")throw new Error(o);return[2,this.parseNovels(l)]}}))}))},l}();exports.default=new l;