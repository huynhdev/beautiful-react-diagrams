/* beautiful-react-diagrams version: 0.5.2-rc.3 */
const ensureNodeId = node => {
  node.id ||= `node-${Math.random().toString(36).substr(2, 9)}`;
  return node;
};

export { ensureNodeId as default };
