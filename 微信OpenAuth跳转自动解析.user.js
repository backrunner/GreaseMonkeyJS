// ==UserScript==
// @name         微信OpenAuth自动解析跳转
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.0
// @description  对OpenAuth的重定向做一个简单的自动解析跳转
// @author       BackRunner
// @include      *open.weixin.qq.com/connect/oauth2/authorize*
// @grant        none
// ==/UserScript==

// weixin-UA:Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365 MicroMessenger/5.4.1 NetType/WIFI

(function() {
    var search = window.location.search.substring(1);
	var s = search.split('&');
	for (var i=0;i<s.length;i++){
		if (s[i].indexOf("redirect_uri") !== -1){
			var uri = decodeURIComponent(s[i].replace("redirect_uri=",""));
			window.location.href = uri;
		}
	}
})();