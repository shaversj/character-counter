import darkLogo from "../assets/images/logo-dark-theme.svg";
import lightLogo from "../assets/images/logo-light-theme.svg";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  return (
    <header className={"flex pt-[34px]"}>
      <img src={isDarkModeEnabled ? darkLogo : lightLogo} className="h-[30px] md:h-10" alt="logo" />
      <button
        onClick={toggleDarkMode}
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
      >
        <img src={isDarkModeEnabled ? sun : moon} alt="Dark Mode Toggle" className={""} />
      </button>
    </header>
  );
}
