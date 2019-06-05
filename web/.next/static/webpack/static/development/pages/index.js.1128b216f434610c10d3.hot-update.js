webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/layout/elements/header.tsx":
false,

/***/ "./components/layout/elements/header/header.tsx":
/*!******************************************************!*\
  !*** ./components/layout/elements/header/header.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/thomaskrupers/Sites/photo-uploader/web/components/layout/elements/header/header.tsx";



var i18n = __webpack_require__(/*! ./i18n.json */ "./components/layout/elements/header/i18n.json");

var logout = function logout() {
  return console.log('logout');
};

var Header = function Header(_ref) {
  var isAuthorized = _ref.isAuthorized;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, i18n.home))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/register",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, i18n.register))), isAuthorized && react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/profiel",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, i18n.profile))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
    onClick: logout,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, i18n.logout), ">"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./components/layout/elements/header/i18n.json":
/*!*****************************************************!*\
  !*** ./components/layout/elements/header/i18n.json ***!
  \*****************************************************/
/*! exports provided: home, register, profile, logout, default */
/***/ (function(module) {

module.exports = {"home":"Home","register":"Registreren","profile":"Profiel","logout":"Uitloggen"};

/***/ }),

/***/ "./components/layout/layout.tsx":
/*!**************************************!*\
  !*** ./components/layout/layout.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _elements_header_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/header/header */ "./components/layout/elements/header/header.tsx");
var _jsxFileName = "/Users/thomaskrupers/Sites/photo-uploader/web/components/layout/layout.tsx";




var Layout = function Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "Nieuwe app!")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_elements_header_header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("main", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, props.children)));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ })

})
//# sourceMappingURL=index.js.1128b216f434610c10d3.hot-update.js.map