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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plane = __webpack_require__(5);

var _plane2 = _interopRequireDefault(_plane);

var _circle = __webpack_require__(8);

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

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(6);

var _utils2 = _interopRequireDefault(_utils);

var _baseGeometry = __webpack_require__(7);

var _baseGeometry2 = _interopRequireDefault(_baseGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plane = function (_BaseGeometry) {
    _inherits(Plane, _BaseGeometry);

    function Plane(gl, props) {
        _classCallCheck(this, Plane);

        var _this = _possibleConstructorReturn(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, gl, props));

        _this.x = props.x;
        _this.y = props.y;
        _this.width = props.width;
        _this.height = props.height;

        var x1 = _this.x;
        var y1 = _this.y;
        var x2 = _this.width;
        var y2 = _this.height;
        var positions = new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]);

        var texCoords = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);

        _this.positionBuffer = _utils2.default.makeAttribBuffer(gl, _this.attributes.a_position, positions, 2, gl.FLOAT);
        _this.uvBuffer = _utils2.default.makeAttribBuffer(gl, _this.attributes.a_uv, texCoords, 2, gl.FLOAT);

        return _this;
    }

    _createClass(Plane, [{
        key: 'renderFrame',
        value: function renderFrame(gl) {
            gl.useProgram(this.program);
            gl.drawArrays(this.drawMode, 0, 6);
        }
    }]);

    return Plane;
}(_baseGeometry2.default);

exports.default = Plane;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    makeAttribBuffer: function makeAttribBuffer(gl, attribLocation, data, count, type) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(attribLocation, count, type, false, 0, 0);
        gl.enableVertexAttribArray(attribLocation);

        return buffer;
    },

    makeShader: function makeShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    },

    makeProgram: function makeProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = __webpack_require__(6);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseGeometry = function BaseGeometry(gl, props) {
    _classCallCheck(this, BaseGeometry);

    this.drawMode = props.drawMode;

    this.uniforms = {};
    this.attributes = {};

    var vertexShader = _utils2.default.makeShader(gl, gl.VERTEX_SHADER, props.vertexShader);
    var fragmentShader = _utils2.default.makeShader(gl, gl.FRAGMENT_SHADER, props.fragmentShader);
    this.program = _utils2.default.makeProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(this.program);

    var uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < uniformCount; i += 1) {
        var uniformName = gl.getActiveUniform(this.program, i).name;
        this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
    }

    var attribCount = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
    for (var _i = 0; _i < attribCount; _i += 1) {
        var attribName = gl.getActiveAttrib(this.program, _i).name;
        this.attributes[attribName] = gl.getAttribLocation(this.program, attribName);
    }

    // uniforms
    gl.uniform2f(this.uniforms.u_resolution, window.innerWidth, window.innerHeight);
};

exports.default = BaseGeometry;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(6);

var _utils2 = _interopRequireDefault(_utils);

var _baseGeometry = __webpack_require__(7);

var _baseGeometry2 = _interopRequireDefault(_baseGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_BaseGeometry) {
    _inherits(Circle, _BaseGeometry);

    function Circle(gl, props) {
        _classCallCheck(this, Circle);

        var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, gl, props));

        _this.x = props.x;
        _this.y = props.y;
        _this.radius = props.radius;
        _this.numPoints = props.numPoints;

        var positions = new Float32Array(_this.numPoints * 2);

        var step = Math.PI * 2 / _this.numPoints;
        for (var i = 0; i < _this.numPoints; i += 1) {
            positions[i * 2 + 0] = _this.x + Math.sin(i * step) * _this.radius;
            positions[i * 2 + 1] = _this.y + Math.cos(i * step) * _this.radius;
        }
        console.log(positions);

        _this.positionBuffer = _utils2.default.makeAttribBuffer(gl, _this.attributes.a_position, positions, 2, gl.FLOAT);

        return _this;
    }

    _createClass(Circle, [{
        key: 'rendrFrame',
        value: function rendrFrame(gl) {
            gl.useProgram(this.program);
            gl.drawArrays(this.drawMode, 0, this.numPoints);
        }
    }]);

    return Circle;
}(_baseGeometry2.default);

exports.default = Circle;

/***/ })
/******/ ]);