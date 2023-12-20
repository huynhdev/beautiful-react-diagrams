/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var Port = require('../Port/Port.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const portGenerator = (_ref, type) => {
  let {
    registerPort,
    onDragNewSegment,
    onSegmentFail,
    onSegmentConnect
  } = _ref;
  return port => React__default["default"].createElement(Port["default"], _rollupPluginBabelHelpers["extends"]({}, port, {
    onMount: registerPort,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect,
    type: type,
    key: port.id
  }));
};

exports["default"] = portGenerator;
