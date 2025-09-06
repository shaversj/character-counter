import { createFileRoute } from "@tanstack/react-router";
import darkLogo from "../assets/images/logo-dark-theme.svg";
import lightLogo from "../assets/images/logo-light-theme.svg";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import { useState } from "react";
import CustomEditor from "@/components/CustomEditor.tsx";
import type { ContentEditableEvent } from "react-simple-wysiwyg";
import Chart from "@/components/Chart.tsx";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [html, setHtml] = useState("");

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

  function onChange(event: ContentEditableEvent) {
    setHtml(event.target.value);
  }

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  return (
    <div className="min-h-screen bg-white px-[clamp(16px,calc(16px+16*((100vw-375px)/393)),32px)] antialiased min-[768px]:px-[clamp(32px,calc(32px+193*((100vw-768px)/672)),225px)] min-[1440px]:px-[225px] dark:bg-neutral-900">
      <header className={"flex pt-[34px]"}>
        <img
          src={isDarkModeEnabled ? darkLogo : lightLogo}
          className="h-[30px] md:h-10"
          alt="logo"
        />
        <button
          onClick={toggleDarkMode}
          className={
            "ml-auto grid size-[32px] place-items-center rounded-sm bg-neutral-100 md:size-[44px] md:rounded-md dark:bg-neutral-700"
          }
        >
          <img src={isDarkModeEnabled ? sun : moon} alt="Dark Mode Toggle" className={""} />
        </button>
      </header>

      <main>
        <div className={"grid place-items-center pt-12"}>
          <h1
            className={
              "text-preset-1 w-[clamp(343px,calc(343px+167*((100vw-375px)/393)),510px)] text-center text-[#12131A] min-[768px]:w-[510px] dark:text-neutral-100"
            }
          >
            Analyze your text in real-time.
          </h1>
        </div>

        <CustomEditor value={html} onChange={onChange} />

        <div className={"flex w-full flex-col gap-x-4 gap-y-4 md:flex-row"}>
          {backgrounds.map((background) => (
            <div
              className={`flex h-[clamp(130px,calc(130px+20*((100vw-375px)/393)),150px)] w-full flex-col justify-center rounded-lg bg-[calc(125%+70*((100vw-375px)/393))] bg-no-repeat px-3 min-[768px]:bg-[calc(195%-77*((100vw-768px)/672))] min-[1440px]:bg-[118%] ${background.color} ${background.image}`}
            >
              <p className={"text-preset-1 text-neutral-900"}>278</p>
              <p className={"text-preset-3 pt-[5px] text-neutral-900"}>Total Characters</p>
            </div>
          ))}
        </div>

        <div className={"h-[252px]"}>
          <p className={"text-preset-2 pt-6 text-neutral-900"}>Letter Density</p>
          <Chart data={html} topK={19} showOthers othersLabel="Others" />
        </div>
      </main>
    </div>
  );
}
