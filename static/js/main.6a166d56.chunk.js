(this.webpackJsonpaniguesser=this.webpackJsonpaniguesser||[]).push([[0],{110:function(e,t,n){},117:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(11),s=n.n(c),u=(n(82),n(18)),i=n.n(u),o=n(22),l=n(12),j=n(60),f=n.n(j),b=(n(110),n(17)),d=n(161),m=n(162),v=n(7);function O(){return(O=Object(o.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/tag.json?limit=25&type=3&order=count&name="+t.replaceAll(" ","_"));case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.filter((function(e){return e.count>0})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var p=function(e){var t=e.on_guess_submitted,n=Object(r.useState)([]),a=Object(l.a)(n,2),c=a[0],s=a[1],u=Object(r.useState)(""),i=Object(l.a)(u,2),o=i[0],j=i[1];Object(r.useEffect)((function(){o?function(e){return O.apply(this,arguments)}(o).then(s):s([])}),[o]);return Object(v.jsx)("div",{id:"guess",children:Object(v.jsx)(m.a,{blurOnSelect:!0,disableClearable:!0,options:c,style:{width:300},getOptionLabel:function(e){return e.name.replaceAll("_"," ")},onChange:function(e,n){var r;return t(null!==(r=null===n||void 0===n?void 0:n.name)&&void 0!==r?r:"")},onInputChange:function(e,t){return j(t)},renderInput:function(e){return Object(v.jsx)(d.a,Object(b.a)(Object(b.a)({},e),{},{label:"Guess the title",variant:"filled"}))}})})},x=n(157),g=n(68),h=3e4,_=function(e){return 100*(h-e)/h},S=function(e,t){return(e+1)%t.count};var w,y=function(e){var t=e.tag,n=e.current_video,c=e.set_current_video,s=e.play_next_tag,u=Object(r.useState)(void 0),j=Object(l.a)(u,2),f=j[0],b=j[1],d=Object(r.useState)(0),m=Object(l.a)(d,2),O=m[0],p=m[1];Object(r.useEffect)((function(){var e=!0;return w({tag:t}).then((function(t){e&&c(t)})),function(){e=!1}}),[t,c]),Object(r.useEffect)((function(){var e=0;console.log("starting interval");var t=setInterval((function(){e>=h?(p(e=0),s()):p(e+=50)}),50);return function(){clearInterval(t),console.log("clearing interval")}}),[t]);var w=function(){var e=Object(o.a)(i.a.mark((function e(t){var n,r,a,c,s,u,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.tag,a=t.page,c=null!==(n=c=void 0===a?void 0:a)&&void 0!==n?n:Object(g.random)(r.count),s="/api/post.json?limit=1&page="+c+"&tags="+r.name,e.next=5,fetch(s);case 5:return u=e.sent,e.next=8,u.json();case 8:if(o=e.sent,!(i=o[0])||!i.file_url||"mp4"!==i.file_ext&&"webm"!==i.file_ext||!i.id){e.next=14;break}return b(c),e.abrupt("return",{url:o[0].file_url,id:o[0].id,tag:r});case 14:return e.abrupt("return",w({tag:r,page:S(c,r)}));case 15:case"end":return e.stop()}var i}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(a.a.Fragment,{children:[Object(v.jsx)(x.a,{color:_(O)<25?"secondary":"primary",variant:"determinate",value:_(O),className:"controls timer"},t.id),Object(v.jsx)("video",{muted:!0,preload:"auto",autoPlay:!0,src:null===n||void 0===n?void 0:n.url,onEnded:function(){var e=S(f,t);w({tag:t,page:e}).then((function(e){c(e)}))}})]})},I=n(158),A=n(47),C=function(e){var t=e.guess_result;return void 0===t?null:t.is_correct&&t.guess?Object(v.jsxs)("p",{id:"guess-result",className:"controls correct",children:[t.guess.replaceAll("_"," ")," (",t.correct_answer.replaceAll("_"," "),") \u2713"]}):t.guess?Object(v.jsxs)("div",{id:"guess-result",className:"controls wrong",children:[Object(v.jsx)("p",{id:"incorrect-guess",children:t.guess.replaceAll("_"," ")}),Object(v.jsx)("p",{children:t.correct_answer.replaceAll("_"," ")})]}):Object(v.jsx)("div",{id:"guess-result",className:"controls wrong",children:Object(v.jsx)("p",{children:t.correct_answer.replaceAll("_"," ")})})},E=function(e){var t=e.score,n=e.max_score;return Object(v.jsxs)("p",{id:"score",className:"controls",children:["Correct: ",t,"/",n]})},R=n(70),T=function(e){return new R.a([e.answer],{includeScore:!0,threshold:.1,distance:0}).search(e.guess).length>0};!function(e){e[e.GENERAL=0]="GENERAL",e[e.ARTIST=1]="ARTIST",e[e.COPYRIGHT=3]="COPYRIGHT",e[e.CHARACTER=4]="CHARACTER"}(w||(w={}));var k=3500,N=function(e){return 100*e/k};function F(e,t){return void 0!==e&&T({guess:e,answer:t.name})}function G(){return(G=Object(o.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/tag.json?limit=0&order=count&type="+w.COPYRIGHT);case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n.filter((function(e){return e.count>0})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P=[{max:1e5,min:500},{max:1e5,min:500},{max:1e5,min:500},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:500,min:100},{max:100,min:25},{max:100,min:25},{max:100,min:25},{max:100,min:25},{max:25,min:10},{max:25,min:10},{max:25,min:10},{max:25,min:10},{max:1,min:1}],H=function(){var e=Object(r.useState)(0),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)([]),u=Object(l.a)(s,2),i=u[0],o=u[1],j=Object(r.useState)([]),b=Object(l.a)(j,2),d=b[0],m=b[1],O=Object(r.useState)(!1),g=Object(l.a)(O,2),h=g[0],_=g[1],S=Object(r.useState)(!1),w=Object(l.a)(S,2),R=w[0],T=w[1],H=Object(r.useState)(Object(A.a)()),L=Object(l.a)(H,2),Y=L[0],B=L[1],J=Object(r.useState)(void 0),D=Object(l.a)(J,2),M=D[0],q=D[1],z=Object(r.useState)(0),K=Object(l.a)(z,2),Q=K[0],U=K[1],V=Object(r.useState)(0),W=Object(l.a)(V,2),X=W[0],Z=W[1],$=Object(r.useState)(void 0),ee=Object(l.a)($,2),te=ee[0],ne=ee[1],re=Object(r.useState)(0),ae=Object(l.a)(re,2),ce=ae[0],se=ae[1];Object(r.useEffect)((function(){var e=10;c(e);var t=setInterval((function(){e<90?c(e+=10):clearInterval(t)}),100);return function(){return G.apply(this,arguments)}().then((function(e){c(100),o(e)})),function(){return clearInterval(t)}}),[]),Object(r.useEffect)((function(){if(te){ie(Y);var e=0,t=setInterval((function(){e>=k?(ne(void 0),e=0):e+=50,se(e)}),50);return function(){return clearInterval(t)}}}),[Y,te]);var ue=function(){_(!1),m([])},ie=function(e){var t=0;e.forEach((function(e,n){F(e,n)&&(t+=1)})),U(t)};return Object(v.jsxs)(a.a.Fragment,{children:[te&&Object(v.jsx)(x.a,{variant:"determinate",value:N(ce),className:"controls timer"},X),R&&Object(v.jsx)(E,{score:Q,max_score:X}),0===i.length&&Object(v.jsx)(x.a,{variant:"determinate",value:n}),!h&&Object(v.jsx)(I.a,{variant:"contained",disabled:0===i.length,onClick:function(){var e;m((e=i,P.map((function(t){var n=t.max,r=t.min;return f()(e.filter((function(e){var t=e.count;return n>=t&&t>=r})))})))),_(!0),T(!0),B(Object(A.a)()),U(0),Z(0)},id:"start",children:"Start"}),h&&d.length>0&&!te&&Object(v.jsx)(y,{tag:d[X],current_video:M,set_current_video:q,play_next_tag:function(){var e=d[X];ne(e),X+1<d.length?Z(X+1):ue()}}),te&&Object(v.jsx)(C,{guess_result:{guess:Y.get(te),correct_answer:te.name,is_correct:F(Y.get(te),te)}}),h&&!te&&Object(v.jsx)(p,{on_guess_submitted:function(e){var t=d[X];if(t){var n=Y.set(t,e);B(n)}}})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,163)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},Y=n(160),B=n(69),J=n(159),D=n(39),M=Object(B.a)({palette:{type:"dark",primary:J.a,secondary:D.a}});s.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(Y.a,{theme:M,children:Object(v.jsx)(H,{})})}),document.getElementById("root")),L()},82:function(e,t,n){}},[[117,1,2]]]);
//# sourceMappingURL=main.6a166d56.chunk.js.map