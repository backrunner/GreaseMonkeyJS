// ==UserScript==
// @name         绕过Unipus的插件检测
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.1
// @description  通过更改变量值来禁用Unipus的检测，适用于江西财经大学的
// @author       BackRunner
// @include      *://nhce*.edu*/login/*
// @include      *://nhce*.edu*/book/*
// @run-at       document-body
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    console.log("plugin mod script loaded");
    var chivox = 1;
    window.chivox = chivox;
    console.log("plugin check moded #1");
    if (typeof("learnXcheck") === undefined && learnXcheck){
        console.log("plugin check moded #2");
        learnXcheck=false;
    }
    var learnXcheck = false;
    window.learnXcheck = learnXcheck = false;
})();