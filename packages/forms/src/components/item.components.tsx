import { useFormContext } from "react-hook-form";
import { FC, ReactElement, ComponentType, cloneElement, useMemo } from "react";
import { BoxProps, Box, Label, LabelProps, Checkbox, jsx } from "theme-ui";
import { uniqueId } from "lodash";

interface FieldProps {
  name: string;
  variant?: string;
  label?: string;
  children?: ReactElement<
    unknown,
    ComponentType<{ name?: string; disabled?: boolean }>
  >;
}

export const FormItem: FC<FieldProps & BoxProps> = ({
  variant = "item",
  label,
  children,
  name,
  ...props
}) => {
  const form = useFormContext();
  const id = useMemo(() => uniqueId(name), []);

  return (
    <Box variant={variant && "forms." + variant} {...props}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children &&
        cloneElement(children, {
          name,
          id,
          disabled: form.formState.isSubmitting || children.props.disabled,
          ref: form.register,
        })}
    </Box>
  );
};

export const CheckboxFormItem: FC<
  Omit<FieldProps, "children"> & Omit<LabelProps, "ref">
> = ({ variant = "item", label, name, ...props }) => {
  const form = useFormContext();

  return (
    <Label variant={variant && "forms." + variant} {...props}>
      {label && <Label>{label}</Label>}

      <Checkbox ref={form.register} name={name} />
    </Label>
  );
};
