// ==UserScript==
// @name         U校园环境检测屏蔽
// @namespace    https://github.com/backrunner/GreaseMonkeyJS
// @version      1.2
// @description  屏蔽U校园的环境检测
// @author       BackRunner
// @include      *://u.unipus.cn/user/student?*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addCSS(){
		//变量定义
        var cssText = "";

        cssText += "#layui-layer-shade1{display: none !important;}";

		var modStyle = document.querySelector('#modCSS');
		if (modStyle === null)
		{
			modStyle = document.createElement('style');
			modStyle.id = 'modCSS';
			document.body.appendChild(modStyle);
		}
		modStyle.innerHTML = cssText;
	}
    addCSS();
})();