(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{860:function(e,t,n){"use strict";n.r(t);var r,o,c=n(711),l=n(729),m=n(727),d=n(258),v=n(265),f=n(712),h=n(148),w=(n(45),[function(){var e=this._self._c;return e("div",{staticClass:"img-container"},[e("img",{staticClass:"circle-bottom",attrs:{src:n(745),alt:"Circle"}})])}]),k=n(42),x=(n(95),n(46),n(9),n(4),n(348),n(56),n(79),n(752)),I=n(315),_=n(743),C=n(740),A=n(744),S=n(741),y=n(739),R=new(n(742))(window.ethereum),F="0x2f2f7197d19A13e8c72c1087dD29d555aBE76C5C",O="0xa8ef07AEbC64A96Ae264f3Bd5cC37fF5B28B1545",$={name:"SwapPage",data:function(){return{selectedItem1:null,selectedItem2:null,tokenInAmountUser:0,tokenAmountIn:0,tokenAmountOut:0,tokens:void 0,items1:this.tokens,items2:this.tokens,heightChart:void 0,swapFrom:{img:n(174),name:"bear",amount:void 0},swapTo:{img:n(149),name:"btc",amount:void 0},rules:[function(e){return!!e||"Field is required"},function(e){return/^\d+(\.\d+)?$/.test(e)||"Invalid numeric input"},function(e){return e>0||"Value must be positive"}],numericFormatConfig:{decimalSeparator:".",fractionDigitsMax:2,fractionDigitsMin:2,fractionDigitsSeparator:"",thousandsDigitsSeparator:","}}},head:function(){return{title:"Swap"}},computed:{items1Filtered:function(){var e,t=this;return null===(e=this.tokens)||void 0===e?void 0:e.filter((function(e){var n;return null!==(n=e!==t.selectedItem2)&&void 0!==n?n:""}))},items2Filtered:function(){var e,t=this;return null===(e=this.tokens)||void 0===e?void 0:e.filter((function(e){var n;return null!==(n=e!==t.selectedItem1)&&void 0!==n?n:""}))}},mounted:function(){var e=this;return Object(k.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$metamask.checkConnection();case 2:e.styles(),F=e.$protocolAddresses.getRouterAddress(e.$metamask.userCurrentChainId),O=e.$protocolAddresses.getFactoryAddress(e.$metamask.userCurrentChainId),r=new R.eth.Contract(_,F),o=new R.eth.Contract(C,O),"0x8274f"===e.$metamask.userCurrentChainId?e.tokens=y:e.tokens=S,window.addEventListener("resize",e.styles);case 9:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){window.removeEventListener("resize",this.styles)},methods:{submitForm:function(){this.$refs.form.validate()&&this.swapTokensForTokens(this.$refs.select1.internalValue,this.$refs.select2.internalValue)},setMaxValue:function(){this.tokenAmountIn=this.tokenInAmountUser|Object(I.b)(this.numericFormatConfig),this.calculateMidPrice()},styles:function(){},switchTokens:function(){var e=this.selectedItem1;this.selectedItem1=this.selectedItem2,this.selectedItem2=e},calcPriceTo:function(e){var t=this.swapFrom;console.log(t),this.swapTo.amount=(e/1.5).toFixed(2)},swapValues:function(){var e=this.$refs.select1.internalValue;this.$refs.select1.internalValue=this.$refs.select2.internalValue,this.$refs.select2.internalValue=e},approve:function(e,t){var n=this;return Object(k.a)(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=new R.eth.Contract(A,e),r.next=3,o.methods.approve(F,t).send({from:n.$metamask.userAccount}).then((function(e){}),(function(e){}));case 3:case"end":return r.stop()}}),r)})))()},balanceOf:function(e){var t=this;return Object(k.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=new R.eth.Contract(A,e.address),n.next=3,r.methods.balanceOf(t.$metamask.userAccount).call();case 3:o=n.sent,t.tokenInAmountUser=o/Math.pow(10,e.decimals);case 5:case"end":return n.stop()}}),n)})))()},getPair:function(e,t){var n=this;return Object(k.a)(regeneratorRuntime.mark((function r(){var c;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.methods.getPair(e,t).call();case 2:if(c=r.sent,!("0x0000000000000000000000000000000000000000"!==c)){r.next=8;break}return r.abrupt("return",c);case 8:n.$alert("cancel","Pair does not exist");case 9:case"end":return r.stop()}}),r)})))()},getReserves:function(e,t){var n=this;return Object(k.a)(regeneratorRuntime.mark((function r(){var o,c,l;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n.getPair(e,t);case 2:return o=r.sent,c=new R.eth.Contract(x.abi,o),r.next=6,c.methods.getReserves().call();case 6:return l=r.sent,r.abrupt("return",l);case 8:case"end":return r.stop()}}),r)})))()},calculateMidPrice:function(){var e=this;return Object(k.a)(regeneratorRuntime.mark((function t(){var n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.tokenAmountIn>0&&e.tokenAmountIn&&null!=e.selectedItem1&&null!=e.selectedItem2)){t.next=8;break}return t.next=3,e.getReserves(e.selectedItem1.address,e.selectedItem2.address);case 3:return n=t.sent,t.next=6,r.methods.getAmountOut(BigInt(e.tokenAmountIn*Math.pow(10,e.selectedItem1.decimals)).toString(),n.reserve0,n.reserve1).call();case 6:o=t.sent,e.tokenAmountOut=o/Math.pow(10,e.selectedItem2.decimals);case 8:case"end":return t.stop()}}),t)})))()},swapTokensForTokens:function(e,t){var n=this;return Object(k.a)(regeneratorRuntime.mark((function o(){var c,path;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return console.log(BigInt(n.tokenAmountIn*Math.pow(10,e.decimals)).toString().replace(/[.,]/g,"")),console.log(BigInt(n.tokenAmountOut*Math.pow(10,e.decimals)).toString().replace(/[.,]/g,"")),c=Math.floor(Date.now()/1e3)+1200,n.approve(e.address,BigInt(n.tokenAmountIn*Math.pow(10,e.decimals)).toString().replace(/[.,]/g,"")),path=[e.address,t.address],o.next=7,r.methods.swapExactTokensForTokens(BigInt(n.tokenAmountIn*Math.pow(10,e.decimals)).toString().replace(/[.,]/g,""),BigInt(n.tokenAmountOut*Math.pow(10,e.decimals)).toString().replace(/[.,]/g,""),path,n.$metamask.userAccount,c).send({from:n.$metamask.userAccount});case 7:case"end":return o.stop()}}),o)})))()},swapETHForTokens:function(){},swapTokensForETH:function(){}}},T=(n(768),n(770),n(47)),component=Object(T.a)($,(function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"swap"}},[t("section",{staticClass:"fwrap center divcol",attrs:{id:"swap-content"}},[t("h1",{staticClass:"swap-title"},[e._v("Swap Tokens")]),e._v(" "),t(m.a,{ref:"form"},[t("div",{staticClass:"divrow mobile-column",staticStyle:{gap:"20px"}},[t(l.a,{staticClass:"swap-card divcol center jspace"},[t("span",{staticClass:"dm-400"},[e._v("\n            From\n          ")]),e._v(" "),t("div",{staticClass:"swap-container"},[t(f.a,{ref:"select1",staticClass:"input-auto",attrs:{items:e.items1Filtered,"item-text":"text","item-value":"value"},on:{change:function(t){return e.balanceOf(e.selectedItem1)}},scopedSlots:e._u([{key:"item",fn:function(n){var r=n.item;return[t(v.a,{staticStyle:{"max-width":"20px"},attrs:{src:r.logoURI}}),e._v(" "),t("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(r.name))])]}},{key:"selection",fn:function(n){var r=n.item;return[r?t(v.a,{staticStyle:{"max-width":"20px"},attrs:{src:r.logoURI}}):e._e(),e._v(" "),r?t("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(r.symbol))]):e._e()]}}]),model:{value:e.selectedItem1,callback:function(t){e.selectedItem1=t},expression:"selectedItem1"}}),e._v(" "),t(h.a,{staticClass:"input-number",attrs:{rules:e.rules,value:0,placeholder:"0.00"},on:{input:function(t){return e.calculateMidPrice()}},model:{value:e.tokenAmountIn,callback:function(t){e.tokenAmountIn=t},expression:"tokenAmountIn"}}),e._v(" "),t(c.a,{staticClass:"btn-max",on:{click:e.setMaxValue}},[e._v("max")])],1),e._v(" "),t("div",{staticClass:"divrow center jspace mobile-btn",staticStyle:{width:"350px"}},[t(d.a,{on:{click:function(t){return e.swapValues()}}},[e._v("mdi-swap-vertical")])],1),e._v(" "),t("span",{staticClass:"dm-400"},[e._v("\n            To\n          ")]),e._v(" "),t("div",{staticClass:"swap-container swap-container2"},[t(f.a,{ref:"select2",staticClass:"input-auto",attrs:{items:e.items2Filtered,"item-text":"text","item-value":"value"},scopedSlots:e._u([{key:"item",fn:function(n){var r=n.item;return[t(v.a,{staticStyle:{"max-width":"20px"},attrs:{src:r.logoURI}}),e._v(" "),t("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(r.name))])]}},{key:"selection",fn:function(n){var r=n.item;return[r?t(v.a,{staticStyle:{"max-width":"20px"},attrs:{src:r.logoURI}}):e._e(),e._v(" "),r?t("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(r.symbol))]):e._e()]}}]),model:{value:e.selectedItem2,callback:function(t){e.selectedItem2=t},expression:"selectedItem2"}}),e._v(" "),t(h.a,{staticClass:"input-number",attrs:{rules:e.rules,value:0,placeholder:"0.00"},model:{value:e.tokenAmountOut,callback:function(t){e.tokenAmountOut=t},expression:"tokenAmountOut"}})],1),e._v(" "),t(c.a,{staticClass:"btn mobile-btn",staticStyle:{width:"350px!important",height:"60px!important","margin-top":"15px"},on:{click:e.submitForm}},[e._v("Swap\n          ")]),e._v(" "),t("div",{staticClass:"center"},[t("a",{staticClass:"atag",attrs:{href:""}},[e._v("Add Splatter To Wallet")]),e._v(" "),t("div",{staticClass:"div-linea"})])],1),e._v(" "),e._e(),e._v(" "),t(c.a,{staticClass:"showmobile connect-btn bold",on:{click:function(t){!e.isLogged&&e.$store.dispatch("modalConnect")}}},[e.isLogged?[e._v("\n        "+e._s(e.user.accountId)+"\n      ")]:[e._v("Connect wallet")]],2)],1)]),e._v(" "),e._m(0)],1)])}),w,!1,null,null,null);t.default=component.exports;installComponents(component,{AppChartsSwapChart:n(780).default})}}]);