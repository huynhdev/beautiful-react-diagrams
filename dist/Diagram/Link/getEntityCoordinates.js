/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getRelativePoint = require('../../shared/functions/getRelativePoint.js');

const getEntityCoordinates = (entity, portRefs, nodeRefs, canvas) => {
  if (entity && entity.type === 'node' && nodeRefs[entity.entity.id]) {
    const nodeEl = nodeRefs[entity.entity.id];
    const bbox = nodeEl.getBoundingClientRect();
    return [entity.entity.coordinates[0] + bbox.width / 2, entity.entity.coordinates[1] + bbox.height / 2];
  }
  if (portRefs && portRefs[entity.entity.id]) {
    const portEl = portRefs[entity.entity.id];
    const bbox = portEl.getBoundingClientRect();
    return getRelativePoint["default"]([bbox.x + bbox.width / 2, bbox.y + bbox.height / 2], [canvas.x, canvas.y]);
  }
  return undefined;
};

exports["default"] = getEntityCoordinates;
