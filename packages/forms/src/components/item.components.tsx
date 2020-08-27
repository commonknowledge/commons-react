import { useFormContext } from "react-hook-form";
import { FC, ReactElement, ComponentType, cloneElement, useMemo } from "react";
import {
  BoxProps,
  Box,
  Label,
  LabelProps,
  Checkbox,
  jsx,
  Text,
} from "theme-ui";
import { uniqueId } from "lodash";

interface FormItemProps {
  name: string;
  variant?: string;
  label?: string;
  helpText?: string;
  children?: ReactElement<
    unknown,
    ComponentType<{ name?: string; disabled?: boolean }>
  >;
}

export const FormItem: FC<FormItemProps & BoxProps> = ({
  variant = "item",
  label,
  children,
  name,
  helpText,
  ...props
}) => {
  const form = useFormContext();
  const id = useMemo(() => uniqueId(name), []);
  const error = form.errors[name];

  return (
    <Box variant={variant && "forms." + variant} {...props}>
      {label && (
        <Label mb={1} htmlFor={id}>
          {label}
        </Label>
      )}
      {children &&
        cloneElement(children, {
          name,
          id,
          disabled: form.formState.isSubmitting || children.props.disabled,
          ref: form.register,
        })}
      {helpText && !error && (
        <Text mt={1} variant="helpText">
          {helpText}
        </Text>
      )}
      {error && (
        <Text mt={1} variant="error">
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export const CheckboxFormItem: FC<
  Omit<FormItemProps, "children"> & Omit<LabelProps, "ref">
> = ({ variant = "item", label, name, ...props }) => {
  const form = useFormContext();

  return (
    <Label variant={variant && "forms." + variant} {...props}>
      {label && <Label>{label}</Label>}

      <Checkbox ref={form.register} name={name} />
    </Label>
  );
};
