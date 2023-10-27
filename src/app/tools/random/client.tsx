"use client";

import { useState } from "react";
import { random } from "umt/module/Math/random";

import { Label } from "@/components/ui/label";
import { Button } from "@/stories/atoms/Button";
import { Input } from "@/stories/atoms/Input";

export default function ToolsRandomClient() {
  const [value, setValue] = useState(0);
  const [max, setMax] = useState(100);
  const [min, setMin] = useState(0);
  return (
    <form
      className="w-1/2"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="space-y-1">
        <Label>最大値</Label>
        <Input
          min={min}
          onChange={(event) => {
            setMax(Number(event.target.value));
          }}
          type="number"
          value={max}
        />
      </div>
      <div className="space-y-1">
        <Label>最小値</Label>
        <Input
          onChange={(event) => {
            setMin(Number(event.target.value));
          }}
          type="number"
          value={min}
        />
      </div>
      <div className="space-y-1">
        <Label>乱数</Label>
        <Input readOnly={true} value={value} />
      </div>
      <div className="mt-2">
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          onClick={() => setValue(random(max, min))}
          type="submit"
        >
          Random
        </Button>
      </div>
    </form>
  );
}
