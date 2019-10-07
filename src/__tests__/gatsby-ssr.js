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
        const pathName = "/path";
        const setHeadComponents = jest.fn();
        const setPostBodyComponents = jest.fn();

        options = Object.assign({}, options);

        onRenderBody(
          { pathName, setHeadComponents, setPostBodyComponents },
          options
        );

        return {
          pathName,
          setHeadComponents,
          setPostBodyComponents
        };
      };

      // widgetId, disable, env, phrase, assert
      const cases = [
        [1, null, false, ["staging"], " not", "not.toHaveBeenCalled"],
        [2, null, false, ["production"], " not", "not.toHaveBeenCalled"],
        [3, null, true, ["staging"], " not", "not.toHaveBeenCalled"],
        [4, null, true, ["production"], " not", "not.toHaveBeenCalled"],
        [5, null, ["/path"], ["staging"], "not", "not.toHaveBeenCalled"],
        [6, null, ["/path"], ["production"], " not", "not.toHaveBeenCalled"],
        [7, null, ["/stop"], ["staging"], " not", "not.toHaveBeenCalled"],
        [8, null, ["/stop"], ["production"], " not", "not.toHaveBeenCalled"],
        [9, "id", false, ["staging"], " not", "not.toHaveBeenCalled"],
        [10, "id", false, ["production"], "", "toHaveBeenCalled"],
        [11, "id", true, ["staging"], " not", "not.toHaveBeenCalled"],
        [12, "id", true, ["production"], " not", "not.toHaveBeenCalled"],
        [13, "id", ["/path"], ["staging"], " not", "not.toHaveBeenCalled"],
        [14, "id", ["/path"], ["production"], "", "toHaveBeenCalled(1)"],
        [15, "id", ["/stop"], ["staging"], " not", "not.toHaveBeenCalled"],
        [16, "id", ["/stop"], ["production"], " not", "not.toHaveBeenCalled"]
      ];

      describe(`all essential loading option cases`, () => {
        test.each(cases)(
          `%p: Using id: %s, disable: %s, and env: %s the script should%s be set`,
          (count, id, disable, env, note, assert) => {
            const {
              pathName,
              setHeadComponents,
              setPostBodyComponents
            } = setup({
              widgetId: id,
              disable: disable,
              env: env
            });

            expect(setHeadComponents)[assert];
          }
        );
      });
    });
  });
});
