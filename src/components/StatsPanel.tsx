import { useMemo, useState } from "react";

import type { LetterAggregateData } from "@/types/types.ts";

import BackgroundCards from "@/components/BackgroundCards.tsx";
import CharLimitWarningIcon from "@/components/CharLimitWarningIcon.tsx";
import Chart from "@/components/Chart.tsx";
import CheckboxWithLabel from "@/components/CheckboxWithLabel.tsx";
import LetterDensityToggle from "@/components/LetterDensityToggle.tsx";
import { aggregateLetters } from "@/util/util.ts";

type StatsPanelProps = {
  charLimitExceeded?: boolean;
  data: string;
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
        excludeSpaces,
        othersLabel: "Others",
        showOthers: showMore,
        topK: showMore ? 26 : 5,
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
          label={"Exclude Spaces"}
          setEnabled={setExcludeSpaces}
        />
        <CheckboxWithLabel
          enabled={hasCharLimit}
          label={"Set Character Limit"}
          limit={charLimit}
          setEnabled={setHasCharLimit}
          setLimit={setCharLimit}
        />
      </div>

      <BackgroundCards data={agData} excludeSpaces={excludeSpaces} />
      <section className={"h-auto"}>
        <p className={"text-preset-2 pt-6 text-neutral-900 dark:text-neutral-200"}>
          Letter Density
        </p>
        <Chart data={agData} showMore={showMore} />
        <LetterDensityToggle data={agData} setShowMore={setShowMore} showMore={showMore} />
      </section>
    </div>
  );
}
