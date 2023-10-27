import { Input } from "@/stories/atoms/Input";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { AutoFormInputComponentProps as AutoFormInputComponentProperties } from "../types";

export default function AutoFormInput({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProperties) {
  const { showLabel: _showLabel, ...fieldPropertiesWithoutShowLabel } =
    fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  return (
    <FormItem>
      {showLabel && (
        <FormLabel>
          {label}
          {isRequired && <span className="text-destructive"> *</span>}
        </FormLabel>
      )}
      <FormControl>
        <Input type="text" {...fieldPropertiesWithoutShowLabel} />
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
