(this.webpackJsonpyahtzee=this.webpackJsonpyahtzee||[]).push([[0],{103:function(e,t,n){e.exports=n(198)},108:function(e,t,n){},109:function(e,t,n){},122:function(e,t){},124:function(e,t){},155:function(e,t){},156:function(e,t){},198:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(98),u=n.n(r),o=(n(108),n(109),n(17)),c=n(18),s=n(20),i=n(19),m=n(11),E=n(12),f=n(7),d=n(8);function b(){var e=Object(m.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"]);return b=function(){return e},e}var C=E.a.div(b()),v=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return l.a.createElement(C,null,l.a.createElement(f.a,{icon:d.a}),l.a.createElement(f.a,{icon:d.b}))}}]),n}(l.a.Component);function y(){var e=Object(m.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"]);return y=function(){return e},e}var g=E.a.div(y()),O=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return l.a.createElement(g,null,l.a.createElement(f.a,{icon:d.b}),l.a.createElement(f.a,{icon:d.a}))}}]),n}(l.a.Component),p=n(6),M=n(30);function L(){var e=Object(m.a)(["\n    cursor: auto;\n"]);return L=function(){return e},e}function N(){var e=Object(m.a)(["\n    display: block;\n    cursor: pointer;\n    text-align: center;\n    margin: 0;\n    padding: 0;\n    vertical-align: top;\n    max-width: 40px;\n    margin: auto;\n    font-family: 'Patrick Hand', cursive;\n    font-size: 17px;\n    color: #5c6274;\n    font-style: italic;\n    background: transparent;\n    border: 0;\n    \n    :focus {\n        outline: none !important;\n        border: 0;\n        background: #FFAAAA;\n    }\n"]);return N=function(){return e},e}function I(){var e=Object(m.a)(["\n    background: #A4B5CC;\n"]);return I=function(){return e},e}function A(){var e=Object(m.a)(["\n    border: 2px solid #5c6274;\n    position: relative;\n    width: 8.33%;\n    height: 32px;\n"]);return A=function(){return e},e}function h(){var e=Object(m.a)(["\n    background: #D1DAE7;\n"]);return h=function(){return e},e}function S(){var e=Object(m.a)(["\n    border: 2px solid #5c6274;\n"]);return S=function(){return e},e}function w(){var e=Object(m.a)(["\n    border: 2px solid #5c6274;\n    border-collapse: collapse;\n    width: 100%;\n    color: #5c6274;\n"]);return w=function(){return e},e}var R=E.a.table(w()),K=E.a.tr(S()),U=Object(E.a)(K)(h()),T=E.a.td(A()),B=Object(E.a)(T)(I()),F=E.a.input(N()),k=Object(E.a)(F)(L()),x=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(e){var a;for(var r in Object(o.a)(this,n),(a=t.call(this,e)).state={1:{},2:{},3:{},4:{},5:{},6:{},SUM1:{},MIN:{},MAX:{},SUM2:{},KENTA:{},TRILING:{},FULL:{},KARE:{},YAMB:{},SUM3:{},TOTAL:""},a.cells={},a.currentCell={row:null,col:null},a.setValue=function(e,t,n){var l=parseInt(e);if((""===e||!(isNaN(l)||l<0))&&!(l>30)){var r=a.state;r.SUM1={},r.SUM2={},r.SUM3={},r.TOTAL="",r[t][n]=l,a.setState(r),a.calculateRowSum(),a.calculateColSum(),a.calculateTotal()}},a.calculateTotal=function(){var e=0;for(var t in n.sumRows){var l=a.state[n.sumRows[t]][n.COL_SUM];isNaN(l)||(e+=l)}a.setState({TOTAL:e>0?e:""})},a.calculateColSum=function(){var e=a.state;for(var t in n.sumRows){var l=0;for(var r in e[n.sumRows[t]])if(e[n.sumRows[t]].hasOwnProperty(r)){var u=parseInt(e[n.sumRows[t]][r]);isNaN(u)||(l+=u)}e[n.sumRows[t]][n.COL_SUM]=l}a.setState(e)},a.calculateRowSum=function(){var e=a.state;for(var t in n.sumRows)for(var l in n.editableCols)e[n.sumRows[t]][n.editableCols[l]]=a.calculateCellSum(n.sumRows[t],n.editableCols[l]);a.setState(e)},a.calculateCellSum=function(e,t){if("SUM2"===e){var n=a.state[1][t],l=a.state.MIN[t],r=a.state.MAX[t];return n&&l&&r?(r-l)*n:0}var u=0,o=a.getSumCols(e);for(var c in o)if(o.hasOwnProperty(c)){var s=o[c];if(a.state.hasOwnProperty(s))u+=a.state[s][t]||0}return"SUM1"===e&&u>=60&&(u+=30),u>0?u:""},a.getSumCols=function(e){return"SUM1"===e?["1","2","3","4","5","6"]:"SUM3"===e?["KENTA","TRILING","FULL","KARE","YAMB"]:[]},a.getValue=function(e,t){var n=a.state[e][t];if(0===n&&!a.isSumRow(e))return"x";if("SUM2"===e&&0===n){var l=a.state[1][t],r=a.state.MIN[t],u=a.state.MAX[t];return l&&r&&u?0:""}return n||""},a.isSumRow=function(e){return"SUM1"===e||"SUM2"===e||"SUM3"===e},a.isEnabled=function(e,t){return!a.isSumRow(e)},n.editableRows)for(var u in n.editableCols)a.cells.hasOwnProperty(n.editableRows[r])||(a.cells[n.editableRows[r]]={}),a.cells[n.editableRows[r]][n.editableCols[u]]=l.a.createRef();return a}return Object(c.a)(n,[{key:"onKeyPress",value:function(e,t,a){if(13===e.keyCode&&e.target.blur(),(46===e.keyCode||8===e.keyCode)&&a!==n.COL_SUM&&!this.isSumRow(t)){var l=this.state;l[t][a]="",this.setState(l)}if([38,40,39,37].includes(e.keyCode)){var r=this.navigateCell(e.keyCode);r&&r.current.focus()}}},{key:"navigateCell",value:function(e){if(37===e||39===e){var t=1;37===e&&(t=-1);var a=n.editableCols.indexOf(this.currentCell.col)+t,l=n.editableCols[a];if("undefined"!==typeof l)return this.cells[this.currentCell.row][l]}if(38===e||40===e){var r=1;38===e&&(r=-1);var u=n.editableRows.indexOf(this.currentCell.row)+r,o=n.editableRows[u];if("undefined"!==typeof o)return this.cells[o][this.currentCell.col]}return null}},{key:"onFocus",value:function(e,t,n){this.currentCell.row=t,this.currentCell.col=n}},{key:"onBlur",value:function(e,t,n){var a=parseInt(t),l=parseInt(e.currentTarget.value);if(!isNaN(l)&&["1","2","3","4","5","6"].includes(t)){var r=[],u=[0,1,2,3,4,5];for(var o in u)r.push(u[o]*a);r.includes(l)||e.currentTarget.focus()}}},{key:"getClasses",value:function(e,t){return""}},{key:"render",value:function(){var e=this;return l.a.createElement(R,null,l.a.createElement("thead",null,l.a.createElement(K,null,l.a.createElement(B,null,l.a.createElement(f.a,{icon:d.c})),l.a.createElement(B,null,l.a.createElement(f.a,{icon:d.a})),l.a.createElement(B,null,l.a.createElement(f.a,{icon:d.b}),l.a.createElement(f.a,{icon:d.a})),l.a.createElement(B,null,l.a.createElement(f.a,{icon:d.b})),l.a.createElement(B,null,"N"),l.a.createElement(B,null,"R"),l.a.createElement(B,null,"D"),l.a.createElement(B,null,l.a.createElement(O,null)),l.a.createElement(B,null,l.a.createElement(v,null)),l.a.createElement(B,null,"O"),l.a.createElement(B,null,"M"),l.a.createElement(B,null))),l.a.createElement("tbody",null,l.a.createElement(K,null,l.a.createElement(B,null,"1"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,a){return l.a.createElement(T,{key:a},l.a.createElement(M.If,{condition:t===n.COL_TOWARD},l.a.createElement(f.a,{icon:d.a,style:{position:"absolute",fontSize:11,left:3,top:0}})),l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"1",t)},value:e.getValue("1",t),disabled:!e.isEnabled("1",t),onKeyDown:function(n){return e.onKeyPress(n,"1",t)},onBlur:function(n){return e.onBlur(n,"1",t)},className:e.getClasses("1",t),type:"text",ref:e.cells[1][t],onFocus:function(n){return e.onFocus(n,"1",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"2"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"2",t)},value:e.getValue("2",t),disabled:!e.isEnabled("2",t),onKeyDown:function(n){return e.onKeyPress(n,"2",t)},onBlur:function(n){return e.onBlur(n,"2",t)},className:e.getClasses("2",t),type:"text",ref:e.cells[2][t],onFocus:function(n){return e.onFocus(n,"2",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"3"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"3",t)},value:e.getValue("3",t),disabled:!e.isEnabled("3",t),onKeyDown:function(n){return e.onKeyPress(n,"3",t)},onBlur:function(n){return e.onBlur(n,"3",t)},className:e.getClasses("3",t),type:"text",ref:e.cells[3][t],onFocus:function(n){return e.onFocus(n,"3",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"4"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"4",t)},value:e.getValue("4",t),disabled:!e.isEnabled("4",t),onKeyDown:function(n){return e.onKeyPress(n,"4",t)},onBlur:function(n){return e.onBlur(n,"4",t)},className:e.getClasses("4",t),type:"text",ref:e.cells[4][t],onFocus:function(n){return e.onFocus(n,"4",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"5"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"5",t)},value:e.getValue("5",t),disabled:!e.isEnabled("5",t),onKeyDown:function(n){return e.onKeyPress(n,"5",t)},onBlur:function(n){return e.onBlur(n,"5",t)},className:e.getClasses("5",t),type:"text",ref:e.cells[5][t],onFocus:function(n){return e.onFocus(n,"5",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"6"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"6",t)},value:e.getValue("6",t),disabled:!e.isEnabled("6",t),onKeyDown:function(n){return e.onKeyPress(n,"6",t)},onBlur:function(n){return e.onBlur(n,"6",t)},className:e.getClasses("6",t),type:"text",ref:e.cells[6][t],onFocus:function(n){return e.onFocus(n,"6",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(U,null,l.a.createElement(B,null,"\u03a3"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(k,{value:e.getValue("SUM1",t),disabled:!0,type:"text"}))}}),l.a.createElement(T,null,l.a.createElement(k,{value:this.getValue("SUM1",n.COL_SUM),disabled:!0,type:"text"}))),l.a.createElement(K,null,l.a.createElement(B,null,"MAX"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,a){return l.a.createElement(T,{key:a},l.a.createElement(M.If,{condition:t===n.COL_OPPOSITE},l.a.createElement(f.a,{icon:d.b,style:{position:"absolute",fontSize:11,left:3,top:0}})),l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"MAX",t)},value:e.getValue("MAX",t),disabled:!e.isEnabled("MAX",t),onKeyDown:function(n){return e.onKeyPress(n,"MAX",t)},onBlur:function(n){return e.onBlur(n,"MAX",t)},className:e.getClasses("MAX",t),type:"text",ref:e.cells.MAX[t],onFocus:function(n){return e.onFocus(n,"MAX",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"MIN"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,a){return l.a.createElement(T,{key:a},l.a.createElement(M.If,{condition:t===n.COL_OPPOSITE},l.a.createElement(f.a,{icon:d.a,style:{position:"absolute",fontSize:11,right:3,bottom:0}})),l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"MIN",t)},value:e.getValue("MIN",t),disabled:!e.isEnabled("MIN",t),onKeyDown:function(n){return e.onKeyPress(n,"MIN",t)},onBlur:function(n){return e.onBlur(n,"MIN",t)},className:e.getClasses("MIN",t),type:"text",ref:e.cells.MIN[t],onFocus:function(n){return e.onFocus(n,"MIN",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(U,null,l.a.createElement(B,null,"\u03a3"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(k,{value:e.getValue("SUM2",t),disabled:!0,type:"text"}))}}),l.a.createElement(T,null,l.a.createElement(k,{value:this.getValue("SUM2",n.COL_SUM),disabled:!0,type:"text"}))),l.a.createElement(K,null,l.a.createElement(B,null,"KENTA"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"KENTA",t)},value:e.getValue("KENTA",t),disabled:!e.isEnabled("KENTA",t),onKeyDown:function(n){return e.onKeyPress(n,"KENTA",t)},onBlur:function(n){return e.onBlur(n,"KENTA",t)},className:e.getClasses("KENTA",t),type:"text",ref:e.cells.KENTA[t],onFocus:function(n){return e.onFocus(n,"KENTA",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"TRILING"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"TRILING",t)},value:e.getValue("TRILING",t),disabled:!e.isEnabled("TRILING",t),onKeyDown:function(n){return e.onKeyPress(n,"TRILING",t)},onBlur:function(n){return e.onBlur(n,"TRILING",t)},className:e.getClasses("TRILING",t),type:"text",ref:e.cells.TRILING[t],onFocus:function(n){return e.onFocus(n,"TRILING",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"FULL"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"FULL",t)},value:e.getValue("FULL",t),disabled:!e.isEnabled("FULL",t),onKeyDown:function(n){return e.onKeyPress(n,"FULL",t)},onBlur:function(n){return e.onBlur(n,"FULL",t)},className:e.getClasses("FULL",t),type:"text",ref:e.cells.FULL[t],onFocus:function(n){return e.onFocus(n,"FULL",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"POKER"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"KARE",t)},value:e.getValue("KARE",t),disabled:!e.isEnabled("KARE",t),onKeyDown:function(n){return e.onKeyPress(n,"KARE",t)},onBlur:function(n){return e.onBlur(n,"KARE",t)},className:e.getClasses("KARE",t),type:"text",ref:e.cells.KARE[t],onFocus:function(n){return e.onFocus(n,"KARE",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(K,null,l.a.createElement(B,null,"YAMB"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,a){return l.a.createElement(T,{key:a},l.a.createElement(M.If,{condition:t===n.COL_TOWARD},l.a.createElement(f.a,{icon:d.b,style:{position:"absolute",fontSize:11,right:3,bottom:0}})),l.a.createElement(F,{onChange:function(n){return e.setValue(n.target.value,"YAMB",t)},value:e.getValue("YAMB",t),disabled:!e.isEnabled("YAMB",t),onKeyDown:function(n){return e.onKeyPress(n,"YAMB",t)},onBlur:function(n){return e.onBlur(n,"YAMB",t)},className:e.getClasses("YAMB",t),type:"text",ref:e.cells.YAMB[t],onFocus:function(n){return e.onFocus(n,"YAMB",t)}}))}}),l.a.createElement(T,null)),l.a.createElement(U,null,l.a.createElement(B,null,"\u03a3"),l.a.createElement(p.a,{items:n.editableCols,renderItem:function(t,n){return l.a.createElement(T,{key:n},l.a.createElement(k,{value:e.getValue("SUM3",t),disabled:!0,type:"text"}))}}),l.a.createElement(T,null,l.a.createElement(k,{value:this.getValue("SUM3",n.COL_SUM),disabled:!0,type:"text"}))),l.a.createElement(U,null,l.a.createElement(T,{colSpan:11}),l.a.createElement(T,null,l.a.createElement(k,{disabled:!0,type:"text",value:this.state.TOTAL})))))}}]),n}(l.a.Component);x.COL_UP=0,x.COL_UP_DOWN=1,x.COL_DOWN=2,x.COL_N=3,x.COL_R=4,x.COL_D=5,x.COL_OPPOSITE=6,x.COL_TOWARD=7,x.COL_O=8,x.COL_M=9,x.COL_SUM=10,x.editableCols=[x.COL_UP,x.COL_UP_DOWN,x.COL_DOWN,x.COL_N,x.COL_R,x.COL_D,x.COL_OPPOSITE,x.COL_TOWARD,x.COL_O,x.COL_M],x.editableRows=["1","2","3","4","5","6","MAX","MIN","KENTA","TRILING","FULL","KARE","YAMB"],x.sumRows=["SUM1","SUM2","SUM3"];var V=x;var _=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement(V,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[103,1,2]]]);
//# sourceMappingURL=main.ca8d208e.chunk.js.map