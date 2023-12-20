/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PortType, NodeType, LinkType } from '../../shared/Types.js';
import usePortRefs from '../../shared/internal_hooks/usePortRefs.js';
import useCanvas from '../../shared/internal_hooks/useCanvas.js';
import getEntityCoordinates from './getEntityCoordinates.js';
import makeSvgPath from '../../shared/functions/makeSvgPath.js';
import getPathMidpoint from '../../shared/functions/getPathMidpoint.js';
import useNodeRefs from '../../shared/internal_hooks/useNodeRefs.js';
import LinkLabel from './LinkLabel.js';

const useContextRefs = () => {
  const canvas = useCanvas();
  const portRefs = usePortRefs();
  const nodeRefs = useNodeRefs();
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
  const pathRef = useRef();
  const [labelPosition, setLabelPosition] = useState();
  const {
    canvas,
    portRefs,
    nodeRefs
  } = useContextRefs();
  const inputPoint = useMemo(() => getEntityCoordinates(input, portRefs, nodeRefs, canvas), [input, portRefs, nodeRefs, canvas]);
  const classList = useMemo(() => classNames('bi-diagram-link', {
    'readonly-link': link.readonly
  }, link.className), [link.readonly, link.className]);
  const outputPoint = useMemo(() => getEntityCoordinates(output, portRefs, nodeRefs, canvas), [output, portRefs, nodeRefs, canvas]);
  const pathOptions = {
    type: input.type === 'port' || output.type === 'port' ? 'bezier' : 'curve',
    inputAlignment: input.entity.alignment || null,
    outputAlignment: output.entity.alignment || null
  };
  const path = useMemo(() => makeSvgPath(inputPoint, outputPoint, pathOptions), [inputPoint, outputPoint]);
  useEffect(() => {
    if (link.label && inputPoint && outputPoint && pathRef.current) {
      const pos = getPathMidpoint(pathRef.current);
      setLabelPosition(pos);
    }
  }, [pathRef.current, link.label, inputPoint, outputPoint]);
  const onDoubleClick = useCallback(() => {
    if (onDelete && !link.readonly) {
      onDelete(link);
    }
  }, [link.readonly, onDelete]);
  return React.createElement("g", {
    className: classList
  }, !link.readonly && React.createElement("path", {
    d: path,
    className: "bi-link-ghost",
    onDoubleClick: onDoubleClick
  }), React.createElement("path", {
    d: path,
    ref: pathRef,
    className: "bi-link-path",
    onDoubleClick: onDoubleClick
  }), link.label && labelPosition && React.createElement(LinkLabel, {
    position: labelPosition,
    label: link.label
  }));
};
const InvolvedEntity = PropTypes.exact({
  type: PropTypes.oneOf(['node', 'port']),
  entity: PropTypes.oneOfType([PortType, NodeType])
});
Link.propTypes = {
  link: LinkType.isRequired,
  input: InvolvedEntity.isRequired,
  output: InvolvedEntity.isRequired,
  onDelete: PropTypes.func
};
Link.defaultProps = {
  onDelete: undefined
};
var DiagramLink = React.memo(Link);

export { DiagramLink as default };
