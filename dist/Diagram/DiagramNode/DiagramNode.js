/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var getDiagramNodeStyle = require('./getDiagramNodeStyle.js');
var useContextRegistration = require('../../shared/internal_hooks/useContextRegistration.js');
var Types = require('../../shared/Types.js');
var portGenerator = require('./portGenerator.js');
var useDrag = require('../../shared/internal_hooks/useDrag.js');
var useNodeUnregistration = require('../../shared/internal_hooks/useNodeUnregistration.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

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
  const registerPort = useContextRegistration.usePortRegistration(inputs, outputs, onPortRegister);
  const {
    ref,
    onDragStart,
    onDrag
  } = useDrag["default"]({
    throttleBy: 14
  });
  const dragStartPoint = React.useRef(coordinates);
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
  useNodeUnregistration["default"](onNodeRemove, inputs, outputs, id);
  useContextRegistration.useNodeRegistration(ref, onMount, id);
  const classList = React.useMemo(() => classNames__default["default"]('bi bi-diagram-node', {
    [`bi-diagram-node-${type}`]: !!type && !render
  }, className), [type, className]);
  const options = {
    registerPort,
    onDragNewSegment,
    onSegmentFail,
    onSegmentConnect
  };
  const InputPorts = inputs.map(portGenerator["default"](options, 'input'));
  const OutputPorts = outputs.map(portGenerator["default"](options, 'output'));
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
  return React__default["default"].createElement("div", {
    className: classList,
    ref: ref,
    style: getDiagramNodeStyle["default"](coordinates, disableDrag)
  }, render && typeof render === 'function' && render(customRenderProps), !render && React__default["default"].createElement(React__default["default"].Fragment, null, content, React__default["default"].createElement("div", {
    className: "bi-port-wrapper"
  }, React__default["default"].createElement("div", {
    className: "bi-input-ports"
  }, InputPorts), React__default["default"].createElement("div", {
    className: "bi-output-ports"
  }, OutputPorts))));
};
DiagramNode.propTypes = {
  id: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string]).isRequired,
  coordinates: PropTypes__default["default"].arrayOf(PropTypes__default["default"].number).isRequired,
  content: PropTypes__default["default"].oneOfType([PropTypes__default["default"].elementType, PropTypes__default["default"].node]),
  inputs: PropTypes__default["default"].arrayOf(Types.PortType),
  outputs: PropTypes__default["default"].arrayOf(Types.PortType),
  type: PropTypes__default["default"].oneOf(['default']),
  data: PropTypes__default["default"].shape({}),
  render: PropTypes__default["default"].func,
  onPositionChange: PropTypes__default["default"].func,
  onMount: PropTypes__default["default"].func,
  onPortRegister: PropTypes__default["default"].func,
  onNodeRemove: PropTypes__default["default"].func,
  onDragNewSegment: PropTypes__default["default"].func,
  onSegmentFail: PropTypes__default["default"].func,
  onSegmentConnect: PropTypes__default["default"].func,
  className: PropTypes__default["default"].string,
  disableDrag: PropTypes__default["default"].bool
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
var DiagramNode$1 = React__default["default"].memo(DiagramNode);

exports["default"] = DiagramNode$1;
