import { FC, ReactElement, useEffect } from "react";
import { jsx, BoxProps, Box, Field } from "theme-ui";
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

export interface FormPropsExplicit<T> extends FormPropsBase<T> {
  form: UseFormMethods<T>;
}

export interface FormPropsImplicit<T>
  extends FormPropsBase<T>,
    UseFormOptions<T> {
  schema: Schema<T>;
}

type FormComponent = <T>(
  props: FormPropsImplicit<T> | FormPropsExplicit<T>
) => ReactElement;

export const Form: FormComponent = (inProps: any) => {
  const {
    form,
    variant = "form",
    onSubmit,
    mode,
    reValidateMode,
    context,
    shouldFocusError,
    shouldUnregister,
    criteriaMode,
    schema,
    ...props
  } = inProps as FormPropsExplicit<any> & FormPropsImplicit<any>;

  if (!form) {
    return (
      <FormImplicit
        variant={"form." + variant}
        {...{
          onSubmit,
          mode,
          reValidateMode,
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
        variant={"form." + variant}
        as="form"
        onSubmit={handleSubmit(form, onSubmit)}
        {...props}
      />
    </FormProvider>
  );
};

const FormImplicit: FC<FormPropsImplicit<any>> = ({
  mode,
  reValidateMode,
  context,
  shouldFocusError,
  shouldUnregister,
  criteriaMode,
  onSubmit,
  schema,
  ...props
}) => {
  const form = useForm({
    mode,
    reValidateMode,
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
  submit: (x: any) => Promise<void>
) => async (data: any) => {
  try {
    await form.handleSubmit(submit)(data);
  } catch (error) {
    if (error instanceof FormError) {
      error.fieldErrors.forEach(({ field, ...info }) => {
        form.setError(field, info as ErrorOption);
      });
    }
  }
};
