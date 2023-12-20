/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const findInvolvedEntity = function (nodes, entityId) {
  let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'node';
  if (!entityId || !nodes || nodes.length === 0) return undefined;
  let result;
  let index = 0;
  while (index < nodes.length && !result) {
    const node = nodes[index];
    if (node.id === entityId) {
      result = {
        type,
        entity: {
          ...node
        }
      };
    } else {
      result = findInvolvedEntity(node.inputs, entityId, 'port') || findInvolvedEntity(node.outputs, entityId, 'port');
    }
    index += 1;
  }
  return result;
};

exports["default"] = findInvolvedEntity;
