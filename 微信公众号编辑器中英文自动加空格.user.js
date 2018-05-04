// ==UserScript==
// @name         微信公众号编辑器中英文自动加空格
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.2
// @description  在微信公众号编辑器中加入一个用于自动在中英文间添加空格的按钮
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
		var div = document.createElement("div");
		div.setAttribute("class","mpa-tool-button mpa-component mpa-emoji-tool-button");
		div.setAttribute("data-mpa-tooltip","中英文间加空格");
		var label = document.createElement("label");
		label.innerHTML = "加空格";
		div.appendChild(label);
		toolbar[0].appendChild(div);	
		div.addEventListener('click',Event);
	}
	function Event(){
		var iframe = document.getElementById("ueditor_0");
		var plist = iframe.contentDocument.getElementsByTagName("p");
		console.log(plist);
		for (var i=0;i<plist.length;i++){
			var s = plist[i].innerHTML;
			console.log(s);
			var p1=/([A-Za-z_])([\u4e00-\u9fa5]+)/gi;
			var p2=/([\u4e00-\u9fa5]+)([A-Za-z_])/gi;
			var p3=/([0-9_])([\u4e00-\u9fa5]+)/gi;
			var p4=/([\u4e00-\u9fa5]+)([0-9_])/gi;
			var p5 = /([A-Za-z_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;  
			var p6 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([A-Za-z_])/gi;  
			var p7 = /([\u4e00-\u9fa5]+)([<])([a])/gi;  
			var p8 = /([a])([>])([\u4e00-\u9fa5]+)/gi;  
			s = s.replace(p1, '$1 $2').replace(p2, "$1 $2").replace(p3, "$1 $2").replace(p4, "$1 $2").replace(p5,"$1$2 $3").replace(p6,"$1 $2$3").replace(p7,"$1 $2$3").replace(p8,"$1$2 $3");
			plist[i].innerHTML = s;
			//console.log(s);
		}
	}
})();