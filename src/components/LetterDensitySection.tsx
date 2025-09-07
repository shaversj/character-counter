import Chart from "@/components/Chart.tsx";
import ChevronUp from "@/components/ChevronUp.tsx";
import ChevronDown from "@/components/ChevronDown.tsx";
import { useState } from "react";

type LetterDensitySectionProps = {
  data: string;
};

export default function LetterDensitySection({ data }: LetterDensitySectionProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className={"h-[252px]"}>
      <p className={"text-preset-2 pt-6 text-neutral-900"}>Letter Density</p>

      <Chart
        data={data}
        topK={showMore ? 26 : 5}
        showMore={showMore}
        showOthers={false}
        othersLabel="Others"
      />

      {data.length === 0 ? (
        <p className={"text-preset-4 pt-5 text-neutral-600"}>
          No characters found. Start typing to see letter density.
        </p>
      ) : (
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
      )}
    </section>
  );
}
