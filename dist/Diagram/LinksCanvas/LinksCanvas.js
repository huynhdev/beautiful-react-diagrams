/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var Link = require('../Link/Link.js');
var Segment = require('../Segment/Segment.js');
var Types = require('../../shared/Types.js');
var findInvolvedEntity = require('./findInvolvedEntity.js');
var removeLinkFromArray = require('./removeLinkFromArray.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

const LinksCanvas = props => {
  const {
    nodes,
    segment,
    onChange,
    links
  } = props;
  const removeFromLinksArray = React.useCallback(link => {
    if (links.length > 0 && onChange) {
      const nextLinks = removeLinkFromArray["default"](link, links);
      onChange(nextLinks);
    }
  }, [links, onChange]);
  return React__default["default"].createElement("svg", {
    className: "bi bi-link-canvas-layer"
  }, links && links.length > 0 && links.map(link => React__default["default"].createElement(Link["default"], {
    link: link,
    input: findInvolvedEntity["default"](nodes, link.input),
    output: findInvolvedEntity["default"](nodes, link.output),
    onDelete: removeFromLinksArray,
    key: `${link.input}-${link.output}`
  })), segment && React__default["default"].createElement(Segment["default"], segment));
};
LinksCanvas.propTypes = {
  nodes: PropTypes__default["default"].arrayOf(Types.NodeType),
  links: PropTypes__default["default"].arrayOf(Types.LinkType),
  segment: PropTypes__default["default"].exact({
    id: PropTypes__default["default"].string,
    from: PropTypes__default["default"].arrayOf(PropTypes__default["default"].number),
    to: PropTypes__default["default"].arrayOf(PropTypes__default["default"].number),
    alignment: Types.PortAlignment
  }),
  onChange: PropTypes__default["default"].func
};
LinksCanvas.defaultProps = {
  nodes: [],
  links: [],
  segment: undefined,
  onChange: undefined
};
var LinksCanvas$1 = React__default["default"].memo(LinksCanvas);

exports["default"] = LinksCanvas$1;
