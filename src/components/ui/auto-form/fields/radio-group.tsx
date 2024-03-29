import z from "zod";

import { FormControl, FormItem, FormLabel, FormMessage } from "../../form";
import { RadioGroup, RadioGroupItem } from "../../radio-group";
import { AutoFormInputComponentProps as AutoFormInputComponentProperties } from "../types";

export default function AutoFormRadioGroup({
  label,
  isRequired,
  field,
  zodItem,
  fieldProps,
}: AutoFormInputComponentProperties) {
  const values = (zodItem as unknown as z.ZodEnum<any>)._def.values;

  return (
    <FormItem className="space-y-3">
      <FormLabel>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
      <FormControl>
        <RadioGroup
          className="flex flex-col space-y-1"
          defaultValue={field.value}
          onValueChange={field.onChange}
          {...fieldProps}
        >
          {values.map((value: any) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={value}
            >
              <FormControl>
                <RadioGroupItem value={value} />
              </FormControl>
              <FormLabel className="font-normal">{value}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
