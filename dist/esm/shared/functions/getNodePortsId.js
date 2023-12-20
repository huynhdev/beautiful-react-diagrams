/* beautiful-react-diagrams version: 0.5.2-rc.3 */
const getNodePortsId = (node, portType) => {
  if (node[portType] && node[portType].length > 0) {
    return node[portType].map(port => port.id);
  }
  return [];
};

export { getNodePortsId as default };
