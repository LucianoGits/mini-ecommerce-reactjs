import React from "react";
import { Group, FormInput, FormInputLabel } from "./form-input.styles";
function FormInputComponent({ label, ...otherProps }) {
  return (
    <Group>
      <FormInput {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}

export default FormInputComponent;
