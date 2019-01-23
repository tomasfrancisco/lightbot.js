"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLightbotMessenger = withLightbotMessenger;
Object.defineProperty(exports, "LightbotMessage", {
  enumerable: true,
  get: function get() {
    return _lightbotJs.LightbotMessage;
  }
});

var React = _interopRequireWildcard(require("react"));

var _lightbotJs = require("../lightbot-js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withLightbotMessenger(messengerProps) {
  return function (Component) {
    var _temp;

    return _temp =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(LightbotDecorator, _React$Component);

      function LightbotDecorator(props) {
        var _this;

        _classCallCheck(this, LightbotDecorator);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(LightbotDecorator).call(this, props));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateHandler", function () {
          _this.forceUpdate();
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleMessenger", function () {
          _this.messenger.toggleMessenger();
        });

        _this.messenger = new _lightbotJs.LightbotMessenger(_objectSpread({}, messengerProps, {
          onChange: _this.updateHandler
        }));
        return _this;
      }

      _createClass(LightbotDecorator, [{
        key: "render",
        value: function render() {
          return React.createElement(Component, _extends({}, this.props, {
            isMessengerOpen: this.messenger.isOpen,
            messages: this.messenger.messages,
            sendMessage: this.messenger.sendMessage,
            toggleMessenger: this.toggleMessenger
          }));
        }
      }]);

      return LightbotDecorator;
    }(React.Component), _temp;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWdodGJvdC1yZWFjdC9tZXNzZW5nZXJEZWNvcmF0b3IudHN4Il0sIm5hbWVzIjpbIndpdGhMaWdodGJvdE1lc3NlbmdlciIsIm1lc3NlbmdlclByb3BzIiwiQ29tcG9uZW50IiwicHJvcHMiLCJmb3JjZVVwZGF0ZSIsIm1lc3NlbmdlciIsInRvZ2dsZU1lc3NlbmdlciIsIkxpZ2h0Ym90TWVzc2VuZ2VyIiwib25DaGFuZ2UiLCJ1cGRhdGVIYW5kbGVyIiwiaXNPcGVuIiwibWVzc2FnZXMiLCJzZW5kTWVzc2FnZSIsIlJlYWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlTyxTQUFTQSxxQkFBVCxDQUNMQyxjQURLLEVBRUw7QUFLQSxTQUFPLFVBQUNDLFNBQUQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJSCxpQ0FBWUMsS0FBWixFQUFpQztBQUFBOztBQUFBOztBQUMvQiwrRkFBTUEsS0FBTjs7QUFEK0IsZ0dBcUJULFlBQU07QUFDNUIsZ0JBQUtDLFdBQUw7QUFDRCxTQXZCZ0M7O0FBQUEsa0dBeUJQLFlBQU07QUFDOUIsZ0JBQUtDLFNBQUwsQ0FBZUMsZUFBZjtBQUNELFNBM0JnQzs7QUFHL0IsY0FBS0QsU0FBTCxHQUFpQixJQUFJRSw2QkFBSixtQkFDWk4sY0FEWTtBQUVmTyxVQUFBQSxRQUFRLEVBQUUsTUFBS0M7QUFGQSxXQUFqQjtBQUgrQjtBQU9oQzs7QUFYRTtBQUFBO0FBQUEsaUNBYWE7QUFDZCxpQkFDRSxvQkFBQyxTQUFELGVBQ00sS0FBS04sS0FEWDtBQUVFLFlBQUEsZUFBZSxFQUFFLEtBQUtFLFNBQUwsQ0FBZUssTUFGbEM7QUFHRSxZQUFBLFFBQVEsRUFBRSxLQUFLTCxTQUFMLENBQWVNLFFBSDNCO0FBSUUsWUFBQSxXQUFXLEVBQUUsS0FBS04sU0FBTCxDQUFlTyxXQUo5QjtBQUtFLFlBQUEsZUFBZSxFQUFFLEtBQUtOO0FBTHhCLGFBREY7QUFTRDtBQXZCRTs7QUFBQTtBQUFBLE1BQzJCTyxLQUFLLENBQUNYLFNBRGpDO0FBQUEsR0FBUDtBQWlDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGlnaHRib3RNZXNzYWdlLCBMaWdodGJvdE1lc3NlbmdlciB9IGZyb20gXCIuLi9saWdodGJvdC1qc1wiO1xuZXhwb3J0IHsgTGlnaHRib3RNZXNzYWdlIH0gZnJvbSBcIi4uL2xpZ2h0Ym90LWpzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlnaHRib3RNZXNzZW5nZXJQcm9wcyB7XG4gIGhvc3RVUkw6IHN0cmluZztcbiAgYWdlbnRJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpZ2h0Ym90TWVzc2VuZ2VyRGVjb3JhdGVkUHJvcHMge1xuICBtZXNzYWdlczogTGlnaHRib3RNZXNzYWdlW107XG4gIGlzTWVzc2VuZ2VyT3BlbjogYm9vbGVhbjtcbiAgc2VuZE1lc3NhZ2UobWVzc2FnZTogTGlnaHRib3RNZXNzYWdlKTogdm9pZDtcbiAgdG9nZ2xlTWVzc2VuZ2VyKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aXRoTGlnaHRib3RNZXNzZW5nZXI8QyBleHRlbmRzIExpZ2h0Ym90TWVzc2VuZ2VyRGVjb3JhdGVkUHJvcHM+KFxuICBtZXNzZW5nZXJQcm9wczogTGlnaHRib3RNZXNzZW5nZXJQcm9wcyxcbikge1xuICB0eXBlIE9taXQ8VCwgSz4gPSBQaWNrPFQsIEV4Y2x1ZGU8a2V5b2YgVCwgSz4+O1xuICB0eXBlIFN1YnRyYWN0PFQsIEs+ID0gT21pdDxULCBrZXlvZiBLPjtcbiAgdHlwZSBXcmFwcGVyUHJvcHMgPSBTdWJ0cmFjdDxDLCBMaWdodGJvdE1lc3NlbmdlckRlY29yYXRlZFByb3BzPjtcblxuICByZXR1cm4gKENvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50Q2xhc3M8Qz4pOiBSZWFjdC5Db21wb25lbnRDbGFzczxXcmFwcGVyUHJvcHM+ID0+XG4gICAgY2xhc3MgTGlnaHRib3REZWNvcmF0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8V3JhcHBlclByb3BzPiB7XG4gICAgICBwcml2YXRlIG1lc3NlbmdlcjogTGlnaHRib3RNZXNzZW5nZXI7XG5cbiAgICAgIGNvbnN0cnVjdG9yKHByb3BzOiBXcmFwcGVyUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMubWVzc2VuZ2VyID0gbmV3IExpZ2h0Ym90TWVzc2VuZ2VyKHtcbiAgICAgICAgICAuLi5tZXNzZW5nZXJQcm9wcyxcbiAgICAgICAgICBvbkNoYW5nZTogdGhpcy51cGRhdGVIYW5kbGVyLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q29tcG9uZW50XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wcyBhcyBDfVxuICAgICAgICAgICAgaXNNZXNzZW5nZXJPcGVuPXt0aGlzLm1lc3Nlbmdlci5pc09wZW59XG4gICAgICAgICAgICBtZXNzYWdlcz17dGhpcy5tZXNzZW5nZXIubWVzc2FnZXN9XG4gICAgICAgICAgICBzZW5kTWVzc2FnZT17dGhpcy5tZXNzZW5nZXIuc2VuZE1lc3NhZ2V9XG4gICAgICAgICAgICB0b2dnbGVNZXNzZW5nZXI9e3RoaXMudG9nZ2xlTWVzc2VuZ2VyfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHByaXZhdGUgdXBkYXRlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfTtcblxuICAgICAgcHJpdmF0ZSB0b2dnbGVNZXNzZW5nZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubWVzc2VuZ2VyLnRvZ2dsZU1lc3NlbmdlcigpO1xuICAgICAgfTtcbiAgICB9O1xufVxuIl19