/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DiagramContext = require('../../Context/DiagramContext.js');

const useCanvas = () => {
  const {
    canvas
  } = React.useContext(DiagramContext["default"]);
  return canvas;
};

exports["default"] = useCanvas;
