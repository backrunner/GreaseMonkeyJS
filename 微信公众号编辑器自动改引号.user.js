// ==UserScript==
// @name         微信公众号编辑器自动改引号
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.2019
// @description  在微信公众号编辑器中加入一个用于自动改引号的按钮
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
		div.setAttribute("data-mpa-tooltip","将中文引号替换为「」");
		var btn_name = document.createElement("div");
        btn_name.setAttribute("style","font-size:14px !important");
		btn_name.innerHTML = "替换引号";
        wrap.appendChild(div);
		div.appendChild(btn_name);
        var breakdiv = document.getElementById("br-breakdiv");
        console.log(breakdiv);
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
            var p1=/(“)/gi;
			var p2=/(”)/gi;
			s = s.replace(p1, '「').replace(p2, "」");
			plist[i].innerHTML = s;
			//console.log(s);
		}
	}
})();