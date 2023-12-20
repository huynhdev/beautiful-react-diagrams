/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { useEffect } from 'react';
import getNodePortsId from '../functions/getNodePortsId.js';

const useNodeUnregistration = (onNodeRemove, inputs, outputs, id) => {
  useEffect(() => () => {
    if (onNodeRemove) {
      const node = {
        inputs,
        outputs
      };
      const inputsPort = getNodePortsId(node, 'inputs');
      const outputsPort = getNodePortsId(node, 'outputs');
      onNodeRemove(id, inputsPort, outputsPort);
    }
  }, []);
};

export { useNodeUnregistration as default };
