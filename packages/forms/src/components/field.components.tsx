import { forwardRef, ReactNode, ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { jsx, Grid, GridProps, Button } from "theme-ui";

interface ToggleGridProps<T = {}> extends Omit<GridProps, "ref"> {
  name?: string;
  options: SelectOption<T>[];
  buttonVariant?: string;
  getKey?: (x: T) => string | number;
}

interface SelectOption<T> {
  value: T;
  label: ReactNode;
}

type ToggleGridComponent = <T>(props: ToggleGridProps<T>) => ReactElement;

export const ToggleGrid: ToggleGridComponent = ({
  name,
  buttonVariant = "toggle",
  getKey = String,
  options,
  ...props
}: ToggleGridProps<any>) => {
  console.log({ name });

  const form = useFormContext();
  if (!name) {
    throw TypeError("<ToggleGrid /> must have its name prop set");
  }

  return (
    <Controller
      name={name}
      render={({ onChange, value }) => {
        const active = getKey(form.getValues(name)) === getKey(value);

        return (
          <Grid {...props}>
            {options.map((opt) => (
              <Button
                key={getKey(opt.value)}
                variant={active ? buttonVariant + "Active" : buttonVariant}
                onClick={() => {
                  onChange(value);
                }}
              >
                {opt.label}
              </Button>
            ))}
          </Grid>
        );
      }}
    />
  );
};
