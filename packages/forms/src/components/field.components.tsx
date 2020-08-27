import { forwardRef, ReactNode, ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { jsx, Grid, GridProps, Button } from "theme-ui";

interface ToggleGridProps<T = {}> extends Omit<GridProps, "ref"> {
  name?: string;
  options: SelectOption<T>[];
  buttonVariant?: string;
  getKey?: (x: T) => string | number;
  format?: (opt: SelectOption<T>) => ReactNode;
}

interface SelectOption<T> {
  value: T;
  label?: ReactNode;
}

type ToggleGridComponent = <T>(props: ToggleGridProps<T>) => ReactElement;

export const ToggleGrid = forwardRef<any, ToggleGridProps<any>>(
  (
    {
      name,
      variant = "grid",
      buttonVariant = "toggle",
      getKey = String,
      options,
      format = (x) => x.label || String(x.value),
      ...props
    },
    ref
  ) => {
    if (!name) {
      throw TypeError("<ToggleGrid /> must have its name prop set");
    }

    return (
      <Controller
        name={name}
        render={({ onChange, value }) => {
          return (
            <Grid variant={"forms." + variant} {...props}>
              {options.map((option) => (
                <Button
                  key={getKey(option.value)}
                  variant={
                    getKey(option.value) === getKey(value)
                      ? buttonVariant + "Active"
                      : buttonVariant
                  }
                  onClick={() => {
                    onChange(option.value);
                  }}
                >
                  {format(option)}
                </Button>
              ))}
            </Grid>
          );
        }}
      />
    );
  }
) as ToggleGridComponent;
