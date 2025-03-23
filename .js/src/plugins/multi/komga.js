var t=this&&this.__awaiter||function(t,e,a,r){return new(a||(a=Promise))((function(n,s){function i(t){try{l(r.next(t))}catch(t){s(t)}}function o(t){try{l(r.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(i,o)}l((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var a,r,n,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=o(0),i.throw=o(1),i.return=o(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(l){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(s=0)),s;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){s.label=o[1];break}if(6===o[0]&&s.label<n[1]){s.label=n[1],n=o;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(o);break}n[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}},a=this&&this.__rest||function(t,e){var a={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(a[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(t);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(a[r[n]]=t[r[n]])}return a};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("@libs/fetch"),n=require("@libs/filterInputs"),s=require("@libs/novelStatus"),i=require("cheerio"),o=require("@libs/storage"),l=function(){function l(){this.id="komga",this.name="Komga",this.icon="src/multi/komga/icon.png",this.version="1.0.1",this.site=o.storage.get("url"),this.email=o.storage.get("email"),this.password=o.storage.get("password"),this.filters={status:{value:"",label:"Status",options:[{label:"All",value:""},{label:"Completed",value:s.NovelStatus.Completed},{label:"Ongoing",value:s.NovelStatus.Ongoing},{label:"Cancelled",value:s.NovelStatus.Cancelled},{label:"OnHiatus",value:s.NovelStatus.OnHiatus}],type:n.FilterTypes.Picker},read_status:{value:"",label:"Read status",options:[{label:"All",value:""},{label:"Unread",value:"UNREAD"},{label:"Read",value:"READ"},{label:"In progress",value:"IN_PROGRESS"}],type:n.FilterTypes.Picker}},this.pluginSettings={email:{value:"",label:"Email",type:"Text"},password:{value:"",label:"Password"},url:{value:"",label:"URL"}}}return l.prototype.makeRequest=function(a){return t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(a,{headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8",Authorization:"Basic ".concat(this.btoa(this.email+":"+this.password))},Referer:this.site}).then((function(t){return t.text()}))];case 1:return[2,t.sent()]}}))}))},l.prototype.btoa=function(t){void 0===t&&(t="");for(var e=t,a="",r=0,n=void 0,s=0,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.charAt(0|s)||(i="=",s%1);a+=i.charAt(63&r>>8-s%1*8)){if((n=e.charCodeAt(s+=3/4))>255)throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");r=r<<8|n}return a},l.prototype.flattenArray=function(t){var e=this;return t.reduce((function(t,r){var n=r.children,s=a(r,["children"]);return t.push(s),n&&t.push.apply(t,e.flattenArray(n)),t}),[])},l.prototype.getSeries=function(a){return t(this,void 0,void 0,(function(){var t,r,n,s,i,o;return e(this,(function(e){switch(e.label){case 0:return t=[],[4,this.makeRequest(a)];case 1:for(r=e.sent(),n=JSON.parse(r).content,s=0,i=n;s<i.length;s++)o=i[s],t.push({name:o.name,path:"api/v1/series/"+o.id,cover:this.site+"api/v1/series/".concat(o.id,"/thumbnail")});return[2,t]}}))}))},l.prototype.popularNovels=function(a,r){return t(this,arguments,void 0,(function(t,a){var r,n,s,i,o=a.showLatestNovels,l=a.filters;return e(this,(function(e){switch(e.label){case 0:return r=(null==l?void 0:l.read_status.value)?"&read_status="+(null==l?void 0:l.read_status.value):"",n=(null==l?void 0:l.status.value)?"&status="+(null==l?void 0:l.status.value):"",s=o?"lastModified,desc":"name,asc",i="".concat(this.site,"api/v1/series?page=").concat(t-1).concat(r).concat(n,"&sort=").concat(s),[4,this.getSeries(i)];case 1:return[2,e.sent()]}}))}))},l.prototype.parseNovel=function(a){return t(this,void 0,void 0,(function(){var t,r,n,i,o,l,u,c,h,p,f,v,d,b,g,m,y,w,O;return e(this,(function(e){switch(e.label){case 0:return t={path:a,name:"Untitled"},r=this.site+a,[4,this.makeRequest(r)];case 1:switch(n=e.sent(),i=JSON.parse(n),t.name=i.name,t.author=i.booksMetadata.authors.filter((function(t){return"writer"===t.role})).reduce((function(t,e){return t+(""!==t?", ":"")+e.name}),""),t.cover=this.site+"api/v1/series/".concat(i.id,"/thumbnail"),t.genres=i.metadata.genres.join(", "),i.metadata.status){case"ENDED":t.status=s.NovelStatus.Completed;break;case"ONGOING":t.status=s.NovelStatus.Ongoing;break;case"ABANDONED":t.status=s.NovelStatus.Cancelled;break;case"HIATUS":t.status=s.NovelStatus.OnHiatus;break;default:t.status=s.NovelStatus.Unknown}return t.summary=i.booksMetadata.summary,o=[],[4,this.makeRequest(this.site+"api/v1/series/".concat(i.id,"/books?unpaged=true"))];case 2:l=e.sent(),u=JSON.parse(l).content,c=0,h=u,e.label=3;case 3:return c<h.length?(p=h[c],[4,this.makeRequest(this.site+"opds/v2/books/".concat(p.id,"/manifest"))]):[3,6];case 4:for(f=e.sent(),v=JSON.parse(f),d=this.flattenArray(v.toc),b=1,g=function(t){var e=d.find((function(e){var a;return(null===(a=e.href)||void 0===a?void 0:a.split("#")[0])===t.href})),a=e?e.title:null;o.push({name:"".concat(b,"/").concat(v.readingOrder.length," - ").concat(p.metadata.title).concat(a?" - "+a:""),path:"opds/v2"+(null===(O=t.href)||void 0===O?void 0:O.split("opds/v2").pop())}),b++},m=0,y=v.readingOrder;m<y.length;m++)w=y[m],g(w);e.label=5;case 5:return c++,[3,3];case 6:return t.chapters=o,[2,t]}}))}))},l.prototype.parseChapter=function(a){return t(this,void 0,void 0,(function(){var t;return e(this,(function(e){switch(e.label){case 0:return[4,this.makeRequest(this.site+a)];case 1:return t=e.sent(),[2,this.addUrlToImageHref(t,this.site+a.split("/").slice(0,-1).join("/")+"/")]}}))}))},l.prototype.addUrlToImageHref=function(t,e){var a=(0,i.load)(t,{xmlMode:!0});return a("svg image").each((function(t,r){var n=a(r).attr("href")||a(r).attr("xlink:href"),s=a(r).attr("width"),i=a(r).attr("height");if(n){var o=a("<img />").attr({src:n.startsWith("http")?n:"".concat(e).concat(n),width:s||void 0,height:i||void 0});a(r).closest("svg").replaceWith(o)}})),a("img").each((function(t,r){var n=a(r).attr("src");n&&!n.startsWith("http")&&a(r).attr("src","".concat(e).concat(n))})),a("a").each((function(t,e){a(e).replaceWith(a(e).text())})),a.xml()},l.prototype.searchNovels=function(a,r){return t(this,void 0,void 0,(function(){var t;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"api/v1/series?search=").concat(a,"&page=").concat(r-1),[4,this.getSeries(t)];case 1:return[2,e.sent()]}}))}))},l}();exports.default=new l;