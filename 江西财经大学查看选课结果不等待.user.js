// ==UserScript==
// @name         江西财经大学选课结果查看不等待
// @version      1.0
// @description  Fuck the Waiting Time
// @author       BackRunner
// @include      */lightSelectSubject/studentSelectSubject.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.innerHTML += '<button onclick="viewData();">免等刷新</button>'
})();