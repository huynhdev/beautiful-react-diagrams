/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import isEqual from 'lodash.isequal';

const removeLinkFromArray = (link, links) => links.filter(item => !isEqual(item, link));

export { removeLinkFromArray as default };
