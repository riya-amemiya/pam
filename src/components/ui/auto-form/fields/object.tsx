import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
import { FormField } from "../../form";
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from "../config";
import { FieldConfig, FieldConfigItem } from "../types";
import {
  beautifyObjectName,
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from "../utils";

import AutoFormArray from "./array";

function DefaultParent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function AutoFormObject<
  SchemaType extends z.ZodObject<any, any>,
>({
  schema,
  form,
  fieldConfig,
  path = [],
}: {
  schema: SchemaType | z.ZodEffects<SchemaType>;
  form: ReturnType<typeof useForm>;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  path?: string[];
}) {
  const { shape } = getBaseSchema<SchemaType>(schema);

  return (
    <Accordion className="space-y-5" type="multiple">
      {Object.keys(shape).map((name) => {
        const item = shape[name] as z.ZodAny;
        const zodBaseType = getBaseType(item);
        const itemName = item._def.description ?? beautifyObjectName(name);
        const key = [...path, name].join(".");

        if (zodBaseType === "ZodObject") {
          return (
            <AccordionItem key={key} value={name}>
              <AccordionTrigger>{itemName}</AccordionTrigger>
              <AccordionContent className="p-2">
                <AutoFormObject
                  fieldConfig={
                    (fieldConfig?.[name] ?? {}) as FieldConfig<
                      z.infer<typeof item>
                    >
                  }
                  form={form}
                  path={[...path, name]}
                  schema={item as unknown as z.ZodObject<any, any>}
                />
              </AccordionContent>
            </AccordionItem>
          );
        }
        if (zodBaseType === "ZodArray") {
          return (
            <AutoFormArray
              form={form}
              item={item as unknown as z.ZodArray<any>}
              key={key}
              name={name}
              path={[...path, name]}
            />
          );
        }

        const fieldConfigItem: FieldConfigItem = fieldConfig?.[name] ?? {};
        const zodInputProps = zodToHtmlInputProps(item);
        const isRequired =
          zodInputProps.required ||
          fieldConfigItem.inputProps?.required ||
          false;

        return (
          <FormField
            control={form.control}
            key={key}
            name={key}
            render={({ field }) => {
              const inputType =
                fieldConfigItem.fieldType ??
                DEFAULT_ZOD_HANDLERS[zodBaseType] ??
                "fallback";

              const InputComponent =
                typeof inputType === "function"
                  ? inputType
                  : INPUT_COMPONENTS[inputType];
              const ParentElement =
                fieldConfigItem.renderParent ?? DefaultParent;

              return (
                <ParentElement key={`${key}.parent`}>
                  <InputComponent
                    field={field}
                    fieldConfigItem={fieldConfigItem}
                    fieldProps={{
                      ...zodInputProps,
                      ...field,
                      ...fieldConfigItem.inputProps,
                      value: !fieldConfigItem.inputProps?.defaultValue
                        ? field.value ?? ""
                        : undefined,
                    }}
                    isRequired={isRequired}
                    label={itemName}
                    zodInputProps={zodInputProps}
                    zodItem={item}
                  />
                </ParentElement>
              );
            }}
          />
        );
      })}
    </Accordion>
  );
}
