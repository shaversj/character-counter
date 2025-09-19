import Chart from "@/components/Chart.tsx";
import LetterDensityToggle from "@/components/LetterDensityToggle.tsx";
import BackgroundCards from "@/components/BackgroundCards.tsx";
import { useMemo, useState } from "react";
import { aggregateLetters } from "@/util/util.ts";
import type { LetterAggregateData } from "@/types/types.ts";
import CheckboxWithLabel from "@/components/CheckboxWithLabel.tsx";

type StatsPanelProps = {
  data: string;
};

export default function StatsPanel({ data }: StatsPanelProps) {
  const [showMore, setShowMore] = useState(false);
  const [excludeSpaces, setExcludeSpaces] = useState(false);

  const agData: LetterAggregateData = useMemo(
    () =>
      aggregateLetters(data, {
        topK: showMore ? 26 : 5,
        showOthers: showMore,
        othersLabel: "Others",
        excludeSpaces,
      }),
    [data, showMore, excludeSpaces],
  );

  return (
    <div>
      <CheckboxWithLabel
        enabled={excludeSpaces}
        setEnabled={setExcludeSpaces}
        label={"Exclude Spaces"}
      />

      <BackgroundCards data={agData} excludeSpaces={excludeSpaces} />
      <section className={"h-[252px]"}>
        <p className={"text-preset-2 pt-6 text-neutral-900"}>Letter Density</p>
        <Chart data={agData} showMore={showMore} />
        <LetterDensityToggle data={agData} showMore={showMore} setShowMore={setShowMore} />
      </section>
    </div>
  );
}
