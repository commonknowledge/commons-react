import glob from "glob";
import { startCase } from "lodash";
import { render } from "@testing-library/react";
import { createElement, ComponentType } from "react";

const { stories: storyPatterns } = require("../.storybook/main");

for (const pattern of storyPatterns) {
  const files = glob.sync(pattern, {
    cwd: "./.stories",
  });

  for (const storyFile of files) {
    const {
      default: { title },
      ...stories
    } = require(storyFile);

    describe(title, () => {
      for (const [name, Story] of Object.entries<ComponentType>(stories)) {
        it(`${startCase(name)} renders without raising`, () => {
          render(createElement(Story));
        });
      }
    });
  }
}
