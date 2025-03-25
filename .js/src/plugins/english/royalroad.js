var e=this&&this.__awaiter||function(e,a,l,t){return new(l||(l=Promise))((function(n,i){function r(e){try{s(t.next(e))}catch(e){i(e)}}function o(e){try{s(t.throw(e))}catch(e){i(e)}}function s(e){var a;e.done?n(e.value):(a=e.value,a instanceof l?a:new l((function(e){e(a)}))).then(r,o)}s((t=t.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var l,t,n,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},r=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return r.next=o(0),r.throw=o(1),r.return=o(2),"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(s){return function(o){if(l)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(l=1,t&&(n=2&o[0]?t.return:o[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,o[1])).done)return n;switch(t=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,t=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=a.call(e,i)}catch(e){o=[6,e],t=0}finally{l=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(exports,"__esModule",{value:!0});var l=require("htmlparser2"),t=require("@libs/fetch"),n=require("@libs/filterInputs"),i=require("@libs/novelStatus"),r=function(){function r(){this.id="royalroad",this.name="Royal Road",this.version="2.1.3",this.icon="src/en/royalroad/icon.png",this.site="https://www.royalroad.com/",this.filters={keyword:{type:n.FilterTypes.TextInput,label:"Keyword (title or description)",value:""},author:{type:n.FilterTypes.TextInput,label:"Author",value:""},genres:{type:n.FilterTypes.ExcludableCheckboxGroup,label:"Genres",value:{include:[],exclude:[]},options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Contemporary",value:"contemporary"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"Satire",value:"satire"},{label:"Sci-fi",value:"sci_fi"},{label:"Short Story",value:"one_shot"},{label:"Tragedy",value:"tragedy"}]},tags:{type:n.FilterTypes.ExcludableCheckboxGroup,label:"Tags",value:{include:[],exclude:[]},options:[{label:"Anti-Hero Lead",value:"anti-hero_lead"},{label:"Artificial Intelligence",value:"artificial_intelligence"},{label:"Attractive Lead",value:"attractive_lead"},{label:"Cyberpunk",value:"cyberpunk"},{label:"Dungeon",value:"dungeon"},{label:"Dystopia",value:"dystopia"},{label:"Female Lead",value:"female_lead"},{label:"First Contact",value:"first_contact"},{label:"GameLit",value:"gamelit"},{label:"Gender Bender",value:"gender_bender"},{label:"Genetically Engineered",value:"genetically_engineered "},{label:"Grimdark",value:"grimdark"},{label:"Hard Sci-fi",value:"hard_sci-fi"},{label:"Harem",value:"harem"},{label:"High Fantasy",value:"high_fantasy"},{label:"LitRPG",value:"litrpg"},{label:"Low Fantasy",value:"low_fantasy"},{label:"Magic",value:"magic"},{label:"Male Lead",value:"male_lead"},{label:"Martial Arts",value:"martial_arts"},{label:"Multiple Lead Characters",value:"multiple_lead"},{label:"Mythos",value:"mythos"},{label:"Non-Human Lead",value:"non-human_lead"},{label:"Portal Fantasy / Isekai",value:"summoned_hero"},{label:"Post Apocalyptic",value:"post_apocalyptic"},{label:"Progression",value:"progression"},{label:"Reader Interactive",value:"reader_interactive"},{label:"Reincarnation",value:"reincarnation"},{label:"Ruling Class",value:"ruling_class"},{label:"School Life",value:"school_life"},{label:"Secret Identity",value:"secret_identity"},{label:"Slice of Life",value:"slice_of_life"},{label:"Soft Sci-fi",value:"soft_sci-fi"},{label:"Space Opera",value:"space_opera"},{label:"Sports",value:"sports"},{label:"Steampunk",value:"steampunk"},{label:"Strategy",value:"strategy"},{label:"Strong Lead",value:"strong_lead"},{label:"Super Heroes",value:"super_heroes"},{label:"Supernatural",value:"supernatural"},{label:"Technologically Engineered",value:"technologically_engineered"},{label:"Time Loop",value:"loop"},{label:"Time Travel",value:"time_travel"},{label:"Urban Fantasy",value:"urban_fantasy"},{label:"Villainous Lead",value:"villainous_lead"},{label:"Virtual Reality",value:"virtual_reality"},{label:"War and Military",value:"war_and_military"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"}]},content_warnings:{type:n.FilterTypes.ExcludableCheckboxGroup,label:"Content Warnings",value:{include:[],exclude:[]},options:[{label:"Profanity",value:"profanity"},{label:"Sexual Content",value:"sexuality"},{label:"Graphic Violence",value:"graphic_violence"},{label:"Sensitive Content",value:"sensitive"},{label:"AI-Assisted Content",value:"ai_assisted"},{label:"AI-Generated Content",value:"ai_generated"}]},minPages:{type:n.FilterTypes.TextInput,label:"Min Pages",value:"0"},maxPages:{type:n.FilterTypes.TextInput,label:"Max Pages",value:"20000"},minRating:{type:n.FilterTypes.TextInput,label:"Min Rating (0.0 - 5.0)",value:"0.0"},maxRating:{type:n.FilterTypes.TextInput,label:"Max Rating (0.0 - 5.0)",value:"5.0"},status:{type:n.FilterTypes.Picker,label:"Status",value:"ALL",options:[{label:"All",value:"ALL"},{label:"Completed",value:"COMPLETED"},{label:"Dropped",value:"DROPPED"},{label:"Ongoing",value:"ONGOING"},{label:"Hiatus",value:"HIATUS"},{label:"Stub",value:"STUB"}]},orderBy:{type:n.FilterTypes.Picker,label:"Order by",value:"relevance",options:[{label:"Relevance",value:"relevance"},{label:"Popularity",value:"popularity"},{label:"Average Rating",value:"rating"},{label:"Last Update",value:"last_update"},{label:"Release Date",value:"release_date"},{label:"Followers",value:"followers"},{label:"Number of Pages",value:"length"},{label:"Views",value:"views"},{label:"Title",value:"title"},{label:"Author",value:"author"}]},dir:{type:n.FilterTypes.Picker,label:"Direction",value:"desc",options:[{label:"Ascending",value:"asc"},{label:"Descending",value:"desc"}]},type:{type:n.FilterTypes.Picker,label:"Type",value:"ALL",options:[{label:"All",value:"ALL"},{label:"Fan Fiction",value:"fanfiction"},{label:"Original",value:"original"}]}}}return r.prototype.parseNovels=function(e){var a=[],t={name:""},n=!1,i=!1,r=new l.Parser({onopentag:function(e,l){var r,o;(null===(r=l.class)||void 0===r?void 0:r.includes("fiction-list-item"))&&(n=!0),n&&("a"===e&&(null===(o=l.class)||void 0===o?void 0:o.includes("bold"))&&(t.path=l.href.slice(1),i=!0),"img"===e&&(t.cover=l.src),t.path&&t.name&&(a.push(t),(t={}).name=""))},ontext:function(e){i&&(t.name+=e)},onclosetag:function(e){"h2"===e&&(i=!1,n=!1)}});return r.write(e),r.end(),a},r.prototype.popularNovels=function(l,n){return e(this,arguments,void 0,(function(e,l){var n,i,r,o,s,u,c,v,p,b=l.filters,d=l.showLatestNovels;return a(this,(function(a){switch(a.label){case 0:for(i in n="".concat(this.site,"fictions/search"),n+="?page=".concat(e),b||(b=this.filters||{}),d&&(n+="&orderBy=last_update"),b)if(""!==b[i].value)if("genres"===i||"tags"===i||"content_warnings"===i){if(b[i].value.include)for(r=0,o=b[i].value.include;r<o.length;r++)s=o[r],n+="&tagsAdd=".concat(s);if(b[i].value.exclude)for(u=0,c=b[i].value.exclude;u<c.length;u++)v=c[u],n+="&tagsRemove=".concat(v)}else"object"==typeof b[i]&&(n+="&".concat(i,"=").concat(b[i].value));return[4,(0,t.fetchApi)(n).then((function(e){return e.text()}))];case 1:return p=a.sent(),[2,this.parseNovels(p)]}}))}))},r.prototype.parseNovel=function(n){return e(this,void 0,void 0,(function(){var e,r,o,s,u,c,v,p,b,d,h,y,f,g,m,_,w;return a(this,(function(a){switch(a.label){case 0:return[4,(0,t.fetchApi)(this.site+n)];case 1:return[4,a.sent().text()];case 2:switch(e=a.sent(),r={path:n,name:"",summary:"",chapters:[]},o=!1,s=!1,u=!1,c=!1,v=0,p=!1,b=!1,d=[],h=!1,y=!1,f=[],g=[],m=new l.Parser({onopentag:function(e,a){var l,t,n;"img"===e&&(null===(l=a.class)||void 0===l?void 0:l.includes("thumbnail"))&&(r.cover=a.src),"span"===e&&(null===(t=a.class)||void 0===t?void 0:t.includes("label-sm"))&&v++,"span"===e&&(null===(n=a.class)||void 0===n?void 0:n.includes("tags"))&&(p=!0)},onopentagname:function(e){"h1"===e&&(o=!0),c&&"a"===e&&(s=!0),p&&"a"===e&&(b=!0),"label"===e&&(u=!1,p=!1),h&&"script"===e&&(y=!0)},onattribute:function(e,a){"class"===e&&"description"===a&&(u=!0),"class"===e&&"page-footer footer"===a&&(h=!0)},ontext:function(e){o&&(r.name=r.name+e),s&&(r.author=e,s=!1),u&&(r.summary+=e),2===v&&(r.status=e.trim(),v++),b&&d.push(e),y&&e.includes("window.chapters =")&&(f=JSON.parse(e.match(/window.chapters = (.+])(?=;)/)[1]),g=JSON.parse(e.match(/window.volumes = (.+])(?=;)/)[1]))},onclosetag:function(e){"h1"===e&&(o=!1,c=!0),"h4"===e&&(c=!1),"a"===e&&(b=!1),"script"===e&&(y=!1),"body"===e&&(h=!1)}}),m.write(e),m.end(),r.summary=null===(w=r.summary)||void 0===w?void 0:w.trim(),r.genres=d.join(", "),r.status){case"ONGOING":r.status=i.NovelStatus.Ongoing;break;case"HIATUS":r.status=i.NovelStatus.OnHiatus;break;case"COMPLETED":r.status=i.NovelStatus.Completed;break;default:r.status=i.NovelStatus.Unknown}return _=f.map((function(e){var a=g.find((function(a){return a.id===e.volumeId}));return{name:e.title,path:e.url.slice(1),releaseTime:e.date,chapterNumber:null==e?void 0:e.order,page:null==a?void 0:a.title}})),r.chapters=_,[2,r]}}))}))},r.prototype.parseChapter=function(l){return e(this,void 0,void 0,(function(){var e,n,i,r;return a(this,(function(a){switch(a.label){case 0:return[4,(0,t.fetchApi)(this.site+l)];case 1:return[4,a.sent().text()];case 2:return e=a.sent(),n=[],i=function(a){a.forEach((function(a){var l,t=null===(l=e.match(a))||void 0===l?void 0:l[1];t&&n.push(t)}))},i([/<style>\n\s+.(.+?){[^]+?display: none;/,/(<div class="portlet solid author-note-portlet"[^]+?)<div class="margin-bottom-20/,/(<div class="chapter-inner chapter-content"[^]+?)<div class="portlet light t-center-3/,/(<\/div>\s+<div class="portlet solid author-note-portlet"[^]+?)<div class="row margin-bottom-10/]),r=new RegExp('<p class="'.concat(n[0],".+?</p>"),"g"),[2,n.slice(1).join("<hr>").replace(r,"").replace(/<p class="[^><]+>/g,"<p>")]}}))}))},r.prototype.searchNovels=function(l,n){return e(this,void 0,void 0,(function(){var e,i;return a(this,(function(a){switch(a.label){case 0:return e="".concat(this.site,"fictions/search?page=").concat(n,"&title=").concat(encodeURIComponent(l)),[4,(0,t.fetchApi)(e).then((function(e){return e.text()}))];case 1:return i=a.sent(),[2,this.parseNovels(i)]}}))}))},r}();exports.default=new r;