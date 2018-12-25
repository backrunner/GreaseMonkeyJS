// ==UserScript==
// @name         CSDN博客免登陆
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      2.0
// @description  Fuck it up!
// @author       BackRunner
// @include      *://blog.csdn.net/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function(){
        $.getScript('https://smallfile.backrunner.top/scripts/fuckcsdn.js');
    };
})();