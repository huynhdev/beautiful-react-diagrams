/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import React from 'react';

var DiagramContext = React.createContext({
  canvas: null,
  ports: null,
  nodes: null
});

export { DiagramContext as default };
