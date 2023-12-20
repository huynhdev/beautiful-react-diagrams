/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var Types = require('../../shared/Types.js');
var usePortRefs = require('../../shared/internal_hooks/usePortRefs.js');
var useCanvas = require('../../shared/internal_hooks/useCanvas.js');
var getEntityCoordinates = require('./getEntityCoordinates.js');
var makeSvgPath = require('../../shared/functions/makeSvgPath.js');
var getPathMidpoint = require('../../shared/functions/getPathMidpoint.js');
var useNodeRefs = require('../../shared/internal_hooks/useNodeRefs.js');
var LinkLabel = require('./LinkLabel.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

const useContextRefs = () => {
  const canvas = useCanvas["default"]();
  const portRefs = usePortRefs["default"]();
  const nodeRefs = useNodeRefs["default"]();
  return {
    canvas,
    nodeRefs,
    portRefs
  };
};
const Link = props => {
  const {
    input,
    output,
    link,
    onDelete
  } = props;
  const pathRef = React.useRef();
  const [labelPosition, setLabelPosition] = React.useState();
  const {
    canvas,
    portRefs,
    nodeRefs
  } = useContextRefs();
  const inputPoint = React.useMemo(() => getEntityCoordinates["default"](input, portRefs, nodeRefs, canvas), [input, portRefs, nodeRefs, canvas]);
  const classList = React.useMemo(() => classNames__default["default"]('bi-diagram-link', {
    'readonly-link': link.readonly
  }, link.className), [link.readonly, link.className]);
  const outputPoint = React.useMemo(() => getEntityCoordinates["default"](output, portRefs, nodeRefs, canvas), [output, portRefs, nodeRefs, canvas]);
  const pathOptions = {
    type: input.type === 'port' || output.type === 'port' ? 'bezier' : 'curve',
    inputAlignment: input.entity.alignment || null,
    outputAlignment: output.entity.alignment || null
  };
  const path = React.useMemo(() => makeSvgPath["default"](inputPoint, outputPoint, pathOptions), [inputPoint, outputPoint]);
  React.useEffect(() => {
    if (link.label && inputPoint && outputPoint && pathRef.current) {
      const pos = getPathMidpoint["default"](pathRef.current);
      setLabelPosition(pos);
    }
  }, [pathRef.current, link.label, inputPoint, outputPoint]);
  const onDoubleClick = React.useCallback(() => {
    if (onDelete && !link.readonly) {
      onDelete(link);
    }
  }, [link.readonly, onDelete]);
  return React__default["default"].createElement("g", {
    className: classList
  }, !link.readonly && React__default["default"].createElement("path", {
    d: path,
    className: "bi-link-ghost",
    onDoubleClick: onDoubleClick
  }), React__default["default"].createElement("path", {
    d: path,
    ref: pathRef,
    className: "bi-link-path",
    onDoubleClick: onDoubleClick
  }), link.label && labelPosition && React__default["default"].createElement(LinkLabel["default"], {
    position: labelPosition,
    label: link.label
  }));
};
const InvolvedEntity = PropTypes__default["default"].exact({
  type: PropTypes__default["default"].oneOf(['node', 'port']),
  entity: PropTypes__default["default"].oneOfType([Types.PortType, Types.NodeType])
});
Link.propTypes = {
  link: Types.LinkType.isRequired,
  input: InvolvedEntity.isRequired,
  output: InvolvedEntity.isRequired,
  onDelete: PropTypes__default["default"].func
};
Link.defaultProps = {
  onDelete: undefined
};
var DiagramLink = React__default["default"].memo(Link);

exports["default"] = DiagramLink;
