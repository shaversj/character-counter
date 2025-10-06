import type { LetterAggregateData } from "@/types/types.ts";

import ChevronDownIcon from "@/components/ChevronDownIcon.tsx";
import ChevronUpIcon from "@/components/ChevronUpIcon.tsx";

type LetterDensityToggleProps = {
  data: LetterAggregateData;
  setShowMore: (showMore: boolean) => void;
  showMore: boolean;
};

export default function LetterDensityToggle({
  data,
  setShowMore,
  showMore,
}: LetterDensityToggleProps) {
  if (data.rows.length === 0) {
    return (
      <p className={"text-preset-4 pt-5 text-neutral-600 dark:text-neutral-200"}>
        No characters found. Start typing to see letter density.
      </p>
    );
  }

  return (
    <button
      className={
        "text-preset-3 flex cursor-pointer items-center gap-x-2 text-neutral-900 dark:text-neutral-200"
      }
      onClick={() => setShowMore(!showMore)}
    >
      {showMore ? (
        <>
          See less <ChevronUpIcon />
        </>
      ) : (
        <>
          See more <ChevronDownIcon />
        </>
      )}
    </button>
  );
}
