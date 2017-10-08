// ==UserScript==
// @name         bilibili直播精简
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      2.2
// @description  【可能是你遇到的最好用的Bilibili直播精简脚本】，送礼随心开关，页面清爽无广告！
// @author       BackRunner
// @match        *://live.bilibili.com/*
// @license      MIT
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_info
// ==/UserScript==

// ==   Tips   ==
// 使用时可以根据自己需要用双斜线注释掉部分代码开启你想要的功能
// 建议临时开启部分功能不要更改下面的代码，请临时禁用这个脚本
// 注释掉部分代码可能会影响整体美观
// == 更新日志 ==
// 2017.04.23 - 2.2
// 更新聊天框的过滤规则
// ==============


(function() {
	//变量定义
	var hideGift = false;
	var hideUserInfo = false;
	//更新提示
	updateAlert();

	//初始化
	initialize();

	//主执行
	if (window.location.href == "http://live.bilibili.com/"){
		console.warn('Bilibili直播页面精简脚本 by BackRunner: 目前在主页，不执行脚本');
	} else {
		console.warn('Bilibili直播页面精简脚本 by BackRunner: 脚本运行');
		addCSS();
		//延迟脚本
		setTimeout(function(){
			var interval = setInterval(check,120);
			var n = 0;
			function check(){
				//添加礼物按钮
				addControlButton();
				n++;
				if (n>4){
					clearInterval(interval);
				}
			}
		});
		//惰性脚本
		$(document).ready(function(){
			addControlButton();
		});
	}

	function initialize(){
		hideGift = initialize_var("hideGift",true);
		hideUserInfo = initialize_var("hideUserInfo",true);
	}

	function initialize_var(name,defaultSet){
		var obj = GM_getValue(name,defaultSet);
		if (obj === undefined){
			obj = defaultSet;
		}
		return obj;
	}

	function saveVar(){
		GM_setValue("hideGift",hideGift);
		GM_setValue("hideUserInfo",hideUserInfo);
	}

	function addCSS(){
		//变量定义
		var cssText = "";

		//去广告Banner
		cssText += '.live-ad-full {display:none !important;}';
		//去顶部下载
		cssText += '.download-link {display:none !important;}';		
		//去除左边栏
		cssText += '#room-left-sidebar {display:none !important;}';
		//背景调整
		cssText += '.bk-img {transform:translate(0,0) !important;-webkit-transform:translate(0,0) !important;}';
		//主体位置调整
		cssText += '.room-main-ctnr {transform:translate(0,0) !important; -webkit-transform:translate(0,0) !important;}';

		if (hideGift){
			//去除礼物面板
			cssText += '.gift-panel.main-section {display:none !important;}';
			//去除聊天框低于1000礼物提示
			cssText += '.gift-msg-1000.p-absolute {display:none !important;}';
			//去除礼物连击
			cssText += '.super-gift-ctnr {display:none !important;}';
			//移除播主信息中的礼物信息
			cssText += '.activity-top-panel {display:none !important;}';
			cssText += '.row-item {display:none !important;}';
			//移除银瓜子宝箱
			cssText += '.treasure-box-ctnr {display:none !important;}';
			//礼物信息
			cssText += '#chat-msg-list .gift-msg {display: none !important;} #chat-list-ctnr > .super-gift-ctnr, #gift-msg-1000 {display: none !important;} #chat-list-ctnr > #chat-msg-list {height: 100% !important;}';
			//聊天框内的各种公告（系统公告、小电视抽奖）
			cssText += '.announcement-container {display:none !important;}';
		}
		//保持播主信息显示
		cssText += '.bili-link {display:inline-block !important;}';

		//移除我要直播
		cssText += '.live-action-btn-ctnr {display:none !important;}';
		//移除整个footer
		cssText += '.live-footer.p-relative {display:none !important;}';	

		//去聊天框内用户等级信息、VIP标志、等级信息等等
		if (hideUserInfo){
			//去除排行榜
			cssText += '.rank-list-ctnr {display:none !important;}';
			//用户vip标志
			cssText += '#chat-msg-list a[href="/i#to-vip"] {display: none !important;}';
			//奖牌标志
			cssText += '#chat-msg-list .medal-icon {display: none !important;}';
			//用户等级标志
			cssText += '#chat-msg-list .user-level-icon {display: none !important;}';
			//称号标志
			cssText += '#chat-msg-list a[href="/i/myTitle#list"] {display: none !important;}';
			//Guard
			cssText += '.guard-icon-small {display:none !important}';
			cssText += '.guard-msg {display:none !important};';			
			//弹幕字数限制提示css调整
			cssText += '.danmu-length-count {top:22px !important;}';
			//聊天发送框css调整
			cssText += '.danmu-textbox.float-left {height:65px !important;}';
			cssText += '.danmu-send-btn {height:85px !important;}';
			//聊天发送框下排3个按钮
			cssText += '.profile-ctrl {display:none !important;}';
			//聊天面板css调整
			cssText += '#chat-ctrl-panel {padding:20px 10px 23px 10px !important;}';
			//各种span类的用户标志
			cssText += '.check-my-title {display:none !important;}';
			//爷
			cssText += '.vip-icon {display:none !important;}';
		}

		//聊天框内的系统公告（xxx进入了直播间）
		cssText += '.system-msg {display:none !important;}';

		//canvas
		cssText += '#haruna-canvas {display:none !important;}';

		//顶部css调整（如果错位请注释掉下面这个部分）
		cssText += '.search-bar-ctnr {padding-right:80px; !important}';
		cssText += '.user-avatar {padding-right:40px; !important}';
		try{
			$('#top-nav-msg-hinter').css('right','60px');
		}catch(e){
			console.error(e);
		}

		//控制开关对应的css调整
		cssText += '.chiyo-22 {display:none !important;}';
		cssText += '.attention-btn-ctrl {margin-top:10px !important;margin-bottom:10px !important;}';
		cssText += '.backrunner-btn {margin-right:5px;}';

		var modStyle = document.querySelector('#modCSS');
		if (modStyle === null)
		{
			modStyle = document.createElement('style');
			modStyle.id = 'modCSS';
			document.body.appendChild(modStyle);
		}   
		modStyle.innerHTML = cssText;
	}

	function addControlButton(){
		var before = document.getElementsByClassName('live-status-switcher')[0];
		//按钮添加
		if (document.querySelector('#backrunner-giftCtrl')===null){			
			//按钮层
			var ctrlDiv=document.createElement("div");
			ctrlDiv.setAttribute("id","backrunner-giftCtrl");
			if (hideUserInfo){
				ctrlDiv.innerHTML+='<button class="live-btn default float-right" id="backrunner-userCtrl-btn">隐藏用户信息</button>';
			} else {
				ctrlDiv.innerHTML+='<button class="live-btn default float-right" id="backrunner-userCtrl-btn">显示用户信息</button>';
			}
			if(hideGift){
				ctrlDiv.innerHTML+='<button class="live-btn default float-right backrunner-btn" id="backrunner-giftCtrl-btn">开启礼物</button>';
			}else{
				ctrlDiv.innerHTML+='<button class="live-btn default float-right backrunner-btn" id="backrunner-giftCtrl-btn">关闭礼物</button>';
			}
			before.parentNode.appendChild(ctrlDiv);
		}				
		//添加事件监听
		addControlButtonEventListener();
	}

	function addControlButtonEventListener(){
		var gift_btn = document.getElementById("backrunner-giftCtrl-btn");
		var user_btn = document.getElementById("backrunner-userCtrl-btn");
		gift_btn.addEventListener('click',giftBtnClick);
		user_btn.addEventListener('click',userBtnClick);
	}

	function giftBtnClick(){
		var btn = document.getElementById("backrunner-giftCtrl-btn");
		//修改变量
		if (hideGift){
			btn.innerHTML="关闭礼物";
			hideGift = false;
		} else {
			btn.innerHTML="开启礼物";
			hideGift = true;
		}
		//重添加CSS
		try{
			$('#modCSS').remove();
			addCSS();
		} catch(e){
			console.error(e);
		}
		//保存
		saveVar();
	}

	function userBtnClick(){
		var btn = document.getElementById("backrunner-userCtrl-btn");
		//修改变量
		if (hideUserInfo){
			btn.innerHTML="隐藏用户信息";
			hideUserInfo = false;
		} else {
			btn.innerHTML="显示用户信息";
			hideUserInfo = true;
		}
		//重添加CSS
		try{
			$('#modCSS').remove();
			addCSS();
		} catch(e){
			console.error(e);
		}
		//保存
		saveVar();
	}

	//更新提醒
	function updateAlert(){        
		var s_update = "Bilibili直播页面精简 by BackRunner：\n检测到脚本版本更改\n\n";
		var version = GM_getValue("version");
		if (version !== GM_info.script.version){
			console.warn("Bilibili直播页面精简 by BackRunner：检测到脚本版本更改：" + version + " → " + GM_info.script.version);
			if (version === undefined){
				version = "未知";
			}
			switch (version){
				default:
					s_update += "版本已从 " + version + " 更新为 " + GM_info.script.version + "\n\n" + GM_info.script.version + "版本的更新内容为：\n更新聊天框的过滤规则\n";
					break;                    
				case "未知":
					s_update += "欢迎使用 Bilibili直播页面精简脚本 by BackRunner\n您当前的脚本版本为： " + version + "\n您可以通过页面上的按钮开关礼物面板和用户信息显示\n";
					break;             
				case "2.2":
					s_update += "版本已从 " + version + " 降级为 " + GM_info.script.version + "\n\n" + "建议使用最新版本的脚本以获得最佳体验\n降级会造成您的设置丢失，请检查您的设置\n";   
					break;
			}
			s_update += "\n遇到任何问题请立刻到GreasyFork反馈\n或者发送邮件至dev@backrunner.top\n如果您觉得本脚本好用可使用支付宝扫描GreasyFork中的二维码进行捐赠\n收到您捐赠的后我会将您的id加入到感谢名单\n感谢名单显示在这里和脚本描述内";
			window.alert(s_update);
			GM_setValue("version",GM_info.script.version);
		} else {
			console.warn("Bilibili直播页面精简 by BackRunner：未检测到脚本版本更改");
		}
	}

})();