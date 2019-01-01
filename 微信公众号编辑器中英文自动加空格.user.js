// ==UserScript==
// @name         微信公众号编辑器中英文自动加空格
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.2019
// @description  在微信公众号编辑器中加入一个用于自动在中英文间添加空格的按钮
// @author       BackRunner
// @include      *mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit*
// @include      *mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2*
// @license      MIT
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
	//Set
	var toolbar;
	var count = 0;
    var retry = 0;
	//Run
    $(document).ready(function(){
        setTimeout(function(){
            getToolbar();
        },5000);
    });

	//Functions
	function getToolbar(){
		toolbar = document.getElementById('js_toolbar_0');
        while (typeof toolbar == 'undefined' && count < 10){
            count++;
            toolbar = document.getElementById('js_toolbar_0');
        }
        if (count < 3){
            createBtn();
        } else {
            if (retry < 3){
                setTimeout(function(){
                    getToolbar();
                    retry++;
                },3000);
            }
        }
	}

	function createBtn(){
        var wrap = document.createElement("div");
        wrap.setAttribute("class","edui-box edui-splitbutton edui-default");
		var div = document.createElement("div");
		div.setAttribute("class","edui-box edui-button-body edui-default");
		div.setAttribute("data-mpa-tooltip","在中英文之间添加空格");
		var btn_name = document.createElement("div");
        btn_name.setAttribute("style","font-size:14px !important");
		btn_name.innerHTML = "添加空格";
        wrap.appendChild(div);
		div.appendChild(btn_name);
        var breakdiv = document.getElementById("br-breakdiv");
        if (typeof breakdiv == 'undefined' || breakdiv == null){
            breakdiv = document.createElement("div");
            breakdiv.setAttribute("id","br-breakdiv");
            toolbar.appendChild(breakdiv);
        }
		toolbar.appendChild(wrap);
		div.addEventListener('click',Event);
	}
	function Event(){
		var iframe = document.getElementById("ueditor_0");
		var plist = iframe.contentDocument.getElementsByTagName("p");
		console.log(plist);
		for (var i=0;i<plist.length;i++){
			var s = plist[i].innerHTML;
			console.log(s);
			var p1=/([A-Za-z_])([\u4e00-\u9fa5]+)/gi;//字母 汉字
			var p2=/([\u4e00-\u9fa5]+)([A-Za-z_])/gi;//汉字 字母
			var p3=/([0-9_])([\u4e00-\u9fa5]+)/gi;//数字 汉字
			var p4=/([\u4e00-\u9fa5]+)([0-9_])/gi;//汉字 数字
			var p5 = /([A-Za-z_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;//英文+符号 汉字
			var p6 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([A-Za-z_])/gi;//汉字 符号+英文
            var p10 = /([0-9_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;//数字+符号 汉字
            var p11 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([0-9_])/gi;//汉字 符号+数字
			var p7 = /([\u4e00-\u9fa5]+)([<])([a])/gi;//汉字 括号
			var p8 = /([a])([>])([\u4e00-\u9fa5]+)/gi;//括号 汉字
            var p9 = /([A-Za-z_])([0-9_])([\u4e00-\u9fa5]+)/gi;//英文+数字 汉字
			s = s.replace(p9,'$1$2 $3').replace(p1, '$1 $2').replace(p2, "$1 $2").replace(p3, "$1 $2").replace(p4, "$1 $2").replace(p5,"$1$2 $3").replace(p6,"$1 $2$3").replace(p11,"$1 $2$3").replace(p10,"$1$2 $3").replace(p7,"$1 $2$3").replace(p8,"$1$2 $3");
			plist[i].innerHTML = s;
			//console.log(s);
		}
	}
})();