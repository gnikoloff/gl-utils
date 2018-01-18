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


var _glInstance = __webpack_require__(1);

var _glInstance2 = _interopRequireDefault(_glInstance);

var _glUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vertexShaderSource = '#version 300 es\n    in vec3 a_position;\n\n    uniform float u_pointSize;\n\n    void main () {\n        gl_PointSize = u_pointSize;\n        gl_Position = vec4(a_position, 1.0);\n    }\n';
var fragmentShaderSource = '#version 300 es\n    precision highp float;\n    \n    out vec4 finalColor;\n\n    void main () {\n        float dist = distance(gl_PointCoord, vec2(0.5));\n        if (dist < 0.5) {\n            finalColor = vec4(0.0, 0.0, 0.0, 1.0);\n        } else {\n            discard;\n        }\n    }\n';

var w = window.innerWidth;
var h = window.innerHeight;

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var glInstance = new _glInstance2.default(canvas).setSize(w / 3, h / 3).clear();
var gl = glInstance.getContext();

var vertexShader = (0, _glUtils.makeShader)(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = (0, _glUtils.makeShader)(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
var program = (0, _glUtils.makeProgram)(gl, vertexShader, fragmentShader);

gl.useProgram(program);
var a_positionLocation = gl.getAttribLocation(program, 'a_position');
var u_pointSizeLocation = gl.getUniformLocation(program, 'u_pointSize');
gl.useProgram(null);

var positions = new Float32Array([0.0, 0.0, 0.0]);
var positionBuffer = glInstance.createArrayBuffer(positions);

gl.useProgram(program);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.enableVertexAttribArray(a_positionLocation);
gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);

onRenderFrame();
function onRenderFrame() {
    var newTime = window.performance.now() / 1000;
    var delta = newTime - oldTime;
    oldTime = newTime;

    window.requestAnimationFrame(onRenderFrame);

    gl.uniform1f(u_pointSizeLocation, 5.0 + Math.sin(oldTime) * 50.0);
    glInstance.clear();
    gl.drawArrays(gl.POINT, 0, 1);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLInstance = function () {
    function GLInstance(canvas) {
        _classCallCheck(this, GLInstance);

        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2');

        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    }

    _createClass(GLInstance, [{
        key: 'createArrayBuffer',
        value: function createArrayBuffer(floatArr) {
            var isStatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var gl = this.gl;

            var buffer = gl.createBuffer();
            var drawType = isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, floatArr, drawType);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            return buffer;
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.gl;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            return this;
        }
    }, {
        key: 'setSize',
        value: function setSize(w, h) {
            var dpr = window.devicePixelRatio || 1.0;
            this.canvas.style.width = w + 'px';
            this.canvas.style.height = h + 'px';
            this.canvas.width = w * dpr;
            this.canvas.height = h * dpr;
            this.gl.viewport(0, 0, w * dpr, h * dpr);
            return this;
        }
    }]);

    return GLInstance;
}();

exports.default = GLInstance;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var makeShader = exports.makeShader = function makeShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

var makeProgram = exports.makeProgram = function makeProgram(gl, vertexShader, fragmentShader) {
    var doValidate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Failed to link program:");
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return;
    }

    if (doValidate) {
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error("Failed to validate the program:");
            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return;
        }
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
};

/***/ })
/******/ ]);