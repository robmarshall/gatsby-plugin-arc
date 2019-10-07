import React from "react";
import renderer from "react-test-renderer";
import { onRenderBody } from "../gatsby-ssr";

describe(`gatsby-plugin-arc`, () => {
  describe(`gatsby-ssr`, () => {
    describe(`onRenderBody`, () => {
      let env;

      beforeAll(() => {
        env = process.env.NODE_ENV;
        process.env.NODE_ENV = `production`;
      });

      afterAll(() => {
        process.env.NODE_ENV = env;
      });

      const setup = options => {
        const pathname = "/pathexample";
        const setHeadComponents = jest.fn();
        const setPostBodyComponents = jest.fn();

        options = Object.assign({}, options);

        onRenderBody(
          { pathname, setHeadComponents, setPostBodyComponents },
          options
        );

        return {
          pathname,
          setHeadComponents,
          setPostBodyComponents
        };
      };

      // widgetId, disable, env, phrase, assert
      const cases = [
        ["", "false", ["staging"], "not", "not.toHaveBeenCalled"],
        ["", "false", ["production"], "not", "not.toHaveBeenCalled"],
        ["", "true", ["staging"], "not", "not.toHaveBeenCalled"],
        ["", "true", ["production"], "not", "not.toHaveBeenCalled"],
        ["", ["/pathexample"], ["staging"], "not", "not.toHaveBeenCalled"],
        ["", ["/pathexample"], ["production"], "not", "not.toHaveBeenCalled"],
        ["", ["/notallowed"], ["staging"], "not", "not.toHaveBeenCalled"],
        ["", ["/notallowed"], ["production"], "not", "not.toHaveBeenCalled"],
        ["id", "false", ["staging"], "not", "not.toHaveBeenCalled"],
        ["id", "false", ["production"], "", "toHaveBeenCalled"],
        ["id", "true", ["staging"], "not", "not.toHaveBeenCalled"],
        ["id", "true", ["production"], "not", "not.toHaveBeenCalled"],
        ["id", ["/pathexample"], ["staging"], "not", "not.toHaveBeenCalled"],
        ["id", ["/pathexample"], ["production"], "", "toHaveBeenCalled"],
        ["id", ["/notallowed"], ["staging"], "not", "not.toHaveBeenCalled"],
        ["id", ["/notallowed"], ["production"], "not", "not.toHaveBeenCalled"]
      ];

      describe(`all essential loading option cases`, () => {
        test.each(cases)(
          `Using id: %s, disable: %s, and env: %s the script should%s be set`,
          (id, disable, env, note, assert)
        );

        const { pathname, setHeadComponents, setPostBodyComponents } = setup({
          widgetId: id,
          disable: disable,
          env: env
        });

        expect(setHeadComponents)[assert];
      });

      // describe(`if env enabled`, () => {
      //
      //   it(`sets tracking script in head`, () => {
      //     const { setHeadComponents, setPostBodyComponents } = setup({
      //       head: true,
      //     })
      //
      //     expect(setHeadComponents).toHaveBeenCalledTimes(2)
      //     expect(setPostBodyComponents).not.toHaveBeenCalled()
      //   })
      //
      //   it(`sets trackingId`, () => {
      //     const { setPostBodyComponents } = setup({
      //       trackingId: `TEST_TRACKING_ID`,
      //     })
      //
      //     const result = JSON.stringify(setPostBodyComponents.mock.calls[0][0])
      //
      //     expect(result).toMatch(/TEST_TRACKING_ID/)
      //   })
      //
      //   it(`sets excluded paths`, () => {
      //     const { setPostBodyComponents } = setup({
      //       exclude: [`/some-path`],
      //     })
      //
      //     const result = JSON.stringify(setPostBodyComponents.mock.calls[0][0])
      //
      //     expect(result).toMatch(/excludeGAPaths/)
      //   })
      //
      // })
    });
  });
});
