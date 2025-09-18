import ChevronUp from "@/components/ChevronUp.tsx";
import ChevronDown from "@/components/ChevronDown.tsx";
import type { LetterAggregateData } from "@/types/types.ts";

type LetterDensityToggleProps = {
  data: LetterAggregateData;
  showMore: boolean;
  setShowMore: (showMore: boolean) => void;
};

export default function LetterDensityToggle({
  data,
  showMore,
  setShowMore,
}: LetterDensityToggleProps) {
  if (data.rows.length === 0) {
    return (
      <p className={"text-preset-4 pt-5 text-neutral-600"}>
        No characters found. Start typing to see letter density.
      </p>
    );
  }

  return (
    <button
      className={"flex cursor-pointer items-center gap-x-2"}
      onClick={() => setShowMore(!showMore)}
    >
      {showMore ? (
        <>
          See less <ChevronUp />
        </>
      ) : (
        <>
          See more <ChevronDown />
        </>
      )}
    </button>
  );
}
