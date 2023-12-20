/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var Types = require('../../shared/Types.js');
var DiagramNode = require('../DiagramNode/DiagramNode.js');
var updateNodeCoordinates = require('./updateNodeCoordinates.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const NodesCanvas = props => {
  const {
    nodes,
    onPortRegister,
    onNodeRegister,
    onNodeRemove,
    onDragNewSegment,
    onSegmentFail,
    onSegmentConnect,
    onChange
  } = props;
  const onNodePositionChange = (nodeId, newCoordinates) => {
    if (onChange) {
      const nextNodes = updateNodeCoordinates["default"](nodeId, newCoordinates, nodes);
      onChange(nextNodes);
    }
  };
  return nodes && nodes.length > 0 && nodes.map(_ref => {
    let {
      data,
      ...node
    } = _ref;
    return React__default["default"].createElement(DiagramNode["default"], _rollupPluginBabelHelpers["extends"]({}, node, {
      data: data,
      onPositionChange: onNodePositionChange,
      onPortRegister: onPortRegister,
      onNodeRemove: onNodeRemove,
      onDragNewSegment: onDragNewSegment,
      onSegmentFail: onSegmentFail,
      onSegmentConnect: onSegmentConnect,
      onMount: onNodeRegister,
      key: node.id
    }));
  });
};
NodesCanvas.propTypes = {
  nodes: PropTypes__default["default"].arrayOf(Types.NodeType),
  onChange: PropTypes__default["default"].func,
  onNodeRegister: PropTypes__default["default"].func,
  onPortRegister: PropTypes__default["default"].func,
  onNodeRemove: PropTypes__default["default"].func,
  onDragNewSegment: PropTypes__default["default"].func,
  onSegmentFail: PropTypes__default["default"].func,
  onSegmentConnect: PropTypes__default["default"].func
};
NodesCanvas.defaultProps = {
  nodes: [],
  onChange: undefined,
  onNodeRegister: undefined,
  onPortRegister: undefined,
  onNodeRemove: undefined,
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined
};
var NodesCanvas$1 = React__default["default"].memo(NodesCanvas);

exports["default"] = NodesCanvas$1;
