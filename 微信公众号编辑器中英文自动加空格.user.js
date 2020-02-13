// ==UserScript==
// @name         微信公众号编辑器中英文自动加空格
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      2020.3
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
    var yiban;
	var count = 0;
    var retry = 0;

    // const

    const CJK = '\u4e00-\u9fa5';

    const ANY_CJK = new RegExp(`[${CJK}]`);

    // common symbols
    const SYMBOL_WIDE = '`~!@#$%*^&()/\\-+=<>?:"{}|,.;\'[\\]·~￥%——|\\\\';
    const SYMBOL = '`~!@#$%^&()/\\-+=<>?:"{}|,.;\'[\\]·~￥%——|\\\\';
    const SYMBOL_LEFT = '`~!@#$%^&(/\\-+=<>?:"{|,.;\'[·~￥%——|\\\\';
    const SYMBOL_RIGHT = '`~!@#$%^&)/\\-+=<>?:"}|,.;\'\\]·~￥%——|\\\\';
    const SYMBOL_SAFE = '`~!#$%^&/+=<>?:"|,;\'·~￥%——|\\\\';

    const ALPHA_CJK = new RegExp(`([A-Za-z_])([${CJK}]+)`, 'g');
    const CJK_ALPHA = new RegExp(`([${CJK}]+)([A-Za-z_])`, 'g');
    const NUMBER_CJK = new RegExp(`([0-9_])([${CJK}]+)`, 'g');
    const CJK_NUMBER = new RegExp(`([${CJK}]+)([0-9_])`, 'g');
    const CJK_AND_ALPHA = new RegExp(`([${CJK}]+)(&)([A-Za-z_])`, 'g');
    const ALPHA_AND_CJK = new RegExp(`([A-Za-z_])(&)([${CJK}]+)`, 'g');
    const ALPHA_SYMBOL_CJK = new RegExp(`([A-Za-z_])([${SYMBOL_RIGHT}])([${CJK}])`, 'g');
    const CJK_SYMBOL_ALPHA = new RegExp(`([${CJK}])([${SYMBOL_LEFT}])([A-Za-z_])`, 'g');
    const NUMBER_SYMBOL_CJK = new RegExp(`([0-9_])([${SYMBOL}])([${CJK}])`, 'g');
    const CJK_SYMBOL_NUMBER = new RegExp(`([${CJK}])([${SYMBOL}])([0-9_])`, 'g');
    const CJK_BRACKET = new RegExp(`([${CJK}])([<\\[{\\(])`, 'g');
    const BRACKET_CJK = new RegExp(`([>\\]\\)}])([${CJK}])`, 'g');
    const ALPHA_NUMBER_CJK = new RegExp(`([A-Za-z_])([0-9_])([${CJK}])`, 'g');
    const CJK_SYMBOL_SYMBOL = new RegExp(`([${CJK}])([${SYMBOL_WIDE}])([${SYMBOL_WIDE}])`, 'g');
    const SYMBOL_SYMBOL_CJK = new RegExp(`([${SYMBOL_WIDE}])([${SYMBOL_WIDE}])([${CJK}])`, 'g');
    const CJK_SYMBOL_CJK_SYMBOL_CJK = new RegExp(`([${CJK}])([${SYMBOL_SAFE}])([${CJK}])([${SYMBOL_SAFE}])([${CJK}])`, 'g');
    const CJK_SYMBOL_CJK = new RegExp(`([${CJK}])([${SYMBOL_SAFE}])([${CJK}])`, 'g');
    const CJK_ACCOUNT_CJK = new RegExp(`([${CJK}])(\\s*)(@[A-za-z0-9_]*)(\\s*)([${CJK}]+)(\\s*)([A-za-z0-9_]+)(\\s*)([${CJK}])`);

	//Run
    $(document).ready(function(){
        setTimeout(function(){
            getToolbar();
        },10000);
    });

	//Functions
	function getToolbar(){
        // 检查壹伴的工具栏
        yiban = document.getElementById('mpa-extra-tools-container');
        if (yiban){
            console.log(yiban);
            createBtnYiBan();
            return;
        }
		toolbar = document.getElementById('js_toolbar_0');
        while (typeof toolbar == 'undefined' && count < 10){
            count++;
            toolbar = document.getElementById('js_toolbar_0');
        }
        if (count < 5){
            createBtn();
        } else {
            if (retry < 5){
                setTimeout(function(){
                    getToolbar();
                    retry++;
                },3000);
            }
        }
	}

	function createBtn(){
        var wrap = document.createElement("div");
        wrap.setAttribute("class","edui-box edui-button edui-default");
		var div = document.createElement("div");
		div.setAttribute("class","edui-box edui-button-body edui-default");
		div.setAttribute("data-mpa-tooltip","在中英文之间添加空格");
		var btn_name = document.createElement("div");
        btn_name.setAttribute("style","font-size:12px !important;");
		btn_name.innerHTML = "添加空格";
        wrap.appendChild(div);
		div.appendChild(btn_name);
		toolbar.appendChild(wrap);
		div.addEventListener('click',Event);
	}

    function createBtnYiBan(){
        var wrap = document.createElement("div");
        wrap.setAttribute("class","edui-box edui-button edui-default");
		var div = document.createElement("div");
		div.setAttribute("class","edui-box edui-button-body edui-default");
		div.setAttribute("data-mpa-tooltip","在中英文之间添加空格");
		var btn_name = document.createElement("div");
        btn_name.setAttribute("style","font-size:12px !important;line-height: 34px;margin-right:8px;cursor:pointer;");
		btn_name.innerHTML = "添加空格";
        wrap.appendChild(div);
		div.appendChild(btn_name);
        var breakdiv = document.getElementById("br-breakdiv");
        if (typeof breakdiv == 'undefined' || breakdiv == null){
            breakdiv = document.createElement("div");
            breakdiv.setAttribute("id","br-breakdiv");
            yiban.appendChild(breakdiv);
        }
		yiban.appendChild(wrap);
		div.addEventListener('click',Event);
    }

    const processTag = ['p', 'span'];

	function Event(){
		var iframe = document.getElementById("ueditor_0");
        for (let tag of processTag) {
            var list = iframe.contentDocument.getElementsByTagName(tag);
            //console.log(plist);
            for (let i=0;i<list.length;i++){
                var s = list[i].innerHTML;
                list[i].innerHTML = replaceText(s);
            }
        }
	}

    function replaceText(text){
        text = text.replace(ALPHA_NUMBER_CJK, '$1$2 $3');
        text = text.replace(ALPHA_CJK, '$1 $2');
        text = text.replace(CJK_ALPHA, '$1 $2');
        text = text.replace(NUMBER_CJK, '$1 $2');
        text = text.replace(CJK_NUMBER, '$1 $2');
        text = text.replace(CJK_AND_ALPHA, '$1 $2 $3');
        text = text.replace(ALPHA_AND_CJK, '$1 $2 $3');
        text = text.replace(ALPHA_SYMBOL_CJK, '$1$2 $3');
        text = text.replace(CJK_SYMBOL_ALPHA, '$1 $2$3');
        text = text.replace(NUMBER_SYMBOL_CJK, '$1$2 $3');
        text = text.replace(CJK_SYMBOL_NUMBER, '$1 $2$3');
        text = text.replace(CJK_SYMBOL_SYMBOL, '$1 $2$3');
        text = text.replace(SYMBOL_SYMBOL_CJK, '$1$2 $3');
        text = text.replace(BRACKET_CJK, '$1 $2');
        text = text.replace(CJK_BRACKET, '$1 $2');
        text = text.replace(CJK_SYMBOL_CJK_SYMBOL_CJK, '$1 $2 $3 $4 $5');
        text = text.replace(CJK_SYMBOL_CJK, '$1 $2 $3');
        text = text.replace(CJK_ACCOUNT_CJK, '$1 $3$5$7 $9');
        return text;
    }
})();