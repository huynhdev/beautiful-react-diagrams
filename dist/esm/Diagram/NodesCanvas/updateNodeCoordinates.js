/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import findIndex from 'lodash.findindex';

const updateNodeCoordinates = (nodeId, coordinates, nodes) => {
  const index = findIndex(nodes, ['id', nodeId]);
  if (index > -1 && !nodes[index].disableDrag) {
    nodes[index].coordinates = coordinates;
  }
  return nodes;
};

export { updateNodeCoordinates as default };
