/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import DiagramCanvas from './DiagramCanvas/DiagramCanvas.js';
import NodesCanvas from './NodesCanvas/NodesCanvas.js';
import LinksCanvas from './LinksCanvas/LinksCanvas.js';
import { SchemaType } from '../shared/Types.js';

const Diagram = props => {
  const {
    schema,
    onChange,
    ...rest
  } = props;
  const [segment, setSegment] = useState();
  const {
    current: portRefs
  } = useRef({});
  const {
    current: nodeRefs
  } = useRef({});
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
  const onNodeRemove = useCallback((nodeId, inputsPorts, outputsPorts) => {
    delete nodeRefs[nodeId];
    inputsPorts.forEach(input => delete portRefs[input]);
    outputsPorts.forEach(output => delete portRefs[output]);
  }, []);
  const onDragNewSegment = useCallback((portId, from, to, alignment) => {
    setSegment({
      id: `segment-${portId}`,
      from,
      to,
      alignment
    });
  }, []);
  const onSegmentFail = useCallback(() => {
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
  return React.createElement(DiagramCanvas, _extends({
    portRefs: portRefs,
    nodeRefs: nodeRefs
  }, rest), React.createElement(NodesCanvas, {
    nodes: schema.nodes,
    onChange: onNodesChange,
    onNodeRegister: onNodeRegister,
    onPortRegister: onPortRegister,
    onNodeRemove: onNodeRemove,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect
  }), React.createElement(LinksCanvas, {
    nodes: schema.nodes,
    links: schema.links,
    segment: segment,
    onChange: onLinkDelete
  }));
};
Diagram.propTypes = {
  schema: SchemaType,
  onChange: PropTypes.func
};
Diagram.defaultProps = {
  schema: {
    nodes: [],
    links: []
  },
  onChange: undefined
};
var Diagram$1 = React.memo(Diagram);

export { Diagram$1 as default };
