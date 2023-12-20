/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var getNodePortsId = require('../functions/getNodePortsId.js');

const useNodeUnregistration = (onNodeRemove, inputs, outputs, id) => {
  React.useEffect(() => () => {
    if (onNodeRemove) {
      const node = {
        inputs,
        outputs
      };
      const inputsPort = getNodePortsId["default"](node, 'inputs');
      const outputsPort = getNodePortsId["default"](node, 'outputs');
      onNodeRemove(id, inputsPort, outputsPort);
    }
  }, []);
};

exports["default"] = useNodeUnregistration;
