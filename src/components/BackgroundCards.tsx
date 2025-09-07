const backgrounds = [
  {
    color: "bg-[#d3a0fa]",
    image: "bg-[url('./assets/images/pattern-character-count.svg')]",
  },
  {
    color: "bg-[#ff9f01]",
    image: "bg-[url('./assets/images/pattern-word-count.svg')]",
  },
  {
    color: "bg-[#fe8159]",
    image: "bg-[url('./assets/images/pattern-sentence-count.svg')]",
  },
];

export default function BackgroundCards() {
  return (
    <div className={"flex w-full flex-col gap-x-4 gap-y-4 md:flex-row"}>
      {backgrounds.map((background, idx) => (
        <div
          key={idx}
          className={`flex h-[clamp(130px,calc(130px+20*((100vw-375px)/393)),150px)] w-full flex-col justify-center rounded-lg bg-[calc(125%+70*((100vw-375px)/393))] bg-no-repeat px-3 min-[768px]:bg-[calc(195%-77*((100vw-768px)/672))] min-[1440px]:bg-[118%] ${background.color} ${background.image}`}
        >
          <p className={"text-preset-1 text-neutral-900"}>278</p>
          <p className={"text-preset-3 pt-[5px] text-neutral-900"}>Total Characters</p>
        </div>
      ))}
    </div>
  );
}
