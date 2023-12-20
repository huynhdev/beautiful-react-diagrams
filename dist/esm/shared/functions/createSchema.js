/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import ensureNodeId from './ensureNodeId.js';
import { validateSchema } from './validators.js';

const createSchema = schema => {
  const next = {
    ...schema
  };
  next.nodes ||= [];
  next.links ||= [];
  next.nodes.forEach(ensureNodeId);
  validateSchema(next);
  return next;
};

export { createSchema as default };
