/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useEffect } from 'react';
import { useWindowScroll, useWindowResize } from 'beautiful-react-hooks';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DiagramContext from '../../Context/DiagramContext.js';

const DiagramCanvas = props => {
  const {
    children,
    portRefs,
    nodeRefs,
    className,
    ...rest
  } = props;
  const [bbox, setBoundingBox] = useState(null);
  const canvasRef = useRef();
  const classList = classNames('bi bi-diagram', className);
  const calculateBBox = el => {
    if (el) {
      const nextBBox = el.getBoundingClientRect();
      if (!isEqual(nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };
  useEffect(() => calculateBBox(canvasRef.current), [canvasRef.current]);
  useWindowScroll(() => calculateBBox(canvasRef.current));
  useWindowResize(() => calculateBBox(canvasRef.current));
  return React.createElement("div", _extends({
    className: classList,
    ref: canvasRef
  }, rest), React.createElement("div", {
    className: "bi-diagram-canvas"
  }, React.createElement(DiagramContext.Provider, {
    value: {
      canvas: bbox,
      ports: portRefs,
      nodes: nodeRefs,
      _nodes: {}
    }
  }, children)));
};
DiagramCanvas.propTypes = {
  portRefs: PropTypes.shape({}),
  nodeRefs: PropTypes.shape({}),
  className: PropTypes.string
};
DiagramCanvas.defaultProps = {
  portRefs: {},
  nodeRefs: {},
  className: ''
};
var DiagramCanvas$1 = React.memo(DiagramCanvas);

export { DiagramCanvas$1 as default };
