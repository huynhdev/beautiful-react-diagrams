/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DiagramContext = require('../../Context/DiagramContext.js');

const usePortRefs = () => {
  const {
    ports
  } = React.useContext(DiagramContext["default"]);
  return ports;
};

exports["default"] = usePortRefs;
