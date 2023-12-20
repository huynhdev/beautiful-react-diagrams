/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getDiagramNodeStyle from './getDiagramNodeStyle.js';
import { usePortRegistration, useNodeRegistration } from '../../shared/internal_hooks/useContextRegistration.js';
import { PortType } from '../../shared/Types.js';
import portGenerator from './portGenerator.js';
import useDrag from '../../shared/internal_hooks/useDrag.js';
import useNodeUnregistration from '../../shared/internal_hooks/useNodeUnregistration.js';

const DiagramNode = props => {
  const {
    id,
    content,
    coordinates,
    type,
    inputs,
    outputs,
    data,
    onPositionChange,
    onPortRegister,
    onNodeRemove,
    onDragNewSegment,
    onMount,
    onSegmentFail,
    onSegmentConnect,
    render,
    className,
    disableDrag
  } = props;
  const registerPort = usePortRegistration(inputs, outputs, onPortRegister);
  const {
    ref,
    onDragStart,
    onDrag
  } = useDrag({
    throttleBy: 14
  });
  const dragStartPoint = useRef(coordinates);
  if (!disableDrag) {
    onDragStart(() => {
      dragStartPoint.current = coordinates;
    });
    onDrag((event, info) => {
      if (onPositionChange) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const nextCoords = [dragStartPoint.current[0] - info.offset[0], dragStartPoint.current[1] - info.offset[1]];
        onPositionChange(id, nextCoords);
      }
    });
  }
  useNodeUnregistration(onNodeRemove, inputs, outputs, id);
  useNodeRegistration(ref, onMount, id);
  const classList = useMemo(() => classNames('bi bi-diagram-node', {
    [`bi-diagram-node-${type}`]: !!type && !render
  }, className), [type, className]);
  const options = {
    registerPort,
    onDragNewSegment,
    onSegmentFail,
    onSegmentConnect
  };
  const InputPorts = inputs.map(portGenerator(options, 'input'));
  const OutputPorts = outputs.map(portGenerator(options, 'output'));
  const customRenderProps = {
    id,
    render,
    content,
    type,
    inputs: InputPorts,
    outputs: OutputPorts,
    data,
    className
  };
  return React.createElement("div", {
    className: classList,
    ref: ref,
    style: getDiagramNodeStyle(coordinates, disableDrag)
  }, render && typeof render === 'function' && render(customRenderProps), !render && React.createElement(React.Fragment, null, content, React.createElement("div", {
    className: "bi-port-wrapper"
  }, React.createElement("div", {
    className: "bi-input-ports"
  }, InputPorts), React.createElement("div", {
    className: "bi-output-ports"
  }, OutputPorts))));
};
DiagramNode.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  inputs: PropTypes.arrayOf(PortType),
  outputs: PropTypes.arrayOf(PortType),
  type: PropTypes.oneOf(['default']),
  data: PropTypes.shape({}),
  render: PropTypes.func,
  onPositionChange: PropTypes.func,
  onMount: PropTypes.func,
  onPortRegister: PropTypes.func,
  onNodeRemove: PropTypes.func,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func,
  className: PropTypes.string,
  disableDrag: PropTypes.bool
};
DiagramNode.defaultProps = {
  type: 'default',
  content: '',
  inputs: [],
  outputs: [],
  data: {},
  onPositionChange: undefined,
  render: undefined,
  onMount: undefined,
  onPortRegister: undefined,
  onNodeRemove: undefined,
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined,
  className: '',
  disableDrag: false
};
var DiagramNode$1 = React.memo(DiagramNode);

export { DiagramNode$1 as default };
