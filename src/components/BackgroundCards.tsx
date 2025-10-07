import clsx from "clsx";

import type { LetterAggregateData } from "@/types/types.ts";

const backgrounds = [
  {
    altText: " (no spaces)",
    color: "bg-[#d3a0fa]",
    image: "bg-[url('./assets/images/pattern-character-count.svg')]",
    text: "Total Characters",
  },
  {
    color: "bg-[#ff9f01]",
    image: "bg-[url('./assets/images/pattern-word-count.svg')]",
    text: "Word Count",
  },
  {
    color: "bg-[#fe8159]",
    image: "bg-[url('./assets/images/pattern-sentence-count.svg')]",
    text: "Sentence Count",
  },
];

type BackgroundCardsProps = {
  data: LetterAggregateData;
  excludeSpaces: boolean;
};

export default function BackgroundCards({ data, excludeSpaces }: BackgroundCardsProps) {
  // if (!data.rows || data.rows.length === 0) {
  //   return null;
  // }

  const {
    sentenceCount = 0,
    totalCount = 0,
    wordCount = 0,
  } = !data.rows || data.rows.length === 0 ? {} : data;

  const countsList = [totalCount, wordCount, sentenceCount];

  return (
    <div className={"flex w-full flex-col gap-x-4 gap-y-4 pt-12 md:flex-row"}>
      {backgrounds.map((background, idx) => (
        <div
          className={clsx(
            "flex",
            "h-[clamp(130px,calc(130px+20*((100vw-375px)/393)),150px)]",
            "w-full",
            "flex-col",
            "justify-center",
            "rounded-lg",
            "bg-[calc(125%+70*((100vw-375px)/393))]",
            "bg-no-repeat",
            "px-3",
            "min-[768px]:bg-[calc(195%-77*((100vw-768px)/672))]",
            "min-[1440px]:bg-[118%]",
            background.color,
            background.image,
          )}
          key={idx}
        >
          <p className={"text-preset-1 text-neutral-900"}>
            {String(countsList[idx]).padStart(2, "0")}
          </p>
          <p className={"text-preset-3 pt-[5px] text-neutral-900"}>
            {background.text}
            <span className={"text-preset-4 text-neutral-900"}>
              {idx === 0 && excludeSpaces && background.altText}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
