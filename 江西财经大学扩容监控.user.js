// ==UserScript==
// @name         江西财经大学扩容监控
// @version      1.0
// @description  注意：启用后便会直接启动暴力刷新监控，请确认你的信息和环境。[江西财经大学网络安全协会内部专用，严禁外传]
// @author       BackRunner
// @include      */lightSelectSubject/studentSelectSubject.htm
// @grant        none
// ==/UserScript==

(function() {
    //definition
    var courseCode = '';
    var classNo = '';

    console.log('\n\n\n%c江西财经大学扩容监控脚本 %cver '+GM.info.script.version+'\n%cDeveloped by BackRunner\n%c江西财经大学网络安全协会内部专用，严禁外传\n\n\n','color: #1faeff;font-size: 16px;','color:#8f8f8f;font-size: 12px','color: #1faeff;','color: #8f8f8f;');

    function supervisor(){
        var a = document.querySelector("#listCoursePanel > table > tbody > tr:nth-child(3) > td:nth-child(12)");
        if (a != null){
            //console.log(a);
            if (parseInt(a.innerText)>20){
                checkSelectCourse4(courseCode, classNo, "1");
            } else {
                viewCourse(courseCode, classNo);
                setTimeout(function(){
                    supervisor();
                },200);
            }
        } else {
            viewCourse(courseCode, classNo);
            setTimeout(function(){
                supervisor();
            },200);
        }
    }

    //execution
    viewCourse(courseCode, classNo);
    supervisor();
})();