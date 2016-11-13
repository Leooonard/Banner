/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	    var IMAGE_LIST = ['./image/image1.jpg', './image/image2.jpg', './image/image3.jpg'];
	    var container = document.querySelector('#banner-container');

	    var banner = new _index2.default(IMAGE_LIST, {
	        imageWidth: document.body.getBoundingClientRect().width
	    });
	    var bannerElement = banner.getElement();

	    container.appendChild(bannerElement);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _domevent = __webpack_require__(2);

	var _domevent2 = _interopRequireDefault(_domevent);

	var _util = __webpack_require__(4);

	var Util = _interopRequireWildcard(_util);

	var _style = __webpack_require__(5);

	var _pagination = __webpack_require__(6);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var IMAGE_WIDTH = undefined;

	var Banner = function () {
	    function Banner(imageList, options) {
	        _classCallCheck(this, Banner);

	        if (!this._checkParams(imageList, options)) {
	            throw 'error params';
	        }
	        IMAGE_WIDTH = options.imageWidth;

	        this._imageList = this._paddingImageList(imageList);
	        this._bannerElement = this.getElement();
	        this._options = options;
	        this._domEvent = new _domevent2.default(this._bannerElement);

	        this._currentSlideIndex = 1;
	        this._currentTranslateX = IMAGE_WIDTH * this._currentSlideIndex * -1;

	        this._show(this._currentSlideIndex);

	        this._domEvent.on(_domevent.EVENT_TYPE.click, function () {}); // 点击事件先不管。
	        this._domEvent.on(_domevent.EVENT_TYPE.draging, this._onBannerDraging.bind(this));
	        this._domEvent.on(_domevent.EVENT_TYPE.dragEnd, this._onBannerDragEnd.bind(this));

	        this._controls = {};
	        this._addControls(this._imageList.length - 2, this._currentSlideIndex - 1);
	    }

	    _createClass(Banner, [{
	        key: '_checkParams',
	        value: function _checkParams(imageList, options) {
	            if (!Array.isArray(imageList) || imageList.length === 0) {
	                return false;
	            }

	            return true;
	        }
	    }, {
	        key: '_paddingImageList',
	        value: function _paddingImageList(imageList) {
	            imageList.push(imageList[0]);
	            imageList.unshift(imageList[imageList.length - 1]);

	            return imageList;
	        }
	    }, {
	        key: '_onBannerDraging',
	        value: function _onBannerDraging(e) {
	            var lastMoveX = e.lx;


	            this._slide(lastMoveX);
	        }
	    }, {
	        key: '_onBannerDragEnd',
	        value: function _onBannerDragEnd(e) {
	            var _this = this;

	            var startX = e.sx,
	                endX = e.ex;


	            if (this._needChangeSlide(endX - startX)) {
	                this._currentSlideIndex = this._decideNextSlideIndex(this._currentSlideIndex, endX - startX);
	                this._show(this._currentSlideIndex, function () {
	                    if (_this._currentSlideIndex === 0) {
	                        _this._currentSlideIndex = _this._imageList.length - 2;
	                        _this._jump(_this._imageList.length - 2);
	                    } else if (_this._currentSlideIndex === _this._imageList.length - 1) {
	                        _this._currentSlideIndex = 1;
	                        _this._jump(1);
	                    }

	                    _this._controls['pagination'].updateActiveIndex(_this._currentSlideIndex - 1);
	                });
	            } else {
	                this._show(this._currentSlideIndex);
	            }
	        }
	    }, {
	        key: '_needChangeSlide',
	        value: function _needChangeSlide(moveX) {
	            if (Math.abs(moveX) < IMAGE_WIDTH / 2) {
	                return false;
	            } else {
	                return true;
	            }
	        }
	    }, {
	        key: '_decideNextSlideIndex',
	        value: function _decideNextSlideIndex(currentSlideIndex, moveX) {
	            if (moveX > 0) {
	                return currentSlideIndex - 1;
	            } else {
	                return currentSlideIndex + 1;
	            }
	        }
	    }, {
	        key: '_jump',
	        value: function _jump(index) {
	            if (index < 0 || index > this._imageList.length - 1) {
	                return;
	            }

	            this._slideToWithoutAnimation(IMAGE_WIDTH * index * -1);
	        }
	    }, {
	        key: '_show',
	        value: function _show(index, showFinish) {
	            if (index < 0 || index > this._imageList.length - 1) {
	                return;
	            }

	            this._slideTo(IMAGE_WIDTH * index * -1, showFinish);
	        }
	    }, {
	        key: '_slideTo',
	        value: function _slideTo(translateX, slideFinish) {
	            var _this2 = this;

	            this._currentTranslateX = translateX;

	            this._addTransition(this._bannerElement.querySelector('#container'), 'all', 0.5);
	            setTimeout(function () {
	                _this2._removeTransition(_this2._bannerElement.querySelector('#container'));
	                typeof slideFinish === 'function' && slideFinish();
	            }, 500);
	            this._bannerElement.querySelector('#container').style.transform = 'translateX(' + translateX + 'px)';
	        }
	    }, {
	        key: '_slideToWithoutAnimation',
	        value: function _slideToWithoutAnimation(translateX) {
	            this._currentTranslateX = translateX;

	            this._bannerElement.querySelector('#container').style.transform = 'translateX(' + translateX + 'px)';
	        }
	    }, {
	        key: '_addTransition',
	        value: function _addTransition(element, target, time) {
	            element.style.transition = target + ' ' + time + 's';
	        }
	    }, {
	        key: '_removeTransition',
	        value: function _removeTransition(element) {
	            element.style.transition = 'none';
	        }
	    }, {
	        key: '_slide',
	        value: function _slide(distance) {
	            distance *= -1;
	            this._currentTranslateX += distance;

	            if (this._currentTranslateX > 0) {
	                this._currentTranslateX = 0;
	            } else if (this._currentTranslateX < IMAGE_WIDTH * (this._imageList.length - 1) * -1) {
	                this._currentTranslateX = IMAGE_WIDTH * (this._imageList.length - 1) * -1;
	            }

	            this._bannerElement.querySelector('#container').style.transform = 'translateX(' + this._currentTranslateX + 'px)';
	        }
	    }, {
	        key: '_getTemplate',
	        value: function _getTemplate(imageList, imageWidth, imageCount) {
	            return '\n            <div style = \'overflow: hidden; position: relative;\'>\n                <div id = \'container\' style = \'' + (0, _style.getImageContainerStyle)(imageWidth, imageCount) + '\'>\n                    ' + imageList.map(function (image) {
	                return '\n                            <div style = \'' + (0, _style.getImageItemStyle)() + '\'>\n                                <img style = \'' + (0, _style.getImageStyle)(imageWidth) + '\' src = \'' + image + '\'></img>\n                            </div>\n                        ';
	            }).join('') + '\n                </div>\n            </div>\n        ';
	        }
	    }, {
	        key: 'getElement',
	        value: function getElement() {
	            var imageList = this._imageList;

	            if (this._bannerElement === undefined) {
	                var template = this._getTemplate(imageList, IMAGE_WIDTH, imageList.length);
	                return Util.generateElementByTemplate(template);
	            } else {
	                return this._bannerElement;
	            }
	        }
	    }, {
	        key: '_addControls',
	        value: function _addControls(totalImageCount, currentIndex) {
	            this._addPaginationControl(totalImageCount, currentIndex);
	        }
	    }, {
	        key: '_addPaginationControl',
	        value: function _addPaginationControl(totalImageCount, currentIndex) {
	            var pagination = new _pagination2.default(totalImageCount, currentIndex);
	            var paginationElement = pagination.getElement();

	            this._bannerElement.appendChild(paginationElement);
	            this._controls['pagination'] = pagination;
	        }
	    }]);

	    return Banner;
	}();

	exports.default = Banner;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EVENT_TYPE = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event = __webpack_require__(3);

	var _event2 = _interopRequireDefault(_event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   draging提供距离开始drag的x，y差值，以及距离上一次触发draging的x，y差值。还应该有开始drag的x，y值。
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

	var EVENT_TYPE = exports.EVENT_TYPE = {
	    click: 'click',
	    draging: 'draging',
	    dragEnd: 'dragEnd'
	};

	var DomEvent = function (_Event) {
	    _inherits(DomEvent, _Event);

	    function DomEvent(target) {
	        _classCallCheck(this, DomEvent);

	        var _this = _possibleConstructorReturn(this, (DomEvent.__proto__ || Object.getPrototypeOf(DomEvent)).call(this));

	        _this._target = target;

	        _this._startPosition = {
	            x: undefined,
	            y: undefined
	        };

	        _this._lastMovePosition = {
	            x: undefined,
	            y: undefined
	        };

	        _this._clickEvent = false;

	        _this._onStart();
	        _this._onMove();
	        _this._onEnd();
	        return _this;
	    }

	    _createClass(DomEvent, [{
	        key: '_onStart',
	        value: function _onStart() {
	            var _this2 = this;

	            this._target.addEventListener('touchstart', function (e) {
	                var startPosition = _this2._getPosition(e);
	                _this2._startPosition = startPosition;
	                _this2._lastMovePosition = startPosition;
	                _this2._clickEvent = true;

	                return false;
	            });
	        }
	    }, {
	        key: '_onMove',
	        value: function _onMove() {
	            var _this3 = this;

	            this._target.addEventListener('touchmove', function (e) {
	                var movePosition = _this3._getPosition(e);
	                var distanceToStart = _this3._getDistance(_this3._startPosition, movePosition);
	                var distanceToLastMove = _this3._getDistance(_this3._lastMovePosition, movePosition);
	                _this3._lastMovePosition = movePosition;

	                if (_this3._isMoveTooFar(distanceToStart)) {
	                    _this3._clickEvent = false;
	                }

	                _this3.fire(EVENT_TYPE.draging, {
	                    sx: _this3._startPosition.x,
	                    sy: _this3._startPosition.y,
	                    dx: distanceToStart.x,
	                    dy: distanceToStart.y,
	                    lx: distanceToLastMove.x,
	                    ly: distanceToLastMove.y
	                });

	                return false;
	            });
	        }
	    }, {
	        key: '_onEnd',
	        value: function _onEnd() {
	            var _this4 = this;

	            this._target.addEventListener('touchend', function (e) {
	                if (_this4._clickEvent) {
	                    _this4.fire(EVENT_TYPE.click);
	                } else {
	                    _this4.fire(EVENT_TYPE.dragEnd, {
	                        sx: _this4._startPosition.x,
	                        sy: _this4._startPosition.y,
	                        ex: _this4._lastMovePosition.x,
	                        ey: _this4._lastMovePosition.y
	                    });
	                }

	                _this4._clickEvent = true;

	                return false;
	            });
	        }
	    }, {
	        key: '_getPosition',
	        value: function _getPosition(e) {
	            return {
	                x: e.touches[0].clientX,
	                y: e.touches[0].clientY
	            };
	        }
	    }, {
	        key: '_getDistance',
	        value: function _getDistance(startPosition, endPosition) {
	            return {
	                x: startPosition.x - endPosition.x,
	                y: startPosition.y - endPosition.y
	            };
	        }
	    }, {
	        key: '_isMoveTooFar',
	        value: function _isMoveTooFar(moveDistance) {
	            var THRESHOLD = 10;

	            if (Math.abs(moveDistance.x) > THRESHOLD || Math.abs(moveDistance.y) > THRESHOLD) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }]);

	    return DomEvent;
	}(_event2.default);

	exports.default = DomEvent;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventListener = function () {
	    function EventListener() {
	        _classCallCheck(this, EventListener);

	        this._eventMap = {};
	        this._EVENT_TYPE = {
	            regular: 1,
	            once: 2,
	            buffer: 3
	        };
	    }

	    _createClass(EventListener, [{
	        key: 'on',
	        value: function on(eventName, callback, listenerID, listenerType, triggerAfterTimes) {
	            if (arguments.length === 3 && typeof listenerID === 'number') {
	                listenerType = listenerID;
	                listenerID = undefined;
	            } else if (arguments.length === 4) {
	                triggerAfterTimes = listenerType;
	                listenerType = listenerID;
	                triggerAfterTimes = undefined;
	            }

	            if (this._eventMap[eventName] === undefined) {
	                this._eventMap[eventName] = [];
	            }

	            var eventItem = {
	                callback: callback,
	                listenerID: listenerID,
	                listenerType: listenerType,
	                triggerAfterTimes: triggerAfterTimes,
	                currentTriggerTime: 0
	            };

	            this._eventMap[eventName].push(eventItem);
	        }
	    }, {
	        key: 'off',
	        value: function off(eventName, callback, listenerID) {
	            if (typeof callback === 'string') {
	                listenerID = callback;
	                callback = undefined;
	            }

	            var events = this._eventMap[eventName];

	            if (listenerID !== undefined) {
	                this._eventMap[eventName] = events.filter(function (eventItem) {
	                    return eventItem.listenerID !== listenerID;
	                });
	            } else if (callback !== undefined) {
	                this._eventMap[eventName] = events.filter(function (eventItem) {
	                    return eventItem.callback !== callback;
	                });
	            } else {
	                this._eventMap[eventName] = [];
	            }
	        }
	    }, {
	        key: 'once',
	        value: function once(eventName, callback) {
	            this.on(eventName, callback, this._EVENT_TYPE.once);
	        }
	    }, {
	        key: 'buffer',
	        value: function buffer(eventName, callback, triggerAfterTimes) {
	            this.on(eventName, callback, this._EVENT_TYPE.buffer, triggerAfterTimes);
	        }
	    }, {
	        key: 'fire',
	        value: function fire(eventName, args) {
	            var _this = this;

	            if (this._eventMap[eventName] === undefined) {
	                return;
	            }

	            this._addBufferTimes(this._eventMap[eventName]);
	            var listenerListCopy = this._eventMap[eventName].slice();
	            this._eventMap[eventName] = this._filterEvents(this._eventMap[eventName]);

	            listenerListCopy.forEach(function (eventItem) {
	                if (eventItem.listenerType === _this._EVENT_TYPE.buffer) {
	                    if (eventItem.currentTriggerTime === eventItem.triggerAfterTimes) {
	                        eventItem.callback(args);
	                    }
	                    return;
	                }

	                eventItem.callback(args);
	            });
	        }
	    }, {
	        key: '_addBufferTimes',
	        value: function _addBufferTimes(events) {
	            var _this2 = this;

	            events.forEach(function (eventItem) {
	                if (eventItem.listenerType === _this2._EVENT_TYPE.buffer) {
	                    eventItem.currentTriggerTime++;
	                }
	            });
	        }
	    }, {
	        key: '_filterEvents',
	        value: function _filterEvents(events) {
	            var _this3 = this;

	            return events.filter(function (eventItem) {
	                if (eventItem.listenerType === _this3._EVENT_TYPE.once) {
	                    return false;
	                } else if (eventItem.listenerType === _this3._EVENT_TYPE.buffer) {
	                    if (eventItem.currentTriggerTime === eventItem.triggerAfterTimes) {
	                        return false;
	                    } else {
	                        return true;
	                    }
	                } else {
	                    return true;
	                }
	            });
	        }
	    }]);

	    return EventListener;
	}();

	exports.default = EventListener;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function generateElementByTemplate(template) {
	    var div = document.createElement('div');
	    div.innerHTML = template;

	    return div.children[0];
	}

	exports.generateElementByTemplate = generateElementByTemplate;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function getImageItemStyle() {
	    var IMAGE_ITEM_STYLE = "\n        float: left;\n    ";

	    return IMAGE_ITEM_STYLE;
	}

	function getImageContainerStyle(imageWidth, imageCount) {
	    var IMAGE_CONTAINER_STYLE = "\n        width: " + imageWidth * imageCount + "px;\n    ";

	    return IMAGE_CONTAINER_STYLE;
	}

	function getImageStyle(imageWidth) {
	    var IMAGE_STYLE = "\n        width: " + imageWidth + "px;\n    ";

	    return IMAGE_STYLE;
	}

	exports.getImageContainerStyle = getImageContainerStyle;
	exports.getImageItemStyle = getImageItemStyle;
	exports.getImageStyle = getImageStyle;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(4);

	var Util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CONTAINER_STYLE = '\n    width: 60%;\n    position: absolute;\n    bottom: 20px;\n    left: 50%;\n    margin-left: -30%;\n    text-align: center;\n    list-style: none;\n';

	var PAGINATION_STYLE = '\n    display: inline-block;\n    margin: 0px;\n    margin-left: 2px;\n    margin-right: 2px;\n    width: 10px;\n    height: 10px;\n    border-radius: 10px;\n    border: solid 1px gray;\n    background-color: gray;\n';

	var ACTIVE_PAGINATION_STYLE = PAGINATION_STYLE + '\n    background-color: white;\n';

	var Pagination = function () {
	    function Pagination(pageCount, activeIndex) {
	        _classCallCheck(this, Pagination);

	        this._pageCount = pageCount;
	        this._activeIndex = activeIndex;

	        this._paginationElement = this.getElement();
	    }

	    _createClass(Pagination, [{
	        key: 'updateActiveIndex',
	        value: function updateActiveIndex(activeIndex) {
	            [].slice.call(this._paginationElement.children).forEach(function (paginationElement, index) {
	                if (index === activeIndex) {
	                    paginationElement.setAttribute('style', ACTIVE_PAGINATION_STYLE);
	                } else {
	                    paginationElement.setAttribute('style', PAGINATION_STYLE);
	                }
	            });
	        }
	    }, {
	        key: '_getTemplate',
	        value: function _getTemplate(pageCount, activeIndex) {
	            return '\n            <ul style = \'' + CONTAINER_STYLE + '\'>\n                ' + this._generateArrayByCount(pageCount).reduce(function (previousValue, count) {
	                return previousValue + ('\n                        <li style = \'' + (count === activeIndex ? ACTIVE_PAGINATION_STYLE : PAGINATION_STYLE) + '\'></li>\n                    ');
	            }, '') + '\n            </ul>\n        ';
	        }
	    }, {
	        key: '_generateArrayByCount',
	        value: function _generateArrayByCount(count) {
	            var array = [];

	            for (var i = 0; i < count; i++) {
	                array.push(i);
	            }

	            return array;
	        }
	    }, {
	        key: 'getElement',
	        value: function getElement() {
	            var activeIndex = this._activeIndex;
	            var pageCount = this._pageCount;

	            if (this._paginationElement === undefined) {
	                var template = this._getTemplate(pageCount, activeIndex);
	                return Util.generateElementByTemplate(template);
	            } else {
	                return this._paginationElement;
	            }
	        }
	    }]);

	    return Pagination;
	}();

	exports.default = Pagination;

/***/ }
/******/ ]);