/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./react/createElement.js":
/*!********************************!*\
  !*** ./react/createElement.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/**\r\n * 创建虚拟DOM结构\r\n * @param type 标签\r\n * @param props 属性\r\n * @param children 子属性\r\n * @returns 虚拟DOM结构\r\n * **/\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === 'object' ? child : createTextElement(child);\n      })\n    })\n  };\n}\n\n/**\r\n * 创建文本节点\r\n * @param text 文本值\r\n * @returns 虚拟DOM结构\r\n * **/\n\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\n\n//# sourceURL=webpack://mini-react/./react/createElement.js?");

/***/ }),

/***/ "./react/index.js":
/*!************************!*\
  !*** ./react/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./react/createElement.js\");\n/* harmony import */ var _react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react-dom */ \"./react/react-dom.js\");\n\n\nvar React = {\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render: _react_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (React);\n\n//# sourceURL=webpack://mini-react/./react/index.js?");

/***/ }),

/***/ "./react/react-dom.js":
/*!****************************!*\
  !*** ./react/react-dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\n/**\r\n * 将虚拟DOM转为真实DOM并添加到容器上 react 16.8之前的写法\r\n * @param element 虚拟DOM\r\n * @param container 真实DOM\r\n * **/\n// export default function render(element, container) {\n//   // 创建DOM节点，并处理文本节点\n//   const dom = \n//     element.type === 'TEXT_ELEMENT' \n//       ? document.createTextNode('') \n//       : document.createElement(element.type);\n\n//   // 为节点绑定属性\n//   const isProperty = key => key !== 'children';\n\n//   Object.keys(element.props)\n//     .filter(isProperty)\n//     .forEach(name => {\n//       dom[name] = element.props[name]\n//     })\n\n//     // 递归添加子节点\n//   element.props.children.forEach(child => \n//     render(child, dom)\n//   )\n//   // 将节点挂载到容器上\n//   container.appendChild(dom);\n// }\n\n/**\r\n * 创建DOM\r\n * @param fiber fiber节点\r\n * @returns dom 真实dom节点\r\n * **/\nfunction createDom(fiber) {\n  var dom = fiber.type == \"TEXT_ELEMENT\" ? document.createTextNode(\"\") : document.createElement(fiber.type);\n\n  // 添加fiber节点属性\n  updateDom(dom, {}, fiber.props);\n  return dom;\n}\n\n// 下一个工作单元\nvar nextUnitOfWork = null;\n// fiber树根节点\nvar wipRoot = null;\n// 保存更新前的fiber树\nvar currentRoot = null;\n// 保存要删除的节点\nvar deletions = null;\n\n/**\r\n * 将虚拟DOM转换为真实DOM，并添加到容器\r\n * @param element 虚拟DOM\r\n * @param container 真实DOM\r\n * **/\nfunction render(element, container) {\n  // 根节点\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element]\n    },\n    // 最后一个fiber树的引用\n    alternate: currentRoot\n  };\n  deletions = [];\n  // 将根节点设置为下一个将要工作单元\n  nextUnitOfWork = wipRoot;\n}\n\n// 判断监听事件\nvar isEvent = function isEvent(key) {\n  return key.startsWith(\"on\");\n};\n// 过滤fiber节点children属性以及监听事件\nvar isProperty = function isProperty(key) {\n  return key !== \"children\" && !isEvent(key);\n};\n// 判断fiber节点新属性\nvar isNew = function isNew(prev, next) {\n  return function (key) {\n    return prev[key] !== next[key];\n  };\n};\n// 判断fiber节点要删除的属性\nvar isGone = function isGone(prev, next) {\n  return function (key) {\n    return !(key in next);\n  };\n};\n\n/**\r\n * 更新fiber节点方法\r\n * @param dom fiber节点\r\n * @param prevProps 旧节点属性\r\n * @param nextProps 新节点属性\r\n * **/\nfunction updateDom(dom, prevProps, nextProps) {\n  // remove old or change event listeners\n  Object.keys(prevProps).filter(isEvent).filter(function (key) {\n    return !(key in nextProps) || isNew(prevProps, nextProps)(key);\n  }).forEach(function (name) {\n    var eventType = name.toLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  });\n\n  // remove fiber old property\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(function (name) {\n    dom[name] = \"\";\n  });\n\n  // add fiber new property\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(function (name) {\n    dom[name] = nextProps[name];\n  });\n\n  // add event listeners\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(function (name) {\n    var eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\n\n/**\r\n * 处理提交的fiber树\r\n * @param fiber fiber节点\r\n * **/\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n  var domParent = fiber.parent.dom;\n  // 处理新增节点标记\n  if (fiber.effectTag === \"PLACEMENT\" && fiber.dom != null) {\n    domParent.appendChild(fiber.dom);\n    // 处理删除节点标记\n  } else if (fiber.effectTag === \"DELETION\") {\n    domParent.removeChild(fiber.dom);\n    // 处理更新属性\n  } else if (fiber.effectTag === \"UPDATE\" && fiber.dom != null) {\n    updateDom(fiber.dom, fiber.alternate.props, fiber.props);\n  }\n\n  // 渲染子节点\n  commitWork(fiber.child);\n  // 渲染兄弟节点\n  commitWork(fiber.sibling);\n}\n\n/**\r\n * 提交任务，将fiber tree渲染为真实DOM\r\n * **/\nfunction commitRoot() {\n  deletions.forEach(commitWork);\n  commitWork(wipRoot.child);\n  currentRoot = wipRoot;\n  wipRoot = null;\n}\n\n/**\r\n * 工作循环\r\n * @param deadine 帧空余时间\r\n * **/\nfunction workLoop(deadline) {\n  // 停止循环标识\n  var shouldYield = false;\n  // 循环条件为存在下一个工作单元，且没有更高优先级的工作\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitWork(nextUnitOfWork);\n    // 当前帧空余时间要没了，停止工作循环\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n\n  // 没有下一个工作单元，提交当前fiber树\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  }\n\n  // 空闲时间执行任务\n  requestIdleCallback(workLoop);\n}\n\n// 浏览器空闲时间执行工作循环\nrequestIdleCallback(workLoop);\n\n// 执行工作单元，返回下一个工作单元\nfunction performUnitWork(fiber) {\n  // 如果fiber上没有dom节点，为其创建一个\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  }\n\n  // 获取到当前fiber的孩子节点\n  var elements = fiber.props.children;\n  reconcileChildren(fiber, elements);\n\n  // 寻找下一个孩子节点，如果有返回\n  if (fiber.child) {\n    return fiber.child;\n  }\n  var nextFiber = fiber;\n  while (nextFiber) {\n    // 如果有兄弟节点，返回兄弟节点\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n    // 否则返回父节点\n    nextFiber = nextFiber.parent;\n  }\n}\n\n/**\r\n * reconcile阶段，给节点打上增删改标记\r\n * @param wipFiber 根节点\r\n * @param elements 子节点\r\n * **/\n\nfunction reconcileChildren(wipFiber, elements) {\n  // 索引\n  var index = 0;\n  // 上一次渲染的fiber\n  var oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  // 上一个兄弟节点\n  var prevSibling = null;\n\n  // 遍历孩子节点\n  while (index < elements.length || oldFiber != null) {\n    var element = elements[index];\n    // 创建fiber\n    var newFiber = null;\n\n    // 类型判断\n    var sameType = oldFiber && element && element.type == oldFiber.type;\n\n    // 类型相同只更新props\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: \"UPDATE\"\n      };\n    }\n    // 新的存在并且类型和老的不同需要新增\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: \"PLACEMENT\"\n      };\n    }\n    // 老的存在并且类型和新的不同需要移除\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = \"DELETION\";\n      deletions.push(oldFiber);\n    }\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n\n    // 将第一个孩子节点设置为 fiber 的子节点\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else if (element) {\n      // 第一个之外的子节点设置为第一个子节点的兄弟节点\n      prevSibling.sibling = newFiber;\n    }\n    prevSibling = newFiber;\n    index++;\n  }\n}\n\n//# sourceURL=webpack://mini-react/./react/react-dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react */ \"./react/index.js\");\n\nvar updateValue = function updateValue(e) {\n  render(e.target.value);\n};\nvar render = function render(value) {\n  var element = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"input\", {\n    onInput: updateValue,\n    value: value\n  }), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"h2\", null, \"Hello \", value));\n  _react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render(element, document.getElementById('root'));\n};\nrender('world');\n\n//# sourceURL=webpack://mini-react/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;