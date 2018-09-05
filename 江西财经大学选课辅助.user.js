// ==UserScript==
// @name         江西财经大学选课辅助
// @version      1.0
// @description  还在烦恼选课慢？
// @author       BackRunner
// @include      *://*/lightSelectSubject/
// @include      *://*/lightSelectSubject/login.htm
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==

(function() {
    console.log('快速选课脚本启动......  Developed by BackRunner');
    $(document).ready(function(){
        if (document.body.innerHTML.indexOf('江西财经大学')!=-1){
            //override callback
            function changeBoxCb_moded(originalRequest)
            {
                if (document.getElementById('authImg').innerHTML==""){
                    if (originalRequest.responseText=="")//如果没有满的话，则显示验证码
                    {
                        document.getElementById('authImg').innerHTML="<img id='loginImg' src='loginSign.jsp' border=0 onclick='javascript:changeImage()'>";
                    }else{
                        $('codePanel').innerHTML="<tr><td colspan='2'><span style='color:red'>检测到选课人数已满，正在自动尝试，如果验证码刷出请立刻填写验证码</span></td></tr>";
                        setTimeout(function(){
                            getCode();
                        },200);
                    }
                }
            }

            //code
            function getCode(){
                var url_code = 'loginCode.jsp';
                var ajax_code = new Ajax.Request(url_code , {parameters:"",method:"post",onComplete:changeBoxCb_moded,asynchronous:true});
            }

            function fastEntry(){
                var url_cert = 'cert.jsp';
                var form = Form.serialize('loginForm');
                var ajax_cert = new Ajax.Request(url_cert , {parameters:form,method:"post",asynchronous:false});
                var url_infocheck = 'confirmStudentInfo.jsp';
                var ajax_infocheck = new Ajax.Request(url_infocheck , {parameters:"",method:"post",asynchronous:false});
                var url_permission = 'permission.jsp';
                var ajax_permission = new Ajax.Request(url_permission , {parameters:"",method:"post",asynchronous:false});

                var username = $('#username').val();
                var password = $('#password').val();

                GM_setValue("username",username);
                GM_setValue('password',password);

                document.location.href="studentSelectSubject.htm";
            }

            var usn = GM_getValue('username',"");
            var pwd = GM_getValue('password',"");

            document.body.innerHTML += '<div style="width:100%;display:block;"><div id="backrunner" style="border:solid 1px black;width:250px;height:auto;margin:0 auto;text-align:center;display:block;"><button class="brbtn" id="brbtn-getcode" style="display:block;width:220px;padding:10px 12px;margin:10px 15px;">快速获得验证码</button><button class="brbtn" id="brbtn-entry" style="display:block;width:220px;padding:8px 12px;margin:10px 15px;">速进</button><span style="width:100%;font-size:10px;line-height:28px;display:block">选课辅助 by BackRunner with 江财网安</span></div></div>';
            $('#brbtn-getcode').click(function(){
                getCode();
            });
            $('#brbtn-entry').click(function(){
                fastEntry();
            });
            $('#username').val(usn);
            $('#password').val(pwd);
        } else {
            setTimeout(function(){
                window.location.href = window.location.href;
            },100);
        }
    });
})();

