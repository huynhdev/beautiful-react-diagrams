/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { useContext, useCallback, useEffect } from 'react';
import DiagramContext from '../../Context/DiagramContext.js';

const usePortRegistration = (inputs, outputs, onPortRegister) => {
  const {
    canvas,
    ports
  } = useContext(DiagramContext);
  return useCallback((portId, portElement) => {
    if (canvas && (inputs || outputs)) {
      if (ports && !ports[portId]) {
        onPortRegister(portId, portElement);
      }
    }
  }, [!!canvas, !!ports, inputs, outputs]);
};
const useNodeRegistration = (ref, onNodeRegister, id) => {
  const {
    canvas,
    nodes
  } = useContext(DiagramContext);
  useEffect(() => {
    if (onNodeRegister && ref.current && canvas && nodes && !nodes[id]) {
      onNodeRegister(id, ref.current);
    }
  }, [ref.current, onNodeRegister, !!canvas, !!nodes, id]);
};

export { useNodeRegistration, usePortRegistration };
