import Chart from "@/components/Chart.tsx";
import LetterDensityToggle from "@/components/LetterDensityToggle.tsx";
import BackgroundCards from "@/components/BackgroundCards.tsx";
import { useMemo, useState } from "react";
import { aggregateLetters } from "@/util/util.ts";
import type { LetterAggregateData } from "@/types/types.ts";
import CheckboxWithLabel from "@/components/CheckboxWithLabel.tsx";
import CharLimitWarningIcon from "@/components/CharLimitWarningIcon.tsx";

type StatsPanelProps = {
  data: string;
  charLimitExceeded?: boolean;
  setCharLimitExceeded?: (exceeded: boolean) => void;
};

export default function StatsPanel({ data, setCharLimitExceeded }: StatsPanelProps) {
  const [showMore, setShowMore] = useState(false);
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [hasCharLimit, setHasCharLimit] = useState(false);
  const [charLimit, setCharLimit] = useState(300);

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

  if (setCharLimitExceeded) {
    setCharLimitExceeded(hasCharLimit && agData.totalCount > charLimit);
  }

  return (
    <div className={"pb-16"}>
      {hasCharLimit && agData.totalCount > charLimit && (
        <div className={"flex items-center gap-x-2.5 pt-3"}>
          <CharLimitWarningIcon />
          <p className={"text-preset-4 text-orange-800"}>
            Limit reached! Your text exceeds {charLimit} characters.
          </p>
        </div>
      )}

      <div className={"flex gap-x-6"}>
        <CheckboxWithLabel
          enabled={excludeSpaces}
          setEnabled={setExcludeSpaces}
          label={"Exclude Spaces"}
        />
        <CheckboxWithLabel
          enabled={hasCharLimit}
          setEnabled={setHasCharLimit}
          limit={charLimit}
          setLimit={setCharLimit}
          label={"Set Character Limit"}
        />
      </div>

      <BackgroundCards data={agData} excludeSpaces={excludeSpaces} />
      <section className={"h-auto"}>
        <p className={"text-preset-2 pt-6 text-neutral-900 dark:text-neutral-200"}>
          Letter Density
        </p>
        <Chart data={agData} showMore={showMore} />
        <LetterDensityToggle data={agData} showMore={showMore} setShowMore={setShowMore} />
      </section>
    </div>
  );
}
