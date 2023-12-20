/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { useReducer, useCallback } from 'react';
import ensureNodeId from '../../shared/functions/ensureNodeId.js';
import schemaReducer from './schemaReducer.js';
import { ON_CHANGE, ON_NODE_ADD, ON_NODE_REMOVE, ON_CONNECT } from './actionTypes.js';

const initialState = {
  nodes: [],
  links: []
};
const useSchema = function () {
  let initialSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  const [schema, dispatch] = useReducer(schemaReducer, initialSchema);
  const onChange = useCallback(_ref => {
    let {
      nodes,
      links
    } = _ref;
    return dispatch({
      type: ON_CHANGE,
      payload: {
        nodes,
        links
      }
    });
  }, []);
  const addNode = useCallback(node => dispatch({
    type: ON_NODE_ADD,
    payload: {
      node: ensureNodeId(node)
    }
  }), []);
  const removeNode = useCallback(node => dispatch({
    type: ON_NODE_REMOVE,
    payload: {
      nodeId: node.id
    }
  }), []);
  const connect = useCallback((input, output) => dispatch({
    type: ON_CONNECT,
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

export { useSchema as default };
