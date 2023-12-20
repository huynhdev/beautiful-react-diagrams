/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getPathMidpoint = pathElement => {
  if (pathElement.getTotalLength && pathElement.getPointAtLength) {
    const midpoint = pathElement.getTotalLength() / 2;
    const {
      x,
      y
    } = pathElement.getPointAtLength(midpoint);
    return [x, y];
  }
  return [0, 0];
};

exports["default"] = getPathMidpoint;
