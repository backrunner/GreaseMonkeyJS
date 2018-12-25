// ==UserScript==
// @name         江西财经大学选课辅助
// @version      2.0
// @description  还在烦恼选课慢？
// @author       BackRunner
// @include      *://*/lightSelectSubject/
// @include      *://*/lightSelectSubject/login.htm
// @include      *://xk.jxufe.edu.cn/
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @require      https://cdn.jsdelivr.net/gh/naptha/tesseract.js@v1.0.14/dist/tesseract.min.js
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==

(function() {
    console.log('快速选课脚本启动......  Developed by BackRunner');

    if (window.location.href.indexOf('xk.jxufe.edu.cn') != -1){
        $('#main').append('<div style="width:100%;display:block;"><div id="backrunner" style="border:solid 1px black;width:290px;height:auto;margin:0 auto;text-align:center;display:block;"><div style="display:flex;"><span style="display:inline-block;margin-top:20px;padding-left:12px;">学号</span><input class="brinput" id="brinput-no" style="display:inline-block;width:190px;padding:10px 12px;margin:10px 15px;"/></div><div style="display:flex;"><span style="display:inline-block;margin-top:20px;padding-left:12px;">密码</span><input class="brinput" id="brinput-pwd" type="password" style="display:inline-block;width:190px;padding:10px 12px;margin:10px 15px;"/></div><div><button class="brbtn" id="brbtn-saveinfo" style="width:90%;padding:10px 12px; margin:10px;">保存</button><span style="width:100%;font-size:10px;line-height:28px;display:block">选课辅助 by BackRunner with 江财网安</span></div>');
        var no = GM_getValue('username',"");
        var pd = GM_getValue('password',"");
        $('#brinput-no').val(no);
        $('#brinput-pwd').val(pd);
        $('#brbtn-saveinfo').click(function(){
            no = $('#brinput-no').val();
            pd = $('#brinput-pwd').val();
            GM_setValue('username',no);
            GM_setValue('password',pd);
            alert("选课辅助：\n信息保存成功，页面即将刷新。");
            window.location.href = window.location.href;
        });
        return;
    }

    function checkTitle(){
        if (document.title.indexOf('503')!=-1){
            window.location.href = window.location.href;
        }
    }

    //execute
    setTimeout(function(){
        checkTitle();
    },100);

    //lazy execute
    $(document).ready(function(){
        if (document.body.innerHTML.indexOf('江西财经大学')!=-1){
            //base64 function
            function getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var pixels = ctx.getImageData(0, 0, img.width, img.height);
                var pixeldata = pixels.data;
                for (var i=0, len=pixeldata.length;i<len;i+=4){
                    var gray =parseInt( pixels.data[i]*0.3 + pixels.data[i+1] *0.59 + pixels.data[i+2]*0.11);
                    pixels.data[i] = gray;
                    pixels.data[i+1] = gray;
                    pixels.data[i+2] = gray;
                }
                for (i=0, len=pixeldata.length;i<len;i+=4){
                    if (pixels.data[i] >= 155){
                        pixels.data[i] = 255;
                        pixels.data[i+1] = 255;
                        pixels.data[i+2] = 255;
                    } else {
                        pixels.data[i] = 0;
                        pixels.data[i+1] = 0;
                        pixels.data[i+2] = 0;
                    }
                }
                ctx.putImageData(pixels,0,0,0,0, img.width, img.height);
                var dataURL = canvas.toDataURL("image/png");
                return dataURL
                //return dataURL.replace("data:image/png;base64,", "");
            }

            function changeImage_moded(){
                var img = document.createElement('img');
                img.src = 'loginSign.jsp?temptime'+Math.random();  //此处自己替换本地图片的地址
                img.onload =function() {
                    var base64data = getBase64Image(img);
                    //console.log(base64data);
                    var codeImg = document.getElementById('loginImg');
                    codeImg.src = base64data;

                    Tesseract.recognize(base64data, {
                        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                    })
                    //.progress(message => console.log(message))
                        .catch(err => console.error(err))
                        .then(result => {
                        console.log(result)
                        $('#signImg').val(result.text.replace(/\n/g,"").replace(/ /g,"").toUpperCase());
                    })
                        .finally(resultOrError => console.log(resultOrError));
                }
            }

            //override callback
            function changeBoxCb_moded(originalRequest)
            {
                if (document.getElementById('authImg').innerHTML==""){
                    if (originalRequest.responseText=="")//如果没有满的话，则显示验证码
                    {
                        var img = document.createElement('img');
                        img.src = 'loginSign.jsp';  //此处自己替换本地图片的地址
                        img.onload =function() {
                            var base64data = getBase64Image(img);
                            //console.log(base64data);
                            var codeImg = document.createElement('img');
                            codeImg.setAttribute('id','loginImg');
                            codeImg.onclick = function(){
                                changeImage_moded();
                            };
                            codeImg.src = base64data;
                            document.getElementById('authImg').appendChild(codeImg);

                            Tesseract.recognize(base64data, {
                                tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                            })
                            //.progress(message => console.log(message))
                                .catch(err => console.error(err))
                                .then(result => {
                                console.log(result)
                                $('#signImg').val(result.text.replace(/\n/g,"").replace(/ /g,"").toUpperCase());
                            })
                                .finally(resultOrError => console.log(resultOrError));
                        }
                        //document.getElementById('authImg').innerHTML="<img id='loginImg' src='loginSign.jsp' border=0 onclick='javascript:changeImage_moded()'>";
                        //var codebase64 = getBase64Image(document.getElementById('loginImg'));
                        //console.log(codebase64);
                    } else {
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

            //auto get code
            getCode();
        } else {
            setTimeout(function(){
                window.location.href = window.location.href;
            },100);
        }
    });
})();

