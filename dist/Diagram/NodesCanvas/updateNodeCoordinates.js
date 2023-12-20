/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findIndex = require('lodash.findindex');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);

const updateNodeCoordinates = (nodeId, coordinates, nodes) => {
  const index = findIndex__default["default"](nodes, ['id', nodeId]);
  if (index > -1 && !nodes[index].disableDrag) {
    nodes[index].coordinates = coordinates;
  }
  return nodes;
};

exports["default"] = updateNodeCoordinates;
