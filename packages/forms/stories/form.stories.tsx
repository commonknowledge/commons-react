/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */

import { jsx, Input } from "theme-ui";
import { Meta } from "@storybook/react/types-6-0";
import { Form, FormSubmit, FormItem } from "@commonknowledge/common-forms";
import { object } from "yup";
import { rowSpacing } from "@commonknowledge/common-ui";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const Basic = () => (
  <Form sx={{ ...rowSpacing("3") }} schema={object()} onSubmit={wait}>
    <FormItem label="First Item" name="field1">
      <Input />
    </FormItem>
    <FormItem label="Second Item" name="field2">
      <Input />
    </FormItem>
    <FormSubmit>Submit</FormSubmit>
  </Form>
);

export const WithHelpText = () => (
  <Form sx={{ ...rowSpacing("3") }} schema={object()} onSubmit={wait}>
    <FormItem
      label="First Item"
      helpText="This is a thing you need to tell us"
      name="field1"
    >
      <Input />
    </FormItem>
    <FormItem
      label="Second Item"
      helpText="This is also a thing you need to tell us"
      name="field2"
    >
      <Input />
    </FormItem>
    <FormSubmit>Submit</FormSubmit>
  </Form>
);

export const WithErrors = () => {
  const form = useForm();
  useEffect(() => {
    form.setError("field1", {
      type: "manual",
      message: "You did something wrong there, chief",
    });
  }, []);

  return (
    <Form sx={{ ...rowSpacing("3") }} form={form} onSubmit={wait}>
      <FormItem
        label="First Item"
        helpText="This is a thing you need to tell us"
        name="field1"
      >
        <Input />
      </FormItem>
      <FormItem
        label="Second Item"
        helpText="This is also a thing you need to tell us"
        name="field2"
      >
        <Input />
      </FormItem>
      <FormSubmit>Submit</FormSubmit>
    </Form>
  );
};

const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 2000));

export default {
  title: "common-forms/Form",
  component: Form,
} as Meta;
