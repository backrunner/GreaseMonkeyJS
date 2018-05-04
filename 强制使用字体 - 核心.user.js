// ==UserScript==
// @name         强制使用字体 - 核心
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  所有 强制使用字体 脚本的核心脚本
// @author       BackRunner
// @include      *
// @grant        unsafeWindow
// @license      MIT
// ==/UserScript==
function changeFont(s_font,mode){
	if (s_font !==  ""){
		
		switch(mode){
			case 0:
				var element = document.createElement("link");
				element.rel="stylesheet";
				element.type="text/css";
				element.href='data:text/css,*:not([class*="icon"]):not([class*="fa"]):not([class*="logo"]):not([class*="mi"]):not(i){font-family:' + s_font + ',Arial,stonefont,iknow-qb_share_icons,review-iconfont,mui-act-font,fontAwesome,tm-detail-font,office365icons,MWF-MDL2,global-iconfont,"Bowtie" !important;}';
				document.documentElement.appendChild(element);
				break;
			case 1:
				setTimeout(function(){
					var modStyle = document.querySelector('#modCSS_font');
					if (modStyle === null)
					{
						modStyle = document.createElement('style');
						modStyle.id = 'modCSS_font';
						document.body.appendChild(modStyle);
					}   
					modStyle.innerHTML = '*:not([class*="icon"]):not([class*="fa"]):not([class*="logo"]):not([class*="mi"]):not(i){font-family:' + s_font + ',Arial,stonefont,iknow-qb_share_icons,review-iconfont,mui-act-font,fontAwesome,tm-detail-font,office365icons,MWF-MDL2,global-iconfont,"Bowtie" !important;';
				},300);
				break;
			case 2:
				var element = document.createElement("link");
				element.rel="stylesheet";
				element.type="text/css";
				element.href='data:text/css,*:not([class*="icon"]):not([class*="fa"]):not([class*="logo"]):not([class*="mi"]):not(i){font-family:' + s_font + ',Arial,stonefont,iknow-qb_share_icons,review-iconfont,mui-act-font,fontAwesome,tm-detail-font,office365icons,MWF-MDL2,global-iconfont,"Bowtie" !important;}';
				document.documentElement.appendChild(element);
				setTimeout(function(){
					var modStyle = document.querySelector('#modCSS_font');
					if (modStyle === null)
					{
						modStyle = document.createElement('style');
						modStyle.id = 'modCSS_font';
						document.body.appendChild(modStyle);
					}   
					modStyle.innerHTML = '*:not([class*="icon"]):not([class*="fa"]):not([class*="logo"]):not([class*="mi"]):not(i){font-family:' + s_font + ',Arial,stonefont,iknow-qb_share_icons,review-iconfont,mui-act-font,fontAwesome,tm-detail-font,office365icons,MWF-MDL2,global-iconfont,"Bowtie" !important;';
				},300);
				break;
		}
	}
}