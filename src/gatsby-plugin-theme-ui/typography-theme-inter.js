Object.defineProperty(exports, '__esModule', {
  value: true,
})

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _grayPercentage = require('gray-percentage')

var _grayPercentage2 = _interopRequireDefault(_grayPercentage)

var _typographyBreakpointConstants = require('typography-breakpoint-constants')

var _compassVerticalRhythm = require('compass-vertical-rhythm')

var _compassVerticalRhythm2 = _interopRequireDefault(_compassVerticalRhythm)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

var theme = {
  title: 'Inter',
  baseFontSize: '20px',
  baseLineHeight: 1.65,
  scaleRatio: 2.45,
  headerFontFamily: ['Inter', 'sans-serif'],
  bodyFontFamily: ['Inter', 'sans-serif'],
  headerColor: 'hsla(0,0%,0%,0.9)',
  bodyColor: 'hsla(0,0%,0%,0.8)',
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: function overrideStyles(_ref, options) {
    var _ref2

    var adjustFontSizeTo = _ref.adjustFontSizeTo,
      scale = _ref.scale,
      rhythm = _ref.rhythm

    var vr = (0, _compassVerticalRhythm2.default)({
      baseFontSize: '15px',
      baseLineHeight: '27.35px',
    })

    return (
      (_ref2 = {
        a: {
          color: '#375c85',
          textDecoration: 'none',
          boxShadow: '0 1px 0 0 currentColor',
        },
        'a:hover,a:active': {
          boxShadow: 'none',
        },
        'h1,h2,h3,h4,h5,h6': {
          marginTop: rhythm(2),
        },
        blockquote: _extends({}, scale(1 / 5), {
          color: (0, _grayPercentage2.default)(41),
          paddingLeft: rhythm(18 / 16),
          marginLeft: 0,
          borderLeft: rhythm(6 / 16) + ' solid',
          borderColor: (0, _grayPercentage2.default)(90),
        }),
        'blockquote > :last-child': {
          marginBottom: 0,
        },
        'blockquote cite': _extends(
          {},
          adjustFontSizeTo(options.baseFontSize),
          {
            color: options.bodyColor,
            fontWeight: options.bodyWeight,
          },
        ),
        'blockquote cite:before': {
          content: '"— "',
        },
      }),
      _defineProperty(
        _ref2,
        _typographyBreakpointConstants.MOBILE_MEDIA_QUERY,
        {
          blockquote: {
            marginLeft: rhythm(-3 / 4),
            marginRight: 0,
            borderLeft: rhythm(3 / 16) + ' solid',
            borderColor: (0, _grayPercentage2.default)(90),
            paddingLeft: rhythm(9 / 16),
          },
        },
      ),
      _defineProperty(
        _ref2,
        _typographyBreakpointConstants.TABLET_MEDIA_QUERY,
        {
          html: _extends({}, vr.establishBaseline()),
        },
      ),
      _ref2
    )
  },
}

exports.default = theme
