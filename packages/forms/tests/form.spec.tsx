import "@testing-library/jest-dom";

import { Form, FormItem } from "@commonknowledge/common-forms";
import { render, fireEvent, createEvent } from "@testing-library/react";
import { jsx, Input } from "theme-ui";

describe(Form, () => {
  describe("uncontrolled form", () => {
    it("should call through to onsubmit, with default prevented", () => {
      const tree = render(<Form aria-label="form" onSubmit={jest.fn()} />);
      const event = createEvent.submit(tree.getByRole("form"));
      fireEvent(tree.getByRole("form"), event);

      expect(event.defaultPrevented).toBeTruthy();
    });

    it("should render default values in child elements", () => {
      const tree = render(
        <Form defaultValues={{ me: "MyName" }} onSubmit={jest.fn()}>
          <FormItem name="me" label="Me">
            <Input />
          </FormItem>
        </Form>
      );
      const input = tree.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toEqual("MyName");
    });
  });
});
