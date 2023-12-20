/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isEqual = require('lodash.isequal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

const removeLinkFromArray = (link, links) => links.filter(item => !isEqual__default["default"](item, link));

exports["default"] = removeLinkFromArray;
