/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findIndex = require('lodash.findindex');
var actionTypes = require('./actionTypes.js');
var getNodePortsId = require('../../shared/functions/getNodePortsId.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);

const schemaReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ON_CHANGE:
      return {
        nodes: action.payload.nodes || state.nodes || [],
        links: action.payload.links || state.links || []
      };
    case actionTypes.ON_NODE_ADD:
      if (state.nodes) {
        state.nodes.push(action.payload.node);
      }
      return {
        nodes: state.nodes || [],
        links: state.links || []
      };
    case actionTypes.ON_NODE_REMOVE:
      {
        let nextLinks = state.links || [];
        if (state.nodes) {
          const index = findIndex__default["default"](state.nodes, ['id', action.payload.nodeId]);
          const inputPorts = getNodePortsId["default"](state.nodes[index], 'inputs');
          const outputPorts = getNodePortsId["default"](state.nodes[index], 'outputs');
          nextLinks = nextLinks.filter(link => !inputPorts.includes(link.input) && !outputPorts.includes(link.output));
          state.nodes.splice(index, 1);
        }
        return {
          nodes: state.nodes || [],
          links: nextLinks
        };
      }
    case actionTypes.ON_CONNECT:
      if (state.links) {
        state.links.push(action.payload.link);
      }
      return {
        nodes: state.nodes || [],
        links: state.links || []
      };
    default:
      return state;
  }
};

exports["default"] = schemaReducer;
