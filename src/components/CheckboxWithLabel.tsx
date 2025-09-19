import { Checkbox } from "@headlessui/react";

type CheckboxWithLabelProps = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  label: string;
};

export default function CheckboxWithLabel({ enabled, setEnabled, label }: CheckboxWithLabelProps) {
  return (
    <div className={"flex items-center gap-x-2.5 pt-4"}>
      <Checkbox
        checked={enabled}
        onChange={setEnabled}
        className="group block size-4 cursor-pointer rounded border bg-white data-checked:border-none data-checked:bg-[#d3a0fa]"
      >
        <svg
          className="stroke-black opacity-0 group-data-checked:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Checkbox>
      <span className={"text-preset-4 text-neutral-900"}>{label}</span>
    </div>
  );
}
