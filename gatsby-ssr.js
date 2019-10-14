"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onRenderBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _minimatch = _interopRequireDefault(require("minimatch"));

const onRenderBody = ({
  pathName,
  setHeadComponents,
  setPostBodyComponents
}, {
  widgetId,
  head = true,
  disable = false,
  disableCDN = true,
  env = ["production"]
}) => {
  if (!widgetId || !runOnEnvs({
    env: env,
    nodeEnv: process.env.NODE_ENV
  }) || !checkPathAgainstOptions({
    pathName: pathName,
    options: disable
  })) {
    return null;
  }

  const setComponents = head ? setHeadComponents : setPostBodyComponents;
  return setComponents([_react.default.createElement(_react.default.Fragment, {
    key: `gatsby-plugin-arc`
  }, _react.default.createElement("script", {
    async: true,
    src: `https://arc.io/widget.js#${widgetId}?CDN=${checkPathAgainstOptions({
      pathName: pathName,
      options: disableCDN
    })}`
  }))]);
};

exports.onRenderBody = onRenderBody;

const runOnEnvs = ({
  env,
  nodeEnv
}) => {
  if (typeof env !== `undefined`) {
    if (env.includes(nodeEnv)) {
      return true;
    }
  }

  return false;
};

const checkPathAgainstOptions = ({
  pathName,
  options
}) => {
  if (options !== `undefined`) {
    if (Array.isArray(options)) {
      options.forEach(option => {
        if ((0, _minimatch.default)(pathName, option)) {
          console.log(pathName, option);
          return true;
        }
      });
    }

    if (typeof options === `boolean`) {
      if (options) {
        return true;
      }
    }
  }

  return false;
};