/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getNodePortsId = (node, portType) => {
  if (node[portType] && node[portType].length > 0) {
    return node[portType].map(port => port.id);
  }
  return [];
};

exports["default"] = getNodePortsId;
