var e=this&&this.__awaiter||function(e,l,a,t){return new(a||(a=Promise))((function(u,r){function n(e){try{v(t.next(e))}catch(e){r(e)}}function i(e){try{v(t.throw(e))}catch(e){r(e)}}function v(e){var l;e.done?u(e.value):(l=e.value,l instanceof a?l:new a((function(e){e(l)}))).then(n,i)}v((t=t.apply(e,l||[])).next())}))},l=this&&this.__generator||function(e,l){var a,t,u,r={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]},n=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return n.next=i(0),n.throw=i(1),n.return=i(2),"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function i(i){return function(v){return function(i){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,i[0]&&(r=0)),r;)try{if(a=1,t&&(u=2&i[0]?t.return:i[0]?t.throw||((u=t.return)&&u.call(t),0):t.next)&&!(u=u.call(t,i[1])).done)return u;switch(t=0,u&&(i=[2&i[0],u.value]),i[0]){case 0:case 1:u=i;break;case 4:return r.label++,{value:i[1],done:!1};case 5:r.label++,t=i[1],i=[0];continue;case 7:i=r.ops.pop(),r.trys.pop();continue;default:if(!(u=r.trys,(u=u.length>0&&u[u.length-1])||6!==i[0]&&2!==i[0])){r=0;continue}if(3===i[0]&&(!u||i[1]>u[0]&&i[1]<u[3])){r.label=i[1];break}if(6===i[0]&&r.label<u[1]){r.label=u[1],u=i;break}if(u&&r.label<u[2]){r.label=u[2],r.ops.push(i);break}u[2]&&r.ops.pop(),r.trys.pop();continue}i=l.call(e,r)}catch(e){i=[6,e],t=0}finally{a=u=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,v])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@libs/filterInputs"),u=require("@libs/fetch"),r=require("@libs/novelStatus"),n=require("cheerio"),i=a(require("dayjs")),v=function(){function a(){var e=this;this.id="zelluloza",this.name="Целлюлоза",this.site="https://zelluloza.ru",this.version="1.0.2",this.icon="src/ru/zelluloza/icon.png",this.parseDate=function(e){void 0===e&&(e="");var l=e.match(/(\d{2})\.(\d{2})\.(\d{4})г (\d{2}):(\d{2})/)||[],a=l[1],t=l[2],u=l[3],r=l[4],n=l[5];return a&&t&&u&&r&&n?(0,i.default)(u+"-"+t+"-"+a+" "+r+":"+n).format("LLL"):null},this.resolveUrl=function(l){return e.site+"/books/"+l},this.filters={sort:{label:"Сортировка",value:"3",options:[{label:"По рейтингу",value:"3"},{label:"По изменению",value:"0"},{label:"По длительности чтения",value:"1"},{label:"По количеству читателей",value:"2"},{label:"По популярности",value:"4"}],type:t.FilterTypes.Picker},genres:{label:"Жанры",value:"",options:[{label:"Все",value:""},{label:"16+",value:"204"},{label:"18+",value:"100"},{label:"Авантюра",value:"347"},{label:"Альтернативная история",value:"55"},{label:"Ангст",value:"463"},{label:"Аниме",value:"405"},{label:"Антиутопия",value:"21"},{label:"Апокалипсис",value:"368"},{label:"Аудиокнига",value:"391"},{label:"Байки",value:"435"},{label:"Бизнес-книги",value:"522"},{label:"Биография",value:"52"},{label:"Биопанк",value:"379"},{label:"Боевая фантастика",value:"512"},{label:"Боевик",value:"61"},{label:"Боевые искусства",value:"142"},{label:"Бояръ-аниме",value:"433"},{label:"Вбоквелл",value:"372"},{label:"Вестерн",value:"96"},{label:"Война миров",value:"137"},{label:"Восточное фэнтези",value:"505"},{label:"Городское фентези",value:"63"},{label:"Городское фэнтези",value:"520"},{label:"Готика",value:"83"},{label:"Детективы",value:"4"},{label:"Детские книги",value:"8"},{label:"Документальные книги",value:"351"},{label:"Дом и дача",value:"534"},{label:"Дорожные истории",value:"41"},{label:"Драма",value:"47"},{label:"Древняя литература",value:"529"},{label:"Женский психологический роман",value:"186"},{label:"Женский роман",value:"141"},{label:"Зарубежная классика",value:"524"},{label:"Здоровье и красота",value:"533"},{label:"Изучение языков",value:"537"},{label:"Иронический детектив",value:"85"},{label:"Исследования",value:"156"},{label:"Историческая литература",value:"3"},{label:"Исторический любовный роман",value:"518"},{label:"Историческое фэнтези",value:"90"},{label:"Киберпанк",value:"7"},{label:"Классическая литература",value:"9"},{label:"Книга-игра",value:"371"},{label:"Книги для родителей",value:"535"},{label:"Комедия",value:"80"},{label:"Конкурсные сборники",value:"349"},{label:"Короткий любовный роман",value:"517"},{label:"Космическая фантастика",value:"513"},{label:"Космоопера",value:"58"},{label:"Криминальная проза",value:"35"},{label:"Криптоистория",value:"400"},{label:"Ксенофантастика",value:"102"},{label:"Культура и искусство",value:"536"},{label:"Легенды",value:"161"},{label:"Лирика",value:"49"},{label:"ЛитРПГ",value:"62"},{label:"Любовная фантастика",value:"516"},{label:"Любовное фэнтези",value:"515"},{label:"Любовный роман",value:"46"},{label:"Магический реализм",value:"42"},{label:"Матриархат",value:"385"},{label:"Медицина",value:"57"},{label:"Мелодрама",value:"45"},{label:"Мемуары",value:"532"},{label:"Метафизика",value:"430"},{label:"Милитари",value:"126"},{label:"Мистика",value:"22"},{label:"Морские приключения",value:"211"},{label:"Мотивация",value:"135"},{label:"Научная фантастика",value:"122"},{label:"Научно-популярная",value:"43"},{label:"Ненаучная фантастика",value:"387"},{label:"Новелла",value:"498"},{label:"Нон-фикшн",value:"507"},{label:"Нуар",value:"121"},{label:"О войне",value:"136"},{label:"Оккультизм",value:"424"},{label:"Параллельные миры",value:"438"},{label:"Пародия",value:"108"},{label:"Подростковая фантастика",value:"27"},{label:"Подростковый роман",value:"388"},{label:"Подростковый ужастик",value:"110"},{label:"Постапокалипсис",value:"82"},{label:"Постапокалиптика",value:"67"},{label:"Поэзия",value:"44"},{label:"Превращение",value:"170"},{label:"Приключение",value:"497"},{label:"Приключения",value:"5"},{label:"Природа и животные",value:"538"},{label:"Проза",value:"95"},{label:"Производственный роман",value:"148"},{label:"Психология",value:"31"},{label:"Путешествия",value:"383"},{label:"Рассказы",value:"101"},{label:"Реализм",value:"422"},{label:"РеалРПГ",value:"442"},{label:"Религия",value:"188"},{label:"Робинзонада",value:"434"},{label:"Романтика",value:"130"},{label:"Романтическая фантастика",value:"501"},{label:"Русская классика",value:"523"},{label:"Рыцарский роман",value:"112"},{label:"Символизм",value:"439"},{label:"Сказки",value:"93"},{label:"Славянское фэнтези",value:"508"},{label:"Сновидения",value:"428"},{label:"Современный любовный роман",value:"519"},{label:"Социально-психологическая фантастика",value:"98"},{label:"Спорт",value:"147"},{label:"Справочники",value:"528"},{label:"Стимпанк",value:"56"},{label:"Субкультура",value:"209"},{label:"Сюрреализм",value:"26"},{label:"Тёмное фэнтези",value:"437"},{label:"Техномагия",value:"159"},{label:"Триллер",value:"6"},{label:"Трэш",value:"162"},{label:"Ужасы",value:"531"},{label:"Утопия",value:"191"},{label:"Учебник",value:"411"},{label:"Фантастика",value:"1"},{label:"Фантастический боевик",value:"38"},{label:"Фанфик",value:"111"},{label:"Философия",value:"461"},{label:"Фурри",value:"394"},{label:"Фэнтези",value:"2"},{label:"Хентай",value:"441"},{label:"Хобби и досуг",value:"530"},{label:"Хоррор",value:"86"},{label:"Чёрный юмор",value:"73"},{label:"Эзотерика",value:"30"},{label:"Экшн",value:"94"},{label:"Эпическое фэнтези",value:"499"},{label:"Эротика",value:"19"},{label:"Эссе",value:"353"},{label:"ЭТТИ",value:"502"},{label:"Юмористическая литература",value:"20"},{label:"Юмористическая фантастика",value:"514"},{label:"Юмористическое фэнтези",value:"521"},{label:"EVE - Миры Содружества",value:"99"}],type:t.FilterTypes.Picker}}}return a.prototype.popularNovels=function(a,t){return e(this,arguments,void 0,(function(e,a){var t,r,i,v,o,s,b,c=this,h=a.filters,p=a.showLatestNovels;return l(this,(function(l){switch(l.label){case 0:return t=p?"0":(null===(s=null==h?void 0:h.sort)||void 0===s?void 0:s.value)||"3",r=(null===(b=null==h?void 0:h.genres)||void 0===b?void 0:b.value)?"/search/genres/".concat(h.genres.value,"/?page=").concat(e):"/top/freebooks/?sort_order=".concat(t,"&page=").concat(e),[4,(0,u.fetchApi)(this.site+r).then((function(e){return e.text()}))];case 1:return i=l.sent(),v=(0,n.load)(i),o=[],v('section[class="book-card-item"]').each((function(e,l){o.push({name:v(l).find('span[itemprop="name"]').text()||"",cover:c.site+v(l).find('img[class="shadow"]').attr("src"),path:(v(l).find('a[class="txt"]').attr("href")||"").replace(/\D/g,"")})})),[2,o]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,t,i,v,o,s,b,c=this;return l(this,(function(l){switch(l.label){case 0:return[4,(0,u.fetchApi)(this.resolveUrl(a,!0)).then((function(e){return e.text()}))];case 1:return e=l.sent(),t=(0,n.load)(e),i={path:a,name:t('h2[class="bookname"]').text().trim(),cover:this.site+t('img[class="shadow"]').attr("src"),genres:null===(b=null===(s=null===(o=t(".gnres").text())||void 0===o?void 0:o.split)||void 0===s?void 0:s.call(o,": "))||void 0===b?void 0:b[1],summary:t("#bann_full").text()||t("#bann_short").text(),author:t(".author_link").text(),status:t(".tech_decription").text().includes("Пишется")?r.NovelStatus.Ongoing:r.NovelStatus.Completed},v=[],t('ul[class="g0"] div[class="w800_m"]').each((function(e,l){if(t(l).find('div[class="chaptfree"]').length){var a=t(l).find('a[class="chptitle"]'),u=t(l).find('div[class="stat"]').text();v.push({name:a.text().trim(),path:(a.attr("href")||"").split("/").slice(2,4).join("/"),releaseTime:c.parseDate(u),chapterNumber:e+1})}})),i.chapters=v,[2,i]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,t,r,n,i,v;return l(this,(function(l){switch(l.label){case 0:return e=a.split("/"),t=e[0],r=e[1],[4,(0,u.fetchApi)(this.site+"/ajaxcall/",{headers:{"Content-Type":"application/x-www-form-urlencoded",Referer:this.resolveUrl(a),Origin:this.site},method:"POST",body:new URLSearchParams({op:"getbook",par1:t,par2:r}).toString()}).then((function(e){return e.text()}))];case 1:return n=l.sent(),i=n.split("<END>")[0].split("\n"),v=i.map((function(e){return function(e){if(!e)return"";for(var l=[],a=0;a<e.length;a+=2){var t=e.substring(a,a+1),u=e.substring(a+1,a+2);l.push(o[t]+o[u])}return"<p>"+decodeURIComponent("%"+l.join("%"))+"</p>"}(e)})).join("").replace(/\r/g,"").trim(),[2,v.replace(/\[\*]([\s\S]*?)\[\/]/g,"<b>$1</b>").replace(/\[_]([\s\S]*?)\[\/]/g,"<u>$1</u>").replace(/\[-]([\s\S]*?)\[\/]/g,"<s>$1</s>").replace(/\[~]([\s\S]*?)\[\/]/g,"<i>$1</i>")]}}))}))},a.prototype.searchNovels=function(a,t){return e(this,void 0,void 0,(function(){var e,r,i,v=this;return l(this,(function(l){switch(l.label){case 0:return[4,(0,u.fetchApi)(this.site+"/ajaxcall/",{headers:{"Content-Type":"application/x-www-form-urlencoded",Referer:this.site+"/search/done/#result",Origin:this.site},method:"POST",body:new URLSearchParams({op:"morebooks",par1:a||"",par2:"206:0:0:0.0.0.0.0.0.0.10.0.0.0.0.0..0..:"+t,par4:""}).toString()}).then((function(e){return e.text()}))];case 1:return e=l.sent(),r=(0,n.load)(e),i=[],r('div[style="display: flex;"]').each((function(e,l){i.push({name:r(l).find('span[itemprop="name"]').text()||"",cover:v.site+r(l).find('img[class="shadow"]').attr("src"),path:(r(l).find('a[class="txt"]').attr("href")||"").replace(/\D/g,"")})})),[2,i]}}))}))},a}(),o={"~":"0",H:"1","^":"2","@":"3",f:"4",0:"5",5:"6",n:"7",r:"8","=":"9",W:"a",L:"b",7:"c"," ":"d",u:"e",c:"f"};exports.default=new v;