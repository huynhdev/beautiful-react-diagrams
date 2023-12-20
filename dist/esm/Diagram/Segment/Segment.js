/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PortAlignment } from '../../shared/Types.js';
import makeSvgPath from '../../shared/functions/makeSvgPath.js';

const Segment = props => {
  const {
    from,
    to,
    alignment
  } = props;
  const pathOptions = {
    type: 'bezier',
    inputAlignment: alignment
  };
  const path = useMemo(() => makeSvgPath(from, to, pathOptions), [from, to, alignment]);
  return React.createElement("g", {
    className: "bi-diagram-segment"
  }, React.createElement("path", {
    d: path
  }), React.createElement("circle", {
    r: "6.5",
    cx: to[0],
    cy: to[1]
  }));
};
Segment.propTypes = {
  from: PropTypes.arrayOf(PropTypes.number).isRequired,
  to: PropTypes.arrayOf(PropTypes.number).isRequired,
  alignment: PortAlignment
};
Segment.defaultProps = {
  alignment: undefined
};
var Segment$1 = React.memo(Segment);

export { Segment$1 as default };
