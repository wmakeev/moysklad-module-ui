define("@wmakeev/moysklad-module-ui@0.0.2", ["multiver!lodash@^3.9.3","multiver!kefir@^2.7.0","multiver!mutation-summary@0.0.0","multiver!simulate@0.0.4","multiver!moysklad-router@*","multiver!stampit@^1.2.0","multiver!domjs@^0.2.3"], function() {
  var global = window;
  var __global_require__ = require;
  var __args__ = arguments;
  var require = (function() {
    var deps = ["lodash@^3.9.3","kefir@^2.7.0","mutation-summary@0.0.0","simulate@0.0.4","moysklad-router@*","stampit@^1.2.0","domjs@^0.2.3"].reduce(function(res, dep, index) {
      res[dep] = index;
      return res;
    }, {});
    return function(name) {
      if (name in deps) {
        return __args__[deps[name]];
      } else if (__global_require__) {
        return __global_require__(name);
      } else {
        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
    }
  })();

  return /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _kefir = __webpack_require__(3);

	var _kefir2 = _interopRequireDefault(_kefir);

	var _moyskladRouter = __webpack_require__(4);

	var _moyskladRouter2 = _interopRequireDefault(_moyskladRouter);

	var _mutationSummary = __webpack_require__(5);

	var _mutationSummary2 = _interopRequireDefault(_mutationSummary);

	var _simulate = __webpack_require__(6);

	var _simulate2 = _interopRequireDefault(_simulate);

	var _queries = __webpack_require__(7);

	var _queries2 = _interopRequireDefault(_queries);

	var _utils = __webpack_require__(8);

	var utils = _interopRequireWildcard(_utils);

	var _utils2 = _interopRequireDefault(_utils);

	var _controlsIndex = __webpack_require__(10);

	var _controlsIndex2 = _interopRequireDefault(_controlsIndex);

	var _appUiConst = __webpack_require__(9);

	var uiConst = _interopRequireWildcard(_appUiConst);

	var _bufferedMenubaritemsModificationsEmiter = __webpack_require__(19);

	var _bufferedMenubaritemsModificationsEmiter2 = _interopRequireDefault(_bufferedMenubaritemsModificationsEmiter);

	exports['default'] = function (sb) {
	  var uiItemsModificationsStream = undefined;
	  var mutationsStream = undefined;
	  var addedDomElementsStream = undefined;
	  var addedMenubarsStream = undefined;
	  var mouseDownStream = undefined;
	  var mouseClickStream = undefined;
	  var pushDownButtonsStream = undefined;
	  // let clickedButtonsStream;
	  var clickedMenuItemsStream = undefined;
	  var poppedUpMenubarsStream = undefined;
	  var routesStream = undefined;
	  var appContextProperty = undefined;
	  var poppedUpMenubarInfosStream = undefined;
	  var menuItemsModificationsStream = undefined;
	  var poppedUpMenubarModificationsStream = undefined;
	  var $glassPanel = undefined;

	  var router = new _moyskladRouter2['default']();
	  var on = sb.on;
	  var off = sb.off;
	  var once = sb.once;
	  var emit = sb.emit;
	  var add = sb.add;
	  var fadeIn = sb.fadeIn;
	  var fadeOut = sb.fadeOut;

	  return {

	    init: function init(_ref) {
	      var appName = _ref.appName;
	      var dataAppId, menuItemBlockClass, glassPanel;
	      return regeneratorRuntime.async(function init$(context$2$0) {
	        while (1) switch (context$2$0.prev = context$2$0.next) {
	          case 0:
	            dataAppId = uiConst.getDataAppId(appName);
	            menuItemBlockClass = uiConst.getMenuItemBlock(appName);

	            // let appUidPrefix              = `${appName}-uid-`;
	            // let appMenuItemClassName      = `${appName}-MenuItem`;

	            router.start();
	            uiItemsModificationsStream = _kefir2['default'].pool();

	            on('add', function (ch, data) {
	              var controls = [];
	              (data instanceof Array ? data : [data]).forEach(function (_ref2) {
	                var item = _ref2.item;
	                var options = _ref2.options;

	                var controlStamp = _controlsIndex2['default'][item.type]({ appName: appName });;
	                if (controlStamp) {
	                  var control = controlStamp(_lodash2['default'].omit(item, 'type'));
	                  uiItemsModificationsStream.plug(_kefir2['default'].constant({
	                    type: 'add', control: control, options: options
	                  }));
	                  controls.push(control);
	                } else {
	                  uiItemsModificationsStream.plug(_kefir2['default'].constantError(new Error('Can\'t find control type [' + item.type + ']')));
	                  controls.push(null);
	                }
	              });
	              return data instanceof Array ? controls : controls[0];
	            });

	            context$2$0.next = 7;
	            return regeneratorRuntime.awrap(add({ type: 'GlassPanel' }));

	          case 7:
	            glassPanel = context$2$0.sent;

	            $glassPanel = (0, _jquery2['default'])(glassPanel.el).hide().appendTo(document.body);
	            on('fadeIn', function () {
	              return $glassPanel.show();
	            });
	            on('fadeOut', function () {
	              return $glassPanel.hide();
	            });

	            // Все заданные измемения на странице
	            mutationsStream = _kefir2['default'].stream(function foo(emitter) {
	              var observer;
	              return regeneratorRuntime.async(function foo$(context$3$0) {
	                while (1) switch (context$3$0.prev = context$3$0.next) {
	                  case 0:
	                    observer = new _mutationSummary2['default']({
	                      callback: function callback(summaries) {
	                        return summaries.forEach(function (summary) {
	                          return emitter.emit(summary);
	                        });
	                      },
	                      queries: _queries2['default']
	                    });
	                    context$3$0.next = 3;
	                    return regeneratorRuntime.awrap(once('destroy'));

	                  case 3:
	                    emitter.end();
	                    observer.disconnect();

	                  case 5:
	                  case 'end':
	                    return context$3$0.stop();
	                }
	              }, null, this);
	            });

	            routesStream = _kefir2['default'].fromEvents(router, 'route');

	            // Дбавленные в DOM элементы
	            addedDomElementsStream = mutationsStream.map(_lodash2['default'].property('added')).flatten();

	            addedMenubarsStream = addedDomElementsStream.filter(utils.isRole('menubar'));

	            mouseDownStream = _kefir2['default'].fromEvents(document.body, 'mousedown');

	            mouseClickStream = _kefir2['default'].fromEvents(document.body, 'click');

	            pushDownButtonsStream = mouseDownStream.map(utils.mouseEventToRoleElementMapper('button')).filter(_lodash2['default'].negate(_lodash2['default'].isNull));

	            // clickedButtonsStream = mouseClickStream
	            //   .map(utils.mouseEventToRoleElementMapper('button'))
	            //   .filter(_.negate(_.isNull));

	            clickedMenuItemsStream = mouseClickStream.map(utils.mouseEventToRoleElementMapper('menuitem')).filter(_lodash2['default'].negate(_lodash2['default'].isNull));

	            poppedUpMenubarsStream = pushDownButtonsStream.sampledBy(addedMenubarsStream).map(utils.getButtonName).zip(addedMenubarsStream).map(function (val) {
	              return { name: val[0], el: val[1] };
	            });

	            appContextProperty = routesStream.map(function (state) {
	              return state.section + (state.action ? '/' + state.action : '');
	            }).toProperty(function () {
	              return router.getHashPath();
	            });

	            poppedUpMenubarInfosStream = appContextProperty.sampledBy(addedMenubarsStream).zip(poppedUpMenubarsStream).map(function (val) {
	              var _val = _slicedToArray(val, 2);

	              var appContext = _val[0];
	              var popedUpMenubarInfo = _val[1];

	              // { name, el, context }
	              return _lodash2['default'].extend({}, popedUpMenubarInfo, {
	                context: appContext
	              });
	            });

	            menuItemsModificationsStream = uiItemsModificationsStream.filter(function (value) {
	              return ['MenuItem', 'MenuBarSeparator'].indexOf(value.item.type) !== -1;
	            });

	            // { menubar: { name, el, context }, modifications: [{ type, item, options }] }
	            poppedUpMenubarModificationsStream = poppedUpMenubarInfosStream.withHandler((0, _bufferedMenubaritemsModificationsEmiter2['default'])(menuItemsModificationsStream));

	            // Отслеживаем и добавляем новые элементы в меню
	            poppedUpMenubarModificationsStream.onValue(function (value) {
	              var menuEl = value.menubar.el;
	              var modifications = value.modifications;
	              var menuItems = (0, _lodash2['default'])(modifications).filter({
	                type: 'add'
	              }).map(function (mod) {
	                return mod.item.render();
	              }).value();

	              utils.appendMenuBarItems(menuItemBlockClass, menuEl, menuItems);
	            });

	            // Обработка нажатий на элементы меню
	            // { type, item, options }
	            menuItemsModificationsStream.onValue(function (_ref3) {
	              var type = _ref3.type;
	              var item = _ref3.item;

	              if (type === 'add') {
	                clickedMenuItemsStream.onValue(function callee$3$0(menuitemEl) {
	                  var id, action, result;
	                  return regeneratorRuntime.async(function callee$3$0$(context$4$0) {
	                    while (1) switch (context$4$0.prev = context$4$0.next) {
	                      case 0:
	                        if (!menuitemEl.getAttribute) {
	                          context$4$0.next = 25;
	                          break;
	                        }

	                        id = menuitemEl.getAttribute(dataAppId);

	                        if (!(id === item.id)) {
	                          context$4$0.next = 25;
	                          break;
	                        }

	                        _simulate2['default'].mousedown(document.getElementById('site'));
	                        action = item.action;

	                        if (!action) {
	                          context$4$0.next = 25;
	                          break;
	                        }

	                        context$4$0.next = 8;
	                        return regeneratorRuntime.awrap((0, _utils2['default'])(100));

	                      case 8:
	                        fadeIn();
	                        context$4$0.next = 11;
	                        return regeneratorRuntime.awrap((0, _utils2['default'])(100));

	                      case 11:
	                        result = undefined;
	                        context$4$0.prev = 12;
	                        context$4$0.next = 15;
	                        return regeneratorRuntime.awrap(action(item));

	                      case 15:
	                        result = context$4$0.sent;
	                        context$4$0.next = 23;
	                        break;

	                      case 18:
	                        context$4$0.prev = 18;
	                        context$4$0.t0 = context$4$0['catch'](12);

	                        // TODO alert;
	                        alert('Ошибка: ' + context$4$0.t0.message);
	                        emit('error', context$4$0.t0);
	                        console.error(context$4$0.t0);

	                      case 23:
	                        if (result) {
	                          console.log(result);
	                        }
	                        fadeOut(); // $glassPanel.hide();

	                      case 25:
	                      case 'end':
	                        return context$4$0.stop();
	                    }
	                  }, null, this, [[12, 18]]);
	                });
	              }
	            });

	          case 26:
	          case 'end':
	            return context$2$0.stop();
	        }
	      }, null, this);
	    },

	    destroy: function destroy() {
	      router.stop();
	      $glassPanel.detach();
	      off('add');
	      emit('destroy');
	    }

	  };
	};

	module.exports = exports['default'];
	// TODO Интерфейс продумать
	// TODO Как передать аргументы в template()
	// console.log(`Нажато меню: ${item.name}`);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("lodash@^3.9.3");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("kefir@^2.7.0");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("moysklad-router@*");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mutation-summary@0.0.0");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("simulate@0.0.4");

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = [
	//{ element: 'div.popup-button-popup-menu' },
	{ "element": "div[role=button]" }, { "element": "div[role=menubar]" }, { "element": ".gwt-DialogBox.info-window.info-window-ok" }];
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * index
	 * Date: 11.06.15
	 * Vitaliy V. Makeev (w.makeev@gmail.com)
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getButtonName = getButtonName;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _appUiConst = __webpack_require__(9);

	var _appUiConst2 = _interopRequireDefault(_appUiConst);

	function getButtonName(buttonEl) {
	    return (0, _jquery2['default'])('span.text', buttonEl).text();
	}

	var isRole = _lodash2['default'].curry(function (role, el) {
	    return el.getAttribute && el.getAttribute('role') === role;
	});

	exports.isRole = isRole;
	var appendMenuBarItems = _lodash2['default'].curry(function (menuItemBlockClass, menubar, items) {
	    var $lastMenuItem = (0, _jquery2['default'])('.' + menuItemBlockClass + ':last', menubar);
	    if ($lastMenuItem.length) {
	        $lastMenuItem.after(items);
	    } else {
	        (0, _jquery2['default'])('tbody', menubar).append(items);
	    }
	});

	exports.appendMenuBarItems = appendMenuBarItems;
	var mouseEventToElementMapper = _lodash2['default'].curry(function (predicate, mouseEvent) {
	    for (var i = mouseEvent.path.length - 1; i >= 0; i -= 1) {
	        var el = mouseEvent.path[i];
	        if (predicate(el)) {
	            return el;
	        }
	    }
	    return null;
	});

	exports.mouseEventToElementMapper = mouseEventToElementMapper;
	var mouseEventToRoleElementMapper = _lodash2['default'].compose(isRole, mouseEventToElementMapper);

	exports.mouseEventToRoleElementMapper = mouseEventToRoleElementMapper;
	var timeout = function timeout(ms) {
	    return new Promise(function (resolve) {
	        return setTimeout(function () {
	            return resolve();
	        }, ms);
	    });
	};
	exports.timeout = timeout;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getDataAppId = getDataAppId;
	exports.getMenuItemBlock = getMenuItemBlock;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	function getDataAppId(appName) {
	  return 'data-' + appName + '-id';
	}

	function getMenuItemBlock(appName) {
	  return '' + appName + '-menuitem-block';
	}

	var getControlItemClass = _lodash2['default'].curry(function (appName, controlType) {
	  return '' + appName + '-' + controlType;
	});
	exports.getControlItemClass = getControlItemClass;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _menuItem = __webpack_require__(11);

	var _menuItem2 = _interopRequireDefault(_menuItem);

	var _glassPanel = __webpack_require__(16);

	var _glassPanel2 = _interopRequireDefault(_glassPanel);

	var _menubarSeparator = __webpack_require__(18);

	var _menubarSeparator2 = _interopRequireDefault(_menubarSeparator);

	exports.MenuItem = _menuItem2["default"];
	exports.GlassPanel = _glassPanel2["default"];
	exports.MenubarSeparator = _menubarSeparator2["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = menuItemStamp;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stampit = __webpack_require__(12);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _behaviorsRenderable = __webpack_require__(13);

	var _behaviorsRenderable2 = _interopRequireDefault(_behaviorsRenderable);

	var _behaviorsUniqId = __webpack_require__(15);

	var _behaviorsUniqId2 = _interopRequireDefault(_behaviorsUniqId);

	var _appUiConst = __webpack_require__(9);

	var uiConst = _interopRequireWildcard(_appUiConst);

	function menuItemStamp(_ref) {
	  var appName = _ref.appName;

	  var menuItemBlockClass = uiConst.getMenuItemBlock(appName);
	  var menuItemClass = uiConst.getControlItemClass(appName, 'MenuItem');
	  return (0, _stampit2['default'])().state({
	    type: 'MenuItem',
	    template: function template() {
	      /*global tr, td*/
	      var tdOptions = {
	        'class': ['gwt-MenuItem', menuItemClass].join(' '),
	        'role': 'menuitem',
	        'colspan': 2
	      };
	      tdOptions['data-' + appName + '-id'] = this.id;
	      return tr({ 'class': [menuItemBlockClass, this.id].join(' ') }, td(tdOptions, this.name));
	    }
	  }).compose(_behaviorsRenderable2['default'], (0, _behaviorsUniqId2['default'])(appName));
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("stampit@^1.2.0");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stampit = __webpack_require__(12);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _domjs = __webpack_require__(14);

	var _domjs2 = _interopRequireDefault(_domjs);

	exports['default'] = (0, _stampit2['default'])().methods({
	  render: function render() {
	    this.el = _domjs2['default'].build(this.template.bind(this));
	    return this.el;
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("domjs@^0.2.3");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stampit = __webpack_require__(12);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	exports['default'] = function (appName) {
	    var _this = this;

	    return (0, _stampit2['default'])().enclose(function () {
	        _this.id = _lodash2['default'].uniqueId(appName + '-id-');
	    });
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stampit = __webpack_require__(12);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _behaviorsRenderable = __webpack_require__(13);

	var _behaviorsRenderable2 = _interopRequireDefault(_behaviorsRenderable);

	var _behaviorsHideable = __webpack_require__(17);

	var _behaviorsHideable2 = _interopRequireDefault(_behaviorsHideable);

	var _behaviorsUniqId = __webpack_require__(15);

	var _behaviorsUniqId2 = _interopRequireDefault(_behaviorsUniqId);

	exports['default'] = function (_ref) {
	    var appName = _ref.appName;

	    return (0, _stampit2['default'])().state({
	        type: 'GlassPanel',
	        template: function template() {
	            /*global div*/
	            return div({
	                'class': 'b-lognex-glass-panel',
	                'style': 'z-index: 5;'
	            });
	        }
	    }).compose(_behaviorsRenderable2['default'], _behaviorsHideable2['default'], (0, _behaviorsUniqId2['default'])(appName));
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stampit = __webpack_require__(12);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	exports['default'] = (0, _stampit2['default'])().methods({
	  hide: function hide() {
	    (0, _jquery2['default'])(this.el).hide();
	  },
	  show: function show() {
	    (0, _jquery2['default'])(this.el).show();
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _stampit = __webpack_require__(12);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _behaviorsRenderable = __webpack_require__(13);

	var _behaviorsRenderable2 = _interopRequireDefault(_behaviorsRenderable);

	var _behaviorsUniqId = __webpack_require__(15);

	var _behaviorsUniqId2 = _interopRequireDefault(_behaviorsUniqId);

	exports['default'] = function (_ref) {
	    var appName = _ref.appName;
	    var menuItemClass = _ref.menuItemClass;
	    var menuItemBlockClass = _ref.menuItemBlockClass;

	    return (0, _stampit2['default'])().state({
	        type: 'MenuBarSeparator',
	        template: function template() {
	            tr({ 'class': [menuItemBlockClass, this.id].join(' ') }, td({
	                'class': ['gwt-MenuItemSeparator', menuItemClass].join(' '),
	                'colspan': 2
	            }, div({ 'class': 'menuSeparatorInner' })));
	        }
	    }).compose(_behaviorsRenderable2['default'], (0, _behaviorsUniqId2['default'])(appName));
	};

	;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = bufferedMenubarItemsModificationsEmiter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	function bufferedMenubarItemsModificationsEmiter(itemsModificationaStream) {
	    var buffer = {};
	    // Буфферизируем добавленные элементы меню
	    itemsModificationaStream.onValue(function (itemModification) {
	        var appContext = itemModification.options.appContext;
	        if (typeof appContext === 'string') appContext = [appContext];
	        appContext.forEach(function (context) {
	            var menuName = itemModification.options.menu;
	            var contextBuffers = buffer[context] = buffer[context] || {};
	            contextBuffers[menuName] ? contextBuffers[menuName].push(itemModification) : contextBuffers[menuName] = [itemModification];
	        });
	    });

	    return function (emitter, event) {
	        var menubarInfo = event.value;
	        var modifications = _lodash2['default'].propertyOf(buffer)([menubarInfo.context, menubarInfo.name]);
	        if (modifications && modifications.length) {
	            // Flush buffer
	            buffer[menubarInfo.context][menubarInfo.name] = [];
	            // Отправляем накопленные элементы в поток
	            emitter.emit({
	                menubar: menubarInfo,
	                modifications: modifications
	            });
	        }
	    };
	}

	;
	module.exports = exports['default'];

/***/ }
/******/ ]);
});
