import { FC, ReactElement, FormEventHandler } from "react";
import { jsx, BoxProps, Box } from "theme-ui";
import { UseFormMethods, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import {
  UnpackNestedValue,
  UseFormOptions,
  ErrorOption,
} from "react-hook-form/dist/types/form";
import { Schema } from "yup";

import { FormError } from "../errors/form.error";

interface FormPropsBase<T> extends Omit<BoxProps, "onSubmit"> {
  onSubmit: (values: NonNullable<UnpackNestedValue<T>>) => Promise<void>;
}

export interface FormPropsControlled<T> extends FormPropsBase<T> {
  form: UseFormMethods<T>;
}

export interface FormPropsUncontrolled<T>
  extends FormPropsBase<T>,
    UseFormOptions<T> {
  schema: Schema<T>;
}

type FormComponent = <T>(
  props: FormPropsUncontrolled<T> | FormPropsControlled<T>
) => ReactElement;

/**
 * Convenience wrapper around react-hook-form combining an html <form> component that:
 *    - Prevents default on onComplete for you.
 *    - Hooks into theme-ui's variant system under the 'forms' namespace (default variant: forms.form)
 *    - Injects the form into the react context so that <FormItem> and <SubmitButton> can pick it up.
 *
 * Can be used _either_:
 *    - As a controlled component by explicitly passing in the result of `useForm`.
 *    - As an uncontrolled component by passing in a Yup vaildation schema, which which will be
 *      passed into useForm for you, with some sensible default values.
 */
export const Form: FormComponent = (inProps: unknown) => {
  const {
    form,
    variant = "form",
    onSubmit,
    mode = "onBlur",
    reValidateMode,
    defaultValues,
    context,
    shouldFocusError,
    shouldUnregister,
    criteriaMode,
    schema,
    ...props
  } = inProps as FormPropsControlled<Record<string, unknown>> &
    FormPropsUncontrolled<Record<string, unknown>>;

  if (!form) {
    return (
      <FormImplicit
        variant={"forms." + variant}
        {...{
          onSubmit,
          mode,
          reValidateMode,
          defaultValues,
          context,
          shouldFocusError,
          shouldUnregister,
          criteriaMode,
          schema,
          ...props,
        }}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <Box
        variant={"forms." + variant}
        as="form"
        onSubmit={handleSubmit(form, onSubmit)}
        {...props}
      />
    </FormProvider>
  );
};

const FormImplicit: FC<FormPropsUncontrolled<Record<string, unknown>>> = ({
  mode,
  reValidateMode,
  context,
  shouldFocusError,
  defaultValues,
  shouldUnregister,
  criteriaMode,
  onSubmit,
  schema,
  ...props
}) => {
  const form = useForm({
    mode,
    reValidateMode,
    defaultValues,
    context,
    shouldFocusError,
    shouldUnregister,
    criteriaMode,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <Box as="form" onSubmit={handleSubmit(form, onSubmit)} {...props} />
    </FormProvider>
  );
};

const handleSubmit = (
  form: UseFormMethods,
  submit: (x: Record<string, unknown>) => Promise<void>
): FormEventHandler => async () => {
  try {
    await form.handleSubmit(submit)();
  } catch (error) {
    if (error instanceof FormError) {
      error.fieldErrors.forEach(({ field, ...info }) => {
        form.setError(field, info as ErrorOption);
      });
    }
  }
};
