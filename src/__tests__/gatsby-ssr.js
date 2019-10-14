import React from 'react'
import renderer from 'react-test-renderer'
import { onRenderBody } from '../gatsby-ssr'

// widgetId, disable, env, phrase, assert
const scriptLoadCases = [
    [1, null, false, ['staging'], ' not', false],
    [2, null, false, ['production'], ' not', false],
    [3, null, true, ['staging'], ' not', false],
    [4, null, true, ['production'], ' not', false],
    [5, null, ['/path'], ['staging'], 'not', false],
    [6, null, ['/path'], ['production'], ' not', false],
    [7, null, ['/allow'], ['staging'], ' not', false],
    [8, null, ['/allow'], ['production'], ' not', false],
    [9, 'id', false, ['staging'], ' not', false],
    [10, 'id', false, ['production'], '', true],
    [11, 'id', true, ['staging'], ' not', false],
    [12, 'id', true, ['production'], ' not', false],
    [13, 'id', ['/path'], ['staging'], ' not', false],
    [14, 'id', ['/path'], ['production'], ' not', false],
    [15, 'id', ['/allow'], ['staging'], ' not', false],
    [16, 'id', ['/allow'], ['production'], '', true],
]

describe(`gatsby-plugin-arc`, () => {
    describe(`gatsby-ssr`, () => {
        describe(`onRenderBody`, () => {
            describe(`all essential loading option cases in head`, () => {
                let env

                beforeAll(() => {
                    env = process.env.NODE_ENV
                    process.env.NODE_ENV = `production`
                })

                afterAll(() => {
                    process.env.NODE_ENV = env
                })

                const setup = options => {
                    const pathName = '/path'
                    const setHeadComponents = jest.fn()
                    const setPostBodyComponents = jest.fn()

                    options = Object.assign({}, options)

                    onRenderBody(
                        { pathName, setHeadComponents, setPostBodyComponents },
                        options
                    )

                    return {
                        pathName,
                        setHeadComponents,
                        setPostBodyComponents,
                    }
                }

                test.each(scriptLoadCases)(
                    `%p: Using id: %p, disable: %s, and env: %s - The script should%s be set in head`,
                    (count, id, disable, env, note, assert) => {
                        const {
                            pathName,
                            setHeadComponents,
                            setPostBodyComponents,
                        } = setup({
                            widgetId: id,
                            disable: disable,
                            env: env,
                            head: true,
                        })

                        if (assert) {
                            expect(setHeadComponents).toHaveBeenCalled()
                            expect(setPostBodyComponents).not.toHaveBeenCalled()
                        } else {
                            expect(setHeadComponents).not.toHaveBeenCalled()
                            expect(setPostBodyComponents).not.toHaveBeenCalled()
                        }
                    }
                )
            })

            describe(`all essential loading option cases in body`, () => {
                let env

                beforeAll(() => {
                    env = process.env.NODE_ENV
                    process.env.NODE_ENV = `production`
                })

                afterAll(() => {
                    process.env.NODE_ENV = env
                })

                const setup = options => {
                    const pathName = '/path'
                    const setHeadComponents = jest.fn()
                    const setPostBodyComponents = jest.fn()

                    options = Object.assign({}, options)

                    onRenderBody(
                        { pathName, setHeadComponents, setPostBodyComponents },
                        options
                    )

                    return {
                        pathName,
                        setHeadComponents,
                        setPostBodyComponents,
                    }
                }

                test.each(scriptLoadCases)(
                    `%p: Using id: %p, disable: %s, and env: %s - The script should%s be set in body`,
                    (count, id, disable, env, note, assert) => {
                        const {
                            pathName,
                            setHeadComponents,
                            setPostBodyComponents,
                        } = setup({
                            widgetId: id,
                            disable: disable,
                            env: env,
                            head: false,
                        })

                        if (assert) {
                            expect(setHeadComponents).not.toHaveBeenCalled()
                            expect(setPostBodyComponents).toHaveBeenCalled()
                        } else {
                            expect(setHeadComponents).not.toHaveBeenCalled()
                            expect(setPostBodyComponents).not.toHaveBeenCalled()
                        }
                    }
                )
            })
        })
    })
})
