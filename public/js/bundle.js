/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plane = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./webgl-utils/geometries/plane\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _plane2 = _interopRequireDefault(_plane);

var _circle = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./webgl-utils/geometries/circle\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var w = window.innerWidth;
var h = window.innerHeight;

var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

var plane = new _plane2.default(gl, {
    x: 0,
    y: 0,
    width: w,
    height: h,
    drawMode: gl.TRIANGLES,
    vertexShader: '\n        attribute vec2 a_position;\n        attribute vec2 a_uv;\n\n        uniform vec2 u_resolution;\n\n        varying vec2 v_uv;\n\n        void main () {\n            vec2 clipSpace = vec2(a_position / u_resolution) * 2.0 - 1.0;\n            gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);\n\n            v_uv = a_uv;\n        }\n    ',
    fragmentShader: '\n        precision highp float;\n\n        varying vec2 v_uv;\n\n        void main () {\n            gl_FragColor = vec4(v_uv, 0.0, 1.0);\n        }\n    '
});

var circle = new _circle2.default(gl, {
    x: w / 2,
    y: h / 2,
    radius: 200,
    numPoints: 100,
    drawMode: gl.TRIANGLE_FAN,
    vertexShader: '\n        attribute vec2 a_position;\n\n        uniform vec2 u_resolution;\n\n        void main () {\n            vec2 clipSpace = vec2(a_position / u_resolution) * 2.0 - 1.0;\n            gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);\n        }\n    ',
    fragmentShader: '\n        void main () {\n            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n        }\n    '
});

renderFrame(0);
function renderFrame(ts) {
    requestAnimationFrame(renderFrame);

    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    plane.renderFrame(gl);
    circle.rendrFrame(gl);
}

/***/ })
/******/ ]);