var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(a,i){function o(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}l((n=n.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var r,n,a,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},o=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return o.next=s(0),o.throw=s(1),o.return=s(2),"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(l){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(i=0)),i;)try{if(r=1,n&&(a=2&s[0]?n.return:s[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,s[1])).done)return a;switch(n=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){i.label=s[1];break}if(6===s[0]&&i.label<a[1]){i.label=a[1],a=s;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(s);break}a[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("@libs/fetch"),n=require("@libs/filterInputs"),a=require("cheerio"),i=function(){function i(){this.id="WTRLAB",this.name="WTR-LAB",this.site="https://wtr-lab.com/",this.version="1.0.1",this.icon="src/en/wtrlab/icon.png",this.sourceLang="en/",this.filters={order:{value:"chapter",label:"Order by",options:[{label:"View",value:"view"},{label:"Name",value:"name"},{label:"Addition Date",value:"date"},{label:"Reader",value:"reader"},{label:"Chapter",value:"chapter"}],type:n.FilterTypes.Picker},sort:{value:"desc",label:"Sort by",options:[{label:"Descending",value:"desc"},{label:"Ascending",value:"asc"}],type:n.FilterTypes.Picker},storyStatus:{value:"all",label:"Status",options:[{label:"All",value:"all"},{label:"Ongoing",value:"ongoing"},{label:"Completed",value:"completed"}],type:n.FilterTypes.Picker}}}return i.prototype.popularNovels=function(n,i){return e(this,arguments,void 0,(function(e,n){var i,o,s,l,c=this,u=n.showLatestNovels,p=n.filters;return t(this,(function(t){switch(t.label){case 0:return i=this.site+this.sourceLang+"novel-list?",i+="orderBy=".concat(p.order.value),i+="&order=".concat(p.sort.value),i+="&filter=".concat(p.storyStatus.value),i+="&page=".concat(e),u?[4,(0,r.fetchApi)(this.site+"api/home/recent",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({page:e})})]:[3,3];case 1:return[4,t.sent().json()];case 2:return o=t.sent(),[2,o.data.map((function(e){return{name:e.serie.data.title||"",cover:e.serie.data.image,path:c.sourceLang+"serie-"+e.serie.raw_id+"/"+e.serie.slug||""}}))];case 3:return[4,(0,r.fetchApi)(i).then((function(e){return e.text()}))];case 4:return s=t.sent(),l=(0,a.load)(s),[2,l(".serie-item").map((function(e,t){return{name:l(t).find(".title-wrap > a").text().replace(l(t).find(".rawtitle").text(),"")||"",cover:l(t).find("img").attr("src"),path:l(t).find("a").attr("href")||""}})).get().filter((function(e){return e.name&&e.path}))]}}))}))},i.prototype.parseNovel=function(n){return e(this,void 0,void 0,(function(){var e,i,o,s,l,c,u=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+n).then((function(e){return e.text()}))];case 1:return e=t.sent(),i=(0,a.load)(e),(o={path:n,name:i("h1.text-uppercase").text(),cover:i(".img-wrap > img").attr("src"),summary:i(".lead").text().trim()}).genres=i('td:contains("Genre")').next().find("a").map((function(e,t){return i(t).text()})).toArray().join(","),o.author=i('td:contains("Author")').next().text().replace(/[\t\n]/g,""),o.status=i('td:contains("Status")').next().text().replace(/[\t\n]/g,""),s=i("#__NEXT_DATA__").html()+"",l=JSON.parse(s),c=l.props.pageProps.serie.chapters.map((function(e,t){var r;return{name:e.title,path:u.sourceLang+"serie-"+l.props.pageProps.serie.serie_data.raw_id+"/"+l.props.pageProps.serie.serie_data.slug+"/chapter-"+e.order,releaseTime:null===(r=(null==e?void 0:e.created_at)||(null==e?void 0:e.updated_at))||void 0===r?void 0:r.substring(0,10),chapterNumber:t+1}})),o.chapters=c,[2,o]}}))}))},i.prototype.parseChapter=function(n){return e(this,void 0,void 0,(function(){var e,i,o,s,l,c,u,p,h,f;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+n).then((function(e){return e.text()}))];case 1:for(e=t.sent(),i=(0,a.load)(e),o=i("#__NEXT_DATA__").html()+"",s=JSON.parse(o),l=JSON.stringify(s.props.pageProps.serie.chapter_data.data.body),c=JSON.parse(l),u="",p=0,h=c;p<h.length;p++)f=h[p],u+="<p>".concat(f,"</p>");return[2,u]}}))}))},i.prototype.searchNovels=function(n){return e(this,void 0,void 0,(function(){var e,a=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+"api/search",{headers:{"Content-Type":"application/json",Referer:this.site+this.sourceLang,Origin:this.site},method:"POST",body:JSON.stringify({text:n})})];case 1:return[4,t.sent().json()];case 2:return e=t.sent(),[2,e.data.map((function(e){return{name:e.data.title||"",cover:e.data.image,path:a.sourceLang+"serie-"+e.raw_id+"/"+e.slug||""}}))]}}))}))},i}();exports.default=new i;