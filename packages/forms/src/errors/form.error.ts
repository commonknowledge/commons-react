import { FieldError } from "react-hook-form";

interface FormFieldError {
  field: string;
  type?: string;
  message?: string;
}

export class FormError {
  readonly fieldErrors: FormFieldError[];

  constructor(...errors: FormFieldError[]) {
    this.fieldErrors = errors;
  }
}
