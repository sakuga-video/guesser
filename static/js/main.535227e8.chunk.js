(this.webpackJsonpaniguesser=this.webpackJsonpaniguesser||[]).push([[0],{129:function(e,t,n){},135:function(e,t,n){"use strict";n.r(t),n.d(t,"dark_theme",(function(){return Ee}));var r=n(0),a=n.n(r),s=n(11),i=n.n(s),c=(n(96),n(15)),o=n(25),u=n(26),l=n(72),d=n.n(l),g=(n(129),n(178)),j=n(193),m=n(180),v=n(181),p=n(194),b=n(73),f=n(47),h={videos:[],guesses:[],index:0,guess_to_show:void 0,playing:!1,tags:[]},O=Object(f.b)({name:"app",initialState:h,reducers:{change_video:function(e,t){var n,r=t.payload,a=e.index,s=null===(n=e.guesses[a])||void 0===n?void 0:n.guess;e.guesses[a]={guess:s,answers:r.tags},e.videos[a]?e.videos[a].push(r):e.videos[a]=[r]},submit_guess:function(e){var t,n,r=e.guesses,a=e.index,s=e.videos[a];void 0!==s&&(e.guess_to_show=a,r[a]||(r[a]={answers:null!==(t=null===(n=s[s.length-1])||void 0===n?void 0:n.tags)&&void 0!==t?t:[]}))},show_next_tag:function(e){var t=e.index;t+1<be.length?e.index=t+1:(e.index=0,e.playing=!1),e.guess_to_show=void 0},start:function(e,t){e.index=0,e.guesses=[],e.playing=!0,e.tags=t.payload},change_guess:function(e,t){var n,r,a=t.payload,s=e.index,i=e.videos[s];i&&(e.guesses[s]={guess:a,answers:null!==(n=null===(r=i[i.length-1])||void 0===r?void 0:r.tags)&&void 0!==n?n:[]})}}}),x=O.actions,_=x.change_video,w=x.show_next_tag,y=x.start,C=x.submit_guess,T=x.change_guess,k=O.reducer,A=n(173),S=n(177),E=n(75),N=n(5),R=function(e){var t=e.duration,n=e.size,a=e.type,s=e.on_time_over,i=e.interval,o=void 0===i?50:i,u=e.className,l=e.count_down,d=void 0!==l&&l,g=e.show_emergency_color,j=void 0!==g&&g,m=1e3*t/o,v=Object(E.useTimer)({endTime:m,interval:o,onTimeOver:s}),p=v.time,b=v.start,f=v.reset;Object(r.useEffect)((function(){return b(),f}),[f,b]);var h=function(e){return 100*(d?m-e:e)/m},O={color:h(p)<25&&j?"secondary":"primary",variant:"determinate",value:h(p),className:u};return"linear"===a?Object(N.jsx)(A.a,Object(c.a)({},O)):Object(N.jsx)(S.a,Object(c.a)({size:n},O))},I=Object(g.a)({wrapper:{position:"relative"},fabProgress:{position:"absolute",top:-6,left:-6}}),P={keys:[function(e){return e.name}],baseSort:function(e,t){return t.item.count-e.item.count}},F=function(e,t){var n=t.inputValue;return n?Object(b.a)(e,n,P).slice(0,100):[]},H=function(e){var t=e.all_tags,n=xe(),a=I(),s=Object(r.useState)(null),i=Object(o.a)(s,2),u=i[0],l=i[1];return Object(N.jsxs)("form",{id:"guess",onSubmit:function(e){e.preventDefault(),u&&n(C())},children:[Object(N.jsx)("div",{id:"guess-input",children:Object(N.jsx)(p.a,{selectOnFocus:!0,clearOnBlur:!0,autoHighlight:!0,autoComplete:!0,disableClearable:!0,clearOnEscape:!0,options:t,style:{width:300},filterOptions:F,getOptionLabel:function(e){return e.name},onChange:function(e,t){var r;l(t),n(T(null!==(r=null===t||void 0===t?void 0:t.name)&&void 0!==r?r:""))},renderInput:function(e){return Object(N.jsx)(j.a,Object(c.a)(Object(c.a)({},e),{},{label:"Guess the title",variant:"filled",autoFocus:!0}))}})}),Object(N.jsxs)("div",{className:a.wrapper,children:[Object(N.jsx)(R,{size:68,duration:30,on_time_over:function(){return n(C())},count_down:!0,show_emergency_color:!0,className:a.fabProgress}),Object(N.jsx)(m.a,{type:"submit","area-label":"submit",children:Object(N.jsx)(v.a,{})})]})]})},B=n(36),G=n.n(B),L=n(57),z=n(46);function Y(){return(Y=Object(L.a)(G.a.mark((function e(){var t,n;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/tag.json?limit=0&order=count&type="+K.COPYRIGHT);case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent.map(M),e.abrupt("return",n.filter((function(e){return e.count>0})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e){return J.apply(this,arguments)}function J(){return(J=Object(L.a)(G.a.mark((function e(t){var n,r,a,s,i,c,o;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.tag,a=t.page,s=null!==(n=s=void 0===a?void 0:a)&&void 0!==n?n:Object(z.random)(r.count),i="/api/post.json?limit=1&page="+s+"&tags="+r.name.replaceAll(" ","_")+" rating:safe",e.next=5,fetch(i);case 5:return c=e.sent,e.next=8,c.json();case 8:if(!q((o=e.sent)[0])){e.next=13;break}return e.abrupt("return",{data:o[0],page:s});case 13:return e.abrupt("return",D({tag:r,page:V(s,r)}));case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var M=function(e){return{count:e.count,id:e.id,name:e.name.replaceAll("_"," ")}},V=function(e,t){return(e+1)%t.count};function q(e){return e&&e.file_url&&("mp4"===e.file_ext||"webm"===e.file_ext)&&e.id}var K,Q=function(e){var t=e.tag,n=e.video,a=e.video_wrapper,s=Object(r.useState)(void 0),i=Object(o.a)(s,2),c=i[0],u=i[1],l=xe();Object(r.useEffect)((function(){var e=!0;return D({tag:t}).then((function(t){if(e){var n=a.wrap(t.data);l(_(n)),u(t.page)}})),function(){e=!1}}),[t,a,l]);var d=function(e){var t=a.wrap(e.data);l(_(t)),u(e.page)};return Object(N.jsx)("video",{muted:!0,preload:"auto",autoPlay:!0,src:null===n||void 0===n?void 0:n.url,onEnded:function(){var e=V(c,t);D({tag:t,page:e}).then(d)}})},U=n(189),W=n(136),X=Object(g.a)({timer:{width:"100%"},root:{flexBasis:"400px"}}),Z=function(e){return e.length>0?Object(N.jsxs)("p",{children:["it was ",Object(z.sortBy)(e,(function(e){return e.count}))[e.length-1].name]}):null},$=function(e){var t=e.guess,n=e.answers,r=e.closest_answer,a=e.result,s=e.is_exact,i=xe(),c=X(),o=Object(N.jsx)(R,{duration:4,on_time_over:function(){return i(w())},type:"linear",className:c.timer});return Object(N.jsxs)(W.a,{id:"guess-result",className:c.root,children:["missing"!==a&&Object(N.jsx)("p",{children:t}),"correct"===a&&!s&&Object(N.jsxs)("p",{children:["(",r,")"]}),Object(N.jsx)("h1",{children:{correct:"\ud83c\udf89 is correct \ud83c\udf8a",incorrect:"is incorrect",missing:"No guess"}[a]}),"correct"!==a&&Z(n),o]})},ee=function(e){var t=e.score,n=e.max_score;return Object(N.jsxs)("p",{id:"score",className:"controls",children:["Correct: ",t,"/",n]})},te=n(84),ne=function(e){var t,n;if(!e.guess)return{result:"missing",is_exact:!1};var r=new te.a(e.answers.map((function(e){return e.name})),{includeScore:!0,threshold:.1}).search(e.guess);return{result:r.length>0?"correct":"incorrect",is_exact:0===(null===(t=r[0])||void 0===t?void 0:t.score),closest_answer:null===(n=r[0])||void 0===n?void 0:n.item}},re=n(13),ae=n(14),se=n(82),ie=function(){function e(t){Object(re.a)(this,e),this.tags_by_name=void 0,this.tags_by_name=Object(se.a)(t.map((function(e){return[e.name,e]})))}return Object(ae.a)(e,[{key:"wrap",value:function(e){var t=this;return{tags:e.tags.split(" ").map((function(e){return e.replaceAll("_"," ")})).map((function(e){return t.tags_by_name.get(e)})).filter((function(e){return void 0!==e})),url:e.file_url,id:e.id,preview_url:e.preview_url}}}]),e}(),ce=n(182),oe=n(183),ue=n(184),le=n(185),de=n(186),ge=n(187),je=n(188),me=function(e){var t=ne(e),n='"'+e.guess+'" ';return{missing:"No guess",correct:n+"\ud83c\udf89 was correct \ud83c\udf8a",incorrect:n+"was incorrect"}[t.result]},ve=Object(g.a)({root:{minHeight:250}}),pe=function(e){var t=e.rounds,n=e.all_tags,r=xe(),a=ve();return Object(N.jsxs)(je.a,{children:[Object(N.jsx)(ce.a,{container:!0,spacing:2,children:t.map((function(e,t){return Object(N.jsx)(ce.a,{item:!0,className:"round-summary",xs:12,sm:6,md:4,children:Object(N.jsx)(oe.a,{classes:a,children:Object(N.jsxs)(ue.a,{href:"https://www.sakugabooru.com/post?tags="+e.tag.name.replaceAll(" ","_"),target:"_blank",children:[Object(N.jsx)(le.a,{component:"img",title:"Image thumbnail of a clip from "+e.videos[0].tags[0].name,alt:"Image thumbnail of a clip from "+e.videos[0].tags[0].name,image:e.videos[0].preview_url}),Object(N.jsxs)(de.a,{children:[Object(N.jsx)(ge.a,{gutterBottom:!0,variant:"h5",component:"h2",children:e.tag.name}),Object(N.jsx)(ge.a,{variant:"body2",component:"p",children:me(e.guess)})]})]})})},t)}))}),Object(N.jsx)("div",{id:"play-again",children:Object(N.jsx)(U.a,{variant:"contained",onClick:function(){return r(y(fe(n)))},color:"primary",children:"Play Again"})})]})};!function(e){e[e.GENERAL=0]="GENERAL",e[e.ARTIST=1]="ARTIST",e[e.COPYRIGHT=3]="COPYRIGHT",e[e.CHARACTER=4]="CHARACTER"}(K||(K={}));var be=[{max:1e5,min:500},{max:1e5,min:500},{max:1e5,min:500},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:100,min:25},{max:25,min:1},{max:25,min:1},{max:1,min:1}];function fe(e){return be.map((function(t){var n=t.max,r=t.min;return d()(e.filter((function(e){var t=e.count;return n>=t&&t>=r})))}))}function he(e,t){return void 0!==t?e+1:e}function Oe(e,t){for(var n=0,r=0;r<t;r++)"correct"===ne(e[r]).result&&(n+=1);return n}var xe=function(){return Object(u.b)()};var _e=function(){var e=Object(u.c)((function(e){return e.app})),t=e.guesses,n=e.index,s=e.videos,i=e.guess_to_show,l=e.playing,d=e.tags,g=Object(u.c)((function(e){for(var t=e.app,n=t.tags.length,r=[],a=0;a<n;a++)r.push({tag:t.tags[a],videos:t.videos[a],guess:t.guesses[a]});return r})),j=Object(u.c)((function(e){var t=e.app.guess_to_show;return void 0===t?void 0:ne(e.app.guesses[t])})),m=xe(),v=Object(r.useState)([]),p=Object(o.a)(v,2),b=p[0],f=p[1],h=Object(r.useState)(void 0),O=Object(o.a)(h,2),x=O[0],_=O[1];return Object(r.useEffect)((function(){(function(){return Y.apply(this,arguments)})().then((function(e){f(e),_(new ie(e))}))}),[]),!l&&t.length>0?Object(N.jsx)(pe,{rounds:g,all_tags:b}):Object(N.jsxs)("div",{id:"game",children:[l&&Object(N.jsx)(ee,{score:Oe(t,he(n,i)),max_score:he(n,i)}),0===b.length&&Object(N.jsx)(R,{duration:.8}),!l&&0===t.length&&b.length>0&&Object(N.jsx)(U.a,{variant:"contained",disabled:0===b.length,onClick:function(){return m(y(fe(b)))},id:"start",children:"Start"}),l&&d.length>0&&void 0===i&&x&&Object(N.jsxs)(a.a.Fragment,{children:[Object(N.jsx)(Q,{tag:d[n],video:s[n]?s[n][s[n].length-1]:void 0,video_wrapper:x}),s[n]&&Object(N.jsx)(H,{all_tags:b})]}),void 0!==i&&void 0!==j&&Object(N.jsx)($,Object(c.a)(Object(c.a)({},j),t[i]))]})},we=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,195)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),s(e),i(e)}))},ye=n(191),Ce=n(83),Te=n(190),ke=n(49),Ae=Object(f.a)({reducer:{app:k}}),Se=n(192),Ee=Object(Ce.a)({palette:{type:"dark",primary:Te.a,secondary:ke.a}});i.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsxs)(ye.a,{theme:Ee,children:[Object(N.jsx)(Se.a,{}),Object(N.jsx)(u.a,{store:Ae,children:Object(N.jsx)(_e,{})})]})}),document.getElementById("root")),we()},96:function(e,t,n){}},[[135,1,2]]]);
//# sourceMappingURL=main.535227e8.chunk.js.map