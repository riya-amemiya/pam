import { AutoFormInputComponentProps as AutoFormInputComponentProperties } from "../types";

import AutoFormInput from "./input";

export default function AutoFormNumber({
  fieldProps,
  ...properties
}: AutoFormInputComponentProperties) {
  return (
    <AutoFormInput
      fieldProps={{
        type: "number",
        ...fieldProps,
      }}
      {...properties}
    />
  );
}
