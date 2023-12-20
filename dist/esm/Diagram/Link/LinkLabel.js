/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import React from 'react';
import PropTypes from 'prop-types';

const LinkLabel = _ref => {
  let {
    label,
    position
  } = _ref;
  return React.createElement("foreignObject", {
    x: position[0],
    y: position[1]
  }, React.createElement("div", {
    className: "bi-diagram-link-label"
  }, label));
};
LinkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};
var LinkLabel$1 = React.memo(LinkLabel);

export { LinkLabel$1 as default };
