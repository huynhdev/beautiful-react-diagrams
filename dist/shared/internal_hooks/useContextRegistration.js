/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DiagramContext = require('../../Context/DiagramContext.js');

const usePortRegistration = (inputs, outputs, onPortRegister) => {
  const {
    canvas,
    ports
  } = React.useContext(DiagramContext["default"]);
  return React.useCallback((portId, portElement) => {
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
  } = React.useContext(DiagramContext["default"]);
  React.useEffect(() => {
    if (onNodeRegister && ref.current && canvas && nodes && !nodes[id]) {
      onNodeRegister(id, ref.current);
    }
  }, [ref.current, onNodeRegister, !!canvas, !!nodes, id]);
};

exports.useNodeRegistration = useNodeRegistration;
exports.usePortRegistration = usePortRegistration;
