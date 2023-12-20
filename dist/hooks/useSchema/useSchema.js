/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ensureNodeId = require('../../shared/functions/ensureNodeId.js');
var schemaReducer = require('./schemaReducer.js');
var actionTypes = require('./actionTypes.js');

const initialState = {
  nodes: [],
  links: []
};
const useSchema = function () {
  let initialSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  const [schema, dispatch] = React.useReducer(schemaReducer["default"], initialSchema);
  const onChange = React.useCallback(_ref => {
    let {
      nodes,
      links
    } = _ref;
    return dispatch({
      type: actionTypes.ON_CHANGE,
      payload: {
        nodes,
        links
      }
    });
  }, []);
  const addNode = React.useCallback(node => dispatch({
    type: actionTypes.ON_NODE_ADD,
    payload: {
      node: ensureNodeId["default"](node)
    }
  }), []);
  const removeNode = React.useCallback(node => dispatch({
    type: actionTypes.ON_NODE_REMOVE,
    payload: {
      nodeId: node.id
    }
  }), []);
  const connect = React.useCallback((input, output) => dispatch({
    type: actionTypes.ON_CONNECT,
    payload: {
      link: {
        input,
        output
      }
    }
  }), []);
  return [schema, Object.freeze({
    onChange,
    addNode,
    removeNode,
    connect
  })];
};

exports["default"] = useSchema;
