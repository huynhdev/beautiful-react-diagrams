/* beautiful-react-diagrams version: 0.5.2-rc.3 */
const getPathMidpoint = pathElement => {
  if (pathElement.getTotalLength && pathElement.getPointAtLength) {
    const midpoint = pathElement.getTotalLength() / 2;
    const {
      x,
      y
    } = pathElement.getPointAtLength(midpoint);
    return [x, y];
  }
  return [0, 0];
};

export { getPathMidpoint as default };
