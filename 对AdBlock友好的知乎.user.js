// ==UserScript==
// @name         对AdBlock友好的知乎
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.0
// @description  和知乎的启用了Adblock的提示说再见
// @author       BackRunner
// @include      *://www.zhihu.com*
// @run-at       document-body
// ==/UserScript==

(function() {

    appendCSS();
    console.log("再见，AdblockBanner。");

    function appendCSS(){
        var cssText = "";
        cssText += '.AdblockBanner {display: none !important;}';

        var modStyle = document.querySelector('#modCSS_zhihu');
        if (modStyle === null){
            modStyle = document.createElement('style');
            modStyle.id = 'modCSS_zhihu';
            document.body.appendChild(modStyle);
            modStyle.innerHTML = cssText;
        }

    }
})();