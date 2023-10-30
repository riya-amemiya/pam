import { Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/stories/atoms/Button";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
import { Separator } from "../../separator";
import { beautifyObjectName } from "../utils";

import AutoFormObject from "./object";

export default function AutoFormArray({
  name,
  item,
  form,
  path = [],
}: {
  name: string;
  item: z.ZodArray<any>;
  form: ReturnType<typeof useForm>;
  path?: string[];
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });
  const title = item._def.description ?? beautifyObjectName(name);

  return (
    <AccordionItem value={name}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="border-l p-3 pl-6">
        {fields.map((_field, index) => {
          const key = [...path, index.toString()].join(".");
          return (
            <div className="mb-4 grid gap-6" key={`${key}`}>
              <AutoFormObject
                form={form}
                path={[...path, index.toString()]}
                schema={item._def.type as z.ZodObject<any, any>}
              />
              <Button
                onClick={() => remove(index)}
                size="icon"
                type="button"
                variant="secondary"
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Separator />
            </div>
          );
        })}
        <Button
          className="flex items-center"
          onClick={() => append({})}
          type="button"
        >
          <Plus className="mr-2" size={16} />
          Add
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
