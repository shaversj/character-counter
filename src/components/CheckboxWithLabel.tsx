import { Checkbox } from "@headlessui/react";
import clsx from "clsx";
import * as React from "react";

type CheckboxWithLabelProps = {
  enabled: boolean;
  label: string;
  limit?: number;
  setEnabled: (enabled: boolean) => void;
  setLimit?: (limit: number) => void;
};

export default function CheckboxWithLabel({
  enabled,
  label,
  limit,
  setEnabled,
  setLimit,
}: CheckboxWithLabelProps) {
  return (
    <div className={"flex items-center gap-x-2.5 pt-4"}>
      <Checkbox
        checked={enabled}
        className={clsx(
          "group",
          "grid",
          "size-4",
          "place-items-center",
          "cursor-pointer",
          "rounded",
          "border",
          "bg-white",
          "data-[checked]:border-none",
          "data-[checked]:bg-[#d3a0fa]",
        )}
        onChange={setEnabled}
      >
        <svg
          className="stroke-black opacity-0 group-data-checked:opacity-100"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path d="M3 8L6 11L11 3.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      </Checkbox>
      <span className={"text-preset-4 text-neutral-900 dark:text-neutral-200"}>{label}</span>

      {label === "Set Character Limit" && enabled && limit && setLimit && (
        <input
          aria-label="Character Limit"
          className={clsx(
            "text-preset-4",
            "w-[60px]",
            "rounded",
            "border",
            "border-neutral-300",
            "bg-white",
            "px-3",
            "text-neutral-900",
            "outline-none",
            "focus:border-[#d3a0fa]",
            "focus:ring-1",
            "focus:ring-[#d3a0fa]",
            "dark:bg-neutral-800",
            "dark:text-neutral-100",
            "dark:focus:border-[#d3a0fa]",
            "dark:focus:ring-[#d3a0fa]",
            "[&::-webkit-inner-spin-button]:appearance-none",
          )}
          defaultValue={limit}
          max={10000}
          min={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              setLimit(value);
            }
          }}
          type="number"
        />
      )}
    </div>
  );
}
