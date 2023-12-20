/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { isValidElement } from 'react';
import ERR from '../Errors.js';

const validatePort = port => {
  if (!port.id) {
    throw ERR.INVALID_PORT_ID();
  }
  if (!!port.canLink && typeof port.canLink !== 'function') {
    throw ERR.INVALID_PORT_CAN_LINK(port.id);
  }
  if (!!port.alignment && !['right', 'left', 'top', 'bottom'].includes(port.alignment)) {
    throw ERR.INVALID_PORT_ALIGNMENT(port.id);
  }
  return true;
};
const validateNode = node => {
  if (!node.id) {
    throw ERR.INVALID_ID();
  }
  if (!node.coordinates || !Array.isArray(node.coordinates) || node.coordinates.length !== 2) {
    throw ERR.INVALID_COORDS(node.id);
  }
  if (!!node.content && typeof node.content !== 'string' && typeof node.content !== 'function' && !isValidElement(node.content)) {
    throw ERR.INVALID_CONTENT(node.id);
  }
  if (node.inputs) {
    if (!Array.isArray(node.inputs)) {
      throw ERR.INVALID_INPUTS_ARRAY(node.id);
    }
    node.inputs.forEach(validatePort);
  }
  if (node.outputs) {
    if (!Array.isArray(node.outputs)) {
      throw ERR.INVALID_INPUTS_ARRAY(node.id);
    }
    node.outputs.forEach(validatePort);
  }
  return true;
};
const validateNodes = nodes => {
  if (!Array.isArray(nodes)) {
    throw ERR.INVALID_NODES_ARRAY();
  }
  nodes.forEach(validateNode);
  return true;
};
const validateLink = link => {
  if (!link.input || !link.output || typeof link.input !== 'string' || typeof link.output !== 'string') {
    throw ERR.LINK_INVALID_INPUT_OUTPUT();
  }
  if (link.readonly && typeof link.readonly !== 'boolean') {
    throw ERR.LINK_INVALID_READONLY();
  }
  return true;
};
const validateLinks = links => {
  if (!Array.isArray(links)) {
    throw ERR.INVALID_LINKS_ARRAY();
  }
  links.forEach(validateLink);
  return true;
};
const validateSchema = _ref => {
  let {
    links,
    nodes
  } = _ref;
  if (!nodes) {
    throw ERR.MUST_HAVE_NODES();
  }
  return validateLinks(links) && validateNodes(nodes);
};

export { validateSchema as default, validateLink, validateLinks, validateNode, validateNodes, validatePort, validateSchema };
