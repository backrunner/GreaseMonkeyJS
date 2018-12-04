// ==UserScript==
// @name         CSDN博客免登陆
// @namespace    https://coding.net/u/BackRunner/p/GreaseMonkey-JS/git
// @version      1.0
// @description  Fuck it up!
// @author       BackRunenr
// @include      *://blog.csdn.net/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    window.csdn.anonymousUserLimit = "no";
})();