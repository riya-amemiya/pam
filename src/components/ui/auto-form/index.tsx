"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/stories/atoms/Button";

import { Form } from "../form";

import AutoFormObject from "./fields/object";
import { FieldConfig } from "./types";
import {
  ZodObjectOrWrapped,
  getDefaultValues,
  getObjectFormSchema,
} from "./utils";

export function AutoFormSubmit({
  children,
  type = "submit",
}: { children?: React.ReactNode; type?: "button" | "reset" | "submit" }) {
  return <Button type={type}>{children ?? "Submit"}</Button>;
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
  action,
  method,
}: {
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?: React.ReactNode;
  className?: string;
  action?: string;
  method?: string;
}) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> =
    getDefaultValues(objectFormSchema);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: valuesProp,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }

  return (
    <Form {...form}>
      <form
        action={action}
        className={cn("space-y-5", className)}
        method={method}
        onChange={() => {
          const values = form.getValues();
          onValuesChangeProp?.(values);
          const parsedValues = formSchema.safeParse(values);
          if (parsedValues.success) {
            onParsedValuesChange?.(parsedValues.data);
          }
        }}
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <AutoFormObject
          fieldConfig={fieldConfig}
          form={form}
          schema={objectFormSchema}
        />

        {children}
      </form>
    </Form>
  );
}

export default AutoForm;
