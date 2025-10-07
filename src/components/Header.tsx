import clsx from "clsx";
import { useState } from "react";

import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import darkLogo from "../assets/images/logo-dark-theme.svg";
import lightLogo from "../assets/images/logo-light-theme.svg";

export default function Header() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  return (
    <header className={"flex pt-[34px]"}>
      <img alt="logo" className="h-[30px] md:h-10" src={isDarkModeEnabled ? darkLogo : lightLogo} />
      <button
        className={clsx(
          "ml-auto",
          "grid",
          "size-[32px]",
          "place-items-center",
          "rounded-sm",
          "bg-neutral-100",
          "md:size-[44px]",
          "md:rounded-md",
          "dark:bg-neutral-700",
        )}
        onClick={toggleDarkMode}
      >
        <img alt="Dark Mode Toggle" className={""} src={isDarkModeEnabled ? sun : moon} />
      </button>
    </header>
  );
}
