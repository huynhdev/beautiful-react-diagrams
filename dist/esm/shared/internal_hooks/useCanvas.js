/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext.js';

const useCanvas = () => {
  const {
    canvas
  } = useContext(DiagramContext);
  return canvas;
};

export { useCanvas as default };
