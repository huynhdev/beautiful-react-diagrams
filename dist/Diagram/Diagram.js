/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var DiagramCanvas = require('./DiagramCanvas/DiagramCanvas.js');
var NodesCanvas = require('./NodesCanvas/NodesCanvas.js');
var LinksCanvas = require('./LinksCanvas/LinksCanvas.js');
var Types = require('../shared/Types.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const Diagram = props => {
  const {
    schema,
    onChange,
    ...rest
  } = props;
  const [segment, setSegment] = React.useState();
  const {
    current: portRefs
  } = React.useRef({});
  const {
    current: nodeRefs
  } = React.useRef({});
  const onNodesChange = nextNodes => {
    if (onChange) {
      onChange({
        nodes: nextNodes
      });
    }
  };
  const onPortRegister = (portId, portEl) => {
    portRefs[portId] = portEl;
  };
  const onNodeRegister = (nodeId, nodeEl) => {
    nodeRefs[nodeId] = nodeEl;
  };
  const onNodeRemove = React.useCallback((nodeId, inputsPorts, outputsPorts) => {
    delete nodeRefs[nodeId];
    inputsPorts.forEach(input => delete portRefs[input]);
    outputsPorts.forEach(output => delete portRefs[output]);
  }, []);
  const onDragNewSegment = React.useCallback((portId, from, to, alignment) => {
    setSegment({
      id: `segment-${portId}`,
      from,
      to,
      alignment
    });
  }, []);
  const onSegmentFail = React.useCallback(() => {
    setSegment(undefined);
  }, []);
  const onSegmentConnect = (input, output) => {
    const nextLinks = [...(schema.links || []), {
      input,
      output
    }];
    if (onChange) {
      onChange({
        links: nextLinks
      });
    }
    setSegment(undefined);
  };
  const onLinkDelete = nextLinks => {
    if (onChange) {
      onChange({
        links: nextLinks
      });
    }
  };
  return React__default["default"].createElement(DiagramCanvas["default"], _rollupPluginBabelHelpers["extends"]({
    portRefs: portRefs,
    nodeRefs: nodeRefs
  }, rest), React__default["default"].createElement(NodesCanvas["default"], {
    nodes: schema.nodes,
    onChange: onNodesChange,
    onNodeRegister: onNodeRegister,
    onPortRegister: onPortRegister,
    onNodeRemove: onNodeRemove,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect
  }), React__default["default"].createElement(LinksCanvas["default"], {
    nodes: schema.nodes,
    links: schema.links,
    segment: segment,
    onChange: onLinkDelete
  }));
};
Diagram.propTypes = {
  schema: Types.SchemaType,
  onChange: PropTypes__default["default"].func
};
Diagram.defaultProps = {
  schema: {
    nodes: [],
    links: []
  },
  onChange: undefined
};
var Diagram$1 = React__default["default"].memo(Diagram);

exports["default"] = Diagram$1;
