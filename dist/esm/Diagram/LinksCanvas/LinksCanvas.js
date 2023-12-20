/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import DiagramLink from '../Link/Link.js';
import Segment from '../Segment/Segment.js';
import { NodeType, LinkType, PortAlignment } from '../../shared/Types.js';
import findInvolvedEntity from './findInvolvedEntity.js';
import removeLinkFromArray from './removeLinkFromArray.js';

const LinksCanvas = props => {
  const {
    nodes,
    segment,
    onChange,
    links
  } = props;
  const removeFromLinksArray = useCallback(link => {
    if (links.length > 0 && onChange) {
      const nextLinks = removeLinkFromArray(link, links);
      onChange(nextLinks);
    }
  }, [links, onChange]);
  return React.createElement("svg", {
    className: "bi bi-link-canvas-layer"
  }, links && links.length > 0 && links.map(link => React.createElement(DiagramLink, {
    link: link,
    input: findInvolvedEntity(nodes, link.input),
    output: findInvolvedEntity(nodes, link.output),
    onDelete: removeFromLinksArray,
    key: `${link.input}-${link.output}`
  })), segment && React.createElement(Segment, segment));
};
LinksCanvas.propTypes = {
  nodes: PropTypes.arrayOf(NodeType),
  links: PropTypes.arrayOf(LinkType),
  segment: PropTypes.exact({
    id: PropTypes.string,
    from: PropTypes.arrayOf(PropTypes.number),
    to: PropTypes.arrayOf(PropTypes.number),
    alignment: PortAlignment
  }),
  onChange: PropTypes.func
};
LinksCanvas.defaultProps = {
  nodes: [],
  links: [],
  segment: undefined,
  onChange: undefined
};
var LinksCanvas$1 = React.memo(LinksCanvas);

export { LinksCanvas$1 as default };
