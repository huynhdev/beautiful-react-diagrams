/* beautiful-react-diagrams version: 0.5.2-rc.3 */
import { extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import Port from '../Port/Port.js';

const portGenerator = (_ref, type) => {
  let {
    registerPort,
    onDragNewSegment,
    onSegmentFail,
    onSegmentConnect
  } = _ref;
  return port => React.createElement(Port, _extends({}, port, {
    onMount: registerPort,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect,
    type: type,
    key: port.id
  }));
};

export { portGenerator as default };
