// ==UserScript==
// @name         江西财经大学选课辅助 - 内页
// @version      1.4
// @description  辅助加强
// @author       BackRunner
// @include      http://xk.jxufe.edu.cn/*
// @include      */lightSelectSubject/studentSelectSubject.htm
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

var storageValue = GM_getValue('classes');
var classes = new Array();

(function() {

    if (typeof storageValue != "undefined"){
        if (storageValue.length>1){
            var storage = JSON.parse(storageValue);
            for (let i=0;i<storage.length;i++){
                classes.push(storage[i]);
            }
        }
    }

    console.log(classes);

    if (window.location.href.indexOf('xk.jxufe.edu.cn') != -1){
        //主页
        document.getElementById('main').insertAdjacentHTML('afterbegin','<div id="backrunner-2" style="position:absolute;left:200px;margin-top:200px;border:solid 1px black;width:290px;height:auto;text-align:center;display:block;"><div style="display:flex;"><span style="display:inline-block;margin-top:20px;padding-left:12px;">课程</span><input class="brinput" id="brinput-class" style="display:inline-block;width:190px;padding:10px 12px;margin:10px 15px;"/></div><div style="display:flex;"><span style="display:inline-block;margin-top:20px;padding-left:12px;">名称</span><input class="brinput" id="brinput-classname" style="display:inline-block;width:190px;padding:10px 12px;margin:10px 15px;"/></div><div style="display:flex;"><span style="display:inline-block;margin-top:20px;padding-left:12px;">班号</span><input class="brinput" id="brinput-classNo" type="text" style="display:inline-block;width:190px;padding:10px 12px;margin:10px 15px;"/></div><div><button class="brbtn" id="brbtn-addclass" style="width:90%;padding:10px 12px; margin:10px;">添加</button></div><div><button class="brbtn" id="brbtn-truncateclass" style="width:90%;padding:10px 12px;margin:10px;">清空</button></div></div>');
        document.getElementById('main').insertAdjacentHTML('afterbegin','<div id="backrunner-3" style="position:absolute;right:100px;margin-top:200px;width:300px;height:auto;display:block;"></div>');

        var infodiv = document.getElementById('backrunner-3');
        for (let i=classes.length-1;i>=0;i--){
            infodiv.insertAdjacentHTML('afterbegin', '<span style="width:300px;display:block;float:left;">'+classes[i].classCode + ' '+ classes[i].classNo + ' ' +classes[i].className+'</span>');
        }

        document.getElementById('brbtn-addclass').onclick = function(){
            let classCode = document.getElementById('brinput-class').value;
            let className = document.getElementById('brinput-classname').value;
            let classNo = document.getElementById('brinput-classNo').value;
            classes.push({
                classCode: classCode,
                className: className,
                classNo: classNo
            });
            GM_setValue('classes',JSON.stringify(classes));
            alert('添加成功');
            document.getElementById('brinput-class').value = '';
            document.getElementById('brinput-classname').value = '';
            document.getElementById('brinput-classNo').value = '';
        }
        document.getElementById('brbtn-truncateclass').onclick = function(){
            GM_setValue('classes', '');
            classes = new Array();
            alert('清空成功');
        }
    } else {
        function cleanClassNo(){
            document.getElementById('classNO').value = '';
            console.log(1);
        }

        function addTopBtn(){
            document.body.innerHTML += '<button onclick="viewData();" style="margin-bottom: 8px;">免等刷新</button><button id="br-onclick" style="margin-left: 8px;">一键提交</button>';
            document.getElementById('br-onclick').onclick = function(){
                for (let i=0;i<classes.length;i++){
                    checkSelectCourse4(classes[i].classCode, classes[i].classNo, "1");
                }
            }
        }

        function brchoose(){
            let index = parseInt(this.getAttribute('data-index'));
            document.getElementById('divFlyBar').setAttribute('style','position: absolute; top: 45px; left: 10px; z-index: 100;');
            document.getElementById('courseCode').value = classes[index].classCode;
            document.getElementById('classNO').value = classes[index].classNo;
            viewCourse($('courseCode').value,$('classNO').value);
        }

        function brfill(){
            let index = parseInt(this.getAttribute('data-index'));
            document.getElementById('divFlyBar').setAttribute('style','position: absolute; top: 45px; left: 10px; z-index: 100;');
            document.getElementById('courseCode').value = classes[index].classCode;
            document.getElementById('classNO').value = classes[index].classNo;
        }

        function brsubmit(){
            let index = parseInt(this.getAttribute('data-index'));
            document.getElementById('divFlyBar').setAttribute('style','position: absolute; top: 45px; left: 10px; z-index: 100;');
            //checkSelectCourse2(classes[index].classCode, classes[index].classNo);
            checkSelectCourse4(classes[index].classCode, classes[index].classNo, "1");
        }

        //execute
        addTopBtn();
        setTimeout(function(){
            cleanClassNo();
        },200);

        for (let i=0;i<classes.length;i++){
            document.body.innerHTML += '<br><span style="width:300px;display:block;float:left;">'+classes[i].classCode + ' '+ classes[i].classNo + ' ' +classes[i].className+'</span><button class="brfill" data-index="'+i+'" style="display: inline-block; margin-left:8px;">填</button><button class="brchoose" data-index="'+i+'" style="display: inline-block; margin-left:8px;">选</button><button class="brsubmit" data-index="'+i+'" style="display: inline-block; margin-left:8px;">提交</button><br>';
        }

        var btns_choose = document.getElementsByClassName('brchoose');
        for (let i=0;i<btns_choose.length;i++){
            btns_choose[i].addEventListener('click',brchoose);
        }

        var btns_fill = document.getElementsByClassName('brfill');
        for (let i=0;i<btns_fill.length;i++){
            btns_fill[i].addEventListener('click',brfill);
        }

        var btns_submit = document.getElementsByClassName('brsubmit');
        for (let i=0;i<btns_submit.length;i++){
            btns_submit[i].addEventListener('click',brsubmit);
        }
    }
})();