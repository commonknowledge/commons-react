import { FC } from "react";
import {
  jsx,
  ButtonProps,
  Box,
  Spinner,
  Button,
  BoxProps,
  SpinnerProps,
} from "theme-ui";
import { useFormContext } from "react-hook-form";

interface FormSubmitProps extends ButtonProps {
  containerProps?: BoxProps;
  spinnerProps?: Omit<SpinnerProps, "ref">;
}

export const FormSubmit: FC<FormSubmitProps> = ({
  disabled,
  spinnerProps = {},
  containerProps = {},
  ...props
}) => {
  const form = useFormContext();
  const disableWhenInvalid =
    form.control.mode.isOnBlur || form.control.mode.isOnChange;

  return (
    <Box
      {...containerProps}
      sx={{
        position: "relative",
        ...containerProps.sx,
      }}
    >
      {form.formState.isSubmitting && (
        <Spinner
          {...spinnerProps}
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex: -1,
            transform: "translate(-50%, -50%)",
            height: "100%",
            ...spinnerProps.sx,
          }}
        />
      )}
      <Button
        sx={{
          ...(form.formState.isSubmitting
            ? { opacity: 0, "&:hover": { opacity: 0 } }
            : {}),
        }}
        type="submit"
        disabled={disabled || (disableWhenInvalid && !form.formState.isValid)}
        {...props}
      />
    </Box>
  );
};
