/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const ensureNodeId = node => {
  node.id ||= `node-${Math.random().toString(36).substr(2, 9)}`;
  return node;
};

exports["default"] = ensureNodeId;
