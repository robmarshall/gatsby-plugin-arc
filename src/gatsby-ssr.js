import React from 'react'
import minimatch from 'minimatch'

export const onRenderBody = (
    { pathName, setHeadComponents, setPostBodyComponents },
    {
        widgetId,
        head = true,
        disable = false,
        disableCDN = true,
        env = ['production'],
    }
) => {
    if (
        !widgetId ||
        !runOnEnvs({ env: env, nodeEnv: process.env.NODE_ENV }) ||
        isDisabledAgainstPath({ pathName: pathName, options: disable })
    ) {
        return null
    }

    const setComponents = head ? setHeadComponents : setPostBodyComponents

    return setComponents([
        <React.Fragment key={`gatsby-plugin-arc`}>
            <script
                async
                src={`https://arc.io/widget.js#${widgetId}?CDN=${isDisabledAgainstPath(
                    {
                        pathName: pathName,
                        options: disableCDN,
                    }
                )}`}
            />
        </React.Fragment>,
    ])
}

const runOnEnvs = ({ env, nodeEnv }) => {
    if (typeof env !== `undefined`) {
        if (env.includes(nodeEnv)) {
            return true
        }
    }
    return false
}

const isDisabledAgainstPath = ({ pathName, options }) => {
    if (options !== `undefined`) {
        if (Array.isArray(options)) {
            let outcome = false
            options.forEach(option => {
                if (minimatch(pathName, option)) {
                    outcome = true
                }
            })
            return outcome
        }

        if (typeof options === `boolean`) {
            // If set to true, disable all
            if (options) {
                return true
            }
        }

        return false
    }

    return false
}
