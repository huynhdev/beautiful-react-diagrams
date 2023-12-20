/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import PropTypes from 'prop-types';
import { NodeType } from '../../shared/Types.js';
import DiagramNode from '../DiagramNode/DiagramNode.js';
import updateNodeCoordinates from './updateNodeCoordinates.js';

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
      const nextNodes = updateNodeCoordinates(nodeId, newCoordinates, nodes);
      onChange(nextNodes);
    }
  };
  return nodes && nodes.length > 0 && nodes.map(_ref => {
    let {
      data,
      ...node
    } = _ref;
    return React.createElement(DiagramNode, _extends({}, node, {
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
  nodes: PropTypes.arrayOf(NodeType),
  onChange: PropTypes.func,
  onNodeRegister: PropTypes.func,
  onPortRegister: PropTypes.func,
  onNodeRemove: PropTypes.func,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func
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
var NodesCanvas$1 = React.memo(NodesCanvas);

export { NodesCanvas$1 as default };
