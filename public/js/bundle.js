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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glConstants = __webpack_require__(4);

var constants = _interopRequireWildcard(_glConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLInstance = function () {
    function GLInstance(canvas) {
        _classCallCheck(this, GLInstance);

        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2');
        if (!this.gl) console.error('WebGL2.0 is not supported.');

        this.meshesCache = [];

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

        // Turns arrays into GL buffers 
        // Then setup a VAO to predefine the buffers 
        // for standard shader attributes (position, normal, uv, index).

        // VAO will hold all the state needed for a single draw call

    }, {
        key: 'createMeshVAO',
        value: function createMeshVAO(props) {
            var gl = this.gl;

            var rtn = { drawMode: gl.TRIANGLES };

            if (props.verticesArray) {
                rtn.vertexBuffer = gl.createBuffer();
                rtn.vertexComponentLen = 3;
                rtn.vertexCount = props.verticesArray.length / rtn.vertexComponentLen;

                gl.bindBuffer(gl.ARRAY_BUFFER, rtn.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, props.verticesArray, gl.STATIC_DRAW);
                gl.enableVertexAttribArray(constants.ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
            }

            // Set up position
            if (props.verticesArray) {
                rtn.vertexBuffer = gl.createBuffer();
                rtn.vertexComponentLen = 3;
                rtn.vertexCount = props.verticesArray.length / rtn.vertexComponentLen;

                gl.bindBuffer(gl.ARRAY_BUFFER, rtn.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, props.verticesArray, gl.STATIC_DRAW);
                gl.enableVertexAttribArray(constants.ATTR_POSITION_LOC, rtn.vertexComponentLen, gl.FLOAT, false, 0, 0);
            }

            // Set up normal
            if (props.normalsArray) {
                rtn.normalsBuffer = gl.createBuffer();
                rtn.normalComponentLen = 3;
                rtn.normalCount = props.normalsArray.length / rtn.normalComponentLen;

                gl.bindBuffer(gl.ARRAY_BUFFER, rtn.normalsBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, props.normalsArray, gl.STATIC_DRAW);
                gl.enableVertexAttribArray(constants.ATTR_NORMAL_LOC, rtn.normalComponentLen, gl.FLOAT, false, 0, 0);
            }

            // Set up uv
            if (props.uvsArray) {
                rtn.uvsBuffer = gl.createBuffer();
                rtn.uvsComponentLen = 3;
                rtn.uvsCount = props.uvsArray.length / rtn.uvsComponentLen;

                gl.bindBuffer(gl.ARRAY_BUFFER, rtn.uvsBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, props.uvsArray, gl.STATIC_DRAW);
                gl.enableVertexAttribArray(constants.ATTR_UV_LOC, rtn.uvsComponentLen, gl.FLOAT, false, 0, 0);
            }

            // Set up indexes
            if (props.indexesArray) {
                rtn.indexBuffer = gl.createBuffer();
                rtn.indexCount = props.indexesArray.length;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rtn.indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(props.indexesArray), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }

            // clean up time

            // very important!
            // unbind the VAO
            gl.bindVertexArray(null);
            // unbind any buffers that might be set
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            this.meshesCache[props.name] = rtn;
            return rtn;
        }

        // helpers

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderLoop = function () {
    function RenderLoop(fps) {
        _classCallCheck(this, RenderLoop);

        this.oldTime = 0;
        this.updateAnimationFrame = this.updateAnimationFrame.bind(this);

        this.cb = null;
    }

    _createClass(RenderLoop, [{
        key: "start",
        value: function start(cb) {
            this.cb = cb;
            this.updateAnimationFrame();
        }
    }, {
        key: "stop",
        value: function stop(cb) {
            window.cancelAnimationFrame(this.rAf);
            if (cb) cb();
            this.cb = null;
        }
    }, {
        key: "updateAnimationFrame",
        value: function updateAnimationFrame() {
            this.rAf = window.requestAnimationFrame(this.updateAnimationFrame);
            var currentTime = performance.now() / 1000;
            var deltaTime = currentTime - this.oldTime;
            this.oldTime = currentTime;

            this.cb(deltaTime);
        }
    }]);

    return RenderLoop;
}();

exports.default = RenderLoop;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStandardAttribLocations = exports.makeProgram = undefined;

var _glConstants = __webpack_require__(4);

var constants = _interopRequireWildcard(_glConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var makeShader = function makeShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

// Export methods

var makeProgram = exports.makeProgram = function makeProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var doValidate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Failed to link program:');
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return;
    }

    if (doValidate) {
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('Failed to validate the program:');
            console.log(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return;
        }
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
};

// Get the locations of standard attributes that are mostly used.
// Location will be -1 if attribute is not found
var getStandardAttribLocations = exports.getStandardAttribLocations = function getStandardAttribLocations(gl, program) {
    return {
        position: gl.getAttribLocation(program, constants.ATTR_POSITION_NAME),
        normal: gl.getAttribLocation(program, constants.ATTR_NORMAL_NAME),
        uvs: gl.getAttribLocation(program, constants.ATTR_UV_NAME)
    };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(2);

var _glInstance = __webpack_require__(0);

var _glInstance2 = _interopRequireDefault(_glInstance);

var _shader = __webpack_require__(5);

var _shader2 = _interopRequireDefault(_shader);

var _renderLoop = __webpack_require__(1);

var _renderLoop2 = _interopRequireDefault(_renderLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vertexShaderSource = '#version 300 es\n    in vec3 a_position;\n\n    uniform float u_pointSize;\n\n    void main () {\n        gl_PointSize = u_pointSize;\n        gl_Position = vec4(a_position, 1.0);\n    }\n';
var fragmentShaderSource = '#version 300 es\n    precision highp float;\n    \n    out vec4 finalColor;\n\n    void main () {\n        float dist = distance(gl_PointCoord, vec2(0.5));\n        if (dist < 0.5) {\n            finalColor = vec4(0.0, 0.0, 0.0, 1.0);\n        } else {\n            discard;\n        }\n    }\n';

var w = window.innerWidth;
var h = window.innerHeight;
var oldTime = 0;

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var renderLoop = new _renderLoop2.default();
var glInstance = new _glInstance2.default(canvas).setSize(w / 3, h / 3).clear();
var gl = glInstance.getContext();
var program = (0, _utils.makeProgram)(gl, vertexShaderSource, fragmentShaderSource);

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

var TestShader = function (_Shader) {
    _inherits(TestShader, _Shader);

    function TestShader(gl) {
        _classCallCheck(this, TestShader);

        var vertexShaderSource = '';
        var fragmentShaderSource = '';

        var _this = _possibleConstructorReturn(this, (TestShader.__proto__ || Object.getPrototypeOf(TestShader)).call(this, gl, vertexShaderSource, fragmentShaderSource));

        _this.uniformLocations.u_pointSize = gl.getUniformLocation(_this.program, 'u_pointSize');
        // this.uniformLocations.u_angle =
        return _this;
    }

    _createClass(TestShader, [{
        key: 'set',
        value: function set(size, angle) {}
    }]);

    return TestShader;
}(_shader2.default);

renderLoop.start(function (deltaTime) {
    gl.uniform1f(u_pointSizeLocation, 200.0);
    glInstance.clear();
    gl.drawArrays(gl.POINT, 0, 1);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Global constants
var ATTR_POSITION_NAME = exports.ATTR_POSITION_NAME = 'a_position';
var ATTR_POSITION_LOC = exports.ATTR_POSITION_LOC = 0;
var ATTR_NORMAL_NAME = exports.ATTR_NORMAL_NAME = 'a_normal';
var ATTR_NORMAL_LOC = exports.ATTR_NORMAL_LOC = 1;
var ATTR_UV_NAME = exports.ATTR_UV_NAME = 'a_uv';
var ATTR_UV_LOC = exports.ATTR_UV_LOC = 2;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shader = function () {
    function Shader(gl, vertexShaderSource, fragmentShaderSource) {
        _classCallCheck(this, Shader);

        this.program = (0, _utils.makeProgram)(gl, vertexShaderSource, fragmentShaderSource);

        if (this.program) {
            this.gl = gl;
            gl.useProgram(this.program);
            this.attribLocations = getStandardAttribLocations(gl, this.program);
            this.uniformLocations = {}; // todo
        }
    }

    _createClass(Shader, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'renderModel',
        value: function renderModel() {}
    }, {
        key: 'activate',
        value: function activate() {
            this.gl.useProgram(this.program);
            return this;
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            this.gl.useProgram(null);
            return this;
        }

        // for when the shader is no longer needed

    }, {
        key: 'dispose',
        value: function dispose() {
            if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program) this.gl.useProgram(null);
            this.gl.deleteProgram(this.program);
        }
    }]);

    return Shader;
}();

exports.default = Shader;

/***/ })
/******/ ]);