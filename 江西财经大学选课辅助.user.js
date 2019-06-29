// ==UserScript==
// @name         江西财经大学选课辅助
// @version      2.9
// @description  还在烦恼选课慢？
// @author       BackRunner
// @include      *://*/lightSelectSubject/
// @include      *://*/lightSelectSubject/login.htm
// @include      *://xk.jxufe.edu.cn*
// @require      http://static.backrunner.top/jquery/1.12.4/jquery-1.12.4.min.js
// @require      http://static.backrunner.top/tesseract/2.0.0-alpha.10/tesseract.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {

    if (window.location.protocol == 'https:'){
        console.log('https://下的页面不是正确的选课页面，跳转中……');
        window.location.href='http://xk.jxufe.edu.cn:80/';
    }

    const TesseractWorker = new Tesseract.TesseractWorker({
        langPath: 'http://static.backrunner.top/tessdata/4.0.0',
        corePath: 'http://static.backrunner.top/tesseract-core/2.0.0-beta.10/tesseract-core.wasm.js',
        workerPath: 'http://static.backrunner.top/tesseract/2.0.0-alpha.10/worker.min.js'
    });

    console.log('\n\n\n%c江西财经大学选课辅助脚本 %cver '+GM.info.script.version+'\n%cDeveloped by BackRunner\n%cwith 江西财经大学网络安全协会\n\n唯一安装源: https://io.backrunner.top/2018/12/25/%E6%B1%9F%E8%A5%BF%E8%B4%A2%E7%BB%8F%E5%A4%A7%E5%AD%A6%E9%80%89%E8%AF%BE%E8%BE%85%E5%8A%A9%E8%84%9A%E6%9C%AC.html\n\n\n','color: #1faeff;font-size: 16px;','color:#8f8f8f;font-size: 12px','color: #1faeff;','color: #8f8f8f;');

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
        //ocr test
        TesseractWorker.recognize('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAzUlEQVQ4jWM8c+bMfwYqAyZqGzhqKAMLPslPRyczlC66giHuWjqTIUSFTEMhQIchrjOXwVoAyaLudAYGPAaT7H0+ay8GVyD9/OUnnGpID9MPLxieE1BCsqF39y1iuKIdxxBvzYdTDRFheoVhUXk6wyI4HxTG1gy4jSQjohjurGFIB1pyLq6bIReHa0kPU5UQhu44HYYri3Yx3MWhhILE/5zhxQcqGvr6JShDSDJICGCXJ91QYJh27QSGdJwbgzIOJWTEPuFsyjhaSFMdAADqaDyuZHNGmAAAAABJRU5ErkJggg==')
            .progress(function(message){console.log('progress is: ', message)})
            .finally(resultOrError => console.log(resultOrError));
        return;
    }

    function checkTitle(){
        if (document.title.indexOf('503')!=-1 || document.title.indexOf('404')!=-1){
            window.location.href = window.location.href;
        }
    }

    //execute
    setTimeout(function(){
        checkTitle();
    },100);

    //flag
    var flag_input = false;

    //lazy execute
    $(document).ready(function(){
        if (document.body.innerHTML.indexOf('江西财经大学')!=-1){
            //base64 function
            function getBase64Image(img) {
                let canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                let pixels = ctx.getImageData(0, 0, img.width, img.height);
                let pixeldata = pixels.data;
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
                img.src = 'loginSign.jsp?t='+Math.random();  //此处自己替换本地图片的地址
                img.onload =function() {
                    var base64data = getBase64Image(img);
                    //console.log(base64data);
                    var codeImg = document.getElementById('loginImg');
                    codeImg.src = base64data;
                    flag_input = false;
                    TesseractWorker.recognize(base64data, 'eng', {
                        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                    })
                    //.progress(message => console.log(message))
                        .catch(err => console.error(err))
                        .then(result => {
                            console.log(result)
                            if (!flag_input){
                                $('#signImg').val(result.text.replace(/\n/g,"").replace(/ /g,"").toUpperCase());
                            }
                        })
                        .finally(resultOrError => console.log(resultOrError));
                }
            }

            //override callback
            function changeBoxCb_moded(originalRequest)
            {
                if (originalRequest.responseText=="")//如果没有满的话，则显示验证码
                {
                    $('#loginImg').remove();
                    let img = document.createElement('img');
                    img.src = 'loginSign.jsp?t='+Math.random();
                    img.onload = function() {
                        let base64data = getBase64Image(img);
                        console.log(base64data);
                        let codeImg = document.createElement('img');
                        codeImg.setAttribute('id','loginImg');
                        codeImg.onclick = function(){
                            changeImage_moded();
                        };
                        codeImg.src = base64data;
                        document.getElementById('authImg').appendChild(codeImg);
                        flag_input = false;

                        TesseractWorker.recognize(base64data,'eng',{
                            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                        })
                            .progress(message => console.log(message))
                            .catch(err => console.error(err))
                            .then(result => {
                            console.log(result);
                            if (!flag_input){
                                $('#signImg').val(result.text.replace(/\n/g,"").replace(/ /g,"").toUpperCase());
                            }
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

            document.body.innerHTML += '<div style="width:100%;display:block;"><div id="backrunner" style="border:solid 1px black;width:250px;height:auto;margin:0 auto;text-align:center;display:block;"><button class="brbtn" id="brbtn-getcode" style="display:block;width:220px;padding:10px 12px;margin:10px 15px;">快速获取验证码</button><button class="brbtn" id="brbtn-entry" style="display:block;width:220px;padding:8px 12px;margin:10px 15px;">速进</button><span style="width:100%;font-size:10px;line-height:28px;display:block">选课辅助 by BackRunner with 江财网安</span></div></div>';
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

            //bind
            document.getElementById('signImg').onkeydown = function(){
                flag_input = true;
                console.log(1);
            };
        } else {
            setTimeout(function(){
                window.location.href = window.location.href;
            },100);
        }
    });
})();

