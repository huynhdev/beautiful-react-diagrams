/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext.js';

const useNodeRefs = () => {
  const {
    nodes
  } = useContext(DiagramContext);
  return nodes;
};

export { useNodeRefs as default };
