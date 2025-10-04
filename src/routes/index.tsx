import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import CustomEditor from "@/components/CustomEditor.tsx";
import type { ContentEditableEvent } from "react-simple-wysiwyg";
import MainTitle from "@/components/MainTitle.tsx";
import StatsPanel from "@/components/StatsPanel.tsx";
import Header from "@/components/Header.tsx";
import clsx from "clsx";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [data, setData] = useState("");
  const [charLimitExceeded, setCharLimitExceeded] = useState(false);

  function handleDataChange(event: ContentEditableEvent) {
    const cleanedData = event.target.value.replace(/<br>/g, "");
    setData(cleanedData);
  }

  return (
    <div
      className={clsx(
        "min-h-screen",
        "bg-white",
        "antialiased",
        "dark:bg-neutral-900",
        "px-[clamp(16px,calc(16px+16*((100vw-375px)/393)),32px)]",
        "min-[768px]:px-[clamp(32px,calc(32px+193*((100vw-768px)/672)),225px)]",
        "min-[1440px]:px-[225px]",
      )}
    >
      <Header />
      <main>
        <MainTitle />
        <CustomEditor
          data={data}
          onChange={handleDataChange}
          charLimitExceeded={charLimitExceeded}
        />
        <StatsPanel data={data} setCharLimitExceeded={setCharLimitExceeded} />
      </main>
    </div>
  );
}
