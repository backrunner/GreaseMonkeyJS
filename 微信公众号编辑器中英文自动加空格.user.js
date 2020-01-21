// ==UserScript==
// @name         微信公众号编辑器中英文自动加空格
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      2020.1
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

	function Event(){
		var iframe = document.getElementById("ueditor_0");
		var plist = iframe.contentDocument.getElementsByTagName("p");
        var spanlist = iframe.contentDocument.getElementsByTagName("span");
		//console.log(plist);
		for (let i=0;i<plist.length;i++){
			var s = plist[i].innerHTML;
			let p1=/([A-Za-z_])([\u4e00-\u9fa5]+)/gi;//字母 汉字
			let p2=/([\u4e00-\u9fa5]+)([A-Za-z_])/gi;//汉字 字母
			let p3=/([0-9_])([\u4e00-\u9fa5]+)/gi;//数字 汉字
			let p4=/([\u4e00-\u9fa5]+)([0-9_])/gi;//汉字 数字
			let p5 = /([A-Za-z_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;//英文+符号 汉字
			let p6 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([A-Za-z_])/gi;//汉字 符号+英文
            let p10 = /([0-9_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;//数字+符号 汉字
            let p11 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([0-9_])/gi;//汉字 符号+数字
			let p7 = /([\u4e00-\u9fa5]+)([<])([a])/gi;//汉字 括号
			let p8 = /([a])([>])([\u4e00-\u9fa5]+)/gi;//括号 汉字
            let p9 = /([A-Za-z_])([0-9_])([\u4e00-\u9fa5]+)/gi;//英文+数字 汉字
			s = s.replace(p9,'$1$2 $3').replace(p1, '$1 $2').replace(p2, "$1 $2").replace(p3, "$1 $2").replace(p4, "$1 $2").replace(p5,"$1$2 $3").replace(p6,"$1 $2$3").replace(p11,"$1 $2$3").replace(p10,"$1$2 $3").replace(p7,"$1 $2$3").replace(p8,"$1$2 $3");
			plist[i].innerHTML = s;
			//console.log(s);
		}
        for (let i=0;i<spanlist.length;i++){
			let s = spanlist[i].innerHTML;
			let p1=/([A-Za-z_])([\u4e00-\u9fa5]+)/gi;//字母 汉字
			let p2=/([\u4e00-\u9fa5]+)([A-Za-z_])/gi;//汉字 字母
			let p3=/([0-9_])([\u4e00-\u9fa5]+)/gi;//数字 汉字
			let p4=/([\u4e00-\u9fa5]+)([0-9_])/gi;//汉字 数字
			let p5 = /([A-Za-z_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;//英文+符号 汉字
			let p6 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([A-Za-z_])/gi;//汉字 符号+英文
            let p10 = /([0-9_])([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([\u4e00-\u9fa5]+)/gi;//数字+符号 汉字
            let p11 = /([\u4e00-\u9fa5]+)([`~!@#$%^&*()_\-+=?:"{}|,.\/;'\\[\]·~！@#￥%&*——\-+={}‘’])([0-9_])/gi;//汉字 符号+数字
			let p7 = /([\u4e00-\u9fa5]+)([<])([a])/gi;//汉字 括号
			let p8 = /([a])([>])([\u4e00-\u9fa5]+)/gi;//括号 汉字
            let p9 = /([A-Za-z_])([0-9_])([\u4e00-\u9fa5]+)/gi;//英文+数字 汉字
			s = s.replace(p9,'$1$2 $3').replace(p1, '$1 $2').replace(p2, "$1 $2").replace(p3, "$1 $2").replace(p4, "$1 $2").replace(p5,"$1$2 $3").replace(p6,"$1 $2$3").replace(p11,"$1 $2$3").replace(p10,"$1$2 $3").replace(p7,"$1 $2$3").replace(p8,"$1$2 $3");
			spanlist[i].innerHTML = s;
			//console.log(s);
		}
	}
})();