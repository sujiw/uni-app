(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"09f2":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},u=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return u})},2624:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,e=this.bgImage,n="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(n="".concat(n,"background-image:url(").concat(e,");")),n}},props:{bgColor:{type:String,default:""},topheight:{type:[String],default:void 0},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){if(getCurrentPages().length<2&&"undefined"!==typeof __wxConfig){var a="/"+__wxConfig.pages[0];return t.redirectTo({url:a})}t.navigateBack({delta:1})}}};a.default=e}).call(this,e("543d")["default"])},"6da2":function(t,a,e){"use strict";e.r(a);var n=e("2624"),u=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(a,t,function(){return n[t]})}(r);a["default"]=u.a},c23a:function(t,a,e){"use strict";e.r(a);var n=e("09f2"),u=e("6da2");for(var r in u)"default"!==r&&function(t){e.d(a,t,function(){return u[t]})}(r);var o=e("2877"),i=Object(o["a"])(u["default"],n["a"],n["b"],!1,null,null,null);a["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c23a"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);                
