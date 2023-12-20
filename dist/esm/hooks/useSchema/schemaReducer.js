/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import findIndex from 'lodash.findindex';
import { ON_CONNECT, ON_NODE_REMOVE, ON_NODE_ADD, ON_CHANGE } from './actionTypes.js';
import getNodePortsId from '../../shared/functions/getNodePortsId.js';

const schemaReducer = (state, action) => {
  switch (action.type) {
    case ON_CHANGE:
      return {
        nodes: action.payload.nodes || state.nodes || [],
        links: action.payload.links || state.links || []
      };
    case ON_NODE_ADD:
      if (state.nodes) {
        state.nodes.push(action.payload.node);
      }
      return {
        nodes: state.nodes || [],
        links: state.links || []
      };
    case ON_NODE_REMOVE:
      {
        let nextLinks = state.links || [];
        if (state.nodes) {
          const index = findIndex(state.nodes, ['id', action.payload.nodeId]);
          const inputPorts = getNodePortsId(state.nodes[index], 'inputs');
          const outputPorts = getNodePortsId(state.nodes[index], 'outputs');
          nextLinks = nextLinks.filter(link => !inputPorts.includes(link.input) && !outputPorts.includes(link.output));
          state.nodes.splice(index, 1);
        }
        return {
          nodes: state.nodes || [],
          links: nextLinks
        };
      }
    case ON_CONNECT:
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

export { schemaReducer as default };
