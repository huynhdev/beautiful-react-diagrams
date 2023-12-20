/* beautiful-react-diagrams version: 0.5.2-rc.3 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var throttle = require('lodash.throttle');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);

const defaultOptions = {
  ref: undefined,
  throttleBy: 0
};
const getEventCoordinates = event => [event.clientX, event.clientY];
const createCallbackRef = ref => React.useCallback(callback => {
  if (!ref.current || callback !== ref.current) {
    ref.current = callback;
  }
}, [ref.current]);
const useDrag = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
  const targetRef = options.ref || React.useRef();
  const dragStartHandlerRef = React.useRef();
  const dragHandlerRef = React.useRef();
  const dragEndHandlerRef = React.useRef();
  const {
    current: info
  } = React.useRef({
    isDragging: false,
    start: null,
    end: null,
    offset: null
  });
  const onDragStart = React.useCallback(event => {
    if (!info.isDragging && targetRef.current.contains(event.target)) {
      info.isDragging = true;
      info.end = null;
      info.offset = null;
      info.start = getEventCoordinates(event);
      if (dragStartHandlerRef.current) {
        dragStartHandlerRef.current(event, {
          ...info
        });
      }
    }
  }, [targetRef.current, info, dragStartHandlerRef.current]);
  const onDrag = React.useCallback(throttle__default["default"](event => {
    if (info.isDragging) {
      info.offset = [info.start[0] - event.clientX, info.start[1] - event.clientY];
      if (dragHandlerRef.current) {
        dragHandlerRef.current(event, {
          ...info
        });
      }
    }
  }, options.throttleBy), [targetRef.current, info, dragHandlerRef.current]);
  const onDragEnd = React.useCallback(event => {
    if (info.isDragging) {
      info.isDragging = false;
      info.end = getEventCoordinates(event);
      if (dragEndHandlerRef.current) {
        dragEndHandlerRef.current(event, {
          ...info
        });
      }
    }
  }, [targetRef.current, info, dragEndHandlerRef.current]);
  React.useEffect(() => {
    const _onDragStart = e => onDragStart(e);
    const _onDrag = e => onDrag(e);
    const _onDragEnd = e => onDragEnd(e);
    if (targetRef.current) {
      targetRef.current.addEventListener('mousedown', _onDragStart);
      document.addEventListener('mousemove', _onDrag);
      document.addEventListener('mouseup', _onDragEnd);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener('mousedown', _onDragStart);
        document.removeEventListener('mousemove', _onDrag);
        document.removeEventListener('mouseup', _onDragEnd);
      }
    };
  }, [targetRef.current]);
  return {
    ref: targetRef,
    onDragStart: createCallbackRef(dragStartHandlerRef),
    onDrag: createCallbackRef(dragHandlerRef),
    onDragEnd: createCallbackRef(dragEndHandlerRef)
  };
};

exports["default"] = useDrag;
