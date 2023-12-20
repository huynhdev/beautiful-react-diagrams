/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ensureNodeId = require('./ensureNodeId.js');
var validators = require('./validators.js');

const createSchema = schema => {
  const next = {
    ...schema
  };
  next.nodes ||= [];
  next.links ||= [];
  next.nodes.forEach(ensureNodeId["default"]);
  validators.validateSchema(next);
  return next;
};

exports["default"] = createSchema;
