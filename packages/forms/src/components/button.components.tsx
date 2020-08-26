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

  return (
    <Box
      {...containerProps}
      sx={{
        position: "relative",
        ...containerProps.sx,
      }}
    >
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
      <Button
        sx={{ opacity: form.formState.isSubmitting ? 0 : 1 }}
        type="submit"
        disabled={disabled || form.formState.isSubmitting}
        {...props}
      />
    </Box>
  );
};
