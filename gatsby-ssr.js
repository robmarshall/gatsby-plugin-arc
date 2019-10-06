import React from "react";
import minimatch from "minimatch";
export const onRenderBody = ({
  pathname,
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
  }) || checkPathAgainstOptions({
    pathName: pathName,
    options: disable
  })) {
    return null;
  }

  const setComponents = pluginOptions.head ? setHeadComponents : setPostBodyComponents;
  return setComponents([""]);
};

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
      return minimatch(pathName, options);
    }

    if (typeof options === `boolean`) {
      if (options) {
        return true;
      }
    }
  }

  return false;
};