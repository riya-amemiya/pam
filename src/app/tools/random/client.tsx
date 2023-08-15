"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { random } from "umt/module/Math/random";

export default function ToolsRandomClient() {
  const [value, setValue] = useState(0);
  const [max, setMax] = useState(100);
  const [min, setMin] = useState(0);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-1/2"
    >
      <div className="space-y-1">
        <Label>最大値</Label>
        <Input
          value={max}
          onChange={(e) => {
            setMax(Number(e.target.value));
          }}
          type="number"
          min={min}
        />
      </div>
      <div className="space-y-1">
        <Label>最小値</Label>
        <Input
          value={min}
          onChange={(e) => {
            setMin(Number(e.target.value));
          }}
          type="number"
        />
      </div>
      <div className="space-y-1">
        <Label>乱数</Label>
        <Input readOnly={true} value={value} />
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          onClick={() => setValue(random(max, min))}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Random
        </Button>
      </div>
    </form>
  );
}
