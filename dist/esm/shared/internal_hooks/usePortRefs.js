/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext.js';

const usePortRefs = () => {
  const {
    ports
  } = useContext(DiagramContext);
  return ports;
};

export { usePortRefs as default };
