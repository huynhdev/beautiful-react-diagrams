/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getDiagramNodeStyle = (coordinates, disableDrag) => ({
  left: coordinates[0],
  top: coordinates[1],
  cursor: disableDrag ? undefined : 'move'
});

exports["default"] = getDiagramNodeStyle;
