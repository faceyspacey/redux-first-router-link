'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _hrefToUrl = require('./hrefToUrl');

var _hrefToUrl2 = _interopRequireDefault(_hrefToUrl);

var _handlePress = require('./handlePress');

var _handlePress2 = _interopRequireDefault(_handlePress);

var _preventDefault = require('./preventDefault');

var _preventDefault2 = _interopRequireDefault(_preventDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var babelPluginFlowReactPropTypes_proptype_Href = require('./hrefToUrl').babelPluginFlowReactPropTypes_proptype_Href || require('react').PropTypes.any;

var Link = function Link(_ref, _ref2) {
  var store = _ref2.store;

  var href = _ref.href,
      children = _ref.children,
      onPress = _ref.onPress,
      _ref$down = _ref.down,
      down = _ref$down === undefined ? false : _ref$down,
      _ref$shouldDispatch = _ref.shouldDispatch,
      shouldDispatch = _ref$shouldDispatch === undefined ? true : _ref$shouldDispatch,
      target = _ref.target,
      dispatch = _ref.dispatch,
      props = _objectWithoutProperties(_ref, ['href', 'children', 'onPress', 'down', 'shouldDispatch', 'target', 'dispatch']);

  var routesMap = store.getState().location.routesMap;

  var url = (0, _hrefToUrl2.default)(href, routesMap);
  var handler = _handlePress2.default.bind(null, url, routesMap, onPress, shouldDispatch, target, dispatch);

  return _react2.default.createElement(
    'a',
    _extends({
      href: url,
      onClick: !down && handler || _preventDefault2.default,
      onMouseDown: down && handler,
      onTouchStart: down && handler,
      target: target
    }, props),
    children
  );
};

Link.contextTypes = {
  store: _react2.default.PropTypes.object.isRequired
};

var connector = (0, _reactRedux.connect)();

exports.default = connector(Link);