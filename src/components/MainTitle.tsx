export default function MainTitle() {
  return (
    <div className={"grid place-items-center pt-12"}>
      <h1
        className={
          "text-preset-1 w-[clamp(343px,calc(343px+167*((100vw-375px)/393)),510px)] text-center text-[#12131A] min-[768px]:w-[510px] dark:text-neutral-100"
        }
      >
        Analyze your text in real-time.
      </h1>
    </div>
  );
}
