// ==UserScript==
// @name         微信公众号编辑器自动改引号
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.0
// @description  在微信公众号编辑器中加入一个用于自动改引号的按钮
// @author       BackRunner
// @include      *mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit*
// @include      *mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit_v2&action=edit*
// @license      MIT
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

(function() {
	//Set
	var toolbar;

	//Run
	setTimeout(function(){
		getToolbar();
		createBtn();
	},1000);


	//Functions
	function getToolbar(){
		toolbar = document.getElementsByClassName('edui-toolbar-primary');
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
		toolbar[0].appendChild(wrap);
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