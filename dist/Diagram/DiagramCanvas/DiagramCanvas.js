/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var beautifulReactHooks = require('beautiful-react-hooks');
var isEqual = require('lodash.isequal');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var DiagramContext = require('../../Context/DiagramContext.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

const DiagramCanvas = props => {
  const {
    children,
    portRefs,
    nodeRefs,
    className,
    ...rest
  } = props;
  const [bbox, setBoundingBox] = React.useState(null);
  const canvasRef = React.useRef();
  const classList = classNames__default["default"]('bi bi-diagram', className);
  const calculateBBox = el => {
    if (el) {
      const nextBBox = el.getBoundingClientRect();
      if (!isEqual__default["default"](nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };
  React.useEffect(() => calculateBBox(canvasRef.current), [canvasRef.current]);
  beautifulReactHooks.useWindowScroll(() => calculateBBox(canvasRef.current));
  beautifulReactHooks.useWindowResize(() => calculateBBox(canvasRef.current));
  return React__default["default"].createElement("div", _rollupPluginBabelHelpers["extends"]({
    className: classList,
    ref: canvasRef
  }, rest), React__default["default"].createElement("div", {
    className: "bi-diagram-canvas"
  }, React__default["default"].createElement(DiagramContext["default"].Provider, {
    value: {
      canvas: bbox,
      ports: portRefs,
      nodes: nodeRefs,
      _nodes: {}
    }
  }, children)));
};
DiagramCanvas.propTypes = {
  portRefs: PropTypes__default["default"].shape({}),
  nodeRefs: PropTypes__default["default"].shape({}),
  className: PropTypes__default["default"].string
};
DiagramCanvas.defaultProps = {
  portRefs: {},
  nodeRefs: {},
  className: ''
};
var DiagramCanvas$1 = React__default["default"].memo(DiagramCanvas);

exports["default"] = DiagramCanvas$1;
